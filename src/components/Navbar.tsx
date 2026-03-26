"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const LOGO = "/Logo AMP 2.gif";

const navItems = [
  { label: "What Do We Do", hasArrow: true },
  { label: "What We Cover", hasArrow: true },
  { label: "Where We Work", hasArrow: true },
  { label: "Insights" },
  { label: "About" },
  { label: "Downloads", hasArrow: true },
];

function Chevron({ open }: { open?: boolean }) {
  return (
    <svg
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      style={{
        transition: "transform 0.2s ease",
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
        flexShrink: 0,
      }}
    >
      <path
        d="M1 1L5 5L9 1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [active, setActive] = useState("What Do We Do");

  useEffect(() => {
    let lastY = window.scrollY;
    const fn = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      if (y < 10) {
        setHidden(false);
      } else {
        setHidden(y > lastY);
      }
      lastY = y;
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      className="fixed inset-x-0 top-0 z-50"
      style={{
        background: "rgba(255,244,239,0.96)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        boxShadow: scrolled
          ? "0 1px 0 rgba(92,15,30,0.10)"
          : "0 1px 0 rgba(92,15,30,0.04)",
        transform: hidden ? "translateY(-100%)" : "translateY(0)",
        transition:
          "box-shadow 0.3s ease, transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* ── Desktop ── */}
      <div className="hidden w-full justify-center lg:flex">
        <div className="flex h-20 w-full max-w-[1400px] items-center justify-between px-6 lg:px-10">
          <div className="flex items-center gap-12 xl:gap-[72px]">
            {/* Logo */}
            <Link
              href="/"
              aria-label="AMP HCC home"
              className="relative block shrink-0"
              style={{ width: 168, height: 294 }}
            >
              <Image
                src={LOGO}
                alt="AMP Human Capital Collective"
                fill
                className="object-contain object-left"
                priority
              />
            </Link>

            {/* Nav Links */}
            <div className="flex items-center">
              {navItems.map((item) => {
                const lit =
                  hovered === item.label ||
                  (hovered === null && active === item.label);
                return (
                  <button
                    key={item.label}
                    onMouseEnter={() => setHovered(item.label)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => setActive(item.label)}
                    className="flex items-center whitespace-nowrap"
                    style={{
                      gap: 5,
                      borderRadius: 8,
                      padding: "8px 12px",
                      fontFamily: "var(--font-geist), Geist, sans-serif",
                      fontSize: 13.5,
                      fontWeight: 500,
                      color: "#1a1a1a",
                      background: lit ? "#FFD5C2" : "transparent",
                      transition: "background 0.18s ease",
                      cursor: "pointer",
                      border: "none",
                    }}
                  >
                    {item.label}
                    {item.hasArrow && <Chevron open={lit} />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right — CTA */}
          <div className="flex items-center shrink-0">
            <button
              className="flex shrink-0 items-center justify-center rounded-full text-white"
              style={{
                background: "#f85a1d",
                fontFamily: "var(--font-geist), Geist, sans-serif",
                fontSize: 14,
                fontWeight: 600,
                height: 44,
                minWidth: 134,
                paddingInline: 28,
                transition: "opacity 0.18s ease, box-shadow 0.18s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.opacity = "0.88";
                el.style.boxShadow = "0 4px 16px rgba(248,90,29,0.38)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.opacity = "1";
                el.style.boxShadow = "none";
              }}
            >
              Get In Touch
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile bar ── */}
      <div className="flex w-full justify-center lg:hidden">
        <div
          className="flex w-full max-w-[1400px] items-center justify-between px-6"
          style={{ height: 64 }}
        >
          <div className="flex items-center">
            <Link
              href="/"
              aria-label="AMP HCC home"
              className="relative block shrink-0"
              style={{ width: "clamp(120px, 34vw, 160px)", height: 38 }}
            >
              <Image
                src={LOGO}
                alt="AMP Human Capital Collective"
                fill
                className="object-contain object-left"
                priority
              />
            </Link>
          </div>

          {/* Hamburger → X */}
          <div className="flex items-center shrink-0">
            <button
              className="relative flex items-center justify-center"
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(92,15,30,0.12)",
                backdropFilter: "blur(10px)",
                flexShrink: 0,
              }}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {[
                { y: menuOpen ? 0 : -6, r: menuOpen ? 45 : 0 },
                { y: 0, r: 0, hide: menuOpen },
                { y: menuOpen ? 0 : 6, r: menuOpen ? -45 : 0 },
              ].map((bar, i) => (
                <span
                  key={i}
                  className="absolute block bg-[#5c0f1e]"
                  style={{
                    width: 20,
                    height: 2,
                    borderRadius: 1,
                    transform: `translateY(${bar.y}px) rotate(${bar.r}deg)`,
                    opacity: bar.hide ? 0 : 1,
                    transition: "transform 0.22s ease, opacity 0.15s ease",
                  }}
                />
              ))}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile dropdown ── */}
      <div
        className="overflow-hidden lg:hidden"
        style={{
          maxHeight: menuOpen ? 480 : 0,
          transition: "max-height 0.3s ease",
          background: "rgba(255,244,239,0.98)",
          backdropFilter: "blur(16px)",
          borderTop: menuOpen ? "1px solid rgba(92,15,30,0.08)" : "none",
        }}
      >
        <div className="flex w-full justify-center">
          <div className="flex w-full max-w-[1400px] flex-col gap-1 px-6 py-4">
            {navItems.map((item) => (
              <button
                key={item.label}
                className="flex items-center justify-between rounded-[10px] px-4 text-left"
                style={{
                  fontFamily: "var(--font-geist), Geist, sans-serif",
                  fontSize: 15,
                  fontWeight: 500,
                  color: "#222",
                  padding: "11px 16px",
                  transition: "background 0.16s ease",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.background =
                    "#FFD5C2")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.background =
                    "transparent")
                }
              >
                <span>{item.label}</span>
                {item.hasArrow && <Chevron />}
              </button>
            ))}
            <button
              className="mt-3 flex h-[46px] w-full items-center justify-center rounded-full text-white"
              style={{
                background: "#f85a1d",
                fontFamily: "var(--font-geist), Geist, sans-serif",
                fontSize: 15,
                fontWeight: 600,
              }}
            >
              Get In Touch
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
