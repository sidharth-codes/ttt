import { useState, useEffect } from "react";

const NAV_ITEMS = [
  { label: "Overview", href: "#overview" },
  { label: "About Us", href: "#about" },
  { label: "Events", href: "#events" },
  { label: "Workshops", href: "#workshops" },
  { label: "Schedule", href: "#schedule" },
  { label: "Passes", href: "#passes" },
];

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    function handleScrollSpy() {
      const sections = NAV_ITEMS.map((item) =>
        document.querySelector(item.href)
      );
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveTab(NAV_ITEMS[i].label);
          break;
        }
      }
    }
    window.addEventListener("scroll", handleScrollSpy, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, []);

  return (
    <header className="ref-navbar">
      {/* 1. LEFT: BRAND LOGO */}
      <a href="#overview" className="ref-brand">
        <div className="ref-logo-icon">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        </div>
        <span className="ref-brand-name">Lakshya</span>
      </a>

      {/* 2. CENTER: PILL DOCK NAVIGATION */}
      <nav className="ref-pill-dock" aria-label="Main Navigation">
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.label;
          return (
            <a
              key={item.label}
              href={item.href}
              className={`ref-dock-item ${isActive ? "active" : ""}`}
              onClick={() => setActiveTab(item.label)}
            >
              {item.label}
            </a>
          );
        })}
      </nav>

      {/* 3. RIGHT: PILL ACTION BUTTON */}
      <div className="ref-nav-right">
        <a href="#passes" className="ref-cta-pill">
          <span>Register Now</span>
          <span className="cta-arrow">→</span>
        </a>

        {/* Mobile Hamburger */}
        <button
          className={`ref-menu-toggle ${mobileMenuOpen ? "open" : ""}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation"
        >
          <span></span>
          <span></span>
        </button>
      </div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="ref-mobile-drawer">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="ref-mobile-item"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#passes"
            className="ref-cta-pill mobile-cta"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span>Register Now</span>
            <span className="cta-arrow">→</span>
          </a>
        </div>
      )}
    </header>
  );
}
