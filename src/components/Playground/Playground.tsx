import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { c, serif, mono, sans, CATEGORIES, skillGroups } from "../../data/portfolioData";
import { SectionHead } from "../common/SectionHead";
import type { SkillItem } from "../../types/portfolio";

interface SkillWithGroup extends SkillItem {
  groupLabel: string;
}

const allSkills: SkillWithGroup[] = skillGroups.flatMap((group) =>
  group.items.map((item) => ({ ...item, groupLabel: group.label }))
);

const getCorrectCategoryForSkill = (skill: SkillWithGroup) => {
  return CATEGORIES.find((cat) => cat.match.includes(skill.groupLabel));
};

const generateScatter = () =>
  allSkills.map(() => ({
    rotate: (Math.random() - 0.5) * 120,
    left: 10 + Math.random() * 80,
    top: 30 + Math.random() * 30,
  }));

interface PlaygroundProps {
  isActive?: boolean;
  isHoveringPool?: boolean;
  onPlacedChange?: (placed: string[]) => void;
  onGameStateChange?: (state: "idle" | "playing" | "won") => void;
}

export const Playground: React.FC<PlaygroundProps> = ({
  isActive = false,
  isHoveringPool = false,
  onPlacedChange,
  onGameStateChange,
}) => {
  const [placed, setPlaced] = useState<Record<string, string[]>>({});
  const [isPoolVisible, setIsPoolVisible] = useState(false);
  const [errorSkill, setErrorSkill] = useState<string | null>(null);
  const [skillOffsets, setSkillOffsets] = useState<Record<string, { x: number; y: number }>>({});
  const [gameState, setGameState] = useState<"idle" | "playing" | "won">("idle");
  const [timerSeconds, setTimerSeconds] = useState(0);

  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const scatterPositions = useRef(generateScatter());

  const totalPlaced = Object.values(placed).flat().length;
  const totalSkills = allSkills.length;
  const hasWon = totalPlaced === totalSkills && totalSkills > 0;

  useEffect(() => {
    if (!isActive) {
      setGameState("idle");
      setPlaced({});
      setSkillOffsets({});
      setErrorSkill(null);
      setTimerSeconds(0);
      setIsPoolVisible(false);
    }
  }, [isActive]);

  useEffect(() => {
    let interval: any = null;
    if (gameState === "playing") {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [gameState]);

  useEffect(() => {
    if (gameState === "playing" && hasWon) {
      setGameState("won");
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [hasWon, gameState]);

  useEffect(() => {
    if (onPlacedChange) {
      onPlacedChange(Object.values(placed).flat());
    }
  }, [placed, onPlacedChange]);

  useEffect(() => {
    if (onGameStateChange) {
      onGameStateChange(gameState);
    }
  }, [gameState, onGameStateChange]);

  useEffect(() => {
    if (isHoveringPool || gameState === "playing") {
      if (!isPoolVisible) setIsPoolVisible(true);
    } else {
      setIsPoolVisible(false);
    }
  }, [isHoveringPool, gameState, isPoolVisible]);

  const startGame = () => {
    scatterPositions.current = generateScatter();
    setPlaced({});
    setSkillOffsets({});
    setErrorSkill(null);
    setTimerSeconds(0);
    setGameState("playing");
  };

  const giveUp = () => {
    setGameState("idle");
    setPlaced({});
    setSkillOffsets({});
    setErrorSkill(null);
    setTimerSeconds(0);
    setIsPoolVisible(false);
  };

  const isSkillPlaced = (name: string) => {
    return Object.values(placed).flat().includes(name);
  };

  const handleDragEnd = (_event: any, info: any, skill: SkillWithGroup) => {
    if (gameState !== "playing") return;

    const { x: clientX, y: clientY } = info.point;
    let targetCatId: string | null = null;
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    const screenX = clientX - scrollX;
    const screenY = clientY - scrollY;

    Object.entries(categoryRefs.current).forEach(([catId, el]) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (screenX >= rect.left && screenX <= rect.right && screenY >= rect.top && screenY <= rect.bottom) {
        targetCatId = catId;
      }
    });

    if (targetCatId) {
      const correct = getCorrectCategoryForSkill(skill);
      if (correct && correct.id === targetCatId) {
        setPlaced((prev) => {
          const currentList = prev[targetCatId!] || [];
          if (currentList.includes(skill.name)) return prev;
          return { ...prev, [targetCatId!]: [...currentList, skill.name] };
        });
      } else {
        setErrorSkill(skill.name);
        setTimeout(() => setErrorSkill(null), 500);
      }
    } else {
      const poolEl = document.getElementById("skill-pool-area");
      if (poolEl) {
        const rect = poolEl.getBoundingClientRect();
        if (screenX >= rect.left && screenX <= rect.right && screenY >= rect.top && screenY <= rect.bottom) {
          setSkillOffsets((prev) => {
            const current = prev[skill.name] || { x: 0, y: 0 };
            return {
              ...prev,
              [skill.name]: {
                x: current.x + info.offset.x,
                y: current.y + info.offset.y,
              },
            };
          });
        }
      }
    }
  };

  return (
    <section id="playground" style={{ padding: "100px 0", position: "relative" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 32px" }}>
        <SectionHead index="05" title="Play" em="ground" />

        <p
          style={{
            ...mono,
            fontSize: 13,
            color: c.clay,
            textAlign: "center",
            marginBottom: 60,
            letterSpacing: 1.5,
          }}
        >
          SORT THE SKILLS INTO THEIR CORRECT ARCHITECTURE CATEGORIES
        </p>

        <div
          ref={containerRef}
          onMouseEnter={() => {
            if (!isPoolVisible) setIsPoolVisible(true);
          }}
          style={{
            background: c.paper,
            border: `1px solid ${c.line}`,
            borderRadius: 32,
            padding: "40px 24px",
            position: "relative",
            boxShadow: "inset 0 4px 20px rgba(0,0,0,0.02), 0 20px 40px rgba(0,0,0,0.05)",
            overflow: "hidden",
          }}
        >
          {/* Header & Categories when Playing or Won */}
          <AnimatePresence>
            {gameState !== "idle" && (
              <motion.div
                initial={{ height: 0, opacity: 0, marginBottom: 0 }}
                animate={{ height: "auto", opacity: 1, marginBottom: 32 }}
                exit={{ height: 0, opacity: 0, marginBottom: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{ overflow: "hidden" }}
              >
                {gameState === "playing" && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 24,
                      paddingBottom: 16,
                      borderBottom: `1px solid ${c.line}`,
                      gap: 16,
                      flexWrap: "wrap",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ ...mono, fontSize: 11, color: c.inkSoft, letterSpacing: 1 }}>
                        TIME:
                      </span>
                      <span
                        style={{
                          ...mono,
                          fontSize: 13,
                          fontWeight: 700,
                          color: c.ink,
                          background: "rgba(0,0,0,0.05)",
                          padding: "4px 10px",
                          borderRadius: 8,
                        }}
                      >
                        {timerSeconds}s
                      </span>
                    </div>

                    <div style={{ flex: 1, maxWidth: 300, display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ ...mono, fontSize: 11, color: c.inkSoft, letterSpacing: 1 }}>
                        PROGRESS:
                      </span>
                      <div
                        style={{
                          flex: 1,
                          height: 6,
                          background: "rgba(0,0,0,0.05)",
                          borderRadius: 3,
                          overflow: "hidden",
                          position: "relative",
                        }}
                      >
                        <motion.div
                          animate={{ width: `${(totalPlaced / totalSkills) * 100}%` }}
                          transition={{ duration: 0.3 }}
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            bottom: 0,
                            background: c.moss,
                            borderRadius: 3,
                          }}
                        />
                      </div>
                      <span style={{ ...mono, fontSize: 13, fontWeight: 700, color: c.ink, minWidth: 45, textAlign: "right" }}>
                        {totalPlaced} / {totalSkills}
                      </span>
                    </div>

                    <button
                      onClick={giveUp}
                      style={{
                        background: "rgba(0,0,0,0.02)",
                        border: `1px solid ${c.line}`,
                        padding: "6px 14px",
                        borderRadius: 12,
                        ...mono,
                        fontSize: 11,
                        color: c.inkSoft,
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = "rgba(0,0,0,0.06)";
                        e.currentTarget.style.color = c.ink;
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = "rgba(0,0,0,0.02)";
                        e.currentTarget.style.color = c.inkSoft;
                      }}
                    >
                      GIVE UP
                    </button>
                  </div>
                )}

                {/* 5 Architecture Buckets */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "nowrap",
                    justifyContent: "space-between",
                    gap: 16,
                    overflowX: "auto",
                    paddingBottom: 16,
                  }}
                >
                  {CATEGORIES.map((cat) => {
                    const skillsInCat = placed[cat.id] || [];
                    const hasItems = skillsInCat.length > 0;

                    return (
                      <div
                        key={`zone-${cat.id}`}
                        ref={(el) => {
                          categoryRefs.current[cat.id] = el;
                        }}
                        style={{
                          flex: 1,
                          minWidth: 160,
                          minHeight: 180,
                          border: hasItems ? `2px solid ${c.moss}` : `2px dashed ${c.lineStrong}`,
                          borderRadius: 24,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          background: hasItems ? "rgba(255,255,255,0.8)" : "transparent",
                          transition: "all 0.3s ease",
                          position: "relative",
                          padding: 16,
                          zIndex: 5,
                        }}
                      >
                        <div
                          style={{
                            ...mono,
                            color: hasItems ? c.ink : c.inkFaint,
                            fontSize: 11,
                            letterSpacing: 1,
                            textTransform: "uppercase",
                            marginBottom: 16,
                            fontWeight: hasItems ? 700 : 400,
                            textAlign: "center",
                          }}
                        >
                          {cat.label}
                        </div>

                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
                          <AnimatePresence>
                            {skillsInCat.map((skillName) => {
                              const skillObj = allSkills.find((s) => s.name === skillName);
                              if (!skillObj) return null;
                              return (
                                <motion.div
                                  key={`placed-${skillObj.name}`}
                                  layoutId={`swarm-${skillObj.name}`}
                                  animate={{ scale: 1, opacity: 1 }}
                                  transition={{ type: "spring", bounce: 0.5 }}
                                  style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                                >
                                  <img
                                    src={skillObj.icon}
                                    alt={skillObj.name}
                                    draggable={false}
                                    style={{
                                      width: 24,
                                      height: 24,
                                      borderRadius: "20%",
                                      objectFit: "contain",
                                      pointerEvents: "none",
                                      userSelect: "none",
                                    }}
                                  />
                                </motion.div>
                              );
                            })}
                          </AnimatePresence>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div style={{ height: 1, background: c.line, margin: "24px 0 0 0", opacity: 0.5 }} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Skill Pool Area */}
          <div style={{ position: "relative", height: 250 }}>
            <div
              style={{
                position: "absolute",
                top: -16,
                left: "50%",
                transform: "translateX(-50%)",
                ...mono,
                fontSize: 10,
                color: c.inkFaint,
                letterSpacing: 2,
              }}
            >
              SKILL POOL
            </div>

            <div
              id="skill-pool-area"
              style={{
                position: "absolute",
                inset: 0,
                marginTop: 24,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AnimatePresence mode="wait">
                {gameState === "idle" && (
                  <motion.div
                    key="idle-pool"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      zIndex: 20,
                    }}
                  >
                    <p
                      style={{
                        ...sans,
                        fontSize: 14,
                        color: c.inkSoft,
                        marginBottom: 16,
                        maxWidth: 450,
                        lineHeight: 1.5,
                      }}
                    >
                      Drag and drop technology cards into their corresponding architecture layers.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={startGame}
                      style={{
                        background: c.mossDeep,
                        color: c.paper,
                        border: "none",
                        padding: "12px 24px",
                        borderRadius: 24,
                        ...mono,
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: "pointer",
                        boxShadow: "0 6px 15px rgba(86,96,71,0.2)",
                      }}
                    >
                      START GAME
                    </motion.button>
                  </motion.div>
                )}

                {gameState === "won" && (
                  <motion.div
                    key="won-pool"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      zIndex: 20,
                      position: "relative",
                    }}
                  >
                    <h4
                      style={{
                        ...serif,
                        fontSize: 28,
                        fontWeight: 700,
                        color: c.mossDeep,
                        marginBottom: 8,
                      }}
                    >
                      Congratulations!
                    </h4>
                    <p style={{ ...sans, fontSize: 14, color: c.inkSoft, marginBottom: 20 }}>
                      You successfully categorized all {totalSkills} skills in <strong>{timerSeconds}s</strong>!
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={startGame}
                      style={{
                        background: c.mossDeep,
                        color: c.paper,
                        border: "none",
                        padding: "12px 24px",
                        borderRadius: 24,
                        ...mono,
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: "pointer",
                        boxShadow: "0 6px 15px rgba(86,96,71,0.2)",
                        position: "relative",
                        zIndex: 10,
                      }}
                    >
                      PLAY AGAIN
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Draggable skill icons inside pool */}
              {(isHoveringPool || gameState === "playing") &&
                gameState !== "won" &&
                allSkills.map((skill, idx) => {
                  if (isSkillPlaced(skill.name)) return null;

                  const isErr = errorSkill === skill.name;
                  const scatter = scatterPositions.current[idx] || { rotate: 0, left: 50, top: 50 };
                  const offset = skillOffsets[skill.name] || { x: 0, y: 0 };
                  const isPlaying = gameState === "playing";

                  const normalAnim = {
                    x: offset.x,
                    y: isPoolVisible ? offset.y : -250,
                    rotate: scatter.rotate,
                    opacity: isPoolVisible ? 1 : 0,
                    scale: isPoolVisible ? 1 : 0.5,
                    filter: "none",
                    transition: {
                      delay: isPoolVisible ? idx * 0.02 : 0,
                      duration: 0.7,
                      type: "spring" as const,
                      bounce: 0.3,
                    },
                  };

                  const shakeAnim = {
                    x: [offset.x - 10, offset.x + 10, offset.x - 10, offset.x + 10, offset.x],
                    y: offset.y,
                    rotate: scatter.rotate,
                    filter: "drop-shadow(0 0 8px #EF4444)",
                    opacity: 1,
                    transition: { duration: 0.4 },
                  };

                  return (
                    <motion.div
                      key={skill.name}
                      layoutId={`swarm-${skill.name}`}
                      drag={isPlaying}
                      dragConstraints={containerRef}
                      dragElastic={0.1}
                      onDragEnd={(e, info) => handleDragEnd(e, info, skill)}
                      initial={{ opacity: 0, y: -250, rotate: scatter.rotate - 180, x: 0 }}
                      animate={isErr ? shakeAnim : normalAnim}
                      whileDrag={{ scale: 1.2, rotate: 0, cursor: "grabbing", zIndex: 99 }}
                      style={{
                        padding: 16,
                        position: "absolute",
                        left: `${scatter.left}%`,
                        top: `${scatter.top}%`,
                        transform: "translate(-50%, -50%)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: isPlaying ? "grab" : "default",
                        zIndex: 10,
                      }}
                    >
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        draggable={false}
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: "20%",
                          objectFit: "contain",
                          pointerEvents: "none",
                          userSelect: "none",
                        }}
                      />
                    </motion.div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
