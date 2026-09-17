import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, X } from "lucide-react";
import { c, serif, mono, projects, cardConfigs } from "../../data/portfolioData";
import { SectionHead } from "../common/SectionHead";

const defaultSpring = {
  type: "spring" as const,
  stiffness: 220,
  damping: 24,
};

export const Projects: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<any | null>(null);
  const [spacing, setSpacing] = useState(180);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setSelectedCard(null);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      setSpacing(Math.round(w >= 1024 ? 180 * 0.78 : w >= 600 ? 180 * 0.55 : 180 * 0.28));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // All 11 projects in 3D Fan Deck (RealEstate Hub 1st, PK Bazar AI 8th, etc.)
  const cardItems = projects.map((proj, idx) => {
    const config = cardConfigs[idx % cardConfigs.length];
    return {
      ...proj,
      className: config.className,
      config: {
        y: config.y,
        rotate: config.rotate,
        // Reverse zIndex so card 0 (RealEstate Hub) is on top in front, followed by subsequent projects
        zIndex: (projects.length - idx) + 2,
      },
    };
  });

  const centerIndex = (cardItems.length - 1) / 2;
  const isAnySelected = () => !!selectedCard;
  const isSelected = (item: any) => selectedCard?.title === item.title;

  return (
    <section id="work" style={{ padding: "100px 0 70px", position: "relative", overflow: "hidden" }}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          width: "100%",
          position: "relative",
          zIndex: 1,
        }}
      >
        <SectionHead index="03" title="Selected" em="work" />

        {/* Header Subtitle */}
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <p
            style={{
              ...mono,
              fontSize: 13,
              color: c.clay,
              marginBottom: 8,
              textTransform: "uppercase",
              letterSpacing: 1.5,
              fontWeight: 600,
            }}
          >
            Applied AI Agents, Computer Vision & Full-Stack Systems ({projects.length})
          </p>

          <p
            style={{
              ...mono,
              fontSize: 12,
              color: c.inkSoft,
              textAlign: "center",
              margin: "0 auto",
              maxWidth: 580,
              opacity: 0.85,
            }}
          >
            Interactive 3D Fan Deck · Click any card or selector below to inspect architecture & live repositories
          </p>
        </div>

        {/* 3D Stacked Fan Cards Deck */}
        <div className="mt-2 sm:mt-4">
          <div
            className="relative flex h-full w-full items-center justify-center pt-6 sm:pt-10 pb-4"
            style={{ minHeight: "500px" }}
          >
            <motion.div
              ref={containerRef}
              onClick={() => setSelectedCard(null)}
              className="relative mx-auto flex h-104 sm:h-112 w-full max-w-6xl items-center justify-center [--height:320px] [--width:210px] sm:[--height:380px] sm:[--width:260px] lg:[--height:440px] lg:[--width:315px]"
            >
              {cardItems.map((item, idx) => {
                const total = cardItems.length;
                const effectiveSpacing = total > 5 ? (spacing * 4) / (total - 1) : spacing;
                const offsetX = (idx - centerIndex) * effectiveSpacing;
                const isParchment = item.className.includes("bg-[#FAF7F0]");
                const textColor = isParchment ? "#2A271E" : "#FAF7F0";
                const btnBg = isParchment ? "rgba(42, 39, 30, 0.08)" : "rgba(255, 255, 255, 0.18)";
                const btnBorder = isParchment
                  ? "1px solid rgba(42, 39, 30, 0.15)"
                  : "1px solid rgba(255, 255, 255, 0.2)";

                const active = isSelected(item);
                const hasActive = isAnySelected();

                return (
                  <motion.div
                    key={item.title}
                    initial={{ x: 0, scale: 0 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCard(active ? null : item);
                    }}
                    animate={{
                      y: active ? 0 : hasActive ? item.config.y * 0.35 : item.config.y,
                      x: active
                        ? "-36%"
                        : hasActive
                        ? `calc(var(--width) * 0.94 + ${offsetX * 0.35}px)`
                        : offsetX,
                      rotate: active ? 0 : hasActive ? 0.15 * item.config.rotate : item.config.rotate,
                      scale: active ? 1.14 : hasActive ? 0.65 : 1,
                    }}
                    whileHover={{
                      scale: active ? 1.14 : hasActive ? 0.65 : 1.05,
                      y: active ? 0 : item.config.y - 12,
                    }}
                    transition={defaultSpring}
                    style={{
                      width: "var(--width)",
                      height: "var(--height)",
                      marginLeft: "calc(var(--width) / -2)",
                      marginTop: "calc(var(--height) / -2)",
                      zIndex: active ? 50 : item.config.zIndex,
                    }}
                    className={`absolute top-1/2 left-1/2 flex cursor-pointer flex-col items-start justify-start overflow-hidden rounded-2xl p-3 sm:p-4 shadow-xl transition-shadow duration-300 gap-2 sm:gap-2.5 ${item.className}`}
                  >
                    {/* Project Thumbnail Image */}
                    <div className="h-24 sm:h-30 lg:h-36 w-full rounded-xl overflow-hidden bg-neutral-900/10 relative border border-black/5 flex-shrink-0">
                      <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                      <span
                        style={{
                          position: "absolute",
                          top: 6,
                          right: 6,
                          background: "rgba(0,0,0,0.78)",
                          color: "#FAF7F0",
                          padding: "2px 7px",
                          borderRadius: 4,
                          fontSize: "9px",
                          ...mono,
                          fontWeight: 700,
                          letterSpacing: 0.5,
                        }}
                      >
                        #{item.index}
                      </span>
                      {item.badge && (
                        <span
                          style={{
                            position: "absolute",
                            bottom: 6,
                            left: 6,
                            background: "rgba(0,0,0,0.72)",
                            color: "#FAF7F0",
                            padding: "2px 6px",
                            borderRadius: 4,
                            fontSize: "8.5px",
                            ...mono,
                            fontWeight: 600,
                            letterSpacing: 0.3,
                          }}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>

                    {/* Card Content & Heading */}
                    <div className="w-full flex flex-col">
                      <div className="flex items-center justify-between gap-1">
                        <h2
                          style={{ ...serif }}
                          className="font-bold text-left text-base sm:text-lg md:text-xl leading-snug py-0.5"
                        >
                          {item.title}
                        </h2>
                        {active && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedCard(null);
                            }}
                            style={{
                              background: btnBg,
                              border: btnBorder,
                              color: textColor,
                              borderRadius: "50%",
                              padding: "4px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                            }}
                            title="Close"
                          >
                            <X size={12} />
                          </button>
                        )}
                      </div>

                      {/* Expandable Technical Details */}
                      <AnimatePresence mode="popLayout">
                        {active && (
                          <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 12 }}
                            transition={defaultSpring}
                            className="mt-1.5 w-full"
                          >
                            <div className="flex flex-wrap gap-1 mb-2">
                              {item.tags?.slice(0, 6).map((tag) => (
                                <span
                                  key={tag}
                                  style={{
                                    borderColor: isParchment
                                      ? "rgba(42,39,30,0.15)"
                                      : "rgba(255,255,255,0.2)",
                                    background: isParchment
                                      ? "rgba(42,39,30,0.04)"
                                      : "rgba(255,255,255,0.08)",
                                    color: textColor,
                                    fontSize: "9px",
                                    ...mono,
                                  }}
                                  className="px-1.5 py-0.5 rounded border text-[9px] uppercase tracking-wider font-semibold"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>

                            <p
                              style={{ ...mono }}
                              className="text-left text-[11px] opacity-90 line-clamp-3 leading-relaxed mb-2.5"
                            >
                              {item.desc}
                            </p>

                            {item.role && (
                              <p
                                style={{
                                  ...mono,
                                  fontSize: "9.5px",
                                  opacity: 0.82,
                                  lineHeight: 1.4,
                                  marginBottom: "8px",
                                  fontStyle: "italic",
                                }}
                              >
                                {item.role}
                              </p>
                            )}

                            <div className="flex gap-2 pt-0.5">
                              {item.github ? (
                                <a
                                  href={item.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  style={{
                                    color: textColor,
                                    background: btnBg,
                                    border: btnBorder,
                                    ...mono,
                                  }}
                                  className="px-2.5 py-1 rounded-lg text-[10px] font-semibold tracking-wider uppercase transition-opacity hover:opacity-80 flex items-center gap-1.5"
                                >
                                  <Github size={11} /> Source
                                </a>
                              ) : (
                                <span
                                  style={{
                                    color: textColor,
                                    background: btnBg,
                                    border: btnBorder,
                                    opacity: 0.5,
                                    pointerEvents: "none",
                                    ...mono,
                                  }}
                                  className="px-2.5 py-1 rounded-lg text-[10px] font-semibold tracking-wider uppercase"
                                >
                                  Client Private
                                </span>
                              )}

                              {item.live ? (
                                <a
                                  href={item.live}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  style={{
                                    color: textColor,
                                    background: btnBg,
                                    border: btnBorder,
                                    ...mono,
                                  }}
                                  className="px-2.5 py-1 rounded-lg text-[10px] font-semibold tracking-wider uppercase transition-opacity hover:opacity-80 flex items-center gap-1"
                                >
                                  Launch <ExternalLink size={10} />
                                </a>
                              ) : (
                                <span
                                  style={{
                                    color: textColor,
                                    background: btnBg,
                                    border: btnBorder,
                                    opacity: 0.5,
                                    pointerEvents: "none",
                                    ...mono,
                                  }}
                                  className="px-2.5 py-1 rounded-lg text-[10px] font-semibold tracking-wider uppercase"
                                >
                                  Production Ready
                                </span>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Quick Card Selector Pill Bar (All 11 projects accessible directly) */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 6,
              flexWrap: "wrap",
              marginTop: 20,
              padding: "0 12px",
              maxWidth: 1040,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {cardItems.map((item) => {
              const active = isSelected(item);
              return (
                <button
                  key={item.title}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCard(active ? null : item);
                  }}
                  style={{
                    ...mono,
                    fontSize: 10.5,
                    padding: "5px 11px",
                    borderRadius: 14,
                    border: `1px solid ${active ? c.clay : c.line}`,
                    background: active ? c.clay : "rgba(255,255,255,0.6)",
                    color: active ? c.paper : c.ink,
                    cursor: "pointer",
                    fontWeight: active ? 700 : 500,
                    transition: "all 0.2s ease",
                    boxShadow: active ? "0 2px 8px rgba(164,89,47,0.25)" : "none",
                  }}
                >
                  {item.index} · {item.title.split("—")[0].trim()}
                </button>
              );
            })}
          </div>

          {/* Helper deselect prompt when a card is selected */}
          {selectedCard && (
            <div style={{ textAlign: "center", marginTop: 14 }}>
              <button
                onClick={() => setSelectedCard(null)}
                style={{
                  ...mono,
                  fontSize: 11,
                  padding: "4px 12px",
                  borderRadius: 12,
                  border: `1px solid ${c.line}`,
                  background: "transparent",
                  color: c.inkSoft,
                  cursor: "pointer",
                }}
              >
                ✕ Close Details / Reset Fan Deck
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
