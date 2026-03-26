"use client";
import { useState } from "react";
import Image from "next/image";

const BG_IMG =
  "https://www.figma.com/api/mcp/asset/ae70b16e-372f-478f-9c85-20ec45a90499";
const ARROW =
  "https://www.figma.com/api/mcp/asset/98c00838-6a9b-4851-bd24-cc4887a42f57";

const team = [
  {
    name: "Aroop Misra",
    role: "CEO, AMP HCC",
    img: "https://www.figma.com/api/mcp/asset/3841f6a7-1d23-4acf-bc92-ccf447daaeee",
    quote:
      "Pay structures should feel fair, motivating and future-proof. We've spent 21 years making that happen across the world's most complex organisations.",
  },
  {
    name: "Rohan Mehta",
    role: "Vice President",
    img: "https://www.figma.com/api/mcp/asset/420ca26e-750d-4e50-b072-6cc2354b506d",
    quote:
      "Building people strategy requires understanding the unique cultural fabric of each organisation we serve.",
  },
  {
    name: "Aditi Sharma",
    role: "Senior Consultant",
    img: "https://www.figma.com/api/mcp/asset/f0f55af3-f408-413c-975f-c89f778ba862",
    quote:
      "Our approach to talent is grounded in deep research and genuine empathy for every stakeholder.",
  },
  {
    name: "John Sina",
    role: "Vice President",
    img: "https://www.figma.com/api/mcp/asset/aa08a28b-e8d5-4fec-863d-0d7ede27e596",
    quote:
      "We bring global perspective while staying deeply connected to regional realities.",
  },
  {
    name: "John Doe",
    role: "Vice President",
    img: "https://www.figma.com/api/mcp/asset/a2877980-28b0-4e59-a29e-71402425944f",
    quote:
      "Every engagement starts with listening. Solutions follow from there.",
  },
  {
    name: "Vikram Deshpande",
    role: "Digital Strategist",
    img: "https://www.figma.com/api/mcp/asset/3841f6a7-1d23-4acf-bc92-ccf447daaeee",
    quote:
      "Digital HR transformation is about people first, technology second.",
  },
  {
    name: "Neha Kapoor",
    role: "Product Manager",
    img: "https://www.figma.com/api/mcp/asset/f0f55af3-f408-413c-975f-c89f778ba862",
    quote:
      "Sustainable HR frameworks are built on data, trust, and continuous dialogue.",
  },
];

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background: "linear-gradient(180deg,#5c0f1e 0%,#5c0f1e 80%,#000 100%)",
      }}
    >
      {/* BG texture */}
      <div className="pointer-events-none absolute inset-0">
        <Image
          src={BG_IMG}
          alt=""
          fill
          className="object-cover opacity-[0.3]"
          unoptimized
        />
      </div>

      {/* ── Main content (heading + quote + carousel) — wide side padding ── */}
      <div
        className="relative z-10 w-full"
        style={{
          paddingTop: "clamp(48px, 6.67vw, 96px)",
          paddingBottom: "clamp(40px, 5vw, 72px)",
          paddingLeft: "clamp(24px, 17.29vw, 249px)",
          paddingRight: "clamp(24px, 17.29vw, 249px)",
        }}
      >
        {/* Heading */}
        <h2
          className="mb-10 text-center uppercase text-white md:mb-14"
          style={{
            fontFamily: "var(--font-geist), Geist, sans-serif",
            fontSize: "clamp(24px, 3.75vw, 54px)",
            fontWeight: 900,
            lineHeight: 0.931,
            letterSpacing: "-0.02em",
            marginBottom: 60,
          }}
        >
          The Minds Behind AMP
        </h2>

        {/* Quote */}
        <div
          style={
            {
              // marginBottom:300
            }
          }
          className="mx-auto mb-[300px] min-h-[96px] w-full px-2 text-center sm:mb-[300px] sm:px-4 md:mb-[300px] md:min-h-[80px] md:px-0"
        >
          <p
            className="mx-auto max-w-[20ch] text-white sm:max-w-[26ch] md:max-w-none"
            style={{
              fontFamily: "var(--font-geist), Geist, sans-serif",
              fontSize: "clamp(15px, 2.64vw, 38px)",
              fontWeight: 500,
              lineHeight: 1.2,
              letterSpacing: "-0.04em",
              transition: "opacity 0.3s ease",
              // marginBottom:300
            }}
          >
            &ldquo;{team[active].quote}&rdquo;
          </p>
        </div>

        {/* Carousel */}
        <div className="relative mt-100 mx-auto flex w-full max-w-[1020px] items-end justify-center px-12 md:px-24 pb-2">
          {/* Previous Arrow */}
          <button
            onClick={() =>
              setActive((a) => (a - 1 + team.length) % team.length)
            }
            className="absolute left-0 bottom-[12px] md:bottom-[36.5px] z-10 shrink-0 opacity-70 transition-opacity hover:opacity-100"
          >
            <Image
              src={ARROW}
              alt="Previous"
              width={50}
              height={50}
              className="w-[30px] md:w-[50px] h-auto"
              unoptimized
            />
          </button>

          <div className="flex flex-nowrap items-end justify-center gap-1.5 md:gap-3 w-full z-50">
            {team.map((member, i) => {
              const isActive = i === active;
              return (
                <div
                  key={member.name}
                  className="relative flex flex-col items-start transition-all duration-300 min-w-0"
                >
                  {/* Floating Author Info */}
                  <div
                    className={`absolute bottom-full left-0 mb-3 md:mb-5 text-left transition-all duration-300 w-[200px] md:w-[300px] ${
                      isActive
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-2 pointer-events-none"
                    }`}
                  >
                    <p
                      style={{
                        fontFamily: "var(--font-geist), Geist, sans-serif",
                        fontSize: "clamp(13px, 1.67vw, 24px)",
                        fontWeight: 700,
                        letterSpacing: "-0.04em",
                        lineHeight: 1.4,
                        color: "#fff",
                      }}
                    >
                      {member.name}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-geist), Geist, sans-serif",
                        fontSize: "clamp(11px, 1.25vw, 16px)",
                        fontWeight: 300,
                        color: "#d6d6d6",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {member.role}
                    </p>
                  </div>

                  {/* Thumbnail button */}
                  <button
                    onClick={() => setActive(i)}
                    className="relative overflow-hidden transition-all duration-300"
                    style={{
                      width: isActive
                        ? "clamp(55px, 8.54vw, 123px)"
                        : "clamp(35px, 6.94vw, 100px)",
                      height: isActive
                        ? "clamp(55px, 8.54vw, 123px)"
                        : "clamp(35px, 6.94vw, 100px)",
                      borderRadius: isActive ? 19 : 14,
                      opacity: isActive ? 1 : 0.4,
                    }}
                  >
                    <Image
                      src={member.img}
                      alt={member.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    {isActive ? (
                      <div
                        className="absolute inset-0 mix-blend-hue"
                        style={{
                          background:
                            "linear-gradient(136deg,#f7591c 0%,#ff8252 100%)",
                        }}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-[#3f0f18] mix-blend-multiply opacity-100" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Next Arrow */}
          <button
            onClick={() => setActive((a) => (a + 1) % team.length)}
            className="absolute right-0 bottom-[12px] md:bottom-[36.5px] z-10 shrink-0 rotate-180 opacity-70 transition-opacity hover:opacity-100"
          >
            <Image
              src={ARROW}
              alt="Next"
              width={50}
              height={50}
              className="w-[30px] md:w-[50px] h-auto"
              unoptimized
            />
          </button>
        </div>
      </div>

      {/* ── Newsletter — uses smaller padding so both columns fit ── */}
      <div
        className="relative z-10  mx-auto w-full max-w-[1440px]"
        style={{
          marginTop: 150,
          paddingBottom: "clamp(56px, 7.5vw, 108px)",
          paddingLeft: "clamp(24px, 3.33vw, 48px)",
          paddingRight: "clamp(24px, 3.33vw, 48px)",
        }}
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <p
            style={{
              fontFamily: "var(--font-geist), Geist, sans-serif",
              fontSize: "clamp(15px, 2.08vw, 30px)",
              fontWeight: 500,
              lineHeight: 1.25,
              letterSpacing: "-0.04em",
              color: "#fff",
              maxWidth: 480,
            }}
          >
            Join leaders across the GCC and beyond who get our latest thinking
            on Total Rewards, Talent Strategy and the future of HR
          </p>

          <div
            className="relative flex items-center overflow-hidden"
            style={{
              height: 61,
              borderRadius: 1000,
              background: "rgba(217,217,217,0.22)",
              width: "clamp(280px, 35vw, 504px)",
              flexShrink: 0,
            }}
          >
            <input
              type="email"
              placeholder="Enter Your Email"
              className="flex-1 bg-transparent pl-6 text-white outline-none placeholder:text-white/60"
              style={{
                fontFamily: "var(--font-geist), Geist, sans-serif",
                fontSize: 16,
                fontWeight: 400,
                letterSpacing: "-0.04em",
                paddingLeft: 20,
              }}
            />
            <button
              className="absolute right-0 flex h-full items-center justify-center transition-opacity hover:opacity-90"
              style={{
                width: 140,
                background: "#f7591c",
                borderRadius: 1000,
                fontFamily: "var(--font-geist), Geist, sans-serif",
                fontSize: 15,
                fontWeight: 500,
                color: "#fff",
              }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
