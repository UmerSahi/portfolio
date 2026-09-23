import React, { useState, useEffect } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { c, mono } from "../../data/portfolioData";

export const Navbar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < 10 || currentScrollY < lastScrollY || mobileMenuOpen);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, mobileMenuOpen]);

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = ["About", "Experience", "Work", "Skills", "Playground", "Certificates", "Peer-Reviews"];
  const navLinkLabels: Record<string, string> = {
    "About": "About",
    "Experience": "Experience",
    "Work": "Work",
    "Skills": "Skills",
    "Playground": "Playground",
    "Certificates": "Certificates",
    "Peer-Reviews": "Testimonials",
  };


  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileMenuOpen(false);
    const win = window as unknown as { lenis?: { scrollTo: (target: number | Element, options?: { duration?: number; offset?: number }) => void } };
    if (href === "#") {
      e.preventDefault();
      if (win.lenis) {
        win.lenis.scrollTo(0, { duration: 1.35 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }
    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        if (win.lenis) {
          win.lenis.scrollTo(target, { offset: -64, duration: 1.35 });
        } else {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  return (
    <>
      <style>{`
        .kk-navbar-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(244, 239, 225, 0.82);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid rgba(42, 39, 30, 0.14);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .kk-navbar-hidden {
          transform: translateY(-100%);
        }

        .kk-navbar-inner {
          max-width: 1080px;
          margin: 0 auto;
          padding: 12px clamp(16px, 4vw, 32px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 64px;
        }

        .kk-logo-link {
          display: inline-flex;
          align-items: center;
        }

        .kk-logo-img {
          height: 25px;
          width: auto;
          display: block;
          object-fit: contain;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }

        .kk-nav-links {
          display: flex;
          align-items: center;
          gap: clamp(16px, 2.5vw, 32px);
        }

        .kk-navlink {
          text-decoration: none;
          font-weight: 500;
          position: relative;
          padding: 6px 0;
          transition: color 0.2s ease;
        }

        .kk-navlink::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1.5px;
          background: ${c.mossDeep};
          transition: width 0.25s ease;
        }

        .kk-navlink:hover::after {
          width: 100%;
        }

        .kk-navlink:hover {
          color: ${c.mossDeep} !important;
        }

        .kk-hire-btn {
          background: ${c.mossDeep};
          color: ${c.paper};
          padding: 9px clamp(14px, 2vw, 20px);
          border-radius: 6px;
          border: none;
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.25s ease;
          white-space: nowrap;
          box-shadow: 0 4px 14px rgba(42, 39, 30, 0.15);
        }

        .kk-hire-btn:hover {
          background: ${c.clay};
          color: ${c.paper} !important;
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(164, 89, 47, 0.25);
        }

        /* Mobile hamburger trigger */
        .kk-mobile-toggle {
          display: none;
          background: transparent;
          border: none;
          padding: 8px;
          color: ${c.ink};
          cursor: pointer;
          border-radius: 6px;
          align-items: center;
          justify-content: center;
          transition: background-color 0.2s ease;
        }

        .kk-mobile-toggle:hover {
          background: rgba(42, 39, 30, 0.06);
        }

        @media (max-width: 860px) {
          .kk-nav-links {
            display: none;
          }
          .kk-mobile-toggle {
            display: flex;
          }
          .kk-navbar-inner {
            height: 58px;
          }
          .kk-logo-img {
            height: 21px;
          }
        }

        @media (max-width: 520px) {
          .kk-logo-img {
            height: 18px;
          }
        }

        /* Mobile full-screen drawer */
        .kk-mobile-drawer {
          position: fixed;
          top: 64px;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(244, 239, 225, 0.98);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          z-index: 999;
          display: flex;
          flex-direction: column;
          padding: 24px;
          overflow-y: auto;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease;
        }

        .kk-mobile-drawer-link {
          padding: 14px 0;
          border-bottom: 1px solid rgba(42, 39, 30, 0.1);
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: color 0.2s ease, padding-left 0.2s ease;
        }

        .kk-mobile-drawer-link:hover, .kk-mobile-drawer-link:active {
          color: ${c.clay} !important;
          padding-left: 8px;
        }
      `}</style>

      <nav className={`kk-navbar-container ${isVisible ? "" : "kk-navbar-hidden"}`}>
        <div className="kk-navbar-inner">
          <a href="#" className="kk-logo-link" onClick={(e) => handleNavClick(e, "#")} aria-label="Umer Sahi">
            <img src="/logo.png" alt="Umer Sahi" className="kk-logo-img" />
          </a>

          {/* Desktop Navigation Links */}
          <div className="kk-nav-links">
            {navLinks.slice(0, 6).map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(e) => handleNavClick(e, `#${item.toLowerCase()}`)}
                className="kk-navlink"
                style={{
                  ...mono,
                  fontSize: 12,
                  letterSpacing: 0.8,
                  textTransform: "uppercase",
                  color: c.inkSoft,
                }}
              >
                {navLinkLabels[item] || item}
              </a>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="kk-hire-btn"
              style={{ ...mono }}
            >
              Contact Me <ArrowRight size={13} />
            </a>

            {/* Mobile hamburger icon toggle */}
            <button
              className="kk-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="kk-mobile-drawer">
          <div style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 8 }}>
            {navLinks.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="kk-mobile-drawer-link"
                onClick={(e) => handleNavClick(e, `#${item.toLowerCase()}`)}
                style={{
                  ...mono,
                  fontSize: 14,
                  letterSpacing: 1.2,
                  textTransform: "uppercase",
                  color: c.ink,
                  fontWeight: 600,
                }}
              >
                <span>{navLinkLabels[item] || item}</span>
                <ArrowRight size={16} color={c.clay} />
              </a>
            ))}
          </div>

          <div style={{ marginTop: 28 }}>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              style={{
                ...mono,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                background: c.mossDeep,
                color: c.paper,
                padding: "14px",
                borderRadius: 8,
                textDecoration: "none",
                fontWeight: 600,
                fontSize: 13,
                letterSpacing: 1,
                textTransform: "uppercase",
              }}
            >
              Get In Touch <ArrowRight size={16} />
            </a>
          </div>

          <div style={{ marginTop: "auto", paddingTop: 32, textAlign: "center", ...mono, fontSize: 11, color: c.inkFaint }}>
            Muhammad Umer Sahi · Portfolio
          </div>
        </div>
      )}
    </>
  );
};
