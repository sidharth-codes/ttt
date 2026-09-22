import { useEffect, useState } from "react";

export default function CinematicOverlay() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    function updateProgress() {
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0) {
        const pct = Math.round((window.scrollY / max) * 100);
        setScrollProgress(Math.min(100, Math.max(0, pct)));
      }
    }
    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="cinematic-layer" aria-hidden="true">
      {/* SCANLINE & VIGNETTE TEXTURE */}
      <div className="cyber-grain-filter"></div>

      {/* AMBIENT GLOW CORNERS */}
      <div className="hud-corner top-left">
        <span className="hud-line"></span>
        <span className="hud-text">SYS.STATUS: OPTIMAL</span>
      </div>

      <div className="hud-corner top-right">
        <span className="hud-text">LAKSHYA // PROTOCOL 2026</span>
        <span className="hud-line"></span>
      </div>

      <div className="hud-corner bottom-left">
        <span className="hud-line"></span>
        <span className="hud-text">VENUE: MAIN AUDITORIUM</span>
      </div>

      <div className="hud-corner bottom-right">
        <span className="hud-text">
          STREAM SYNC: {String(scrollProgress).padStart(3, "0")}%
        </span>
        <span className="hud-line"></span>
      </div>

      {/* SCROLL HELPER HINT */}
      {scrollProgress < 5 && (
        <div className="scroll-indicator-pill">
          <span className="mouse-wheel">
            <span className="wheel-dot"></span>
          </span>
          <span className="indicator-text">SCROLL TO EXPERIENCE</span>
        </div>
      )}
    </div>
  );
}
