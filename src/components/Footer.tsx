"use client";
import Image from "next/image";

const FOOTER_LOGO =
  "https://www.figma.com/api/mcp/asset/40558f08-b475-42f4-892c-d1c09057ecfd";
const YOUTUBE =
  "https://www.figma.com/api/mcp/asset/12f55389-9e34-4747-8f4b-0ff665fffeb5";
const LINKEDIN =
  "https://www.figma.com/api/mcp/asset/6ea9e3b6-6afa-46ab-8338-4d6b7c63f920";
const INSTAGRAM =
  "https://www.figma.com/api/mcp/asset/a4a5daf0-6111-4793-af02-c7f6e6b909aa";

const navLinks = ["Home", "About", "Our DNA", "Privacy Policy"];

const PX = "clamp(24px, 16.18vw, 233px)";

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white">
      {/* Main row */}
      <div
        className="mx-auto w-full flex flex-col lg:flex-row items-start  justify-between gap-12"
        style={{
          paddingTop: "clamp(48px, 7.71vw, 111px)",
          paddingBottom: "clamp(32px, 4.17vw, 60px)",
          paddingLeft: 60,
          paddingRight: 60,
        }}
      >
        {/* Left */}
        <div className="flex flex-col gap-6">
          <div
            className="relative"
            style={{ width: "clamp(180px, 30.28vw, 436px)", height: 86 }}
          >
            <Image
              src={FOOTER_LOGO}
              alt="AMP Human Capital Collective"
              fill
              className="object-contain object-left"
              unoptimized
            />
          </div>

          <p
            style={{
              fontFamily: "var(--font-geist), Geist, sans-serif",
              fontSize: "clamp(13px, 1.53vw, 22px)",
              fontWeight: 400,
              color: "#bebebe",
              maxWidth: 426,
            }}
          >
            Want access to the future of content?
          </p>

          <button
            className="flex items-center justify-center rounded-full transition-colors hover:border-white"
            style={{
              border: "0.944px solid #a8a8a8",
              width: 256,
              height: 66,
              fontFamily: "var(--font-geist), Geist, sans-serif",
              fontSize: 15,
              fontWeight: 500,
              color: "#fff",
            }}
          >
            Join AMP Newsletters
          </button>
        </div>

        {/* Right */}
        <div className="flex flex-col items-start gap-5 lg:items-end">
          <div className="flex gap-4">
            {[YOUTUBE, LINKEDIN, INSTAGRAM].map((src, i) => (
              <a
                key={i}
                href="#"
                className="opacity-80 transition-opacity hover:opacity-100"
              >
                <Image src={src} alt="" width={33} height={33} unoptimized />
              </a>
            ))}
          </div>

          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="transition-colors hover:text-[#f7591c]"
              style={{
                fontFamily: "var(--font-geist), Geist, sans-serif",
                fontSize: 15,
                fontWeight: 400,
                color: "#fff",
              }}
            >
              {link}
            </a>
          ))}

          <div
            className="mt-2 flex flex-col items-start gap-2 lg:items-end"
            style={{
              fontFamily: "var(--font-geist), Geist, sans-serif",
              fontSize: 15,
              fontWeight: 400,
              color: "#fff",
            }}
          >
            <span>An equal opportunity employer.</span>
            <a
              href="mailto:hello@amphcc.com"
              className="transition-colors hover:text-[#f7591c]"
            >
              hello@amphcc.com
            </a>
            <span>Miami, Panama City, Singapore</span>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div
        className="mx-auto w-full max-w-[1440px] flex justify-end border-t border-white/10"
        style={{ padding: `16px ${PX} clamp(20px, 2.78vw, 40px)` }}
      >
        <p
          style={{
            fontFamily: "var(--font-geist), Geist, sans-serif",
            fontSize: 12,
            fontWeight: 400,
            color: "#bebebe",
          }}
        >
          AMP Human Capital Collective 2026 — All rights reserved
        </p>
      </div>
    </footer>
  );
}
