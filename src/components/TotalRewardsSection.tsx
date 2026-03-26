"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const SLIDES = [
  {
    bg: "https://www.figma.com/api/mcp/asset/e2d59520-78ac-4d26-9fdb-c18d0eb63a2a",
    tag: "TOTAL REWARDS",
    title: "Total Rewards\n& Strategy",
    desc: "We design reward systems that attract, retain and motivate — from global compensation frameworks to incentive structures that actually work.",
    features: [
      { label: "Compensation Architecture", sub: "Benchmark-driven salary bands & pay equity audits" },
      { label: "Incentive Design",           sub: "Short & long-term variable pay programs" },
      { label: "Benefits Strategy",          sub: "Holistic total rewards ecosystems that retain talent" },
    ],
  },
  {
    bg: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1600&q=80&auto=format",
    tag: "TALENT ACQUISITION",
    title: "Talent\nAcquisition",
    desc: "Building high-performance teams across the GCC through strategic sourcing, employer branding, and data-driven recruitment methodologies.",
    features: [
      { label: "Executive Search",    sub: "C-suite & senior leadership placement across the region" },
      { label: "Employer Branding",   sub: "EVP development & talent marketing campaigns" },
      { label: "RPO Solutions",       sub: "End-to-end recruitment process outsourcing" },
    ],
  },
  {
    bg: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80&auto=format",
    tag: "HR ANALYTICS",
    title: "AI-Driven\nHR Analytics",
    desc: "Turn your workforce data into strategic advantage. Our analytics solutions surface insights that drive smarter people decisions at every level.",
    features: [
      { label: "Workforce Intelligence", sub: "Predictive attrition modelling & headcount planning" },
      { label: "Performance Analytics",  sub: "Real-time KPI dashboards & industry benchmarks" },
      { label: "DEI Metrics",            sub: "Equity tracking & inclusion scorecards" },
    ],
  },
  {
    bg: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80&auto=format",
    tag: "GLOBAL REACH",
    title: "Global Reach,\nLocal Expertise",
    desc: "Operating at the intersection of global best practices and regional nuance — across 15+ countries in the GCC, MENA, and beyond.",
    features: [
      { label: "Cross-Border Compliance", sub: "Labour law advisory & regulatory guidance" },
      { label: "Localisation Strategy",   sub: "Nationalisation & emiratisation programme design" },
      { label: "Mobility Solutions",      sub: "Expat compensation frameworks & relocation support" },
    ],
  },
];

const N = SLIDES.length;

export default function TotalRewardsSection() {
  const sectionRef   = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [animKey, setAnimKey] = useState(0); // bumped each slide change → re-triggers text anim

  useEffect(() => {
    let current = 0;

    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect           = section.getBoundingClientRect();
      const scrolled       = -rect.top;
      const totalScrollable = section.offsetHeight - window.innerHeight;
      const progress       = Math.max(0, Math.min(1, scrolled / totalScrollable));
      const slideFloat     = progress * N;
      const target         = Math.min(N - 1, Math.max(0, Math.floor(slideFloat)));

      if (target !== current) {
        current = target;
        setActive(target);
        setAnimKey(k => k + 1);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── Animation keyframes ── */}
      <style>{`
        @keyframes amp-img-in {
          from { clip-path: inset(0 0 100% 0); }
          to   { clip-path: inset(0 0 0% 0); }
        }
        @keyframes amp-text-up {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes amp-text-fade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @media (max-width: 767px) {
          .amp-total-rewards-sticky {
            height: 100svh !important;
          }
          .amp-total-rewards-slide {
            inset: 10px !important;
            border-radius: 18px !important;
          }
          .amp-total-rewards-overlay {
            background: linear-gradient(180deg, rgba(0, 0, 0, 0.84) 0%, rgba(0, 0, 0, 0.58) 44%, rgba(0, 0, 0, 0.76) 100%) !important;
          }
          .amp-total-rewards-content {
            align-items: flex-start !important;
            flex-direction: column !important;
            justify-content: flex-start !important;
            gap: 24px !important;
            padding: 22px 20px 72px !important;
          }
          .amp-total-rewards-left,
          .amp-total-rewards-right {
            width: 100% !important;
          }
          .amp-total-rewards-spacer,
          .amp-total-rewards-slide-number,
          .amp-total-rewards-counter {
            display: none !important;
          }
          .amp-total-rewards-tag {
            font-size: 10px !important;
            margin-bottom: 12px !important;
          }
          .amp-total-rewards-title {
            font-size: clamp(32px, 10vw, 46px) !important;
            line-height: 0.98 !important;
            margin-bottom: 16px !important;
          }
          .amp-total-rewards-desc {
            font-size: 14px !important;
            line-height: 1.55 !important;
            margin-bottom: 22px !important;
            max-width: none !important;
          }
          .amp-total-rewards-cta,
          .amp-total-rewards-explore {
            display: flex !important;
            justify-content: center !important;
            width: 100% !important;
          }
          .amp-total-rewards-cta {
            padding: 14px 18px !important;
          }
          .amp-total-rewards-feature {
            margin-bottom: 16px !important;
            padding-bottom: 16px !important;
          }
          .amp-total-rewards-feature > div:first-child {
            margin-bottom: 6px !important;
          }
          .amp-total-rewards-feature > div:nth-child(2) {
            font-size: 15px !important;
          }
          .amp-total-rewards-feature > div:nth-child(3) {
            font-size: 12px !important;
            line-height: 1.5 !important;
          }
          .amp-total-rewards-explore {
            margin-top: 18px !important;
            padding: 12px 16px !important;
          }
          .amp-total-rewards-progress {
            bottom: 18px !important;
            gap: 6px !important;
          }
        }
      `}</style>

      {/* ── Outer scroll container — N+1 viewports so each slide = 1 full scroll ── */}
      <div ref={sectionRef} style={{ height: `${(N + 1) * 100}vh` }}>

        {/* ── Sticky viewport ── */}
        <div
          className="amp-total-rewards-sticky"
          style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", background: "#ffffff" }}
        >

          {SLIDES.map((slide, i) => {
            const isActive = i === active;
            const isPast   = i < active;

            return (
              <div
                key={i}
                className="amp-total-rewards-slide"
                style={{
                  position     : "absolute",
                  inset        : "14px",
                  borderRadius : 20,
                  zIndex       : i,
                  /* ── Image snap-in: slides up from bottom on each advance ── */
                  transform    : i <= active ? "translateY(0%)" : "translateY(calc(100% + 14px))",
                  transition   : "transform 0.82s cubic-bezier(0.76, 0, 0.24, 1)",
                  overflow     : "hidden",
                }}
              >
                {/* Background image */}
                <Image
                  src={slide.bg}
                  alt={slide.title.replace("\n", " ")}
                  fill
                  className="object-cover object-center"
                  unoptimized
                />

                {/* Dark gradient overlay */}
                <div
                  className="amp-total-rewards-overlay"
                  style={{
                    position  : "absolute",
                    inset     : 0,
                    background: "linear-gradient(110deg,rgba(0,0,0,0.82) 0%,rgba(0,0,0,0.48) 55%,rgba(0,0,0,0.55) 100%)",
                  }}
                />

                {/* ── Content — always rendered so past-card text stays visible ── */}
                <div
                  className="amp-total-rewards-content"
                  style={{
                    position: "absolute",
                    inset   : 0,
                    display : "flex",
                    alignItems: "center",
                    padding : "clamp(28px, 5vw, 72px)",
                  }}
                >

                  {/* ─── LEFT: tag · title · desc · CTA ─── */}
                  <div
                    className="amp-total-rewards-left"
                    style={{ flex: "0 0 auto", width: "clamp(260px, 44%, 560px)", color: "white" }}
                  >

                    {/* Tag */}
                    <span
                      key={isActive ? `tag-${animKey}` : `tag-past-${i}`}
                      className="amp-total-rewards-tag"
                      style={{
                        display    : "block",
                        fontSize   : 11,
                        fontWeight : 700,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color      : "#f7591c",
                        marginBottom: 20,
                        fontFamily : "var(--font-geist),Geist,sans-serif",
                        animation  : isActive
                          ? "amp-text-up 0.45s ease 0.42s both"
                          : "none",
                        opacity    : isPast ? 1 : undefined,
                      }}
                    >{slide.tag}</span>

                    {/* Title */}
                    <h2
                      key={isActive ? `h2-${animKey}` : `h2-past-${i}`}
                      className="amp-total-rewards-title"
                      style={{
                        fontFamily   : "var(--font-geist),Geist,sans-serif",
                        fontSize     : "clamp(36px,5.5vw,80px)",
                        fontWeight   : 900,
                        lineHeight   : 0.92,
                        letterSpacing: "-0.02em",
                        whiteSpace   : "pre-line",
                        marginBottom : 24,
                        animation    : isActive
                          ? "amp-text-up 0.5s cubic-bezier(0.33,1,0.68,1) 0.52s both"
                          : "none",
                        opacity      : isPast ? 1 : undefined,
                      }}
                    >{slide.title}</h2>

                    {/* Description */}
                    <p
                      key={isActive ? `p-${animKey}` : `p-past-${i}`}
                      className="amp-total-rewards-desc"
                      style={{
                        fontFamily   : "var(--font-geist),Geist,sans-serif",
                        fontSize     : "clamp(13px,1.1vw,15px)",
                        fontWeight   : 400,
                        lineHeight   : 1.65,
                        color        : "rgba(255,255,255,0.62)",
                        maxWidth     : 400,
                        marginBottom : 36,
                        letterSpacing: "-0.01em",
                        animation    : isActive
                          ? "amp-text-fade 0.45s ease 0.64s both"
                          : "none",
                        opacity      : isPast ? 1 : undefined,
                      }}
                    >{slide.desc}</p>

                    {/* CTA */}
                    <button
                      key={isActive ? `btn-${animKey}` : `btn-past-${i}`}
                      className="amp-total-rewards-cta"
                      style={{
                        border       : "1px solid rgba(255,255,255,0.32)",
                        borderRadius : 100,
                        padding      : "13px 28px",
                        fontSize     : 11,
                        fontWeight   : 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color        : "white",
                        background   : "transparent",
                        cursor       : "pointer",
                        fontFamily   : "var(--font-geist),Geist,sans-serif",
                        transition   : "background 0.2s,border-color 0.2s",
                        animation    : isActive
                          ? "amp-text-fade 0.4s ease 0.76s both"
                          : "none",
                        opacity      : isPast ? 1 : undefined,
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLButtonElement).style.background   = "rgba(247,89,28,0.18)";
                        (e.currentTarget as HTMLButtonElement).style.borderColor  = "#f7591c";
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLButtonElement).style.background   = "transparent";
                        (e.currentTarget as HTMLButtonElement).style.borderColor  = "rgba(255,255,255,0.32)";
                      }}
                    >LEARN MORE →</button>
                  </div>

                  {/* Spacer */}
                  <div className="amp-total-rewards-spacer" style={{ flex: 1 }} />

                  {/* ─── RIGHT: feature list ─── */}
                  <div
                    className="amp-total-rewards-right"
                    style={{ flex: "0 0 auto", width: "clamp(200px,28%,340px)", color: "white" }}
                  >
                    {slide.features.map((f, j) => (
                      <div
                        key={isActive ? `feat-${j}-${animKey}` : `feat-past-${i}-${j}`}
                        className="amp-total-rewards-feature"
                        style={{
                          marginBottom : j < slide.features.length - 1 ? 22 : 0,
                          paddingBottom: j < slide.features.length - 1 ? 22 : 0,
                          borderBottom : j < slide.features.length - 1
                            ? "1px solid rgba(255,255,255,0.09)" : "none",
                          animation    : isActive
                            ? `amp-text-up 0.4s ease ${0.55 + j * 0.08}s both`
                            : "none",
                          opacity      : isPast ? 1 : undefined,
                        }}
                      >
                        <div style={{ fontSize: 10, color: "#f7591c", marginBottom: 5 }}>★★★★★</div>
                        <div style={{
                          fontFamily  : "var(--font-geist),Geist,sans-serif",
                          fontSize    : "clamp(13px,1.15vw,16px)",
                          fontWeight  : 700,
                          lineHeight  : 1.3,
                          marginBottom: 5,
                        }}>&ldquo;{f.label}&rdquo;</div>
                        <div style={{
                          fontFamily: "var(--font-geist),Geist,sans-serif",
                          fontSize  : 11,
                          color     : "rgba(255,255,255,0.42)",
                          lineHeight: 1.4,
                        }}>{f.sub}</div>
                      </div>
                    ))}

                    {/* Explore */}
                    <button
                      key={isActive ? `exp-${animKey}` : `exp-past-${i}`}
                      className="amp-total-rewards-explore"
                      style={{
                        marginTop   : 28,
                        border      : "1px solid rgba(255,255,255,0.2)",
                        borderRadius: 8,
                        padding     : "10px 20px",
                        fontSize    : 11,
                        fontWeight  : 600,
                        color       : "rgba(255,255,255,0.7)",
                        background  : "transparent",
                        cursor      : "pointer",
                        display     : "flex",
                        alignItems  : "center",
                        gap         : 8,
                        fontFamily  : "var(--font-geist),Geist,sans-serif",
                        letterSpacing: "0.04em",
                        transition  : "color 0.2s,border-color 0.2s",
                        animation   : isActive
                          ? `amp-text-fade 0.4s ease ${0.55 + slide.features.length * 0.08}s both`
                          : "none",
                        opacity     : isPast ? 1 : undefined,
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLButtonElement).style.color        = "#f7591c";
                        (e.currentTarget as HTMLButtonElement).style.borderColor  = "rgba(247,89,28,0.5)";
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLButtonElement).style.color        = "rgba(255,255,255,0.7)";
                        (e.currentTarget as HTMLButtonElement).style.borderColor  = "rgba(255,255,255,0.2)";
                      }}
                    >
                      Explore
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path d="M1 6h10M6 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Slide number */}
                <div
                  className="amp-total-rewards-slide-number"
                  style={{
                    position    : "absolute",
                    bottom      : 28,
                    left        : 32,
                    fontFamily  : "var(--font-geist),Geist,sans-serif",
                    fontSize    : 11,
                    fontWeight  : 600,
                    color       : "rgba(255,255,255,0.35)",
                    letterSpacing: "0.1em",
                    zIndex      : 2,
                  }}
                >{String(i + 1).padStart(2, "0")}</div>
              </div>
            );
          })}

          {/* ── Progress dots ── */}
          <div
            className="amp-total-rewards-progress"
            style={{
              position : "absolute",
              bottom   : 28,
              left     : "50%",
              transform: "translateX(-50%)",
              display  : "flex",
              alignItems: "center",
              gap      : 8,
              zIndex   : N + 1,
            }}
          >
            {SLIDES.map((_, k) => (
              <div key={k} style={{
                height    : 6,
                width     : k === active ? 24 : 6,
                borderRadius: 3,
                background: k === active ? "#f7591c" : "rgba(255,255,255,0.35)",
                transition: "width 0.35s ease, background 0.35s ease",
              }}/>
            ))}
          </div>

          {/* ── Counter ── */}
          <div
            className="amp-total-rewards-counter"
            style={{
              position    : "absolute",
              bottom      : 28,
              right       : 32,
              fontFamily  : "var(--font-geist),Geist,sans-serif",
              fontSize    : 11,
              fontWeight  : 600,
              color       : "rgba(255,255,255,0.35)",
              letterSpacing: "0.12em",
              zIndex      : N + 1,
            }}
          >
            {String(active + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
          </div>

        </div>
      </div>
    </>
  );
}
