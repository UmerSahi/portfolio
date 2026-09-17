import React from "react";
import { c, mono } from "../../data/portfolioData";

export const Footer: React.FC = () => {
  return (
    <footer style={{ borderTop: `1px solid ${c.line}`, padding: "28px 0" }}>
      <div
        style={{
          maxWidth: 1080,
          margin: "0 auto",
          padding: "0 32px",
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
    </footer>
  );
};
