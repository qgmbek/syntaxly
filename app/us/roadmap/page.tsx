"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
} from "react";

import { ArrowUpRight, ArrowDown } from "@phosphor-icons/react";

import styles from "./Roadmap.module.css";

const UPDATED = "October 6, 2026";

const FIRST_OPEN = "Search every block";

const LEAD =
  "What is live, what is being built and what is still an idea. It is a plan, not a promise.";

const TITLE_TONES = [
  "#ffd84d",
  "#ff7ab8",
  "#8ab6ff",
  "#ff9a5c",
  "#b5f23d",
  "#ffffff",
  "#ffd84d",
  "#ff7ab8",
  "#8ab6ff",
  "#ff9a5c",
];

type Status = "live" | "making" | "planned" | "exploring";

const STATUS: Record<Status, string> = {
  live: "Live",
  making: "In the making",
  planned: "Planned",
  exploring: "Exploring",
};

type Item = {
  title: string;
  status: Status;
  text: string;
  detail: string;
  link?: [string, string];
};

const COLS: { n: number; title: string; items: Item[] }[] = [
  {
    n: 1,
    title: "Now",
    items: [
      {
        title: "Search every block",
        status: "live",
        text: "One shortcut scans every column.",
        detail:
          "Matches titles and code, highlights what it found, and jumps straight to the block.",
        link: ["/syntax", "Open Syntaxly"],
      },
      {
        title: "Unique filter",
        status: "live",
        text: "Hide what every language shares.",
        detail:
          "Keeps only the syntax that is unique to the language, so you see what is worth relearning.",
        link: ["/syntax", "Open Syntaxly"],
      },
      {
        title: "Overview mode",
        status: "live",
        text: "The whole language in narrow strips.",
        detail:
          "Collapse every column to see everything at once, then expand the one you need.",
        link: ["/syntax", "Open Syntaxly"],
      },
      {
        title: "Three themes",
        status: "live",
        text: "Same layout, different mood.",
        detail:
          "Default, Monochrome and Fun, all driven by one set of color variables.",
      },
      {
        title: "Keyboard first",
        status: "live",
        text: "Arrows, search, focus mode, Esc.",
        detail:
          "Move between blocks and columns, resize the code and close anything without leaving the home row.",
        link: ["/us/features", "See the features"],
      },
    ],
  },
  {
    n: 2,
    title: "Next",
    items: [
      {
        title: "Windows app",
        status: "making",
        text: "The workspace in a window of its own.",
        detail: "The same columns and shortcuts, packaged as a Windows app.",
        link: ["/us/download", "See the download page"],
      },
      {
        title: "iOS app",
        status: "making",
        text: "Blocks built for thumbs.",
        detail: "The same blocks and breakdowns, designed for touch.",
        link: ["/us/download", "See the download page"],
      },
      {
        title: "Android app",
        status: "making",
        text: "Blocks built for thumbs.",
        detail: "The same blocks and breakdowns, designed for touch.",
        link: ["/us/download", "See the download page"],
      },
      {
        title: "More languages",
        status: "planned",
        text: "Starting with the familiar ones.",
        detail:
          "Starting with the languages people come back to most, then widening from there.",
      },
    ],
  },
  {
    n: 3,
    title: "Later",
    items: [
      {
        title: "Libraries & frameworks",
        status: "exploring",
        text: "The tools people reach for next.",
        detail:
          "Beyond languages, the libraries and frameworks where syntax is easiest to forget.",
      },
      {
        title: "A public API",
        status: "exploring",
        text: "The data behind Syntaxly, open to build on.",
        detail:
          "First agree on the scope and the shape of the data, then open it up.",
      },
      {
        title: "Your requests",
        status: "exploring",
        text: "Tell us what's missing.",
        detail: "Suggest a syntax or a feature and it can go on this board.",
        link: ["/us/contact", "Get in touch"],
      },
    ],
  },
];

const at = (seconds: number, distance?: number) =>
  ({
    "--delay": `${seconds}s`,
    ...(distance ? { "--dist": `${distance}px` } : {}),
  }) as CSSProperties;

const trackPointer = (e: MouseEvent<HTMLElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
};

const letters = (text: string, line: number) => {
  let n = 0;

  return text.split(" ").map((word, w, all) => (
    <span key={w}>
      <span className={styles.word}>
        {word.split("").map((letter) => {
          const i = n++;

          return (
            <span
              key={i}
              aria-hidden="true"
              className={styles.letter}
              style={
                {
                  "--i": i,
                  "--l": line,
                  "--tone": TITLE_TONES[i % TITLE_TONES.length],
                } as CSSProperties
              }
            >
              {letter}
            </span>
          );
        })}
      </span>
      {w < all.length - 1 ? " " : ""}
    </span>
  ));
};

export default function Roadmap() {
  const [open, setOpen] = useState<string | null>(null);
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = root.current?.querySelectorAll("[data-reveal]");

    if (!els) return;

    let timer: ReturnType<typeof setTimeout> | undefined;

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;

          e.target.setAttribute("data-in", "");
          io.unobserve(e.target);

          if (e.target.hasAttribute("data-first")) {
            timer = setTimeout(
              () => setOpen((current) => current ?? FIRST_OPEN),
              1300,
            );
          }
        }),
      { threshold: 0.15 },
    );

    els.forEach((el) => io.observe(el));

    return () => {
      io.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const vh = window.innerHeight;
      const max = Math.max(1, el.offsetHeight - vh);

      el.style.setProperty("--hp", Math.min(1, y / vh).toFixed(4));
      el.style.setProperty("--pp", Math.min(1, y / max).toFixed(4));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <main className={styles.page} ref={root}>
      <span className={`${styles.decor} ${styles.d1}`} aria-hidden="true" />
      <span className={`${styles.decor} ${styles.d2}`} aria-hidden="true" />
      <span className={`${styles.decor} ${styles.d3}`} aria-hidden="true" />

      <section className={styles.hero}>
        <aside className={styles.rail}>
          <span className={styles.railName}>ROADMAP</span>
        </aside>

        <div className={styles.heroMain} onMouseMove={trackPointer}>
          <div className={styles.orb} />

          <div className={styles.heroInner}>
            <h1 className={styles.title} aria-label="Where it's going.">
              <span className={styles.line}>{letters("Where it's", 0)}</span>

              <span className={styles.line}>
                <em className={styles.hl}>{letters("going.", 1)}</em>
                <span className={styles.sticker} aria-hidden="true">
                  a plan, not a promise
                </span>
              </span>
            </h1>

            <div className={styles.heroFoot}>
              <p className={styles.lead}>
                {LEAD.split(" ").map((word, i) => (
                  <span key={i}>
                    <span
                      className={styles.leadWord}
                      style={{ "--i": i } as CSSProperties}
                    >
                      {word}
                    </span>{" "}
                  </span>
                ))}
              </p>

              <span className={styles.updated}>Updated {UPDATED}</span>

              <a
                href="#board"
                className={`${styles.btn} ${styles.btnA} ${styles.heroBtn}`}
              >
                See the board
                <ArrowDown size={18} weight="bold" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="board">
        <div className={styles.band}>
          <div className={styles.cols}>
            {COLS.map((c, ci) => (
              <div
                key={c.n}
                className={styles.col}
                data-reveal
                {...(c.n === 1 ? { "data-first": "" } : {})}
                style={at(ci * 0.12)}
              >
                <div className={styles.meta}>
                  <span className={styles.metaNum}>{c.n}</span>
                  <h2 className={styles.metaTitle}>{c.title}</h2>
                  <em className={styles.metaCount}>Blocks: {c.items.length}</em>
                </div>

                <div className={styles.main}>
                  {c.items.map((it, i) => {
                    const isOpen = open === it.title;

                    return (
                      <div
                        key={it.title}
                        className={`${styles.block} ${
                          isOpen ? styles.blockOpen : ""
                        }`}
                        style={{ "--i": i } as CSSProperties}
                      >
                        <button
                          className={styles.head}
                          onClick={() => setOpen(isOpen ? null : it.title)}
                          aria-expanded={isOpen}
                        >
                          <span className={styles.tab}>{it.title}</span>

                          <span className={styles.stat}>
                            <i
                              className={`${styles.dot} ${styles[it.status]}`}
                            />
                            {STATUS[it.status]}
                          </span>

                          <span className={styles.text}>{it.text}</span>
                        </button>

                        <div className={styles.panel}>
                          <div className={styles.clip}>
                            <div className={styles.detail}>
                              <p>{it.detail}</p>

                              {it.link && (
                                <a
                                  href={it.link[0]}
                                  className={styles.link}
                                  tabIndex={isOpen ? 0 : -1}
                                >
                                  {it.link[1]}
                                  <ArrowUpRight size={15} weight="bold" />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <svg
          className={`${styles.spark} ${styles.s1}`}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 0C13 8 16 11 24 12C16 13 13 16 12 24C11 16 8 13 0 12C8 11 11 8 12 0Z" />
        </svg>
        <svg
          className={`${styles.spark} ${styles.sp2}`}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 0C13 8 16 11 24 12C16 13 13 16 12 24C11 16 8 13 0 12C8 11 11 8 12 0Z" />
        </svg>

        <h2 className={styles.ctaTitle} data-reveal>
          <span className={styles.mask}>
            <span className={styles.maskIn}>Missing something?</span>
          </span>
        </h2>

        <div className={styles.ctaBtns}>
          <a
            href="/us/contact"
            className={`${styles.btn} ${styles.btnA} ${styles.reveal} ${styles.wipe} ${styles.right}`}
            data-reveal
            style={at(0.4)}
          >
            Tell us
            <ArrowUpRight size={18} weight="bold" />
          </a>

          <a
            href="/syntax"
            className={`${styles.btn} ${styles.btnB} ${styles.reveal} ${styles.wipe} ${styles.right}`}
            data-reveal
            style={at(0.52)}
          >
            Open Syntaxly
          </a>
        </div>
      </section>
    </main>
  );
}