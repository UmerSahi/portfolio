import React, { useState } from "react";
import {
  Mail,
  Send,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  RotateCcw,
} from "lucide-react";
import confetti from "canvas-confetti";
import { c, serif, mono } from "../../data/portfolioData";
import { SectionHead } from "../common/SectionHead";
import { Reveal } from "../common/Reveal";
import { GlassIcons, type GlassIconItem } from "../GlassIcons/GlassIcons";

const INQUIRY_TYPES = [
  "AI & ML Systems",
  "Full-Stack Web",
  "Job Opportunity",
  "Consulting / Other",
];

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    inquiryType: "AI & ML Systems",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const contactIcons: GlassIconItem[] = [
    {
      label: "Email",
      color: "mail",
      href: "mailto:umersahi5p@gmail.com",
      icon: <Mail size={22} strokeWidth={2.2} />,
    },
    {
      label: "WhatsApp",
      color: "whatsapp",
      href: "https://wa.me/923030672672",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24M8.53 7.33c-.16 0-.42.06-.64.3-.22.24-.85.83-.85 2.02s.87 2.35.99 2.51c.12.16 1.7 2.6 4.12 3.65.58.25 1.02.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.47-.29s-1.44-.71-1.66-.79c-.22-.08-.38-.12-.55.12s-.64.79-.79.95c-.14.16-.29.18-.54.06s-1.05-.39-2-1.23c-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43s.16-.25.25-.41c.08-.16.04-.31-.02-.43s-.55-1.33-.76-1.82c-.2-.48-.41-.42-.56-.43h-.48z" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      color: "linkedin",
      href: "https://www.linkedin.com/in/umer-sahi-b3bb19348/",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      label: "GitHub",
      color: "github",
      href: "https://github.com/UmerSahi",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      ),
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!formData.name.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMessage("Please provide a valid email address.");
      return;
    }
    if (!formData.message.trim() || formData.message.trim().length < 8) {
      setErrorMessage("Please write a message with at least 8 characters.");
      return;
    }

    setIsSubmitting(true);

    try {
      const formPayload = new FormData();
      formPayload.append("access_key", "5b184e17-a324-477b-9514-d49008c7c1d9");
      formPayload.append("name", formData.name.trim());
      formPayload.append("email", formData.email.trim());
      formPayload.append(
        "subject",
        formData.subject.trim()
          ? `[${formData.inquiryType}] ${formData.subject.trim()}`
          : `[${formData.inquiryType}] Portfolio Contact from ${formData.name.trim()}`
      );
      formPayload.append("inquiry_type", formData.inquiryType);
      formPayload.append("message", formData.message.trim());
      formPayload.append("from_name", formData.name.trim());

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formPayload,
      });

      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
        // Trigger celebratory confetti burst
        confetti({
          particleCount: 80,
          spread: 75,
          origin: { y: 0.65 },
          colors: [c.clay, c.moss, c.gold],
        });
      } else {
        setErrorMessage(data.message || "Failed to dispatch message. Please try again.");
      }
    } catch {
      setErrorMessage("Network error connecting to email service. Please try again or reach out via direct email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: "",
      email: "",
      inquiryType: "AI & ML Systems",
      subject: "",
      message: "",
    });
    setErrorMessage(null);
  };

  const mailtoHref = `mailto:umersahi5p@gmail.com?subject=${encodeURIComponent(
    `[${formData.inquiryType}] ${formData.subject || "Portfolio Inquiry"}`
  )}&body=${encodeURIComponent(
    `Hello Umer,\n\n${formData.message}\n\nFrom: ${formData.name} (${formData.email})`
  )}`;

  return (
    <section
      id="contact"
      style={{
        padding: "clamp(60px, 10vh, 100px) 0 clamp(50px, 8vh, 80px)",
        background: c.bgDeep,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        position: "relative",
      }}
    >
      <style>{`
        .kk-contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          gap: 48px;
          align-items: start;
          margin-top: 36px;
        }

        .kk-form-input {
          width: 100%;
          padding: 12px 14px;
          border-radius: 8px;
          border: 1px solid ${c.line};
          background: rgba(255, 255, 255, 0.75);
          color: ${c.ink};
          font-family: inherit;
          font-size: 13.5px;
          transition: all 0.2s ease;
          box-sizing: border-box;
        }

        .kk-form-input:focus {
          outline: none;
          border-color: ${c.clay};
          background: #FFFFFF;
          box-shadow: 0 0 0 3px rgba(164, 89, 47, 0.15);
        }

        .kk-form-input::placeholder {
          color: ${c.inkFaint};
        }

        .kk-topic-pill {
          padding: 6px 12px;
          border-radius: 999px;
          font-size: 11.5px;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 1px solid ${c.line};
          background: rgba(255, 255, 255, 0.5);
          color: ${c.inkSoft};
          font-weight: 500;
        }

        .kk-topic-pill:hover {
          background: rgba(255, 255, 255, 0.85);
          border-color: ${c.clay};
          color: ${c.ink};
        }

        .kk-topic-pill.active {
          background: ${c.mossDeep};
          color: ${c.paper};
          border-color: ${c.mossDeep};
          box-shadow: 0 2px 6px rgba(60, 68, 50, 0.25);
        }

        .kk-submit-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 13px 24px;
          border-radius: 8px;
          background: ${c.mossDeep};
          color: ${c.paper};
          border: none;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 4px 14px rgba(26, 56, 38, 0.25);
        }

        .kk-submit-btn:hover:not(:disabled) {
          background: ${c.clay};
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(164, 89, 47, 0.3);
        }

        .kk-submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        @keyframes kkSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @media (max-width: 900px) {
          .kk-contact-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        @media (max-width: 600px) {
          .kk-input-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 clamp(14px, 3.5vw, 32px)" }}>
        <SectionHead index="08" title="Let's" em="talk" />

        <div className="kk-contact-grid">
          {/* Left Column: Editorial intro, availability badge, quick details, social icons */}
          <Reveal>
            <div>
              <p
                style={{
                  ...serif,
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "clamp(28px, 4vw, 44px)",
                  maxWidth: 480,
                  lineHeight: 1.15,
                  color: c.ink,
                  margin: 0,
                }}
              >
                Building something with Agentic AI, Computer Vision, or intelligent full-stack systems?
              </p>

              <p
                style={{
                  color: c.inkSoft,
                  fontSize: 15,
                  marginTop: 18,
                  maxWidth: 460,
                  lineHeight: 1.65,
                }}
              >
                Currently open to AI/ML engineering, Computer Vision research, and full-stack software development roles, contracts, or technical collaborations.
              </p>

              {/* Glass Icons Social Connect */}
              <div style={{ marginTop: 36 }}>
                <div
                  style={{
                    ...mono,
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    color: c.inkFaint,
                    marginBottom: 12,
                  }}
                >
                  Social Networks & Channels
                </div>
                <GlassIcons items={contactIcons} />
              </div>
            </div>
          </Reveal>

          {/* Right Column: High-End Contact Form */}
          <Reveal delay={0.15}>
            <div
              style={{
                background: "linear-gradient(135deg, rgba(251, 248, 241, 0.95) 0%, rgba(244, 239, 225, 0.88) 100%)",
                border: "1px solid rgba(184, 90, 58, 0.25)",
                borderRadius: 22,
                padding: "32px 32px 28px",
                boxShadow:
                  "0 20px 48px -12px rgba(42, 39, 30, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.8) inset",
                position: "relative",
              }}
            >
              {!submitted ? (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  {/* Form Header */}
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 6,
                      }}
                    >
                      <h3
                        style={{
                          ...serif,
                          fontSize: 24,
                          fontWeight: 600,
                          color: c.ink,
                          margin: 0,
                        }}
                      >
                        Send a Message
                      </h3>
                      <span
                        style={{
                          ...mono,
                          fontSize: 10.5,
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: 0.8,
                          color: c.clay,
                          background: "rgba(164, 89, 47, 0.1)",
                          padding: "3px 8px",
                          borderRadius: 4,
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <Sparkles size={11} />
                        Direct Dispatch
                      </span>
                    </div>
                    <p style={{ fontSize: 13, color: c.inkSoft, margin: 0, lineHeight: 1.5 }}>
                      Drop a line to discuss engineering roles, project architectures, or research partnerships.
                    </p>
                  </div>

                  {/* Inquiry Topic Selection */}
                  <div>
                    <label
                      style={{
                        display: "block",
                        ...mono,
                        fontSize: 11,
                        textTransform: "uppercase",
                        letterSpacing: 0.8,
                        color: c.inkSoft,
                        marginBottom: 8,
                        fontWeight: 600,
                      }}
                    >
                      Inquiry Subject
                    </label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {INQUIRY_TYPES.map((type) => (
                        <button
                          key={type}
                          type="button"
                          className={`kk-topic-pill ${formData.inquiryType === type ? "active" : ""}`}
                          onClick={() => setFormData((prev) => ({ ...prev, inquiryType: type }))}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 2-Column: Name & Email */}
                  <div
                    className="kk-input-row"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 14,
                    }}
                  >
                    <div>
                      <label
                        style={{
                          display: "block",
                          ...mono,
                          fontSize: 11,
                          textTransform: "uppercase",
                          letterSpacing: 0.8,
                          color: c.inkSoft,
                          marginBottom: 6,
                          fontWeight: 600,
                        }}
                      >
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        className="kk-form-input"
                        placeholder="e.g. Alex Morgan"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <label
                        style={{
                          display: "block",
                          ...mono,
                          fontSize: 11,
                          textTransform: "uppercase",
                          letterSpacing: 0.8,
                          color: c.inkSoft,
                          marginBottom: 6,
                          fontWeight: 600,
                        }}
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        className="kk-form-input"
                        placeholder="alex@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  {/* Honeypot for spam protection */}
                  <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />

                  {/* Subject Line */}
                  <div>
                    <label
                      style={{
                        display: "block",
                        ...mono,
                        fontSize: 11,
                        textTransform: "uppercase",
                        letterSpacing: 0.8,
                        color: c.inkSoft,
                        marginBottom: 6,
                        fontWeight: 600,
                      }}
                    >
                      Specific Topic / Opportunity
                    </label>
                    <input
                      type="text"
                      name="subject"
                      className="kk-form-input"
                      placeholder="e.g. AI Agentic Systems Engineer role"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    />
                  </div>

                  {/* Message Body */}
                  <div>
                    <label
                      style={{
                        display: "block",
                        ...mono,
                        fontSize: 11,
                        textTransform: "uppercase",
                        letterSpacing: 0.8,
                        color: c.inkSoft,
                        marginBottom: 6,
                        fontWeight: 600,
                      }}
                    >
                      Message *
                    </label>
                    <textarea
                      name="message"
                      className="kk-form-input"
                      rows={4}
                      placeholder="Share project scope, team background, or technical objectives..."
                      style={{ resize: "vertical", minHeight: 90 }}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </div>

                  {/* Error Notification */}
                  {errorMessage && (
                    <div
                      style={{
                        padding: "8px 12px",
                        borderRadius: 6,
                        background: "rgba(220, 38, 38, 0.1)",
                        border: "1px solid rgba(220, 38, 38, 0.3)",
                        color: "#B91C1C",
                        fontSize: 12,
                        ...mono,
                      }}
                    >
                      {errorMessage}
                    </div>
                  )}

                  {/* Submit Action Button */}
                  <div>
                    <button
                      type="submit"
                      className="kk-submit-btn"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span
                            style={{
                              width: 14,
                              height: 14,
                              border: "2px solid rgba(255,255,255,0.4)",
                              borderTopColor: "#FFFFFF",
                              borderRadius: "50%",
                              animation: "kkSpin 0.8s linear infinite",
                              display: "inline-block",
                            }}
                          />
                          <span>Transmitting...</span>
                        </>
                      ) : (
                        <>
                          <Send size={14} />
                          <span>Dispatch Message</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Quick Mailto Fallback */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6,
                      fontSize: 11.5,
                      color: c.inkFaint,
                    }}
                  >
                    <span>Prefer your native email app?</span>
                    <a
                      href={mailtoHref}
                      style={{
                        color: c.clay,
                        textDecoration: "underline",
                        fontWeight: 500,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <span>Open mailto</span>
                      <ArrowUpRight size={12} />
                    </a>
                  </div>
                </form>
              ) : (
                /* Success Confirmation State */
                <div
                  style={{
                    padding: "30px 16px",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 16,
                  }}
                >
                  <div
                    style={{
                      width: 58,
                      height: 58,
                      borderRadius: "50%",
                      background: "rgba(22, 163, 74, 0.12)",
                      border: "2px solid rgba(22, 163, 74, 0.4)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#15803D",
                      boxShadow: "0 0 20px rgba(22, 163, 74, 0.2)",
                    }}
                  >
                    <CheckCircle2 size={32} />
                  </div>

                  <div>
                    <h3
                      style={{
                        ...serif,
                        fontSize: 24,
                        fontWeight: 600,
                        color: c.ink,
                        margin: "0 0 6px 0",
                      }}
                    >
                      Message Sent Successfully!
                    </h3>
                    <p
                      style={{
                        fontSize: 13.5,
                        color: c.inkSoft,
                        maxWidth: 420,
                        lineHeight: 1.6,
                        margin: 0,
                      }}
                    >
                      Thank you, <strong style={{ color: c.ink }}>{formData.name}</strong>! Your message regarding{" "}
                      <em>{formData.inquiryType}</em> has been delivered directly to my inbox. I'll get back to you at{" "}
                      <span style={{ ...mono, color: c.clay }}>{formData.email}</span> shortly.
                    </p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      marginTop: 8,
                      flexWrap: "wrap",
                      justifyContent: "center",
                    }}
                  >
                    <button
                      onClick={handleReset}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        padding: "10px 20px",
                        borderRadius: 7,
                        background: c.mossDeep,
                        color: c.paper,
                        border: "none",
                        fontSize: 12.5,
                        fontWeight: 600,
                        cursor: "pointer",
                        boxShadow: "0 2px 8px rgba(60, 68, 50, 0.2)",
                      }}
                    >
                      <RotateCcw size={13} />
                      <span>Send Another Message</span>
                    </button>

                    <a
                      href={mailtoHref}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        padding: "9px 16px",
                        borderRadius: 7,
                        background: "rgba(255, 255, 255, 0.8)",
                        color: c.ink,
                        border: `1px solid ${c.line}`,
                        fontSize: 12,
                        fontWeight: 500,
                        textDecoration: "none",
                      }}
                    >
                      <Mail size={13} />
                      <span>Open Mail Client</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

