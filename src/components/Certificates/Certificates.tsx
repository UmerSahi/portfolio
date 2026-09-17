import React, { useState, useRef } from "react";
import { Eye, ExternalLink, ShieldCheck, Award, Calendar, ChevronUp, ChevronDown, Sparkles } from "lucide-react";
import { ScrollStack, ScrollStackItem } from "./ScrollStack";
import { CertificateModal } from "./CertificateModal";
import { certificatesData, type CertificateItem } from "../../data/certificatesData";
import { SectionHead } from "../common/SectionHead";
import { c, serif, mono } from "../../data/portfolioData";

export const Certificates: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollNext = () => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollBy({ top: 400, behavior: "smooth" });
    }
  };

  const scrollPrev = () => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollBy({ top: -400, behavior: "smooth" });
    }
  };

  return (
    <section
      id="certificates"
      style={{
        padding: "100px 0 60px",
        position: "relative",
      }}
    >
      {/* Background Ambience Layer */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 15% 25%, rgba(184, 90, 58, 0.05) 0%, transparent 55%), radial-gradient(circle at 85% 75%, rgba(26, 56, 38, 0.04) 0%, transparent 60%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 5,
          maxWidth: 1080,
          margin: "0 auto",
          padding: "0 32px",
          width: "100%",
        }}
      >
        {/* Section Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 24,
            marginBottom: 32,
          }}
        >
          <div>
            <SectionHead index="06" title="Honors &" em="Certifications" />
            <p
              style={{
                color: c.inkSoft,
                fontSize: "clamp(14px, 1.6vw, 16px)",
                marginTop: 12,
                maxWidth: 620,
                lineHeight: 1.6,
              }}
            >
              A documented timeline of university distinctions, national AI hackathon accolades, and
              certified masteries in stateful multi-agent systems and deep learning.
            </p>
          </div>

          {/* Stacking Controls & Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 14px",
                background: "rgba(255, 255, 255, 0.65)",
                border: `1px solid ${c.line}`,
                borderRadius: 999,
                boxShadow: "0 2px 8px rgba(42, 39, 30, 0.04)",
              }}
            >
              <Sparkles size={14} color={c.clay} />
              <span
                style={{
                  ...mono,
                  fontSize: 11,
                  color: c.ink,
                  fontWeight: 600,
                  letterSpacing: 0.5,
                  textTransform: "uppercase",
                }}
              >
                {certificatesData.length} Credentials Issued
              </span>
            </div>

            {/* Stepper buttons */}
            <div style={{ display: "flex", gap: 4 }}>
              <button
                onClick={scrollPrev}
                aria-label="Previous Certificate"
                title="Scroll to previous certificate"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  border: `1px solid ${c.line}`,
                  background: "rgba(255, 255, 255, 0.7)",
                  color: c.ink,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = c.paper;
                  e.currentTarget.style.borderColor = c.clay;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.7)";
                  e.currentTarget.style.borderColor = c.line;
                }}
              >
                <ChevronUp size={16} />
              </button>
              <button
                onClick={scrollNext}
                aria-label="Next Certificate"
                title="Scroll to next certificate"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  border: `1px solid ${c.line}`,
                  background: "rgba(255, 255, 255, 0.7)",
                  color: c.ink,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = c.paper;
                  e.currentTarget.style.borderColor = c.clay;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.7)";
                  e.currentTarget.style.borderColor = c.line;
                }}
              >
                <ChevronDown size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* ScrollStack Container */}
        <div
          style={{
            position: "relative",
            height: "690px",
            maxHeight: "86vh",
            borderRadius: 28,
            border: `1px solid rgba(184, 90, 58, 0.22)`,
            background: "rgba(244, 239, 225, 0.45)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            boxShadow:
              "0 24px 60px -20px rgba(42, 39, 30, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
            overflow: "hidden",
          }}
        >
          {/* Subtle scroll guide indicator on top-right */}
          <div
            style={{
              position: "absolute",
              top: 14,
              right: 20,
              zIndex: 20,
              display: "flex",
              alignItems: "center",
              gap: 8,
              pointerEvents: "none",
              background: "rgba(251, 248, 241, 0.88)",
              backdropFilter: "blur(8px)",
              padding: "4px 12px",
              borderRadius: 999,
              border: `1px solid ${c.line}`,
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: c.clay,
                boxShadow: "0 0 8px rgba(184, 90, 58, 0.8)",
              }}
            />
            <span
              style={{
                ...mono,
                fontSize: 10,
                color: c.inkSoft,
                letterSpacing: 0.5,
                textTransform: "uppercase",
              }}
            >
              Scroll to unveil stack
            </span>
          </div>

          <ScrollStack
            scrollerRefOut={scrollerRef}
            itemDistance={65}
            itemStackDistance={9}
            stackPosition="16px"
            scaleEndPosition="8px"
            baseScale={0.88}
            itemScale={0.009}
            rotationAmount={0.35}
            blurAmount={0}
            useWindowScroll={false}
          >
            {certificatesData.map((cert, index) => {
              const isGold = cert.badgeType === "gold";
              const isMoss = cert.badgeType === "moss";
              const accentColor = isGold ? "#C97A3E" : isMoss ? c.mossDeep : c.clay;
              const badgeBg = isGold
                ? "rgba(201, 122, 62, 0.12)"
                : isMoss
                ? "rgba(26, 56, 38, 0.1)"
                : "rgba(184, 90, 58, 0.12)";

              return (
                <ScrollStackItem
                  key={cert.id}
                  style={{
                    background: cert.cardTheme?.bg || "linear-gradient(135deg, #FAF7EE 0%, #F5EFE1 100%)",
                    border: `1px solid ${cert.cardTheme?.border || "rgba(184, 90, 58, 0.28)"}`,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      justifyContent: "space-between",
                      gap: 16,
                    }}
                  >
                    {/* Top Metadata Row */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: 10,
                        paddingBottom: 10,
                        borderBottom: `1px solid ${c.line}`,
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                        <span
                          style={{
                            ...mono,
                            fontSize: 10.5,
                            fontWeight: 700,
                            letterSpacing: 0.7,
                            textTransform: "uppercase",
                            padding: "3px 8px",
                            borderRadius: 6,
                            background: badgeBg,
                            color: accentColor,
                            border: `1px solid ${accentColor}33`,
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 5,
                          }}
                        >
                          <Award size={12} />
                          {cert.badge}
                        </span>

                        {cert.credentialId && (
                          <span
                            style={{
                              ...mono,
                              fontSize: 10.5,
                              color: c.inkFaint,
                              padding: "2px 6px",
                              borderRadius: 4,
                              background: "rgba(42, 39, 30, 0.04)",
                            }}
                          >
                            ID: {cert.credentialId}
                          </span>
                        )}
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span
                          style={{
                            ...mono,
                            fontSize: 10.5,
                            color: c.inkSoft,
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 5,
                          }}
                        >
                          <Calendar size={12} color={c.clay} />
                          {cert.date}
                        </span>
                        <span
                          style={{
                            ...mono,
                            fontSize: 10.5,
                            color: c.inkFaint,
                            fontWeight: 600,
                          }}
                        >
                          {String(index + 1).padStart(2, "0")} / {String(certificatesData.length).padStart(2, "0")}
                        </span>
                      </div>
                    </div>

                    {/* Main Content: 2-Column Grid */}
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1.2fr 0.8fr",
                        gap: 24,
                        alignItems: "center",
                      }}
                      className="kk-cert-card-grid"
                    >
                      {/* Left: Text, narrative, skills, and CTA buttons */}
                      <div>
                        <div
                          style={{
                            ...mono,
                            fontSize: 11,
                            color: c.clay,
                            textTransform: "uppercase",
                            letterSpacing: 1.1,
                            marginBottom: 4,
                            fontWeight: 600,
                          }}
                        >
                          {cert.issuer}
                        </div>

                        <h3
                          style={{
                            ...serif,
                            fontSize: "clamp(16px, 1.7vw, 20px)",
                            color: c.ink,
                            fontWeight: 600,
                            lineHeight: 1.25,
                            margin: "0 0 8px 0",
                          }}
                        >
                          {cert.title}
                        </h3>

                        <p
                          style={{
                            fontSize: "12.5px",
                            color: c.inkSoft,
                            lineHeight: 1.5,
                            margin: "0 0 12px 0",
                          }}
                        >
                          {cert.description}
                        </p>

                        {/* Skills Chips */}
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 5,
                            marginBottom: 16,
                          }}
                        >
                          {cert.skills.map((skill) => (
                            <span
                              key={skill}
                              style={{
                                ...mono,
                                fontSize: 10,
                                padding: "2.5px 7px",
                                borderRadius: 5,
                                background: "rgba(255, 255, 255, 0.75)",
                                border: `1px solid ${c.line}`,
                                color: c.ink,
                                boxShadow: "0 1px 2px rgba(42, 39, 30, 0.04)",
                              }}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>

                        {/* Action Buttons Row */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            flexWrap: "wrap",
                          }}
                        >
                          <button
                            onClick={() => setSelectedCert(cert)}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 6,
                              padding: "8px 16px",
                              borderRadius: 7,
                              background: c.mossDeep,
                              color: c.paper,
                              border: "none",
                              fontSize: 11,
                              fontWeight: 600,
                              letterSpacing: 0.7,
                              textTransform: "uppercase",
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                              boxShadow: "0 3px 10px rgba(26, 56, 38, 0.2)",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = c.clay;
                              e.currentTarget.style.transform = "translateY(-1px)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = c.mossDeep;
                              e.currentTarget.style.transform = "translateY(0)";
                            }}
                          >
                            <Eye size={13} />
                            <span>View Certificate</span>
                          </button>

                          {cert.verifyUrl && (
                            <a
                              href={cert.verifyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 5,
                                padding: "8px 13px",
                                borderRadius: 7,
                                background: "rgba(42, 39, 30, 0.05)",
                                color: c.ink,
                                border: `1px solid ${c.line}`,
                                fontSize: 11,
                                fontWeight: 500,
                                textDecoration: "none",
                                transition: "all 0.2s ease",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = "rgba(42, 39, 30, 0.1)";
                                e.currentTarget.style.borderColor = c.clay;
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = "rgba(42, 39, 30, 0.05)";
                                e.currentTarget.style.borderColor = c.line;
                              }}
                            >
                              <ShieldCheck size={13} color={c.mossDeep} />
                              <span>Verify</span>
                              <ExternalLink size={11} color={c.inkSoft} />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Right: Certificate Luxury Preview Frame */}
                      <div
                        onClick={() => setSelectedCert(cert)}
                        style={{
                          position: "relative",
                          borderRadius: 10,
                          overflow: "hidden",
                          border: "4px solid #FAF7EE",
                          boxShadow:
                            "0 12px 28px -8px rgba(42, 39, 30, 0.2), 0 0 0 1px rgba(184, 90, 58, 0.2)",
                          background: cert.id === "lablab-ai-minddash" ? "#060B18" : "#FAF7EE",
                          cursor: "pointer",
                          transition: "transform 0.28s ease, box-shadow 0.28s ease",
                          aspectRatio: "1.414 / 1",
                          maxHeight: "195px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        className="kk-cert-preview-card"
                      >
                        <img
                          src={cert.image}
                          alt={cert.title}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit:
                              cert.id === "lablab-ai-minddash" || cert.id === "tjp-web-developer"
                                ? "contain"
                                : "cover",
                            display: "block",
                            transition: "transform 0.35s ease",
                          }}
                        />

                        {/* Hover Overlay with Inspection prompt */}
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            background:
                              "linear-gradient(to top, rgba(30, 27, 21, 0.8) 0%, rgba(30, 27, 21, 0.25) 60%, transparent 100%)",
                            opacity: 0,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 8,
                            color: c.paper,
                            transition: "opacity 0.25s ease",
                          }}
                          className="kk-cert-hover-overlay"
                        >
                          <div
                            style={{
                              width: 42,
                              height: 42,
                              borderRadius: "50%",
                              background: "rgba(255, 255, 255, 0.2)",
                              backdropFilter: "blur(6px)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              border: "1px solid rgba(255, 255, 255, 0.4)",
                            }}
                          >
                            <Eye size={20} />
                          </div>
                          <span
                            style={{
                              ...mono,
                              fontSize: 11,
                              fontWeight: 600,
                              letterSpacing: 1,
                              textTransform: "uppercase",
                            }}
                          >
                            Click to Inspect
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollStackItem>
              );
            })}
          </ScrollStack>
        </div>
      </div>

      {/* Global CSS for hover effects and responsiveness */}
      <style>{`
        .kk-cert-preview-card:hover {
          transform: translateY(-3px) scale(1.01);
          box-shadow: 0 22px 48px -12px rgba(42, 39, 30, 0.3), 0 0 0 1px rgba(184, 90, 58, 0.35);
        }
        .kk-cert-preview-card:hover .kk-cert-hover-overlay {
          opacity: 1;
        }
        .kk-cert-preview-card:hover img {
          transform: scale(1.03);
        }

        @media (max-width: 860px) {
          .kk-cert-card-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
      `}</style>

      {/* Lightbox Pop-up Modal */}
      <CertificateModal
        certificate={selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </section>
  );
};

export default Certificates;
