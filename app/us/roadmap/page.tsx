"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
} from "react";

import { ArrowUpRight, ArrowDown } from "@phosphor-icons/react";

import styles from "./Roadmap.module.css";
import {
  Arrow,
  Turtle,
  Penguin,
  Snail,
  Sparkle,
  Braces,
  Coffee,
  Rocket,
} from "../../ui/HandDrawn";

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

const STATUS_CLASS: Record<Status, string> = {
  live: "sLive",
  making: "sMaking",
  planned: "sPlanned",
  exploring: "sExploring",
};

const STATUS_ORDER: Status[] = ["live", "making", "planned", "exploring"];

type Filter = "all" | Status;

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "live", label: "Live" },
  { key: "making", label: "In the making" },
  { key: "planned", label: "Planned" },
  { key: "exploring", label: "Exploring" },
];

const LEGEND = [
  {
    status: "exploring" as Status,
    Doodle: Sparkle,
    fill: "var(--h-butter)",
    text: "An idea we are thinking about. No promises yet.",
  },
  {
    status: "planned" as Status,
    Doodle: Braces,
    fill: "var(--h-cyan)",
    text: "We want to build it, and it has a place in the queue.",
  },
  {
    status: "making" as Status,
    Doodle: Coffee,
    fill: "var(--h-pink)",
    text: "Being built right now, one cup of coffee at a time.",
  },
  {
    status: "live" as Status,
    Doodle: Rocket,
    fill: "var(--paper-2)",
    text: "Shipped. Open Syntaxly and try it.",
  },
];

type Item = {
  title: string;
  status: Status;
  text: string;
  detail: string;
  link?: [string, string];
};

const COLS: { n: number; title: string; sub: string; items: Item[] }[] = [
  {
    n: 1,
    title: "now",
    sub: "what you can use today",
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
    title: "next",
    sub: "what we are building and planning",
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
    title: "later",
    sub: "ideas we are exploring",
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

const ALL_ITEMS = COLS.flatMap((c) => c.items);

const LIVE_TITLES = ALL_ITEMS.filter((i) => i.status === "live").map(
  (i) => i.title,
);

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

function Glyph({ status }: { status: Status }) {
  const paths: Record<Status, string> = {
    live: "M4 14 L10 20 L22 5",
    making: "M5 22 L6 16 L18 4 L22 8 L10 20 Z M15 7 L19 11",
    planned: "M6 23 V4 M6 5 C12 2 14 8 20 5 V15 C14 18 12 12 6 15",
    exploring: "M8 9 C8 3 19 3 19 9 C19 14 13 13 13 18 M13 22 L13.2 22.2",
  };

  return (
    <svg
      className={styles.glyph}
      viewBox="0 0 26 26"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={paths[status]} />
    </svg>
  );
}

export default function Roadmap() {
  const [open, setOpen] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("all");

  const root = useRef<HTMLElement>(null);
  const journey = useRef<HTMLDivElement>(null);
  const io = useRef<IntersectionObserver | null>(null);
  const chipsRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const counts = useMemo(() => {
    const m: Record<Filter, number> = {
      all: ALL_ITEMS.length,
      live: 0,
      making: 0,
      planned: 0,
      exploring: 0,
    };

    ALL_ITEMS.forEach((i) => {
      m[i.status] += 1;
    });

    return m;
  }, []);

  const chapters = useMemo(
    () =>
      COLS.map((c) => ({
        ...c,
        items: c.items.filter((i) => filter === "all" || i.status === filter),
      })).filter((c) => c.items.length > 0),
    [filter],
  );

  useEffect(() => {
    const el = root.current;

    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.setAttribute("data-in", "");
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.15 },
    );

    io.current = observer;

    el.querySelectorAll("[data-reveal]").forEach((n) => observer.observe(n));

    const timer = setTimeout(
      () => setOpen((current) => current ?? FIRST_OPEN),
      2600,
    );

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      io.current = null;
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

      const j = journey.current;

      if (j) {
        const r = j.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (vh * 0.6 - r.top) / r.height));

        j.style.setProperty("--tp", p.toFixed(4));
      }
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

  useEffect(() => {
    const wrap = chipsRef.current;
    const idx = FILTERS.findIndex((f) => f.key === filter);
    const el = chipRefs.current[idx];

    if (!wrap || !el) return;

    const place = (snap: boolean) => {
      if (snap) wrap.style.setProperty("--pt", "0s");

      wrap.style.setProperty("--tx", `${el.offsetLeft}px`);
      wrap.style.setProperty("--ty", `${el.offsetTop}px`);
      wrap.style.setProperty("--tw", `${el.offsetWidth}px`);
      wrap.style.setProperty("--th", `${el.offsetHeight}px`);
      wrap.style.setProperty("--to", "1");

      if (snap) {
        requestAnimationFrame(() =>
          requestAnimationFrame(() => wrap.style.removeProperty("--pt")),
        );
      }
    };

    place(wrap.style.getPropertyValue("--to") !== "1");

    const onResize = () => place(true);

    window.addEventListener("resize", onResize);
    document.fonts?.ready.then(onResize);

    return () => window.removeEventListener("resize", onResize);
  }, [filter]);

  const watch = (el: HTMLElement | null) => {
    if (el && io.current && !el.hasAttribute("data-in")) {
      io.current.observe(el);
    }
  };

  let stopIndex = 0;

  return (
    <main className={styles.page} ref={root}>
      <Turtle className={`${styles.decor} ${styles.decorTurtle}`} />
      <Penguin className={`${styles.decor} ${styles.decorPenguin}`} />

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

              <span className={styles.updated}>updated {UPDATED}</span>

              <a
                href="#trail"
                className={`${styles.btn} ${styles.btnA} ${styles.heroBtn}`}
              >
                Follow the trail
                <ArrowDown size={18} weight="bold" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.tally} aria-label="Status summary">
        {STATUS_ORDER.map((s, i) => (
          <div
            key={s}
            className={`${styles.tStat} ${styles[STATUS_CLASS[s]]}`}
            data-reveal
            style={at(i * 0.1)}
          >
            <span className={styles.tNum}>{counts[s]}</span>
            <span className={styles.tLabel}>
              <Glyph status={s} />
              {STATUS[s].toLowerCase()}
            </span>
          </div>
        ))}
      </section>

      <section className={styles.legend}>
        <h2
          className={`${styles.secTitle} ${styles.reveal} ${styles.wipe} ${styles.up}`}
          data-reveal
          style={at(0, 16)}
        >
          How to read it
        </h2>

        <p
          className={`${styles.secText} ${styles.reveal} ${styles.fade} ${styles.right}`}
          data-reveal
          style={at(0.1)}
        >
          Every idea travels the same road, from a scribble in a notebook to
          something you can open. The label on each stop tells you where it is.
        </p>

        <div className={styles.steps}>
          {LEGEND.map((l, i) => (
            <div
              key={l.status}
              className={`${styles.step} ${styles.reveal} ${styles.wipe} ${styles.up}`}
              data-reveal
              style={at(i * 0.12, 24)}
            >
              <l.Doodle
                className={styles.stepDoodle}
                style={{ "--fill": l.fill } as CSSProperties}
              />

              <span className={`${styles.stepName} ${styles[STATUS_CLASS[l.status]]}`}>
                <Glyph status={l.status} />
                {STATUS[l.status].toLowerCase()}
              </span>

              <p className={styles.stepText}>{l.text}</p>

              {i < LEGEND.length - 1 && (
                <Arrow
                  className={styles.stepArrow}
                  style={{ "--draw-delay": `${0.5 + i * 0.2}s` } as CSSProperties}
                />
              )}
            </div>
          ))}
        </div>
      </section>

      <div className={styles.ribbon} aria-hidden="true">
        <div className={styles.track}>
          {[0, 1].map((g) => (
            <div className={styles.group} key={g}>
              {LIVE_TITLES.map((t) => (
                <span className={styles.ribbonItem} key={t}>
                  {t}
                  <span className={styles.ribbonStar}>*</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section id="trail" className={styles.trail}>
        <h2
          className={`${styles.secTitle} ${styles.reveal} ${styles.wipe} ${styles.up}`}
          data-reveal
          style={at(0, 16)}
        >
          The trail
        </h2>

        <p
          className={`${styles.secText} ${styles.reveal} ${styles.fade} ${styles.right}`}
          data-reveal
          style={at(0.1)}
        >
          Scroll to walk it. Tap a stop to see what is inside, or filter the
          trail down to one kind of stop.
        </p>

        <div
          className={styles.filters}
          role="group"
          aria-label="Filter by status"
          ref={chipsRef}
        >
          <span className={styles.chipPill} aria-hidden="true" />

          {FILTERS.map((f, i) => (
            <button
              key={f.key}
              ref={(node) => {
                chipRefs.current[i] = node;
              }}
              className={`${styles.chip} ${
                filter === f.key ? styles.chipOn : ""
              }`}
              onClick={() => setFilter(f.key)}
              aria-pressed={filter === f.key}
            >
              {f.label}
              <span>{counts[f.key]}</span>
            </button>
          ))}
        </div>

        <div className={styles.journey} ref={journey}>
          <div className={styles.spine} aria-hidden="true">
            <span className={styles.spineFill} />
          </div>

          <div className={styles.traveler} aria-hidden="true">
            <Snail style={{ "--fill": "var(--h-butter)" } as CSSProperties} />
            <span className={styles.you}>you are here</span>
          </div>

          {chapters.map((c) => (
            <div key={c.n} className={styles.chapterWrap}>
              <header
                className={styles.chapter}
                ref={watch}
                data-reveal
              >
                <span className={styles.chNum}>{c.n}</span>
                <h3 className={styles.chTitle}>
                  <span className={styles.chMark}>{c.title}</span>
                </h3>
                <span className={styles.chSub}>{c.sub}</span>
              </header>

              {c.items.map((it) => {
                const idx = stopIndex++;
                const isOpen = open === it.title;

                return (
                  <article
                    key={it.title}
                    ref={watch}
                    data-reveal
                    className={`${styles.stop} ${
                      idx % 2 === 0 ? styles.stopL : styles.stopR
                    }`}
                  >
                    <span className={styles.node} aria-hidden="true" />

                    <div
                      className={`${styles.block} ${
                        isOpen ? styles.blockOpen : ""
                      }`}
                    >
                      <button
                        className={styles.head}
                        onClick={() => setOpen(isOpen ? null : it.title)}
                        aria-expanded={isOpen}
                      >
                        <span className={styles.tab}>{it.title}</span>

                        <span
                          className={`${styles.stat} ${
                            styles[STATUS_CLASS[it.status]]
                          }`}
                        >
                          <Glyph status={it.status} />
                          {STATUS[it.status].toLowerCase()}
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
                  </article>
                );
              })}
            </div>
          ))}

          {chapters.length === 0 && (
            <p className={styles.none}>nothing here yet</p>
          )}
        </div>
      </section>

      <section className={styles.cta}>
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
            className={`${styles.btnB} ${styles.reveal} ${styles.wipe} ${styles.right}`}
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