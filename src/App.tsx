import React, { useState, useEffect, useRef } from "react";
import { LayoutGroup } from "framer-motion";
import Lenis from "lenis";
import { c, sans } from "./data/portfolioData";
import { Navbar } from "./components/Navbar/Navbar";
import { Hero } from "./components/Hero/Hero";
import { About } from "./components/About/About";
import { Experience } from "./components/Experience/Experience";
import { Projects } from "./components/Projects/Projects";
import { Skills } from "./components/Skills/Skills";
import { FloatingSkills } from "./components/FloatingSkills/FloatingSkills";
import { Playground } from "./components/Playground/Playground";
import { Certificates } from "./components/Certificates/Certificates";
import { Testimonials } from "./components/Testimonials/Testimonials";
import { Contact } from "./components/Contact/Contact";
import { Footer } from "./components/Footer/Footer";

export const App: React.FC = () => {
  const [isDocked, setIsDocked] = useState(false);
  const [isPlaygroundActive, setIsPlaygroundActive] = useState(false);
  const [isHoveringPool, setIsHoveringPool] = useState(false);
  const [, setPlacedSkills] = useState<string[]>([]);
  const [gameState, setGameState] = useState<"idle" | "playing" | "won">("idle");
  const mouseRef = useRef({ x: 0, y: 0 });

  // Mouse position tracking & Section collision detection
  useEffect(() => {
    let animFrame: number;

    const checkCollisions = () => {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Check Skills collision for docking
      const skillsEl = document.getElementById("skills");
      if (skillsEl) {
        const rect = skillsEl.getBoundingClientRect();
        setIsDocked(mx >= rect.left && mx <= rect.right && my >= rect.top && my <= rect.bottom);
      } else {
        setIsDocked(false);
      }

      // Check Playground & Skill Pool collision
      const poolEl = document.getElementById("skill-pool-area");
      const playgroundEl = document.getElementById("playground");
      if (poolEl && playgroundEl) {
        const poolRect = poolEl.getBoundingClientRect();
        const pgRect = playgroundEl.getBoundingClientRect();

        const inPool =
          mx >= poolRect.left &&
          mx <= poolRect.right &&
          my >= poolRect.top &&
          my <= poolRect.bottom;

        setIsHoveringPool(inPool);

        setIsPlaygroundActive((prev) => {
          if (prev) {
            return !(
              my < pgRect.top - 50 ||
              my > pgRect.bottom + 50 ||
              mx < pgRect.left - 50 ||
              mx > pgRect.right + 50
            );
          }
          return inPool;
        });
      } else {
        setIsHoveringPool(false);
      }

      animFrame = requestAnimationFrame(checkCollisions);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);
    checkCollisions();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  // Lenis smooth scroll initialization
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const isSwarmHidden = isHoveringPool || gameState !== "idle";

  return (
    <LayoutGroup>
      <div
        style={{
          ...sans,
          background: c.bg,
          color: c.ink,
          overflowX: "hidden",
          minHeight: "100vh",
        }}
      >
        {/* Floating Skills particle swarm */}
        <FloatingSkills isDocked={isDocked} isHidden={isSwarmHidden} />

        {/* Global responsive and interaction styling */}
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400;1,6..72,500&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Montserrat:wght@400;500;600;700;800;900&display=swap');
          
          html {
            scroll-behavior: smooth;
          }
          
          ::selection {
            background: ${c.moss};
            color: ${c.paper};
          }
          
          .kk-navlink {
            position: relative;
          }
          
          .kk-navlink::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: -4px;
            width: 0;
            height: 1px;
            background: ${c.clay};
            transition: width 0.25s ease;
          }
          
          .kk-navlink:hover::after {
            width: 100%;
          }
          
          .kk-navlink:hover {
            color: ${c.mossDeep} !important;
          }
          
          .kk-proj-card {
            transition: transform .25s ease, box-shadow .25s ease;
          }
          
          .kk-proj-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 20px 40px -20px rgba(42,39,30,0.3);
          }
          
          .kk-btn-dark:hover {
            background: ${c.ink} !important;
            color: ${c.paper} !important;
          }
          
          .kk-btn-moss:hover {
            background: ${c.moss} !important;
            color: ${c.paper} !important;
          }
          
          @media (max-width: 800px) {
            .kk-grid-collapse {
              grid-template-columns: 1fr !important;
            }
            .kk-grid-3 {
              grid-template-columns: repeat(2, 1fr) !important;
            }
          }
          
          @media (max-width: 520px) {
            .kk-grid-3 {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>

        <Navbar />

        <div style={{ position: "relative", zIndex: 5 }}>
          <Hero />
          <About />
          <Experience />
          <Projects />
        </div>

        <div style={{ position: "relative", zIndex: 1 }}>
          <Skills />
        </div>

        <div style={{ position: "relative", zIndex: 5 }}>
          <Playground
            isActive={isPlaygroundActive}
            isHoveringPool={isHoveringPool}
            onPlacedChange={setPlacedSkills}
            onGameStateChange={setGameState}
          />
        </div>

        <div style={{ position: "relative", zIndex: 5 }}>
          <Certificates />
        </div>

        <div style={{ position: "relative", zIndex: 5 }}>
          <Testimonials />
        </div>

        <div style={{ position: "relative", zIndex: 5 }}>
          <Contact />
          <Footer />
        </div>
      </div>
    </LayoutGroup>
  );
};

export default App;
