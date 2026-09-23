import React from "react";
import { motion } from "framer-motion";
import { c, serif, mono } from "../../data/portfolioData";

interface SectionHeadProps {
  index: string;
  title: string;
  em: string;
}

export const SectionHead: React.FC<SectionHeadProps> = ({ index, title, em }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: "flex",
        alignItems: "baseline",
        gap: "clamp(10px, 2.5vw, 20px)",
        marginBottom: "clamp(28px, 5vw, 56px)",
      }}
    >
      <motion.span
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
        style={{ ...mono, fontSize: "clamp(11px, 1.2vw, 13px)", color: c.clay, fontWeight: 600 }}
      >
        {index}
      </motion.span>
      <h2
        style={{
          ...serif,
          fontWeight: 500,
          fontSize: "clamp(26px, 4vw, 38px)",
          color: c.ink,
          margin: 0,
          whiteSpace: "nowrap",
        }}
      >
        {title}{" "}
        <em style={{ fontStyle: "italic", fontWeight: 400, color: c.mossDeep }}>{em}</em>
      </h2>
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          flex: 1,
          height: 1,
          background: c.line,
          minWidth: 20,
          transformOrigin: "left",
        }}
      />
    </motion.div>
  );
};
