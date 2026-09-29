"use client";

/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TypingAnimation } from "@/components/ui/typing-animation";

export interface ButtonEditProps {
  onClick?: () => void;
}

export function ButtonEdit({ onClick }: ButtonEditProps) {
  return (
    <div className="container mx-auto md:max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-end">
      <button
        onClick={onClick}
        type="button"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-yellow-300 hover:bg-yellow-400 text-zinc-900 text-xs font-black uppercase tracking-widest border-brutal shadow-brutal hover-lift cursor-pointer transition-all type-label"
      >
        <span>✏️</span>
        <span>Edit Template</span>
      </button>
    </div>
  );
}

const ROLES = ["DESIGNER", "DEVELOPER"];

export interface PortfolioProps {
  imageSrc?: string;
}

export default function Portfolio4({ imageSrc }: PortfolioProps = {}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [hoveredJob, setHoveredJob] = useState<number | null>(null);
  const [imgError, setImgError] = useState(false);
  const router = useRouter();

  const _handleEditClick = (templateId: number | string) => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("token");
    console.log("token:", token);

    if (!token) {
      console.log("no token, navigating to login");
      alert("Please login to edit your portfolio");
      router.push("/login");
      return;
    }

    console.log("has token, going to dashboard");
    router.push(`/dashboard/portfolio/${templateId}`);
  };
  void _handleEditClick;

  useEffect(() => {
    // Section active tracker
    const sections = document.querySelectorAll("section[id]");
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { threshold: 0.25 },
    );
    sections.forEach((s) => obs.observe(s));

    // Scroll reveal observer following Never Basic ease-out-expo timing
    const revealElements = document.querySelectorAll(".reveal-item");
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    revealElements.forEach((el) => revealObserver.observe(el));

    return () => {
      obs.disconnect();
      revealObserver.disconnect();
    };
  }, []);

  const links = [
    "home",
    // "about",
    "experience",
    "job",
    "school",
    "skill",
    "contact",
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const defaultProfileImage = "/image.png";
  const currentImageSrc = imageSrc || defaultProfileImage;

  return (
    <div className="bg-zinc-50 text-zinc-900 min-h-screen overflow-x-hidden font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:ital,wdth,wght@0,62..125,100..900;1,62..125,100..900&family=Hanken+Grotesk:ital,wght@0,100..900;1,100..900&family=Geist+Mono:wght@100..900&display=swap');
       
        :root {
          --font-display: 'Archivo', sans-serif;
          --font-sans: 'Hanken Grotesk', sans-serif;
          --font-geist-mono: 'Geist Mono', monospace;
          --ease-out-expo: cubic-bezier(.16, 1, .3, 1);
        }

        section[id] {
          scroll-margin-top: 5rem;
        }

        .type-display, .font-display, .bebas {
          font-family: var(--font-display), 'Archivo', sans-serif;
          font-variation-settings: "wdth" 125;
          text-transform: uppercase;
          letter-spacing: -0.01em;
          font-weight: 900;
          font-stretch: 125%;
        }

        .type-label {
          font-family: var(--font-display), 'Archivo', sans-serif;
          font-variation-settings: "wdth" 125;
          text-transform: uppercase;
          font-weight: 800;
          font-stretch: 125%;
          line-height: 1;
        }

        /* ── Never Basic Reveal Animations (GPU Accelerated, Buttery Smooth) ── */
        @keyframes intro-from-left {
          0% {
            opacity: 0;
            clip-path: inset(0 100% 0 0);
            transform: translate3d(-1.5rem, 0, 0);
          }
          to {
            opacity: 1;
            clip-path: none;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes intro-from-right {
          0% {
            opacity: 0;
            clip-path: inset(0 0 0 100%);
            transform: translate3d(1.5rem, 0, 0);
          }
          to {
            opacity: 1;
            clip-path: none;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes intro-slide-right {
          0% {
            opacity: 0;
            transform: translate3d(2.5rem, 0, 0) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }
        }

        @keyframes intro-spark {
          0% {
            opacity: 0;
            transform: rotate(-60deg) scale(0.2);
          }
          to {
            opacity: 1;
            transform: rotate(0deg) scale(1);
          }
        }

        @keyframes intro-word {
          0% {
            opacity: 0;
            clip-path: inset(-0.2em -0.1em 100%);
            transform: translate3d(0, 0.7em, 0);
          }
          to {
            opacity: 1;
            clip-path: inset(-0.2em -0.1em);
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes intro-tighten {
          0% {
            letter-spacing: 0.08em;
          }
          to {
            letter-spacing: -0.01em;
          }
        }

        @keyframes intro-soft {
          0% {
            opacity: 0;
            transform: translate3d(0, 1.25rem, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        /* Typewriter blinking caret */
        @keyframes cursor-blink {
          0%, 45% {
            opacity: 1;
          }
          50%, 95% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        .cursor-blink {
          animation: cursor-blink 0.95s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        .intro {
          animation-duration: 1.4s;
          animation-timing-function: var(--ease-out-expo);
          animation-fill-mode: both;
          will-change: transform, opacity;
        }

        .intro-from-left {
          animation-name: intro-from-left;
        }

        .intro-from-right {
          animation-name: intro-from-right;
        }

        .intro-slide-right {
          animation-name: intro-slide-right;
          animation-duration: 1.5s;
          animation-timing-function: var(--ease-out-expo);
          animation-fill-mode: both;
          will-change: transform, opacity;
        }

        .intro-spark {
          animation-name: intro-spark;
          animation-duration: 1.6s;
          animation-timing-function: var(--ease-out-expo);
          animation-fill-mode: both;
        }

        .intro-soft {
          animation-name: intro-soft;
          animation-duration: 1.4s;
          animation-timing-function: var(--ease-out-expo);
          animation-fill-mode: both;
          will-change: transform, opacity;
        }

        .intro-title {
          animation: intro-tighten 2.2s var(--ease-out-expo) 0.3s both;
        }

        .intro-word {
          animation: intro-word 1.4s var(--ease-out-expo) var(--d, 0s) both;
          display: inline-block;
          will-change: transform, opacity;
        }

        /* Scroll reveal styling - GPU transform based */
        .reveal-item {
          opacity: 0;
          transform: translate3d(0, 2rem, 0);
          transition: opacity 1.2s var(--ease-out-expo), transform 1.2s var(--ease-out-expo);
          will-change: opacity, transform;
        }

        .reveal-item.is-revealed {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        @media (prefers-reduced-motion: reduce) {
          .intro, .intro-title, .intro-word, .intro-spark, .intro-soft, .reveal-item, .cursor-blink {
            animation: none !important;
            transition: none !important;
            opacity: 1 !important;
            transform: none !important;
            clip-path: none !important;
          }
        }

        .border-brutal { border: 3px solid #18181b; }
        .shadow-brutal { box-shadow: 6px 6px 0px #18181b; }
        .shadow-brutal-coral { box-shadow: 6px 6px 0px #f43f5e; }
        .shadow-brutal-yellow { box-shadow: 6px 6px 0px #eab308; }
        .hover-lift { transition: transform 0.15s ease, box-shadow 0.15s ease; }
        .hover-lift:hover { transform: translate(-3px, -3px); box-shadow: 9px 9px 0px #18181b; }
        .hover-lift-coral:hover { transform: translate(-3px, -3px); box-shadow: 9px 9px 0px #f43f5e; }
        .marquee { animation: marquee 18s linear infinite; }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .diagonal-bg { background: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(234,179,8,0.08) 10px, rgba(234,179,8,0.08) 20px); }
        .tag-pill {
          font-family: var(--font-display), 'Archivo', sans-serif;
          font-variation-settings: "wdth" 125;
          font-stretch: 125%;
          letter-spacing: 0.05em;
        }
      `}</style>

      {/* ── FIXED NAVBAR ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-50/95 backdrop-blur-md border-b-4 border-zinc-900">
        <nav className="w-full">
          <div className="container mx-auto md:max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Brand with Left Reveal */}
              <button
                onClick={() => scrollTo("home")}
                className="bebas text-3xl text-zinc-900 tracking-wider cursor-pointer intro intro-from-left inline-flex items-center"
              >
                HENG
                <span className="text-rose-500 inline-block intro-spark ml-0.5">
                  *
                </span>
              </button>

              {/* Desktop Menu with Staggered Right Reveal */}
              <div className="hidden lg:flex items-center gap-0">
                {links.map((l, index) => (
                  <button
                    key={l}
                    onClick={() => scrollTo(l)}
                    style={
                      { "--d": `${150 + index * 80}ms` } as React.CSSProperties
                    }
                    className={`intro intro-from-right px-4 py-2 text-xs font-bold uppercase tracking-widest border-r-2 border-zinc-200 transition-all duration-150 cursor-pointer
                        ${active === l ? "bg-zinc-900 text-zinc-50" : "hover:bg-yellow-300 text-zinc-600 hover:text-zinc-900"}`}
                  >
                    {l}
                  </button>
                ))}
                <button
                  onClick={() => scrollTo("contact")}
                  style={
                    {
                      "--d": `${150 + links.length * 80}ms`,
                    } as React.CSSProperties
                  }
                  className="intro intro-from-right ml-4 px-5 py-2 bg-rose-500 text-white text-xs font-bold uppercase tracking-widest border-brutal shadow-brutal hover-lift cursor-pointer type-label"
                >
                  Hire Me
                </button>
              </div>

              {/* Mobile Toggle */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden w-10 h-10 border-brutal flex flex-col items-center justify-center gap-1.5 cursor-pointer intro intro-from-right"
                aria-label="Toggle Menu"
              >
                <span
                  className={`block w-5 h-0.5 bg-zinc-900 transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
                />
                <span
                  className={`block w-5 h-0.5 bg-zinc-900 transition-all ${menuOpen ? "opacity-0" : ""}`}
                />
                <span
                  className={`block w-5 h-0.5 bg-zinc-900 transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
                />
              </button>
            </div>
          </div>

          {menuOpen && (
            <div className="lg:hidden border-t-4 border-zinc-900 bg-zinc-50 shadow-brutal animate-in fade-in slide-in-from-top-2">
              {links.map((l) => (
                <button
                  key={l}
                  onClick={() => scrollTo(l)}
                  className={`w-full text-left px-6 py-4 text-sm font-bold uppercase tracking-widest border-b-2 border-zinc-200 transition cursor-pointer
                      ${active === l ? "bg-zinc-900 text-yellow-300" : "hover:bg-yellow-300 text-zinc-700"}`}
                >
                  {l}
                </button>
              ))}
            </div>
          )}
        </nav>
      </header>

      {/* Main content offset for fixed navbar */}
      <main className="pt-16">
        {/* <ButtonEdit onClick={() => handleEditClick(1)} /> */}

        {/* ── HOME ── */}
        <section
          id="home"
          className="py-8 diagonal-bg border-b-4 border-zinc-900"
        >
          <div className="container mx-auto md:max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* Big title — spans 7 cols */}
              <div className="lg:col-span-7 self-center">
                <div
                  style={{ "--d": "200ms" } as React.CSSProperties}
                  className="intro intro-soft inline-flex items-center gap-2 bg-yellow-300 border-brutal px-4 py-2 mb-6 shadow-brutal"
                >
                  <span className="w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-widest type-label">
                    Available for Work
                  </span>
                </div>

                <div className="intro-title">
                  <h1 className="bebas text-[clamp(2.75rem,8vw,6rem)] leading-none text-zinc-900 mb-0">
                    <span
                      className="intro-word"
                      style={{ "--d": "350ms" } as React.CSSProperties}
                    >
                      HELLO,
                    </span>
                  </h1>
                  <h1 className="bebas text-[clamp(2.75rem,8vw,6rem)] leading-none mb-0">
                    <span
                      className="intro-word"
                      style={{ "--d": "650ms" } as React.CSSProperties}
                    >
                      <span className="text-rose-500">I&apos;M HENG</span>
                    </span>
                  </h1>
                  <h1 className="bebas text-[clamp(2.75rem,8vw,5rem)] leading-none text-zinc-900 mb-0 min-h-[1.1em] flex items-center select-none">
                    <TypingAnimation
                      as="span"
                      words={ROLES}
                      loop
                      blinkCursor={true}
                      pauseDelay={2000}
                      typeSpeed={70}
                      deleteSpeed={35}
                      startOnView={false}
                      cursorClassName="text-rose-500 ml-1.5"
                      className="inline-flex items-center"
                    >
                      DESIGNER
                    </TypingAnimation>
                  </h1>
                </div>

                <p
                  style={{ "--d": "1250ms" } as React.CSSProperties}
                  className="intro intro-soft text-zinc-600 text-base sm:text-lg max-w-lg leading-relaxed mt-6 mb-10 font-normal"
                >
                  I specialize in designing modern web and mobile interfaces. I
                  believe good design is simple, purposeful, and impactful.
                </p>

                <div
                  style={{ "--d": "1450ms" } as React.CSSProperties}
                  className="intro intro-soft flex flex-wrap mb-6 gap-4"
                >
                  <button
                    onClick={() => scrollTo("experience")}
                    className="px-8 py-4 bg-zinc-900 text-zinc-50 text-sm font-bold uppercase tracking-widest border-brutal shadow-brutal hover-lift cursor-pointer type-label"
                  >
                    My Work
                  </button>
                  <button
                    onClick={() => scrollTo("contact")}
                    className="px-8 py-4 bg-yellow-300 text-zinc-900 text-sm font-bold uppercase tracking-widest border-brutal shadow-brutal-coral hover-lift-coral transition-all duration-150 cursor-pointer type-label"
                  >
                    Let&apos;s Talk
                  </button>
                </div>
              </div>

              {/* Right side — image with reveal, restored yellow background, and smooth hover */}
              <div
                style={{ "--d": "650ms" } as React.CSSProperties}
                className="intro intro-slide-right lg:col-span-5 flex flex-col gap-6 group cursor-pointer"
              >
                <div className="relative mt-4 mr-4">
                  {/* Yellow brutalist offset background frame */}
                  <div
                    className="absolute -top-4 -right-4 w-full h-full bg-yellow-300 border-brutal z-0 transition-transform duration-300 ease-out group-hover:translate-x-1.5 group-hover:translate-y-1.5"
                    aria-hidden="true"
                  />
                  {imgError ? (
                    <div className="relative z-10 w-full aspect-[4/5] bg-zinc-100 border-brutal flex flex-col items-center justify-center p-6 text-center select-none shadow-inner transition-transform duration-300 ease-out group-hover:-translate-x-1 group-hover:-translate-y-1">
                      <div className="w-24 h-24 rounded-full border-brutal bg-rose-500 text-white flex items-center justify-center text-4xl bebas shadow-brutal mb-4">
                        H
                      </div>
                      <span className="bebas text-3xl text-zinc-900 tracking-wider">
                        HENG
                      </span>
                      <span className="text-xs font-black uppercase tracking-widest text-zinc-500 mt-1">
                        UI/UX Designer
                      </span>
                      <span className="mt-4 px-3 py-1 bg-yellow-300 border-2 border-zinc-900 text-[10px] font-black uppercase tracking-widest type-label">
                        Profile Avatar
                      </span>
                    </div>
                  ) : (
                    <img
                      src={currentImageSrc}
                      alt="Profile"
                      onError={() => setImgError(true)}
                      className="relative z-10 w-full aspect-[4/5] object-cover grayscale contrast-110 border-brutal bg-zinc-200 transition-transform duration-300 ease-out group-hover:-translate-x-1 group-hover:-translate-y-1"
                    />
                  )}
                  {/* Role badge */}
                  <div className="absolute bottom-4 left-4 z-20 bg-rose-500 border-brutal px-4 py-2 shadow-brutal transition-transform duration-300 ease-out group-hover:-translate-y-0.5">
                    <p className="text-white text-xs font-black uppercase tracking-widest type-label">
                      SENIOR UI/UX DESIGNER
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── EXPERIENCE ── */}
        <section id="experience" className="py-16 bg-zinc-50">
          <div className="container mx-auto md:max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="reveal-item flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16 border-b-4 border-zinc-900 pb-6">
              <div>
                <span className="bebas text-rose-500 text-xl tracking-widest block mb-2">
                  Experience
                </span>
                <h2 className="bebas text-5xl sm:text-6xl text-zinc-900 leading-none">
                  MY JOURNEY
                </h2>
              </div>
              {/* <span className="bebas text-8xl text-zinc-200 leading-none select-none hidden lg:block">
                03
              </span> */}
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Senior Designer",
                  company: "PixelCraft Studio",
                  period: "2022–Now",
                  desc: "Leading design direction for enterprise digital products. Managing a team of 4 designers.",
                  current: true,
                },
                {
                  title: "UI/UX Designer",
                  company: "Webflow Agency",
                  period: "2019–2022",
                  desc: "Designed user-centered interfaces improving engagement by 40% across web and mobile.",
                },
                {
                  title: "Visual Designer",
                  company: "Freelance",
                  period: "2017–2019",
                  desc: "Brand identities, landing pages, and UI kits for 20+ international clients.",
                },
              ].map(({ title, company, period, desc, current }, i) => (
                <div
                  key={title}
                  style={{ transitionDelay: `${i * 200}ms` }}
                  className={`reveal-item border-brutal bg-white hover-lift p-8 ${current ? "shadow-brutal-coral" : "shadow-brutal"}`}
                >
                  {current ? (
                    <div className="inline-flex items-center gap-2 bg-yellow-300 border-2 border-zinc-900 px-3 py-1 mb-5">
                      <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse" />
                      <span className="text-xs font-black uppercase tracking-widest type-label">
                        Current
                      </span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-2 bg-yellow-300 border-2 border-zinc-900 px-3 py-1 mb-5">
                      <span className="w-1.5 h-1.5 bg-zinc-900 rounded-full" />
                      <span className="text-xs font-black uppercase tracking-widest type-label font-mono">
                        {period}
                      </span>
                    </div>
                  )}

                  <h4 className="bebas text-2xl text-zinc-900 leading-none mb-1">
                    {title}
                  </h4>
                  <p className="text-rose-500 text-sm font-black uppercase tracking-widest mb-1 type-label">
                    {company}
                  </p>
                  <p className="text-zinc-400 text-xs font-bold uppercase mb-5 font-mono">
                    {period}
                  </p>
                  <p className="text-zinc-600 text-sm leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── JOB ── */}
        <section
          id="job"
          className="py-16 bg-yellow-300 border-y-4 border-zinc-900"
        >
          <div className="container mx-auto md:max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="reveal-item flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16">
              <div>
                <span className="bebas text-zinc-700 text-xl tracking-widest block mb-2">
                  Job History
                </span>
                <h2 className="bebas text-5xl sm:text-6xl text-zinc-900 leading-none">
                  WHERE I&apos;VE
                  <br />
                  WORKED
                </h2>
              </div>
            </div>

            <div className="space-y-0 border-brutal overflow-hidden bg-white">
              {[
                {
                  no: "01",
                  company: "PixelCraft Studio",
                  role: "Lead Designer",
                  period: "2022–Present",
                },
                {
                  no: "02",
                  company: "Webflow Agency",
                  role: "Product Designer",
                  period: "2019–2022",
                },
                {
                  no: "03",
                  company: "Creative Collective",
                  role: "Junior UI Designer",
                  period: "2017–2019",
                },
                {
                  no: "04",
                  company: "Freelance",
                  role: "Visual Designer",
                  period: "2015–2017",
                },
              ].map(({ no, company, role, period }, i) => (
                <div
                  key={company}
                  onMouseEnter={() => setHoveredJob(i)}
                  onMouseLeave={() => setHoveredJob(null)}
                  style={{ transitionDelay: `${i * 160}ms` }}
                  className={`reveal-item flex items-center gap-6 sm:gap-10 px-6 sm:px-10 py-6 border-b-4 border-zinc-900 transition-all duration-200 cursor-default
                    ${hoveredJob === i ? "bg-zinc-900 text-yellow-300" : "bg-transparent text-zinc-900"}
                    ${i === 3 ? "border-b-0" : ""}`}
                >
                  <span
                    className={`bebas text-4xl sm:text-5xl min-w-[3.5rem] leading-none ${hoveredJob === i ? "text-yellow-300" : "text-zinc-400"}`}
                  >
                    {no}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h4 className="bebas text-2xl sm:text-3xl leading-none truncate">
                      {company}
                    </h4>
                    <p
                      className={`text-sm font-bold uppercase tracking-widest mt-1 ${hoveredJob === i ? "text-rose-400" : "text-zinc-600"}`}
                    >
                      {role}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 text-sm font-black uppercase tracking-widest hidden sm:block font-mono ${hoveredJob === i ? "text-yellow-300" : "text-zinc-600"}`}
                  >
                    {period}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SCHOOL ── */}
        <section id="school" className="py-16 bg-zinc-50">
          <div className="container mx-auto md:max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="reveal-item flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16 border-b-4 border-zinc-900 pb-6">
              <div>
                <span className="bebas text-rose-500 text-xl tracking-widest block mb-2">
                  Education
                </span>
                <h2 className="bebas text-5xl sm:text-6xl text-zinc-900 leading-none">
                  ACADEMIC
                  <br />
                  BACKGROUND
                </h2>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {[
                {
                  icon: "🎓",
                  degree: "Bachelor of Design",
                  school: "Royal Institute of Design",
                  period: "2015–2019",
                  badge: "GPA 3.9 / 4.0",
                  color: "border-l-8 border-l-rose-500",
                },
                {
                  icon: "🏅",
                  degree: "UI/UX Bootcamp",
                  school: "Interaction Design Foundation",
                  period: "2020",
                  badge: "Excellence Award",
                  color: "border-l-8 border-l-yellow-400",
                },
                {
                  icon: "🎬",
                  degree: "Motion Design Course",
                  school: "School of Motion",
                  period: "2021",
                  badge: "Advanced Level",
                  color: "border-l-8 border-l-zinc-900",
                },
                {
                  icon: "📐",
                  degree: "Design Systems",
                  school: "Figma Academy",
                  period: "2022",
                  badge: "Professional Cert.",
                  color: "border-l-8 border-l-rose-500",
                },
              ].map(({ icon, degree, school, period, badge, color }, i) => (
                <div
                  key={degree}
                  style={{ transitionDelay: `${i * 200}ms` }}
                  className={`reveal-item bg-white border-brutal shadow-brutal hover-lift flex gap-5 p-7 ${color}`}
                >
                  <span className="text-4xl shrink-0 mt-1">{icon}</span>
                  <div>
                    <h4 className="bebas text-2xl text-zinc-900 leading-tight">
                      {degree}
                    </h4>
                    <p className="text-rose-500 text-sm font-black uppercase tracking-widest mb-1 type-label">
                      {school}
                    </p>
                    <p className="text-zinc-400 text-xs font-bold uppercase mb-4 font-mono">
                      {period}
                    </p>
                    <span className="inline-block bg-yellow-300 border-2 border-zinc-900 px-4 py-1 text-xs font-black uppercase tracking-widest type-label">
                      {badge}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SKILL ── */}
        <section id="skill" className="py-16 bg-zinc-900 text-white">
          <div className="container mx-auto md:max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="reveal-item flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16 border-b-4 border-zinc-600 pb-6">
              <div>
                <span className="bebas text-yellow-300 text-xl tracking-widest block mb-2">
                  Skills
                </span>
                <h2 className="bebas text-5xl sm:text-6xl text-white leading-none">
                  WHAT I DO
                  <br />
                  <span className="text-rose-500">BEST</span>
                </h2>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-16">
              {/* Skill bars */}
              <div className="space-y-8">
                {[
                  { name: "UI Design", pct: 95, tools: "Figma · Adobe XD" },
                  { name: "Frontend Dev", pct: 85, tools: "React · Tailwind" },
                  { name: "Branding", pct: 80, tools: "Logo · Identity" },
                  { name: "Prototyping", pct: 90, tools: "Framer · InVision" },
                  { name: "Motion Design", pct: 72, tools: "After Effects" },
                ].map(({ name, pct, tools }, i) => (
                  <div
                    key={name}
                    style={{ transitionDelay: `${i * 150}ms` }}
                    className="reveal-item group"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-3">
                        <span className="bebas text-2xl text-white group-hover:text-yellow-300 transition-colors">
                          {name}
                        </span>
                        <span className="text-zinc-400 text-xs font-bold uppercase tracking-widest">
                          {tools}
                        </span>
                      </div>
                      <span className="bebas text-2xl text-rose-500 font-mono">
                        {pct}%
                      </span>
                    </div>
                    <div className="h-4 bg-zinc-800 border-2 border-zinc-600 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-yellow-300 to-rose-500 border-r-2 border-zinc-900 transition-all duration-1000 ease-out"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Tool grid — brutalist tiles */}
              <div className="reveal-item grid grid-cols-3 gap-0 border-brutal overflow-hidden self-start">
                {[
                  { label: "Figma", emoji: "🎨" },
                  { label: "React", emoji: "⚛️" },
                  { label: "Tailwind", emoji: "💨" },
                  { label: "Adobe XD", emoji: "✏️" },
                  { label: "Framer", emoji: "🖱️" },
                  { label: "After FX", emoji: "🎬" },
                ].map(({ label, emoji }, i) => (
                  <div
                    key={label}
                    className={`p-6 text-center border-zinc-700 hover:bg-yellow-300 hover:text-zinc-900 transition-all duration-200 cursor-default group
                      ${i % 3 !== 2 ? "border-r-2" : ""}
                      ${i < 3 ? "border-b-2" : ""}
                      bg-zinc-800`}
                  >
                    <span className="text-2xl block mb-2">{emoji}</span>
                    <span className="bebas text-sm tracking-widest text-zinc-300 group-hover:text-zinc-900 transition-colors">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="py-16 bg-zinc-50">
          <div className="container mx-auto md:max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Left side */}
              <div className="reveal-item">
                <span className="bebas text-rose-500 text-xl tracking-widest block mb-4">
                  Contact
                </span>
                <h2 className="bebas text-5xl sm:text-6xl lg:text-7xl leading-none text-zinc-900 mb-8">
                  LET&apos;S
                  <br />
                  <span className="text-rose-500">BUILD</span>
                  <br />
                  TOGETHER
                </h2>
                <p className="text-zinc-600 text-base leading-relaxed mb-10 max-w-sm">
                  Have a project in mind? I&apos;d love to hear about it. Drop
                  me a message and let&apos;s make something unforgettable.
                </p>
                <div className="space-y-4">
                  {[
                    { label: "Email", value: "ngovkimsouheng@design.io" },
                    {
                      label: "LinkedIn",
                      value: "linkedin.com/in/hengdesigner",
                    },
                    { label: "Dribbble", value: "dribbble.com/hengdesigner" },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      className="flex items-center gap-4 border-b-2 border-zinc-200 pb-4"
                    >
                      <span className="bebas text-rose-500 text-sm tracking-widest w-20">
                        {label}
                      </span>
                      <span className="text-zinc-700 text-sm font-bold font-mono">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form */}
              <div
                style={{ transitionDelay: "280ms" }}
                className="reveal-item bg-white border-brutal shadow-brutal p-8 sm:p-10"
              >
                <div className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-black uppercase tracking-widest text-zinc-700 mb-2 type-label">
                        Name
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        className="w-full bg-zinc-50 border-2 border-zinc-300 focus:border-zinc-900 text-zinc-900 placeholder-zinc-400 px-4 py-3 outline-none transition-all text-sm font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black uppercase tracking-widest text-zinc-700 mb-2 type-label">
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="john@email.com"
                        className="w-full bg-zinc-50 border-2 border-zinc-300 focus:border-zinc-900 text-zinc-900 placeholder-zinc-400 px-4 py-3 outline-none transition-all text-sm font-medium"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-zinc-700 mb-2 type-label">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="Project inquiry…"
                      className="w-full bg-zinc-50 border-2 border-zinc-300 focus:border-zinc-900 text-zinc-900 placeholder-zinc-400 px-4 py-3 outline-none transition-all text-sm font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-zinc-700 mb-2 type-label">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Tell me about your project…"
                      className="w-full bg-zinc-50 border-2 border-zinc-300 focus:border-zinc-900 text-zinc-900 placeholder-zinc-400 px-4 py-3 outline-none transition-all text-sm font-medium resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 bg-rose-500 text-white font-black text-sm uppercase tracking-widest border-brutal shadow-brutal hover-lift transition-all duration-150 cursor-pointer type-label"
                  >
                    Send Message →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-zinc-900 border-t-4 border-zinc-700 py-8">
        <div className="container mx-auto md:max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="bebas text-2xl text-yellow-300 tracking-wider">
            SOK
            <span className="text-rose-500 inline-block intro-spark ml-0.5">
              *
            </span>
          </span>
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">
            © 2026 Sok Designer — All rights reserved
          </p>
          <button
            onClick={() => scrollTo("home")}
            className="text-zinc-500 hover:text-yellow-300 text-xs font-black uppercase tracking-widest transition-colors cursor-pointer type-label"
          >
            ↑ Top
          </button>
        </div>
      </footer>
    </div>
  );
}
