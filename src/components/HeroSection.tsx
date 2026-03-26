"use client";

import Image from "next/image";
import SvgParticleLogo from "@/components/SvgParticleLogo";

const HERO_POINT_ICON = "/AMP%20LOGOMARK.svg";

export default function HeroSection() {
  return (
    <>
      <style>{`
        @media (max-width: 1023px) {
          .hero-section {
            min-height: auto !important;
            padding-top: 64px !important;
          }

          .hero-inner {
            min-height: auto !important;
            padding-top: 28px;
            padding-bottom: 36px;
          }

          .hero-copy {
            width: 100% !important;
            max-width: 560px;
            align-items: center;
            padding-top: 24px !important;
            padding-bottom: 24px !important;
            text-align: center;
          }

          .hero-copy-text {
            max-width: none !important;
          }

          .hero-points {
            width: 100%;
            align-items: center;
          }

          .hero-point {
            width: 100%;
            max-width: 320px;
            justify-content: flex-start;
            text-align: left;
          }

          .hero-actions {
            width: 100%;
            flex-direction: column;
            align-items: center;
            margin-top: 52px;
          }

          .hero-action {
            width: min(100%, 320px);
          }

          .hero-visual {
            width: 100%;
            flex: none;
            height: clamp(280px, 78vw, 440px);
            min-height: clamp(280px, 78vw, 440px);
            margin-top: 12px;
          }
        }
      `}</style>

      <section
        className="hero-section relative flex w-full items-center justify-center overflow-x-clip bg-[#fff4ef]"
        style={{ minHeight: "100svh", paddingTop: "72px" }}
      >
        <div
          className="hero-inner mx-auto flex w-full max-w-[1400px] flex-col items-center lg:flex-row"
          style={{
            minHeight: "calc(100svh - 72px)",
            paddingLeft: "clamp(24px, 2.78vw, 40px)",
            paddingRight: "clamp(24px, 2.78vw, 40px)",
          }}
        >
          <div
            className="hero-copy flex shrink-0 flex-col justify-center"
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
                marginBottom: 30,
              }}
            >
              We&apos;ve got
              <br />
              you.
            </h1>

            <p
              className="hero-copy-text mb-6 text-[#111]"
              style={{
                fontFamily: "var(--font-geist), Geist, sans-serif",
                fontSize: "clamp(13px, 1.11vw, 16px)",
                fontWeight: 400,
                lineHeight: 1.6,
                maxWidth: 460,
                marginBottom: 30,
              }}
            >
              We are a collective of world-class HR experts, delivering
              end-to-end people strategies across the GCC and beyond.
            </p>

            <ul
              className="hero-points mb-10 flex flex-col gap-4"
              style={{ marginBottom: 30 }}
            >
              {[
                "Total Rewards & Talent Strategy",
                "Global Reach, Local Expertise",
                "AI-Driven HR Analytics",
              ].map((item) => (
                <li
                  key={item}
                  className="hero-point flex items-center gap-2"
                  style={{
                    fontFamily: "var(--font-geist), Geist, sans-serif",
                    fontSize: "clamp(12px, 1vw, 15px)",
                    fontWeight: 500,
                    color: "#f7591c",
                  }}
                >
                  <Image
                    src={HERO_POINT_ICON}
                    alt=""
                    aria-hidden="true"
                    width={14}
                    height={11}
                    unoptimized
                    style={{ flexShrink: 0 }}
                  />
                  {item}
                </li>
              ))}
            </ul>

            <div className="hero-actions flex flex-wrap gap-4">
              <button
                className="hero-action flex items-center justify-center rounded-full text-[#111] transition-colors hover:bg-[#f7591c] hover:text-white"
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
                className="hero-action flex items-center justify-center rounded-full text-white transition-opacity hover:opacity-90"
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

          <div
            className="hero-visual relative flex-1 self-stretch"
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
    </>
  );
}
