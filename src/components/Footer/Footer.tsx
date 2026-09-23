import React from "react";
import { motion } from "framer-motion";
import { c, mono } from "../../data/portfolioData";

export const Footer: React.FC = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ borderTop: `1px solid ${c.line}`, padding: "28px 0" }}
    >
      <div
        style={{
          maxWidth: 1080,
          margin: "0 auto",
          padding: "0 clamp(14px, 3.5vw, 32px)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
          ...mono,
          fontSize: 12,
          color: c.inkFaint,
        }}
      >
        <span>© 2026 Muhammad Umer Sahi</span>
        <span>Built with intent, not templates.</span>
      </div>
    </motion.footer>
  );
};
