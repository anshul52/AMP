"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const GlobeScene = dynamic(() => import("./three/GlobeScene"), {
  ssr: false,
  loading: () => <div style={{ width: "100%", height: "100%" }} />,
});

const STATS = [
  {
    value: "Collecting Talent Globally",
    label: "Serving Clients Across Continents",
  },
  { value: "200+", label: "HR projects successfully completed" },
  { value: "15+", label: "Years of combined HR expertise" },
];

const N = STATS.length;
const EXIT_MS = 380;

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [displayed, setDisplayed] = useState(0);
  const [phase, setPhase] = useState<"enter" | "exit">("enter");
  const [enterKey, setEnterKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── Scroll listener — detects slide threshold crossings ── */
  useEffect(() => {
    let current = 0;
    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const scrolled = -rect.top;
      const totalScrollable = section.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));
      const target = Math.min(N - 1, Math.max(0, Math.floor(progress * N)));
      if (target !== current) {
        current = target;
        setActive(target);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── When active slide changes: exit → swap → enter ── */
  useEffect(() => {
    if (active === displayed) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    let frameId: number | null = null;

    frameId = window.requestAnimationFrame(() => {
      // 1. Play exit (current text flies up & fades)
      setPhase("exit");

      // 2. After exit, swap content and play entrance
      timerRef.current = setTimeout(() => {
        setDisplayed(active);
        setPhase("enter");
        setEnterKey((k) => k + 1);
      }, EXIT_MS);
    });

    return () => {
      if (frameId !== null) window.cancelAnimationFrame(frameId);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [active]); // eslint-disable-line react-hooks/exhaustive-deps

  const stat = STATS[displayed];

  return (
    <>
      <style>{`
        /* ── Exit: current text flies upward & fades ── */
        @keyframes stat-exit-up {
          0%   { opacity: 1; transform: perspective(900px) translateY(0)      rotateX(0deg)   scale(1);    filter: blur(0); }
          100% { opacity: 0; transform: perspective(900px) translateY(-110px) rotateX(-22deg) scale(0.88); filter: blur(8px); }
        }

        /* ── Enter: new text rises from below through the sphere ── */
        @keyframes stat-enter-up {
          0%   { opacity: 0; transform: perspective(900px) translateY(110px)  rotateX(28deg)  scale(0.85); filter: blur(10px); }
          55%  { opacity: 0.85; filter: blur(2px); }
          80%  { transform: perspective(900px) translateY(-8px)   rotateX(-4deg)  scale(1.02);  filter: blur(0); }
          100% { opacity: 1; transform: perspective(900px) translateY(0)      rotateX(0deg)   scale(1);    filter: blur(0); }
        }

        /* ── Label enter with slight extra delay ── */
        @keyframes label-enter-up {
          0%   { opacity: 0; transform: perspective(900px) translateY(70px)  rotateX(20deg); filter: blur(6px); }
          100% { opacity: 1; transform: perspective(900px) translateY(0)     rotateX(0deg);  filter: blur(0); }
        }
      `}</style>

      <div ref={sectionRef} style={{ height: `${(N + 1) * 100}vh` }}>
        {/* ── Sticky viewport ── */}
        <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden bg-[#fff4ef]">
          {/* Globe */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: "clamp(300px, 51vw, 735px)",
              height: "clamp(300px, 50.6vw, 729px)",
            }}
          >
            <GlobeScene />
          </div>

          {/* Text — phase drives exit or enter animation */}
          <div
            key={phase === "enter" ? `enter-${enterKey}` : `exit-${enterKey}`}
            className="relative z-10 flex flex-col items-center text-center px-4"
            style={{
              animation:
                phase === "exit"
                  ? `stat-exit-up ${EXIT_MS}ms cubic-bezier(0.55, 0, 1, 0.45) both`
                  : "none",
            }}
          >
            <p
              className="uppercase text-[#f7591c]"
              style={{
                fontFamily: "var(--font-geist), Geist, sans-serif",
                fontSize: "clamp(80px, 3.9vw, 200px)",
                fontWeight: 900,
                lineHeight: "0.931",
                letterSpacing: "-0.02em",
                animation:
                  phase === "enter"
                    ? "stat-enter-up 0.75s cubic-bezier(0.22, 1, 0.36, 1) both"
                    : "none",
              }}
            >
              {stat.value}
            </p>

            <p
              className="text-[#5c0f1e] mt-3"
              style={{
                fontFamily: "var(--font-geist), Geist, sans-serif",
                fontSize: "clamp(18px, 2.2vw, 32px)",
                fontWeight: 700,
                lineHeight: "0.931",
                letterSpacing: "-0.02em",
                maxWidth: "645px",
                animation:
                  phase === "enter"
                    ? "label-enter-up 0.65s cubic-bezier(0.22, 1, 0.36, 1) 0.15s both"
                    : "none",
              }}
            >
              {stat.label}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
