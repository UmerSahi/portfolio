import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, GraduationCap, Calendar, Award, X, Sparkles, MapPin } from "lucide-react";
import { c, serif, mono, experienceMilestones } from "../../data/portfolioData";
import { SectionHead } from "../common/SectionHead";
import { Reveal } from "../common/Reveal";
import type { ExperienceMilestone } from "../../types/portfolio";

interface ChipRowProps {
  items: string[];
  bg: string;
  fg: string;
}

const ChipRow: React.FC<ChipRowProps> = ({ items, bg, fg }) => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 16 }}>
    {items.map((item) => (
      <span
        key={item}
        style={{
          ...mono,
          fontSize: 11,
          padding: "3px 8px",
          borderRadius: 4,
          background: bg,
          color: fg,
          border: `1px solid ${c.line}`,
        }}
      >
        {item}
      </span>
    ))}
  </div>
);

type FilterType = "all" | "work" | "education";

export const Experience: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>("all");
  const [activeCertificate, setActiveCertificate] = useState<
    "gold_medal" | "hec_hackathon" | "enablers" | null
  >(null);

  const filteredMilestones = experienceMilestones.filter((item) => {
    if (filter === "all") return true;
    if (filter === "work") return item.category === "work" || item.category === "internship";
    if (filter === "education") return item.category === "education";
    return true;
  });

  const getMilestoneTheme = (category: ExperienceMilestone["category"]) => {
    switch (category) {
      case "work":
        return {
          icon: <Briefcase size={20} strokeWidth={2} />,
          dotBg: c.mossDeep,
          badgeBg: c.mossDeep,
          badgeFg: c.paper,
          tagBg: "rgba(60,68,50,0.08)",
          tagFg: c.mossDeep,
          accent: c.mossDeep,
        };
      case "internship":
        return {
          icon: <Sparkles size={20} strokeWidth={2} />,
          dotBg: c.clay,
          badgeBg: c.clay,
          badgeFg: c.paper,
          tagBg: "rgba(164,89,47,0.08)",
          tagFg: c.clay,
          accent: c.clay,
        };
      case "education":
        return {
          icon: <GraduationCap size={22} strokeWidth={2} />,
          dotBg: c.gold,
          badgeBg: c.gold,
          badgeFg: c.paper,
          tagBg: "rgba(169,132,54,0.1)",
          tagFg: "#86631E",
          accent: c.gold,
        };
    }
  };

  return (
    <section id="experience" style={{ padding: "100px 0", position: "relative" }}>
      {/* Subtle backdrop overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: c.bgDeep,
          zIndex: 2,
          pointerEvents: "none",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      />

      <div style={{ position: "relative", zIndex: 10, maxWidth: 1080, margin: "0 auto", padding: "0 32px" }}>
        <SectionHead index="02" title="Career" em="road" />

        {/* Filter Navigation Tabs */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 12,
            marginTop: 32,
            marginBottom: 48,
            flexWrap: "wrap",
          }}
        >
          {[
            { id: "all" as const, label: `All Milestones (${experienceMilestones.length})` },
            {
              id: "work" as const,
              label: `Jobs & Internships (${
                experienceMilestones.filter((m) => m.category !== "education").length
              })`,
            },
            {
              id: "education" as const,
              label: `Education & Honors (${
                experienceMilestones.filter((m) => m.category === "education").length
              })`,
            },
          ].map((tab) => {
            const isActive = filter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                style={{
                  ...mono,
                  fontSize: 12,
                  padding: "8px 18px",
                  borderRadius: 24,
                  border: `1px solid ${isActive ? c.ink : c.line}`,
                  background: isActive ? c.ink : "rgba(244, 239, 225, 0.6)",
                  color: isActive ? c.paper : c.inkSoft,
                  cursor: "pointer",
                  fontWeight: 600,
                  letterSpacing: "0.5px",
                  transition: "all 0.2s ease",
                  boxShadow: isActive ? "0 4px 12px rgba(42,39,30,0.15)" : "none",
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div style={{ position: "relative", paddingBottom: 40 }}>
          {/* Asphalt Road Track with Yellow Dashed Centerline */}
          <div
            className="kk-road-track"
            style={{
              position: "absolute",
              left: 70,
              top: 0,
              bottom: 0,
              width: 24,
              background: "#32372A",
              transform: "translateX(-50%)",
              borderRadius: 12,
              border: `2px solid ${c.lineStrong}`,
              boxShadow: "inset 0 0 10px rgba(0,0,0,0.5)",
              overflow: "hidden",
              zIndex: 1,
            }}
          >
            <div
              style={{
                width: 0,
                height: "100%",
                borderLeft: "2px dashed #E3B448",
                margin: "0 auto",
                opacity: 0.95,
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 56, position: "relative" }}>
            {filteredMilestones.map((item, idx) => {
              const theme = getMilestoneTheme(item.category);

              return (
                <div
                  key={item.id}
                  className="kk-milestone-row"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "140px 1fr",
                    gap: 48,
                    position: "relative",
                  }}
                >
                  {/* Left Column: Icon Marker & Date Capsule */}
                  <div
                    className="kk-milestone-left"
                    style={{
                      position: "relative",
                      zIndex: 2,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      paddingTop: 20,
                    }}
                  >
                    <div
                      className="kk-milestone-dot"
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        background: theme.dotBg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: c.paper,
                        zIndex: 2,
                        boxShadow: `0 0 0 10px ${c.bg}`,
                        transition: "transform 0.2s ease",
                      }}
                    >
                      {theme.icon}
                    </div>

                    <div
                      className="kk-milestone-date"
                      style={{
                        textAlign: "center",
                        marginTop: 20,
                        background: c.paper,
                        padding: "8px 14px",
                        borderRadius: 16,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                        border: `1px solid ${c.line}`,
                        position: "relative",
                        zIndex: 5,
                        minWidth: 100,
                      }}
                    >
                      <div
                        style={{
                          ...mono,
                          fontSize: 10,
                          color: theme.accent,
                          fontWeight: 700,
                          letterSpacing: 1,
                          textTransform: "uppercase",
                          marginBottom: 2,
                        }}
                      >
                        {item.statusBadge}
                      </div>
                      <div style={{ ...serif, fontSize: 14, color: c.ink, fontWeight: 600 }}>
                        {item.period}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Milestone Content Card */}
                  <div className="kk-milestone-card-container">
                    <Reveal delay={idx * 0.05}>
                      <div
                        style={{
                          background: c.paper,
                          border: `1px solid ${c.line}`,
                          borderRadius: 16,
                          padding: 28,
                          boxShadow: "0 8px 30px rgba(42,39,30,0.06)",
                          position: "relative",
                          transition: "border-color 0.2s ease",
                        }}
                      >
                        {/* Header Badge & Meta */}
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            flexWrap: "wrap",
                            gap: 10,
                          }}
                        >
                          <span
                            style={{
                              background: theme.badgeBg,
                              color: theme.badgeFg,
                              fontSize: 10,
                              fontWeight: 600,
                              letterSpacing: 1.5,
                              ...mono,
                              padding: "4px 10px",
                              borderRadius: 4,
                              textTransform: "uppercase",
                            }}
                          >
                            {item.badge}
                          </span>

                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 12,
                              ...mono,
                              fontSize: 12,
                              color: c.inkFaint,
                            }}
                          >
                            <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                              <MapPin size={12} />
                              {item.location}
                            </span>
                            <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                              <Calendar size={12} />
                              {item.period}
                            </span>
                          </div>
                        </div>

                        {/* Title & Organization */}
                        <h3
                          style={{
                            ...serif,
                            fontSize: 22,
                            fontWeight: 600,
                            marginTop: 14,
                            marginBottom: 2,
                            color: c.ink,
                          }}
                        >
                          {item.title}
                        </h3>

                        <div
                          style={{
                            color: theme.accent,
                            fontWeight: 600,
                            marginBottom: 14,
                            fontSize: 14,
                            ...mono,
                          }}
                        >
                          {item.organization}
                        </div>

                        {/* Description */}
                        <p
                          style={{
                            color: c.inkSoft,
                            fontSize: 14.5,
                            lineHeight: 1.6,
                            marginTop: 0,
                            marginBottom: 16,
                          }}
                        >
                          {item.desc}
                        </p>

                        {/* Key Responsibilities / Achievements */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
                          {item.bullets.map((bullet, bIdx) => (
                            <div
                              key={bIdx}
                              style={{
                                display: "flex",
                                gap: 8,
                                fontSize: 13.5,
                                color: c.inkSoft,
                                lineHeight: 1.5,
                              }}
                            >
                              <span style={{ color: theme.accent, flexShrink: 0, marginTop: 1 }}>▸</span>
                              <span>{bullet}</span>
                            </div>
                          ))}
                        </div>

                        {/* Footer: Tags & Optional Certificate Button */}
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: 12,
                            paddingTop: 12,
                            borderTop: `1px solid rgba(42,39,30,0.08)`,
                          }}
                        >
                          <ChipRow items={item.tags} bg={theme.tagBg} fg={theme.tagFg} />

                          {item.certificateType && (
                            <button
                              onClick={() =>
                                setActiveCertificate(
                                  item.certificateType as "gold_medal" | "hec_hackathon" | "enablers"
                                )
                              }
                              style={{
                                background: c.gold,
                                color: c.paper,
                                border: "none",
                                borderRadius: 6,
                                padding: "8px 14px",
                                fontSize: 12,
                                ...mono,
                                cursor: "pointer",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 6,
                                boxShadow: "0 2px 8px rgba(169,132,54,0.3)",
                                transition: "all 0.2s ease",
                                marginTop: 10,
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = "#92712D";
                                e.currentTarget.style.transform = "translateY(-1px)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = c.gold;
                                e.currentTarget.style.transform = "none";
                              }}
                            >
                              <Award size={14} /> {item.certificateTitle || "View Certificate"}
                            </button>
                          )}
                        </div>
                      </div>
                    </Reveal>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Interactive Certificate Modals */}
      <AnimatePresence>
        {activeCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(42,39,30,0.65)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              zIndex: 1000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 24,
            }}
            onClick={() => setActiveCertificate(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              style={{
                background: "#FAF7F0",
                width: "100%",
                maxWidth: 780,
                borderRadius: 12,
                boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
                border: "16px solid #FAF7F0",
                position: "relative",
                cursor: "default",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                style={{
                  border: `2px solid ${c.gold}`,
                  padding: "32px 40px",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <button
                  onClick={() => setActiveCertificate(null)}
                  style={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: c.inkSoft,
                  }}
                >
                  <X size={20} />
                </button>

                <div
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    background: c.gold,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#FAF7F0",
                    marginBottom: 16,
                    boxShadow: "0 4px 10px rgba(169,132,54,0.3)",
                  }}
                >
                  <Award size={26} />
                </div>

                {activeCertificate === "gold_medal" && (
                  <>
                    <h4
                      style={{
                        ...mono,
                        fontSize: 12,
                        color: c.mossDeep,
                        letterSpacing: 3,
                        textTransform: "uppercase",
                        margin: 0,
                      }}
                    >
                      Khwaja Fareed University of Engineering & IT
                    </h4>

                    <h2
                      style={{
                        ...serif,
                        fontSize: 28,
                        fontStyle: "italic",
                        color: c.ink,
                        margin: "10px 0 20px 0",
                        fontWeight: 500,
                      }}
                    >
                      Certificate of Academic Distinction & Gold Medal
                    </h2>

                    <p
                      style={{
                        ...mono,
                        fontSize: 11,
                        color: c.inkFaint,
                        textTransform: "uppercase",
                        letterSpacing: 1.5,
                        margin: 0,
                      }}
                    >
                      This is proudly conferred upon
                    </p>

                    <h1
                      style={{
                        ...serif,
                        fontSize: 36,
                        color: c.clay,
                        margin: "12px 0 16px 0",
                        fontWeight: 600,
                      }}
                    >
                      Muhammad Umer Sahi
                    </h1>

                    <p
                      style={{
                        color: c.inkSoft,
                        fontSize: 14.5,
                        lineHeight: 1.7,
                        maxWidth: 540,
                        margin: "0 auto 28px",
                      }}
                    >
                      For extraordinary academic distinction, dedication, and securing{" "}
                      <strong style={{ color: c.ink }}>1st Position (Gold Medalist)</strong> in Bachelor of
                      Science in Computer Science.
                    </p>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 80,
                        width: "100%",
                        maxWidth: 480,
                        marginTop: 12,
                        borderTop: `1px solid ${c.line}`,
                        paddingTop: 18,
                      }}
                    >
                      <div>
                        <div
                          style={{
                            ...serif,
                            fontStyle: "italic",
                            fontSize: 16,
                            color: c.ink,
                            height: 26,
                          }}
                        >
                          Faculty Dean
                        </div>
                        <div
                          style={{
                            ...mono,
                            fontSize: 10,
                            color: c.inkFaint,
                            textTransform: "uppercase",
                            letterSpacing: 1,
                            marginTop: 4,
                          }}
                        >
                          Academic Affairs, KFUEIT
                        </div>
                      </div>

                      <div>
                        <div
                          style={{
                            ...serif,
                            fontStyle: "italic",
                            fontSize: 16,
                            color: c.ink,
                            height: 26,
                          }}
                        >
                          Controller of Examinations
                        </div>
                        <div
                          style={{
                            ...mono,
                            fontSize: 10,
                            color: c.inkFaint,
                            textTransform: "uppercase",
                            letterSpacing: 1,
                            marginTop: 4,
                          }}
                        >
                          KFUEIT University
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {activeCertificate === "enablers" && (
                  <>
                    <h4
                      style={{
                        ...mono,
                        fontSize: 12,
                        color: c.clay,
                        letterSpacing: 3,
                        textTransform: "uppercase",
                        margin: 0,
                      }}
                    >
                      Enablers Training Network
                    </h4>

                    <h2
                      style={{
                        ...serif,
                        fontSize: 28,
                        fontStyle: "italic",
                        color: c.ink,
                        margin: "10px 0 20px 0",
                        fontWeight: 500,
                      }}
                    >
                      Certificate of Completion — WORC Program
                    </h2>

                    <p
                      style={{
                        ...mono,
                        fontSize: 11,
                        color: c.inkFaint,
                        textTransform: "uppercase",
                        letterSpacing: 1.5,
                        margin: 0,
                      }}
                    >
                      Awarded to
                    </p>

                    <h1
                      style={{
                        ...serif,
                        fontSize: 36,
                        color: c.mossDeep,
                        margin: "12px 0 16px 0",
                        fontWeight: 600,
                      }}
                    >
                      Muhammad Umer Sahi
                    </h1>

                    <p
                      style={{
                        color: c.inkSoft,
                        fontSize: 14.5,
                        lineHeight: 1.7,
                        maxWidth: 540,
                        margin: "0 auto 28px",
                      }}
                    >
                      In recognition of successful completion of the intensive{" "}
                      <strong style={{ color: c.ink }}>
                        Work Online & Real-World Commerce (WORC)
                      </strong>{" "}
                      Training Program, mastering e-commerce analytics, marketplace keyword intelligence, and
                      global store operations.
                    </p>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                        maxWidth: 480,
                        marginTop: 12,
                        borderTop: `1px solid ${c.line}`,
                        paddingTop: 18,
                      }}
                    >
                      <div>
                        <div
                          style={{
                            ...serif,
                            fontStyle: "italic",
                            fontSize: 16,
                            color: c.ink,
                            height: 26,
                          }}
                        >
                          Executive Director
                        </div>
                        <div
                          style={{
                            ...mono,
                            fontSize: 10,
                            color: c.inkFaint,
                            textTransform: "uppercase",
                            letterSpacing: 1,
                            marginTop: 4,
                          }}
                        >
                          Enablers Global Education
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 800px) {
          .kk-road-track {
            left: 40px !important;
          }
          .kk-milestone-row {
            grid-template-columns: 80px 1fr !important;
            gap: 16px !important;
          }
          .kk-milestone-left {
            padding-top: 10px !important;
          }
          .kk-milestone-dot {
            width: 36px !important;
            height: 36px !important;
            box-shadow: 0 0 0 6px #FAF7F0 !important;
          }
          .kk-milestone-dot svg {
            width: 16px !important;
            height: 16px !important;
          }
          .kk-milestone-date {
            margin-top: 16px !important;
            padding: 6px 10px !important;
            min-width: 70px !important;
          }
          .kk-milestone-date > div:first-child {
            font-size: 8.5px !important;
          }
          .kk-milestone-date > div:last-child {
            font-size: 12px !important;
          }
          .kk-milestone-card-container {
            width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
};
