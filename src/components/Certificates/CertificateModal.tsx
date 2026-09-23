import React, { useEffect, useState } from "react";
import { X, ExternalLink, Download, ZoomIn, ZoomOut, Award, Calendar, CheckCircle2, ShieldCheck } from "lucide-react";
import type { CertificateItem } from "../../data/certificatesData";
import { c, serif, mono } from "../../data/portfolioData";

interface CertificateModalProps {
  certificate: CertificateItem | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ certificate, onClose }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    if (!certificate) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [certificate, onClose]);

  if (!certificate) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(30, 27, 21, 0.82)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(12px, 3vw, 24px) clamp(8px, 2vw, 16px)",
        overflowY: "auto",
        animation: "kkFadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      }}
    >
      <style>{`
        @keyframes kkFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes kkScaleUp {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .kk-modal-action-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 11.5px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
        }
        .kk-modal-action-btn:hover {
          transform: translateY(-1px);
        }
      `}</style>

      {/* Modal Dialog Content */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "linear-gradient(180deg, #FBF8F1 0%, #F4EFE3 100%)",
          border: "1px solid rgba(184, 90, 58, 0.3)",
          borderRadius: 20,
          maxWidth: 960,
          width: "100%",
          maxHeight: "92vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 30px 80px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.4) inset",
          overflow: "hidden",
          animation: "kkScaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        }}
      >
        {/* Header Bar */}
        <div
          style={{
            padding: "clamp(12px, 2.5vw, 16px) clamp(14px, 3vw, 24px)",
            borderBottom: `1px solid ${c.line}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "rgba(255, 255, 255, 0.5)",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "rgba(184, 90, 58, 0.12)",
                color: c.clay,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Award size={20} />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <span
                  style={{
                    ...mono,
                    fontSize: 10,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    padding: "2px 8px",
                    borderRadius: 4,
                    background: certificate.badgeType === "moss" ? "rgba(26, 56, 38, 0.1)" : "rgba(184, 90, 58, 0.12)",
                    color: certificate.badgeType === "moss" ? c.mossDeep : c.clay,
                    fontWeight: 600,
                  }}
                >
                  {certificate.badge}
                </span>
                {certificate.credentialId && (
                  <span style={{ ...mono, fontSize: 11, color: c.inkFaint }}>
                    ID: {certificate.credentialId}
                  </span>
                )}
              </div>
              <h3
                style={{
                  ...serif,
                  fontSize: "clamp(16px, 2.5vw, 20px)",
                  color: c.ink,
                  margin: "4px 0 0 0",
                  fontWeight: 600,
                }}
              >
                {certificate.title}
              </h3>
            </div>
          </div>

          {/* Action Buttons & Close */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button
              onClick={() => setIsZoomed(!isZoomed)}
              className="kk-modal-action-btn"
              style={{
                background: "rgba(42, 39, 30, 0.06)",
                color: c.ink,
                border: `1px solid ${c.line}`,
              }}
              title={isZoomed ? "Reset Zoom" : "Zoom In"}
            >
              {isZoomed ? <ZoomOut size={14} /> : <ZoomIn size={14} />}
              <span style={{ display: "none" }}>Zoom</span>
            </button>

            <a
              href={certificate.image}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="kk-modal-action-btn"
              style={{
                background: "rgba(42, 39, 30, 0.06)",
                color: c.ink,
                border: `1px solid ${c.line}`,
              }}
              title="Download Certificate Image"
            >
              <Download size={14} />
              <span>Save</span>
            </a>

            {certificate.verifyUrl && (
              <a
                href={certificate.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="kk-modal-action-btn"
                style={{
                  background: c.mossDeep,
                  color: c.paper,
                  border: "none",
                }}
              >
                <ShieldCheck size={14} />
                <span>Verify</span>
                <ExternalLink size={12} />
              </a>
            )}

            <button
              onClick={onClose}
              className="kk-modal-action-btn"
              style={{
                background: "rgba(42, 39, 30, 0.08)",
                color: c.ink,
                border: "none",
                padding: 8,
                borderRadius: "50%",
                marginLeft: 4,
              }}
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Certificate Image Viewer Container */}
        <div
          style={{
            flex: 1,
            padding: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(30, 27, 21, 0.04)",
            overflowY: isZoomed ? "auto" : "hidden",
            overflowX: isZoomed ? "auto" : "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "relative",
              maxWidth: isZoomed ? "140%" : "100%",
              transition: "transform 0.25s ease, max-width 0.25s ease",
              boxShadow: "0 16px 40px rgba(42, 39, 30, 0.18), 0 2px 8px rgba(42, 39, 30, 0.1)",
              borderRadius: 12,
              overflow: "hidden",
              border: "4px solid #FAF7EE",
              background: "#FAF7EE",
              cursor: isZoomed ? "zoom-out" : "zoom-in",
            }}
            onClick={() => setIsZoomed(!isZoomed)}
          >
            <img
              src={certificate.image}
              alt={certificate.title}
              style={{
                width: "100%",
                height: "auto",
                maxHeight: isZoomed ? "none" : "65vh",
                display: "block",
                objectFit: "contain",
              }}
            />
          </div>
        </div>

        {/* Footer Details */}
        <div
          style={{
            padding: "16px 24px",
            borderTop: `1px solid ${c.line}`,
            background: "rgba(255, 255, 255, 0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, ...mono, fontSize: 12, color: c.inkSoft }}>
              <Calendar size={13} color={c.clay} />
              {certificate.date}
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, ...mono, fontSize: 12, color: c.inkSoft }}>
              <CheckCircle2 size={13} color={c.mossDeep} />
              {certificate.issuer}
            </span>
          </div>

          {/* Skills pills */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {certificate.skills.slice(0, 4).map((skill) => (
              <span
                key={skill}
                style={{
                  ...mono,
                  fontSize: 11,
                  background: "rgba(42, 39, 30, 0.05)",
                  border: `1px solid ${c.line}`,
                  padding: "3px 8px",
                  borderRadius: 6,
                  color: c.inkSoft,
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
