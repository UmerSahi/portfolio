import React from "react";
import { ArrowUpRight } from "lucide-react";
import { c, serif, mono } from "../../data/portfolioData";
import { SectionHead } from "../common/SectionHead";
import { Reveal } from "../common/Reveal";

export const About: React.FC = () => {
  return (
    <section id="about" style={{ padding: "100px 0" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 32px" }}>
        <SectionHead index="01" title="About" em="me" />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: 64,
            position: "relative",
            zIndex: 10,
          }}
          className="kk-grid-collapse"
        >
          {/* Left Column Story */}
          <Reveal style={{ display: "flex", flexDirection: "column", gap: 32, justifyContent: "center" }}>
            <p
              style={{
                margin: 0,
                fontSize: 24,
                lineHeight: 1.5,
                color: c.ink,
                fontWeight: 500,
                letterSpacing: "-0.01em",
              }}
            >
              I'm a{" "}
              <span style={{ color: c.mossDeep, fontStyle: "italic", ...serif }}>
                Computer Science Gold Medalist
              </span>{" "}
              specializing in computer vision, generative AI, and full-stack systems.
            </p>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.7, color: c.inkSoft }}>
              My work spans from training deep convolutional networks for medical image analysis to orchestrating RAG-based multi-agent intelligence systems. I focus on developing explainable, production-ready AI pipelines that solve real-world problems.
            </p>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.7, color: c.inkSoft }}>
              Graduated <strong>1st in my cohort</strong> at Khwaja Fareed UEIT and awarded <strong>Top Performer (97.20%)</strong> at the National HEC Generative AI Training Hackathon.
            </p>
          </Reveal>

          {/* Right Column Cards */}
          <Reveal delay={0.1} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, alignContent: "center" }}>
            {/* Top Span Card: Academic & Hackathon Honors */}
            <div
              style={{
                gridColumn: "1 / -1",
                background: "rgba(255,255,255,0.4)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: `1px solid ${c.line}`,
                borderRadius: 24,
                padding: 32,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{ position: "relative", zIndex: 2 }}>
                <span
                  style={{
                    ...mono,
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: 1.5,
                    color: c.mossDeep,
                    fontWeight: 600,
                  }}
                >
                  Honors & Distinction
                </span>
                <h4
                  style={{
                    ...serif,
                    fontSize: 44,
                    fontWeight: 600,
                    color: c.ink,
                    margin: "8px 0 4px 0",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Gold Medalist
                </h4>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                    gap: 16,
                    flexWrap: "wrap",
                    marginTop: 4,
                  }}
                >
                  <p style={{ color: c.inkSoft, fontSize: 14, margin: 0, maxWidth: 240 }}>
                    Ranked 1st in Cohort & 97.2% HEC Hackathon Top Performer.
                  </p>
                  <a
                    href="https://github.com/UmerSahi"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: c.ink,
                      color: c.paper,
                      padding: "10px 20px",
                      borderRadius: 30,
                      textDecoration: "none",
                      fontSize: 13,
                      fontWeight: 500,
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.background = "#000";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "none";
                      e.currentTarget.style.background = c.ink;
                    }}
                  >
                    View GitHub <ArrowUpRight size={15} />
                  </a>
                </div>
              </div>
              <div
                style={{
                  position: "absolute",
                  right: -10,
                  bottom: -35,
                  fontSize: 110,
                  opacity: 0.04,
                  ...serif,
                  fontWeight: 800,
                  userSelect: "none",
                  pointerEvents: "none",
                }}
              >
                AI
              </div>
            </div>

            {/* Bottom Card 1: Education */}
            <div
              style={{
                background: "rgba(255,255,255,0.4)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: `1px solid ${c.line}`,
                borderRadius: 24,
                padding: 24,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <span
                  style={{
                    ...mono,
                    fontSize: 10,
                    textTransform: "uppercase",
                    letterSpacing: 1.5,
                    color: c.gold,
                    fontWeight: 600,
                  }}
                >
                  Education
                </span>
                <h4
                  style={{
                    fontSize: 19,
                    fontWeight: 600,
                    color: c.ink,
                    margin: "12px 0 4px 0",
                    letterSpacing: "-0.01em",
                  }}
                >
                  B.S. Computer Science
                </h4>
                <p style={{ color: c.inkSoft, fontSize: 13, margin: 0, lineHeight: 1.5 }}>
                  KFUEIT (2021–2025) <br />
                  Gold Medalist · Rank 1
                </p>
              </div>
            </div>

            {/* Bottom Card 2: Experience */}
            <div
              style={{
                background: "rgba(255,255,255,0.4)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: `1px solid ${c.line}`,
                borderRadius: 24,
                padding: 24,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <span
                  style={{
                    ...mono,
                    fontSize: 10,
                    textTransform: "uppercase",
                    letterSpacing: 1.5,
                    color: c.clay,
                    fontWeight: 600,
                  }}
                >
                  Experience
                </span>
                <h4
                  style={{
                    fontSize: 19,
                    fontWeight: 600,
                    color: c.ink,
                    margin: "12px 0 4px 0",
                    letterSpacing: "-0.01em",
                  }}
                >
                  AI & Web Engineering
                </h4>
                <p style={{ color: c.inkSoft, fontSize: 13, margin: 0, lineHeight: 1.5 }}>
                  Netixsol (CM IT Intern) <br />
                  The Journal Post (Web Dev)
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
