import React from "react";
import { c, serif, mono } from "../../data/portfolioData";

interface SectionHeadProps {
  index: string;
  title: string;
  em: string;
}

export const SectionHead: React.FC<SectionHeadProps> = ({ index, title, em }) => {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 20, marginBottom: 56 }}>
      <span style={{ ...mono, fontSize: 13, color: c.clay, fontWeight: 600 }}>{index}</span>
      <h2 style={{ ...serif, fontWeight: 500, fontSize: "clamp(28px, 4vw, 38px)", color: c.ink, margin: 0 }}>
        {title}{" "}
        <em style={{ fontStyle: "italic", fontWeight: 400, color: c.mossDeep }}>{em}</em>
      </h2>
      <div style={{ flex: 1, height: 1, background: c.line }} />
    </div>
  );
};
