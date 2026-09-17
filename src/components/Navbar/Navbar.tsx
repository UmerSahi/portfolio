import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { c, mono } from "../../data/portfolioData";

export const Navbar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < 10 || currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navLinks = ["About", "Experience", "Work", "Skills", "Playground", "Certificates"];

  return (
    <>
      <style>{`
        .kk-navbar-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(244, 239, 225, 0.75);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(42, 39, 30, 0.16);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .kk-navbar-hidden {
          transform: translateY(-100%);
        }

        .kk-navbar-inner {
          max-width: 1080px;
          margin: 0 auto;
          padding: 12px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 64px;
        }

        .kk-logo-link {
          display: inline-flex;
          align-items: center;
          text-decoration: none;
          background: transparent;
          border: none;
          padding: 0;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }

        .kk-logo-link:hover {
          opacity: 0.75;
          transform: translateY(-1px);
        }

        .kk-logo-img {
          height: 25px;
          width: auto;
          object-fit: contain;
          display: block;
        }

        .kk-nav-links {
          display: flex;
          align-items: center;
          gap: 36px;
        }

        .kk-navlink {
          position: relative;
          text-decoration: none;
          transition: color 0.25s ease;
        }

        .kk-navlink::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -4px;
          width: 0;
          height: 1px;
          background: ${c.clay};
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
          padding: 8px 18px;
          border-radius: 4px;
          border: none;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.25s ease;
        }

        .kk-hire-btn:hover {
          background: ${c.clay};
          color: ${c.paper} !important;
        }

        @media (max-width: 980px) {
          .kk-navlink-certificates {
            display: none;
          }
        }

        @media (max-width: 850px) {
          .kk-nav-links {
            gap: 24px;
          }
          .kk-navlink-about {
            display: none;
          }
        }

        @media (max-width: 650px) {
          .kk-navlink-skills {
            display: none;
          }
        }

        @media (max-width: 520px) {
          .kk-navbar-inner {
            padding: 12px 16px;
            height: 56px;
          }
          .kk-nav-links {
            gap: 16px;
          }
          .kk-navlink-experience {
            display: none;
          }
          .kk-logo-img {
            height: 18px;
          }
          .kk-hire-btn {
            padding: 6px 12px;
            font-size: 10px;
          }
        }
      `}</style>
      <nav className={`kk-navbar-container ${isVisible ? "" : "kk-navbar-hidden"}`}>
        <div className="kk-navbar-inner">
          <a href="#" className="kk-logo-link" aria-label="Umer Sahi">
            <img src="/logo.png" alt="Umer Sahi" className="kk-logo-img" />
          </a>
          <div className="kk-nav-links">
            {navLinks.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`kk-navlink kk-navlink-${item.toLowerCase()}`}
                style={{
                  ...mono,
                  fontSize: 12,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  color: c.inkSoft,
                }}
              >
                {item}
              </a>
            ))}
          </div>
          <a href="#contact" className="kk-hire-btn" style={{ ...mono }}>
            Contact Me <ArrowRight size={13} />
          </a>
        </div>
      </nav>
    </>
  );
};
