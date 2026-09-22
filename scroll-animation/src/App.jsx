import ScrollAnimation from "./components/ScrollAnimation";
import Navbar from "./components/Navbar";
import "./index.css";

export default function App() {
  const events = [
    {
      id: "hackmatrix",
      tag: "Flagship",
      title: "HackMatrix 2026",
      category: "24H Hackathon",
      desc: "Build breakthrough solutions in AI, FinTech, and Decentralized Systems in a 24-hour sprint.",
      prize: "₹1,50,000",
    },
    {
      id: "robowars",
      tag: "Combat",
      title: "RoboWars: Apex Clash",
      category: "Robotics Arena",
      desc: "Engineered combat machines battle in an armored steel cage. Destruction and glory.",
      prize: "₹1,00,000",
    },
    {
      id: "aerodrift",
      tag: "Racing",
      title: "AeroDrift FPV",
      category: "Drone Racing",
      desc: "Pilot micro-drones through neon obstacle gates and 3D rings in real-time FPV flight.",
      prize: "₹75,000",
    },
    {
      id: "codeblitz",
      tag: "Algorithms",
      title: "CodeBlitz",
      category: "Speed Coding",
      desc: "High-pressure algorithmic battle solving complex puzzles under strict time limits.",
      prize: "₹50,000",
    },
    {
      id: "cybersiege",
      tag: "Security",
      title: "CyberSiege CTF",
      category: "Capture The Flag",
      desc: "Defend against live zero-day exploits and infiltrate simulated cyber infrastructure.",
      prize: "₹50,000",
    },
    {
      id: "electrocraft",
      tag: "Hardware",
      title: "ElectroCraft Expo",
      category: "IoT & Hardware",
      desc: "Showcase physical prototypes, wearables, and custom embedded systems to venture judges.",
      prize: "₹75,000",
    },
  ];

  const workshops = [
    {
      num: "01",
      title: "Generative AI & Autonomous Agentic Systems",
      instructor: "Staff AI Research Engineer",
      duration: "4 Hours Lab",
      level: "Intermediate",
    },
    {
      num: "02",
      title: "Autonomous Robotics with ROS2 & Spatial SLAM",
      instructor: "Robotics Systems Lead",
      duration: "3.5 Hours",
      level: "Hands-on",
    },
    {
      num: "03",
      title: "Zero-Knowledge Cryptography & Cyber Defense",
      instructor: "Offensive Security Specialist",
      duration: "3 Hours",
      level: "Advanced",
    },
    {
      num: "04",
      title: "Quantum Algorithm Design & Quantum Circuits",
      instructor: "Quantum Computing Lab",
      duration: "2.5 Hours",
      level: "Foundational",
    },
  ];

  const schedule = [
    {
      day: "Day 01",
      date: "October 16, 2026",
      title: "Inception & Hackathon Kickoff",
      desc: "Inaugural keynote, exhibition hall opening, and commencement of the 24-Hour National HackMatrix.",
    },
    {
      day: "Day 02",
      date: "October 17, 2026",
      title: "The Battleground Arena",
      desc: "RoboWars championship heats, AeroDrift drone qualifiers, CodeBlitz tournament, and masterclasses.",
    },
    {
      day: "Day 03",
      date: "October 18, 2026",
      title: "Ascension & Grand Awards",
      desc: "Championship grand finals, startup project pitches, award distribution ceremony, and celebrity pro-night.",
    },
  ];

  return (
    <div className="site-wrapper">
      {/* BACKGROUND VIDEO ANIMATION */}
      <ScrollAnimation />

      {/* SUBTLE TEXTURE & CONTRAST OVERLAY */}
      <div className="texture-overlay" aria-hidden="true" />

      {/* ========================================================
          HERO STAGE (FRAMED CONTAINER EXACTLY MATCHING REFERENCE)
          ======================================================== */}
      <div className="framed-stage">
        {/* 1. TOP NAVBAR: Logo (Left), Pill Dock (Center), CTA (Right) */}
        <Navbar />

        {/* 2. HERO CONTENT GRID */}
        <section id="overview" className="stage-hero">
          {/* BOTTOM-LEFT: Large Editorial Title, Subtitle, Dual Pill CTAs */}
          <div className="hero-editorial">
            <h1 className="editorial-title">
              Engineering Value
              <br />
              Beyond Horizons.
            </h1>

            <p className="editorial-desc">
              India’s premier national technical symposium uniting 10,000+
              creators, engineers, and visionaries to redefine the frontiers
              of technology.
            </p>

            <div className="editorial-cta-row">
              <a href="#passes" className="btn-pill-solid">
                <span>Register Now</span>
                <span className="arrow">→</span>
              </a>
              <a href="#events" className="btn-pill-glass">
                <span>Explore Events</span>
              </a>
            </div>
          </div>

          {/* BOTTOM-RIGHT: Floating Stat Card & Scroll Indicator */}
          <div className="hero-telemetry">
            {/* FLOATING FROSTED METRIC WIDGET (Reference $1.9+ Style) */}
            <div className="metric-glass-card">
              <div className="metric-value">₹5.0L+</div>
              <div className="metric-label">
                Prize pool across 45+ flagship championships
              </div>
              <div className="metric-tags">
                <span className="mini-tag">10K+ Attendees</span>
                <span className="mini-tag">3 Days</span>
              </div>
            </div>

            {/* SCROLL TO EXPLORE INDICATOR */}
            <a href="#about" className="scroll-indicator-link">
              <span>Scroll to Explore</span>
              <span className="scroll-arrow">↓</span>
            </a>
          </div>
        </section>
      </div>

      {/* ========================================================
          SUBSEQUENT SECTIONS (MATCHING MINIMALIST EDITORIAL LOOK)
          ======================================================== */}
      <main className="content-deck">
        {/* ABOUT SECTION */}
        <section id="about" className="deck-section">
          <div className="section-head">
            <span className="ref-badge">ABOUT LAKSHYA</span>
            <h2 className="deck-title">
              A Convergence of Ambition,
              <br />
              Code, and Hardware.
            </h2>
          </div>

          <div className="editorial-split">
            <p className="split-lead">
              For nearly two decades, Lakshya has served as the launchpad for
              breakthrough engineering ideas. In 2026, we explore the synthesis
              of autonomous agents, robotics, zero-knowledge security, and
              hardware innovation.
            </p>
            <div className="pillars-grid">
              <div className="pillar-item">
                <div className="pillar-num">01</div>
                <h4>Autonomous Intelligence</h4>
                <p>Agentic workflows, fine-tuned multimodal LLMs, and neuromorphic edge compute.</p>
              </div>
              <div className="pillar-item">
                <div className="pillar-num">02</div>
                <h4>Robotics & Kinetics</h4>
                <p>Heavyweight combat engineering, micro-FPV aerodynamics, and SLAM-guided rovers.</p>
              </div>
              <div className="pillar-item">
                <div className="pillar-num">03</div>
                <h4>Adversarial Security</h4>
                <p>Live CTF attack-defense war games, zero-knowledge primitives, and smart contracts.</p>
              </div>
              <div className="pillar-item">
                <div className="pillar-num">04</div>
                <h4>Embedded Innovation</h4>
                <p>Next-gen semiconductors, custom silicon layouts, and wearable IoT ecosystems.</p>
              </div>
            </div>
          </div>
        </section>

        {/* EVENTS SECTION */}
        <section id="events" className="deck-section">
          <div className="section-head">
            <span className="ref-badge">COMPETITIONS</span>
            <h2 className="deck-title">Flagship Championships</h2>
            <p className="deck-subtitle">
              Compete on a national stage against elite university teams for cash prizes, trophies, and venture grants.
            </p>
          </div>

          <div className="clean-grid">
            {events.map((ev) => (
              <div key={ev.id} className="clean-card">
                <div className="clean-card-head">
                  <span className="pill-tag">{ev.tag}</span>
                  <span className="card-prize">{ev.prize}</span>
                </div>
                <h3 className="card-heading">{ev.title}</h3>
                <span className="card-sub">{ev.category}</span>
                <p className="card-body">{ev.desc}</p>
                <div className="clean-card-foot">
                  <a href="#passes" className="card-link">
                    <span>Register</span>
                    <span className="link-arr">→</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* WORKSHOPS SECTION */}
        <section id="workshops" className="deck-section">
          <div className="section-head">
            <span className="ref-badge">LEARNING LABS</span>
            <h2 className="deck-title">Masterclasses & Workshops</h2>
            <p className="deck-subtitle">
              Interactive hands-on sessions led by principal researchers and industry specialists.
            </p>
          </div>

          <div className="workshops-stack">
            {workshops.map((w) => (
              <div key={w.num} className="workshop-row">
                <div className="w-col-num">{w.num}</div>
                <div className="w-col-main">
                  <h3>{w.title}</h3>
                  <p>Instructor: {w.instructor}</p>
                </div>
                <div className="w-col-meta">
                  <span className="pill-tag">{w.duration}</span>
                  <span className="pill-tag subtle">{w.level}</span>
                  <a href="#passes" className="btn-pill-sm">
                    Book Seat →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SCHEDULE SECTION */}
        <section id="schedule" className="deck-section">
          <div className="section-head">
            <span className="ref-badge">CHRONOLOGY</span>
            <h2 className="deck-title">Festival Timeline</h2>
          </div>

          <div className="schedule-timeline">
            {schedule.map((item, idx) => (
              <div key={idx} className="timeline-row">
                <div className="t-time">
                  <span className="t-day">{item.day}</span>
                  <span className="t-date">{item.date}</span>
                </div>
                <div className="t-detail">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PASSES SECTION */}
        <section id="passes" className="deck-section">
          <div className="section-head">
            <span className="ref-badge">DELEGATE ACCESS</span>
            <h2 className="deck-title">Registration Passes</h2>
            <p className="deck-subtitle">
              Select your tier to participate in competitions, attend workshops, and access the expo floor.
            </p>
          </div>

          <div className="passes-row">
            <div className="pass-box">
              <div className="pass-tier-badge">Visitor</div>
              <h3 className="pass-box-title">Exhibition Pass</h3>
              <div className="pass-cost">Free</div>
              <p className="pass-summary">Full spectator access to arena matches, keynotes, and project expo stalls.</p>
              <ul className="pass-perks">
                <li>✓ RoboWars & Drone Arena access</li>
                <li>✓ Keynotes & Tech talks</li>
                <li>✓ Digital attendee credential</li>
              </ul>
              <button className="btn-box-outline">Claim Free Pass</button>
            </div>

            <div className="pass-box featured">
              <div className="featured-chip">Recommended</div>
              <div className="pass-tier-badge accent">Competitor</div>
              <h3 className="pass-box-title">All-Event Pass</h3>
              <div className="pass-cost">₹299 <span>/ person</span></div>
              <p className="pass-summary">Complete registration for all flagship competitions, hackathons, and tournament brackets.</p>
              <ul className="pass-perks">
                <li>✓ HackMatrix 24H Hackathon entry</li>
                <li>✓ RoboWars & CodeBlitz eligibility</li>
                <li>✓ Official Lakshya Swag & Goodies</li>
                <li>✓ Verified Certificate of Excellence</li>
              </ul>
              <button className="btn-box-solid">Register Pass →</button>
            </div>

            <div className="pass-box">
              <div className="pass-tier-badge">Pro Labs</div>
              <h3 className="pass-box-title">Workshop Combo</h3>
              <div className="pass-cost">₹499 <span>/ pass</span></div>
              <p className="pass-summary">All-Event competitor pass plus reserved seats in 2 hands-on masterclasses.</p>
              <ul className="pass-perks">
                <li>✓ All Competitor Pass privileges</li>
                <li>✓ 2 Hands-on Technical Workshops</li>
                <li>✓ 1-on-1 Speaker Mentorship</li>
                <li>✓ Hardware development starter kit</li>
              </ul>
              <button className="btn-box-outline">Register Combo</button>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="ref-footer">
          <div className="footer-top">
            <div className="footer-brand-side">
              <div className="footer-logo">⚡ Lakshya 2026</div>
              <p>National Level Technical Symposium. Celebrating engineering culture, craft, and code.</p>
            </div>
            <div className="footer-nav-cols">
              <div className="f-col">
                <h6>Index</h6>
                <a href="#overview">Overview</a>
                <a href="#about">About</a>
                <a href="#events">Competitions</a>
                <a href="#schedule">Timeline</a>
              </div>
              <div className="f-col">
                <h6>Connect</h6>
                <a href="#">Discord</a>
                <a href="#">Instagram</a>
                <a href="#">LinkedIn</a>
                <a href="#">GitHub</a>
              </div>
              <div className="f-col">
                <h6>Contact</h6>
                <a href="mailto:support@lakshya2026.org">support@lakshya2026.org</a>
                <a href="#">Campus Map</a>
                <a href="#">Code of Conduct</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom-bar">
            <span>© 2026 Lakshya. All rights reserved.</span>
            <span>Engineered with precision.</span>
          </div>
        </footer>
      </main>
    </div>
  );
}