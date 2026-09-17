import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { skillGroups } from "../../data/portfolioData";
import type { SkillItem } from "../../types/portfolio";

interface SwarmSkillItem extends SkillItem {
  size: number;
  homeX: number;
  homeY: number;
  clusterX: number;
  clusterY: number;
  stiffness: number;
  damping: number;
}

interface SwarmIconProps {
  skill: SwarmSkillItem;
  mouseX: any;
  mouseY: any;
  isHovering: boolean;
  isDocked: boolean;
  isHidden: boolean;
}

const SwarmIcon: React.FC<SwarmIconProps> = ({
  skill,
  mouseX,
  mouseY,
  isHovering,
  isDocked,
  isHidden,
}) => {
  const currentX = useMotionValue(skill.homeX);
  const currentY = useMotionValue(skill.homeY);

  const springX = useSpring(currentX, {
    stiffness: skill.stiffness,
    damping: skill.damping,
  });
  const springY = useSpring(currentY, {
    stiffness: skill.stiffness,
    damping: skill.damping,
  });

  useEffect(() => {
    let animFrame: number;

    const updatePosition = () => {
      if (isHidden) {
        const w = typeof window !== "undefined" ? window.innerWidth : 1200;
        const h = typeof window !== "undefined" ? window.innerHeight : 800;
        currentX.set(w * 0.1 + w * 0.8 * Math.random());
        currentY.set(h + 200 + Math.random() * 500);
      } else if (isDocked) {
        const target = document.getElementById(`skill-tag-${skill.name}`);
        if (target) {
          const rect = target.getBoundingClientRect();
          currentX.set(rect.left + rect.width / 2 - skill.size / 2);
          currentY.set(rect.top + rect.height / 2 - skill.size / 2);
        } else {
          currentX.set(skill.homeX);
          currentY.set(skill.homeY);
        }
      } else if (isHovering) {
        currentX.set(mouseX.get() + skill.clusterX);
        currentY.set(mouseY.get() + skill.clusterY);
      } else {
        currentX.set(skill.homeX);
        currentY.set(skill.homeY);
      }

      animFrame = requestAnimationFrame(updatePosition);
    };

    updatePosition();
    return () => cancelAnimationFrame(animFrame);
  }, [mouseX, mouseY, isHovering, isDocked, isHidden, currentX, currentY, skill]);

  return (
    <motion.div
      layoutId={`swarm-${skill.name}`}
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        x: springX,
        y: springY,
        width: skill.size,
        height: skill.size,
        pointerEvents: "none",
        zIndex: 10,
      }}
      animate={{
        rotate: isDocked ? 0 : [0, 10, -10, 0],
        opacity: isDocked ? 0.95 : isHovering ? 0.6 : 0.2,
      }}
      transition={
        isDocked
          ? { type: "spring", stiffness: 100, damping: 20, layout: { type: "tween", duration: 0 } }
          : {
              layout: { type: "tween", duration: 0 },
              rotate: { duration: 4 + Math.random() * 3, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 0.3 },
            }
      }
    >
      <img
        src={skill.icon}
        alt={skill.name}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          borderRadius: "20%",
        }}
      />
    </motion.div>
  );
};

interface FloatingSkillsProps {
  isDocked: boolean;
  isHidden: boolean;
}

export const FloatingSkills: React.FC<FloatingSkillsProps> = ({ isDocked, isHidden }) => {
  const mouseX = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 0);
  const mouseY = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 2 : 0);
  const [isHovering, setIsHovering] = useState(false);
  const hoverTimeout = useRef<any>(null);

  const skillsList = useMemo<SwarmSkillItem[]>(() => {
    return skillGroups
      .flatMap((group) => group.items)
      .map((item, idx) => {
        const w = typeof window !== "undefined" ? window.innerWidth : 1200;
        const h = typeof window !== "undefined" ? window.innerHeight : 800;
        return {
          ...item,
          size: 45,
          homeX: w * (0.05 + Math.random() * 0.9),
          homeY: h * (0.05 + Math.random() * 0.9),
          clusterX: (Math.random() - 0.5) * 140,
          clusterY: (Math.random() - 0.5) * 140,
          stiffness: 100,
          damping: 15 + idx * 0.4,
        };
      });
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 20);
      mouseY.set(e.clientY - 20);
      setIsHovering(true);
      clearTimeout(hoverTimeout.current);
      hoverTimeout.current = setTimeout(() => {
        setIsHovering(false);
      }, 1500);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(hoverTimeout.current);
    };
  }, [mouseX, mouseY]);

  if (isHidden) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 3,
      }}
    >
      {skillsList.map((skill) => (
        <SwarmIcon
          key={skill.name}
          skill={skill}
          mouseX={mouseX}
          mouseY={mouseY}
          isHovering={isHovering}
          isDocked={isDocked}
          isHidden={isHidden}
        />
      ))}
    </div>
  );
};
