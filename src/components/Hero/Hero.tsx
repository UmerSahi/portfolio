import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Download } from "lucide-react";
import { c, serif, mono, WORDS } from "../../data/portfolioData";

interface DocLayerProps {
  mx: any;
  my: any;
  depth: number;
  rotate: number;
  imageSrc: string;
  box: {
    width: number;
    height: number;
    top: string;
    right: string;
    opacity?: number;
  };
}

const DocLayer: React.FC<DocLayerProps> = ({ mx, my, depth, rotate, imageSrc, box }) => {
  const x = useTransform(mx, (v: number) => v * depth);
  const y = useTransform(my, (v: number) => v * depth);
  const r = useTransform(mx, (v: number) => rotate + v * 4);

  return (
    <motion.div
      style={{
        x,
        y,
        rotate: r,
        position: "absolute",
        zIndex: 2,
        ...box,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          background: c.paper,
          border: `1px solid ${c.lineStrong}`,
          borderRadius: 8,
          boxShadow: "0 30px 60px -20px rgba(42,39,30,0.25)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: 20,
            borderBottom: `1px solid ${c.line}`,
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "0 10px",
            background: "rgba(255,255,255,0.5)",
          }}
        >
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#FF5F56" }} />
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#FFBD2E" }} />
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#27C93F" }} />
        </div>
        <div style={{ width: "100%", height: "calc(100% - 20px)" }}>
          <img
            src={imageSrc}
            alt="Project Demo"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 75, damping: 16, mass: 0.8 });
  const smoothY = useSpring(mouseY, { stiffness: 75, damping: 16, mass: 0.8 });

  // Google Flow: Dynamic 3D transforms for character tracking
  const avatarRotateY = useTransform(smoothX, [-0.5, 0.5], [-24, 24]);
  const avatarRotateX = useTransform(smoothY, [-0.5, 0.5], [16, -16]);
  const avatarRotateZ = useTransform(smoothX, [-0.5, 0.5], [-4, 4]);
  const avatarTranslateX = useTransform(smoothX, [-0.5, 0.5], [-28, 28]);
  const avatarTranslateY = useTransform(smoothY, [-0.5, 0.5], [-20, 20]);

  // Google Flow: Ambient dynamic aura tracking
  const auraTranslateX = useTransform(smoothX, [-0.5, 0.5], [35, -35]);
  const auraTranslateY = useTransform(smoothY, [-0.5, 0.5], [25, -25]);
  const auraScale = useTransform(smoothY, [-0.5, 0.5], [0.95, 1.08]);

  // Google Flow: Orbital energy rings
  const orbitTranslateX = useTransform(smoothX, [-0.5, 0.5], [20, -20]);
  const orbitTranslateY = useTransform(smoothY, [-0.5, 0.5], [15, -15]);
  const orbitRotate = useTransform(smoothX, [-0.5, 0.5], [-15, 15]);

  // Google Flow: Interactive floating badge parallax
  const badgeTranslateX = useTransform(smoothX, [-0.5, 0.5], [-35, 35]);
  const badgeTranslateY = useTransform(smoothY, [-0.5, 0.5], [-28, 28]);
  const badgeRotate = useTransform(smoothX, [-0.5, 0.5], [-5, 5]);

  // Google Flow: Dynamic ground contact shadow
  const shadowTranslateX = useTransform(smoothX, [-0.5, 0.5], [22, -22]);
  const shadowScale = useTransform(smoothY, [-0.5, 0.5], [1.08, 0.92]);

  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    const checkMobile = () => setIsMobile(window.innerWidth < 800);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % WORDS.length);
    }, 2500);

    return () => {
      window.removeEventListener("resize", checkMobile);
      clearInterval(interval);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reducedMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id="hero-section"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "110px 32px 60px",
        overflow: "hidden",
      }}
    >
      {/* 3D Floating Project Layers (Desktop only to prevent clutter) */}
      {!reducedMotion && !isMobile && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 1,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={{ position: "relative", width: "100%", maxWidth: 1080, height: "100%" }}>
            <DocLayer
              mx={smoothX}
              my={smoothY}
              depth={22}
              rotate={-6}
              imageSrc="/project_images/ezy.webp"
              box={{
                width: isMobile ? 180 : 260,
                height: isMobile ? 120 : 170,
                top: isMobile ? "58%" : "14%",
                right: isMobile ? "2%" : "0%",
              }}
            />
            <DocLayer
              mx={smoothX}
              my={smoothY}
              depth={14}
              rotate={4}
              imageSrc="/project_images/deep_spud.png"
              box={{
                width: isMobile ? 160 : 240,
                height: isMobile ? 100 : 150,
                top: isMobile ? "61%" : "25%",
                right: isMobile ? "48%" : "10%",
              }}
            />
            <DocLayer
              mx={smoothX}
              my={smoothY}
              depth={30}
              rotate={9}
              imageSrc="/project_images/brain_tumor.png"
              box={{
                width: isMobile ? 150 : 220,
                height: isMobile ? 95 : 140,
                top: isMobile ? "69%" : "34%",
                right: isMobile ? "-5%" : "-8%",
                opacity: 0.85,
              }}
            />
          </div>
        </div>
      )}

      {/* Main Content Grid */}
      <div style={{ position: "relative", zIndex: 10, maxWidth: 1080, margin: "0 auto", width: "100%" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1.2fr 1fr",
            gap: isMobile ? "48px" : "40px",
            alignItems: "center",
          }}
          className="kk-grid-collapse"
        >
          {/* Left Column */}
          <div>
            <div
              style={{
                ...mono,
                display: "flex",
                alignItems: "center",
                gap: 10,
                fontSize: 12,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: c.clay,
                marginBottom: 26,
              }}
            >
              <span style={{ width: 26, height: 1, background: c.clay }} />
              CS Gold Medalist — AI & Systems Engineer
            </div>

            <h1
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 600,
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                fontSize: "clamp(32px, 5vw, 62px)",
                maxWidth: 750,
                color: c.ink,
                margin: "0 0 16px 0",
              }}
            >
              Muhammad Umer Sahi
              <br />
              <span style={{ whiteSpace: "nowrap" }}>
                Building,{" "}
                <span
                  style={{
                    display: "inline-block",
                    width: "7.5em",
                    position: "relative",
                    verticalAlign: "bottom",
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={wordIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      style={{ position: "absolute", left: 0, bottom: 0, whiteSpace: "nowrap" }}
                    >
                      <em style={{ fontStyle: "italic", fontWeight: 500, color: c.mossDeep, ...serif }}>
                        {WORDS[wordIndex]}
                      </em>
                    </motion.span>
                  </AnimatePresence>
                </span>
              </span>{" "}
              systems.
            </h1>

            <p
              style={{
                marginTop: 26,
                fontSize: 18,
                color: c.inkSoft,
                maxWidth: 560,
                lineHeight: 1.6,
              }}
            >
              I'm an AI/ML Engineer and Computer Science Gold Medalist passionate about building human-centered AI, multimodal vision models, and high-performance full-stack architectures.
            </p>

            <div style={{ marginTop: 32 }}>
              <a
                href="/Muhammad_Umer_Sarfraz_Sahi_CV.pdf"
                download="Muhammad_Umer_Sarfraz_Sahi_CV.pdf"
                style={{
                  ...mono,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  padding: "14px 28px",
                  background: c.mossDeep,
                  color: c.paper,
                  borderRadius: 6,
                  boxShadow: "0 8px 24px rgba(60,68,50,0.25)",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = c.clay;
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = c.mossDeep;
                  e.currentTarget.style.transform = "none";
                }}
              >
                <Download size={16} />
                Download CV
              </a>
            </div>
          </div>

          {/* Right Column: Google Flow 3D Avatar */}
          <div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              perspective: 1200,
              perspectiveOrigin: "50% 50%",
              minHeight: isMobile ? 360 : 500,
            }}
          >
            {/* Google Flow: Ambient dynamic aura tracking */}
            <motion.div
              style={{
                position: "absolute",
                width: isMobile ? 280 : 400,
                height: isMobile ? 280 : 400,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle at 45% 45%, rgba(66, 133, 244, 0.22) 0%, rgba(164, 89, 47, 0.18) 36%, rgba(60, 68, 50, 0.12) 64%, transparent 75%)",
                filter: "blur(36px)",
                x: auraTranslateX,
                y: auraTranslateY,
                scale: auraScale,
                pointerEvents: "none",
                zIndex: 0,
              }}
              animate={{
                opacity: [0.75, 0.95, 0.75],
                scale: [1, 1.04, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Google Flow: Orbital Energy Ring 1 */}
            <motion.div
              style={{
                position: "absolute",
                width: isMobile ? 240 : 360,
                height: isMobile ? 240 : 360,
                borderRadius: "50%",
                border: "1px dashed rgba(66, 133, 244, 0.22)",
                x: orbitTranslateX,
                y: orbitTranslateY,
                rotate: orbitRotate,
                pointerEvents: "none",
                zIndex: 1,
              }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            />

            {/* Google Flow: Orbital Energy Ring 2 */}
            <motion.div
              style={{
                position: "absolute",
                width: isMobile ? 300 : 420,
                height: isMobile ? 300 : 420,
                borderRadius: "45%",
                border: "1px solid rgba(164, 89, 47, 0.14)",
                x: auraTranslateX,
                y: auraTranslateY,
                pointerEvents: "none",
                zIndex: 1,
              }}
              animate={{ rotate: [360, 0] }}
              transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
            />

            {/* Avatar 3D Wrapper */}
            <motion.div
              style={{
                position: "relative",
                zIndex: 2,
                transformStyle: "preserve-3d",
                x: avatarTranslateX,
                y: avatarTranslateY,
                rotateX: avatarRotateX,
                rotateY: avatarRotateY,
                rotateZ: avatarRotateZ,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* Idle floating motion */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  src="/umer.png"
                  alt="Muhammad Umer Sahi"
                  draggable="false"
                  loading="eager"
                  style={{
                    width: "100%",
                    maxWidth: isMobile ? 270 : 360,
                    height: "auto",
                    objectFit: "contain",
                    userSelect: "none",
                    filter:
                      "drop-shadow(0 20px 32px rgba(42,39,30,0.22)) drop-shadow(0 6px 14px rgba(60,68,50,0.14))",
                    pointerEvents: "none",
                  }}
                />
              </motion.div>

              {/* Dynamic Ground Contact Shadow */}
              <motion.div
                style={{
                  width: isMobile ? 180 : 240,
                  height: 18,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(ellipse at center, rgba(42, 39, 30, 0.32) 0%, rgba(42, 39, 30, 0.08) 55%, transparent 75%)",
                  filter: "blur(6px)",
                  marginTop: -16,
                  x: shadowTranslateX,
                  scale: shadowScale,
                  pointerEvents: "none",
                }}
              />
            </motion.div>

            {/* Floating Status Badge Parallax */}
            <motion.div
              style={{
                position: "absolute",
                bottom: isMobile ? "4%" : "8%",
                left: isMobile ? "4%" : "-4%",
                zIndex: 5,
                x: badgeTranslateX,
                y: badgeTranslateY,
                rotate: badgeRotate,
              }}
              animate={{
                y: [0, -6, 0],
              }}
              transition={{
                duration: 3.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.4,
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 16px",
                  borderRadius: 999,
                  background: "rgba(244, 239, 225, 0.9)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(42, 39, 30, 0.16)",
                  boxShadow: "0 12px 24px -6px rgba(42, 39, 30, 0.18)",
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: "#10B981",
                    boxShadow: "0 0 10px rgba(16, 185, 129, 0.8)",
                  }}
                />
                <span
                  style={{
                    ...mono,
                    fontSize: 12,
                    fontWeight: 600,
                    color: c.ink,
                    letterSpacing: "0.2px",
                  }}
                >
                  Interactive 3D Avatar • AI & ML
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
