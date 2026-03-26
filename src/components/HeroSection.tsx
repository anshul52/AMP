"use client";

import SvgParticleLogo from "@/components/SvgParticleLogo";

export default function HeroSection() {
  return (
    <section
      // className="relative w-full overflow-x-clip bg-[#fff4ef]"
      className="relative w-full overflow-x-clip flex items-center justify-center bg-[#fff4ef]"
      style={{ minHeight: "100svh", paddingTop: "72px" }}
    >
      {/* ── Inner row — aligned to navbar's content edges ── */}
      <div
        className="mx-auto flex w-full max-w-[1400px] flex-col items-center md:flex-row"
        style={{
          minHeight: "calc(100svh - 72px)",
          paddingLeft: "clamp(24px, 2.78vw, 40px)",
          paddingRight: "clamp(24px, 2.78vw, 40px)",
        }}
      >
        {/* ── Left: text — vertically centred ── */}
        <div
          className="flex shrink-0 flex-col justify-center"
          style={{
            width: "clamp(280px, 36%, 500px)",
            paddingTop: "clamp(40px, 5vw, 64px)",
            paddingBottom: "clamp(40px, 5vw, 64px)",
          }}
        >
          <h1
            className="mb-6 uppercase text-[#111]"
            style={{
              fontFamily: "var(--font-geist), Geist, sans-serif",
              fontSize: "clamp(36px, 5.07vw, 73px)",
              fontWeight: 900,
              lineHeight: 0.92,
              letterSpacing: "-0.02em",
            }}
          >
            We&apos;ve got
            <br />
            you.
          </h1>

          <p
            className="mb-6 text-[#111]"
            style={{
              fontFamily: "var(--font-geist), Geist, sans-serif",
              fontSize: "clamp(13px, 1.11vw, 16px)",
              fontWeight: 400,
              lineHeight: 1.6,
              maxWidth: 460,
            }}
          >
            We are a collective of world-class HR experts, delivering end-to-end
            people strategies across the GCC and beyond.
          </p>

          <ul className="mb-10 flex flex-col gap-4">
            {[
              "Total Rewards & Talent Strategy",
              "Global Reach, Local Expertise",
              "AI-Driven HR Analytics",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-2"
                style={{
                  fontFamily: "var(--font-geist), Geist, sans-serif",
                  fontSize: "clamp(12px, 1vw, 15px)",
                  fontWeight: 500,
                  color: "#f7591c",
                }}
              >
                <svg
                  width="14"
                  height="10"
                  viewBox="0 0 14 10"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M1 5L5 9L13 1"
                    stroke="#f7591c"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {item}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-4">
            <button
              className="flex items-center justify-center rounded-full transition-colors text-[#111] hover:bg-[#f7591c] hover:text-white"
              style={{
                border: "2px solid #f7591c",
                height: 44,
                paddingInline: 24,
                fontFamily: "var(--font-geist), Geist, sans-serif",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.06em",
              }}
            >
              GET STARTED
            </button>
            <button
              className="flex items-center justify-center rounded-full text-white transition-opacity hover:opacity-90"
              style={{
                background: "#f7591c",
                height: 44,
                paddingInline: 24,
                fontFamily: "var(--font-geist), Geist, sans-serif",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.06em",
              }}
            >
              DOWNLOAD BROCHURE
            </button>
          </div>
        </div>

        {/* ── Right: particle canvas — full row height, logo fills canvas width ── */}
        <div
          className="relative flex-1 self-stretch"
          style={{ pointerEvents: "none" }}
        >
          <SvgParticleLogo
            svgSrc="/logo.svg"
            height={1}
            bgColor="transparent"
            particleColor="#f7591c"
            particleGap={3}
            particleSize={1.4}
            repelRadius={150}
            returnStrength={0.035}
            damping={0.88}
            logoScale={1.0}
            logoOffsetX={0.5}
            logoOffsetY={0.5}
          />
        </div>
      </div>
    </section>
  );
}
