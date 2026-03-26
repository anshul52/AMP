"use client";

import Image from "next/image";
import { AnimatePresence, motion, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────── data ─────────────────────────────── */
const items = [
  {
    num: "01",
    title: "Design Thinking Approach",
    desc: "We begin with empathy and end with innovation. Every solution is crafted around your organization's specific needs, not pulled from a template.",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
  },
  {
    num: "02",
    title: "No One-Size-Fits-All",
    desc: "Whether you're a Dubai-based family conglomerate or a Southeast Asian fintech, your strategy is built from scratch. Bespoke, always.",
    img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80",
  },
  {
    num: "03",
    title: "Root Cause, Not Quick Fixes",
    desc: "We don't treat symptoms. Using Lean Six Sigma and deep diagnostic methods, we find what's fundamentally broken — and fix it for good.",
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
  },
  {
    num: "04",
    title: "Truly Global, Genuinely Local",
    desc: "With delivery across GCC, Europe and Southeast Asia, we understand the cultural nuances that generic consultants miss entirely.",
    img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
  },
];

/* Cube size in px */
const CUBE = 10;

/* Image slide animation — direction +1 → go down, −1 → go up */
const slideVariants = {
  enter: (dir: number) => ({
    y: dir >= 0 ? "100%" : "-100%",
    opacity: 0.6,
  }),
  center: {
    y: "0%",
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 260, damping: 28 },
  },
  exit: (dir: number) => ({
    y: dir >= 0 ? "-100%" : "100%",
    opacity: 0.6,
    transition: { type: "spring" as const, stiffness: 260, damping: 28 },
  }),
};

export default function WhatMakesUsDifferent() {
  const [active, setActive] = useState(1);
  const [direction, setDirection] = useState(0);

  /* refs */
  const listRef = useRef<HTMLDivElement>(null);
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* Framer spring — Y position of rolling cube */
  const springY = useSpring(0, { stiffness: 340, damping: 30, mass: 0.7 });
  /* Framer spring — rotation of rolling cube */
  const springRot = useSpring(0, { stiffness: 200, damping: 22, mass: 0.5 });
  const rotAcc = useRef(0); // accumulated rotation (never resets)

  /* Move cube to a row's slot position */
  const moveCube = (idx: number) => {
    const slot = slotRefs.current[idx];
    const list = listRef.current;
    if (!slot || !list) return;
    const sTop = slot.getBoundingClientRect().top;
    const lTop = list.getBoundingClientRect().top;
    const targetY = sTop - lTop;

    /* roll direction matches travel direction */
    const delta = targetY - springY.get();
    rotAcc.current += delta > 0 ? 360 : -360;
    springY.set(targetY);
    springRot.set(rotAcc.current);
  };

  /* Initial position after first paint */
  useEffect(() => {
    moveCube(active);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Reposition on resize */
  useEffect(() => {
    const fn = () => moveCube(active);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const handleClick = (idx: number) => {
    if (idx === active) return;
    setDirection(idx > active ? 1 : -1);
    setActive(idx);
    moveCube(idx);
  };

  return (
    // <section className="wmud-section relative w-full overflow-x-clip bg-[#fff4ef] ">
    <section className="wmud-section relative w-full overflow-x-clip flex items-center justify-center">
      {/* ── Responsive styles (no Tailwind breakpoint prefixes) ── */}
      <style>{`
        /* Two-column grid at ≥ 1024 px */
        @media (min-width: 1024px) {
          .wmud-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        /* Keep title on one line on all sizes */
        .wmud-title {
          white-space: nowrap;
          overflow:    hidden;
          text-overflow: ellipsis;
        }
        @media (max-width: 1023px) {
          .wmud-title {
            white-space: normal;
            overflow: visible;
            text-overflow: clip;
          }

          .wmud-grid {
            gap: 28px !important;
          }

          .wmud-row {
            margin-top: 20px !important;
          }

          .wmud-text {
            min-width: 0;
          }

          .wmud-heading {
            font-size: 18px !important;
            line-height: 1.2 !important;
          }

          .wmud-desc {
            padding-left: 0 !important;
            margin-top: 10px !important;
          }

          .wmud-image-wrap {
            justify-content: center !important;
          }

          .wmud-watermark {
            right: 50% !important;
            top: 50% !important;
            transform: translate(50%, -50%) !important;
            font-size: min(70vw, 360px) !important;
          }

          .wmud-image {
            width: min(100%, 420px) !important;
            height: clamp(260px, 78vw, 420px) !important;
          }
        }

        @media (max-width: 639px) {
          .wmud-row {
            gap: 8px !important;
          }

          .wmud-step {
            min-width: 20px !important;
          }

          .wmud-heading {
            font-size: 16px !important;
          }

          .wmud-desc {
            font-size: 13px !important;
            line-height: 1.55 !important;
          }
        }
      `}</style>

      <div
        className="mx-auto w-full"
        style={{
          maxWidth: 1400,
          paddingTop: "clamp(48px, 6.67vw, 96px)",
          paddingBottom: "clamp(48px, 6.67vw, 96px)",
          paddingLeft: "clamp(24px, 2.78vw, 40px)",
          paddingRight: "clamp(24px, 2.78vw, 40px)",
        }}
      >
        {/* ── Title ── */}
        <h2
          className="wmud-title"
          style={{
            fontFamily: "var(--font-geist), Geist, sans-serif",
            fontSize: "clamp(20px, 2.92vw, 44px)",
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: "-0.055em",
            color: "#5c0f1e",
            textTransform: "uppercase",
            marginBottom: "clamp(28px, 3.6vw, 52px)",
          }}
        >
          What Makes Us Different
        </h2>

        {/* ── Two-column grid ── */}
        <div
          className="wmud-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr" /* overridden to 1fr 1fr at lg */,
            alignItems: "start",
            gap: "clamp(32px, 5vw, 96px)",
          }}
        >
          {/* ─── LEFT: item list ─── */}
          <div style={{ position: "relative" }} ref={listRef}>
            {/*
              ══ Single rolling orange cube ══
              Framer Motion springs drive Y-position + rotation.
              Left is fixed at 0 — the slot refs share this x-position
              so the cube always tracks them exactly.
            */}
            <motion.div
              style={{
                position: "absolute",
                left: 0,
                top: springY /* spring-animated */,
                rotate: springRot /* spring-animated rolling */,
                width: CUBE,
                height: CUBE,
                zIndex: 3,
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  width: CUBE,
                  height: CUBE,
                  background: "#f7591c",
                  borderRadius: 2,
                }}
              />
            </motion.div>

            {/* ══ Step rows ══ */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "clamp(22px, 2.8vw, 38px)",
              }}
            >
              {items.map((item, i) => {
                const isActive = i === active;
                return (
                  <div
                    key={item.num}
                    className="wmud-row"
                    onClick={() => handleClick(i)}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                      cursor: "pointer",
                      userSelect: "none",
                      marginTop: 50,
                    }}
                  >
                    {/*
                      Ghost slot — holds space for the cube.
                      NOT part of the motion.div below, so it never shifts
                      horizontally and the cube always lands exactly here.
                    */}
                    <div
                      ref={(el) => {
                        slotRefs.current[i] = el;
                      }}
                      style={{
                        width: CUBE,
                        height: CUBE,
                        flexShrink: 0,
                        marginTop: 4,
                        borderRadius: 2,
                        border: isActive
                          ? "1.5px solid transparent"
                          : "1.5px solid #d8d8d8",
                        transition: "border-color 0.35s ease",
                      }}
                    />

                    {/*
                      Text block — only this part nudges right when active.
                      The slot stays fixed so the cube tracks it perfectly.
                    */}
                    <motion.div
                      className="wmud-text"
                      animate={{ x: isActive ? 8 : 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 320,
                        damping: 28,
                      }}
                      style={{ flex: 1 }}
                    >
                      {/* ── Row: [01]  Bold Title ── */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        {/* Step number */}
                        <span
                          className="wmud-step"
                          style={{
                            fontFamily: "var(--font-geist), Geist, sans-serif",
                            fontSize: 12,
                            fontWeight: 400,
                            letterSpacing: "0.02em",
                            lineHeight: 1,
                            minWidth: 22,
                            color: isActive ? "#aaaaaa" : "#dedede",
                            transition: "color 0.35s ease",
                          }}
                        >
                          {item.num}
                        </span>

                        {/* Bold heading */}
                        <h3
                          className="wmud-heading"
                          style={{
                            fontFamily: "var(--font-geist), Geist, sans-serif",
                            fontSize: "clamp(15px, 1.53vw, 22px)",
                            fontWeight: isActive ? 700 : 400,
                            lineHeight: 1.1,
                            letterSpacing: "-0.05em",
                            margin: 0,
                            overflowWrap: "anywhere",
                            color: isActive ? "#141314" : "#c0c0c0",
                            transition: "color 0.35s ease",
                          }}
                        >
                          {item.title}
                        </h3>
                      </div>

                      {/* ── Description — indented under heading ── */}
                      <p
                        className="wmud-desc"
                        style={{
                          fontFamily: "var(--font-geist), Geist, sans-serif",
                          fontSize: "clamp(12px, 0.97vw, 14px)",
                          fontWeight: 400,
                          lineHeight: 1.65,
                          letterSpacing: "-0.01em",
                          /* indent = num-width (22) + gap (8) */
                          paddingLeft: 30,
                          marginTop: 6,
                          marginBottom: 0,
                          color: isActive ? "#6b6868" : "#d4d4d4",
                          transition: "color 0.35s ease",
                        }}
                      >
                        {item.desc}
                      </p>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ─── RIGHT: image with vertical scroll + faint "A" watermark ─── */}
          <div
            className="wmud-image-wrap"
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            {/* Faint "A" watermark */}
            <span
              className="wmud-watermark"
              aria-hidden
              style={{
                position: "absolute",
                right: "-5%",
                top: "50%",
                transform: "translateY(-50%)",
                fontFamily: "var(--font-geist), Geist, sans-serif",
                fontSize: "clamp(280px, 45vw, 640px)",
                fontWeight: 900,
                color: "rgba(247,89,28,0.06)",
                lineHeight: 1,
                userSelect: "none",
                pointerEvents: "none",
                zIndex: 0,
              }}
            >
              A
            </span>

            {/*
              Image container — clips the AnimatePresence slides.
              Images enter/exit vertically like a continuous scroll.
            */}
            <div
              className="wmud-image"
              style={{
                position: "relative",
                width: "clamp(260px, 42vw, 500px)",
                height: "clamp(320px, 52vw, 620px)",
                borderRadius: 12,
                overflow: "hidden",
                flexShrink: 0,
                zIndex: 1,
              }}
            >
              <AnimatePresence custom={direction} initial={false}>
                <motion.div
                  key={active}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  style={{
                    position: "absolute",
                    inset: 0,
                  }}
                >
                  <Image
                    src={items[active].img}
                    alt={items[active].title}
                    fill
                    className="object-cover"
                    unoptimized
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
