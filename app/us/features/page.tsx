"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import Link from "next/link";
import {
  MagnifyingGlass,
  Keyboard,
  DiamondsFour,
  Columns,
  Palette,
  TextAa,
  Copy,
  Check,
  Plus,
  Minus,
  ArrowDown,
  ArrowUpRight,
} from "@phosphor-icons/react";

import { Semicolon, Sparkle, Donut } from "../../ui/HandDrawn";
import styles from "./Features.module.css";

type Block = {
  t: string;
  c: string;
  tag: string;
  u: boolean;
};

type RevealType = "fade" | "wipe" | "slide";
type RevealDir = "up" | "down" | "left" | "right";

const BLOCKS: Block[] = [
  { t: "Variables", c: "let x = 42;", tag: "01 · Basics", u: false },
  {
    t: "useState",
    c: "const [n, setN] = useState(0);",
    tag: "02 · Hooks",
    u: true,
  },
  {
    t: "useEffect",
    c: "useEffect(() => {}, [dep]);",
    tag: "02 · Hooks",
    u: true,
  },
  {
    t: "for loop",
    c: "for (let i = 0; i < 5; i++) {}",
    tag: "03 · Flow",
    u: false,
  },
  {
    t: "Arrow Functions",
    c: "const add = (a, b) => a + b;",
    tag: "04 · Functions",
    u: false,
  },
  {
    t: "Spread Operator",
    c: "const b = [...a, 4];",
    tag: "05 · Objects",
    u: false,
  },
];

const KEY_COLS = [
  { n: "01", b: ["Variables", "Constants", "Operators"] },
  { n: "02", b: ["if / else", "switch", "for loop"] },
  { n: "03", b: ["Declaration", "Arrow", "Rest params"] },
];

const OVERVIEW = ["Fundamentals", "Control flow", "Functions", "Objects"];

const THEMES = [
  {
    key: "default",
    label: "Default",
    a: "rgb(0,255,208)",
    b: "rgb(153,0,255)",
  },
  { key: "monochrome", label: "Mono", a: "#fff", b: "#000" },
  { key: "satisfying-fun", label: "Fun", a: "#ff6584", b: "#7c5cfc" },
];

const SMALL = [
  ["Minimap", "A strip of pills for every block, with a name on hover."],
  ["Copy buttons", "One click puts the snippet on your clipboard."],
  ["Scroll arrows", "Glide through columns without reaching for the trackpad."],
  ["Shortcut sheet", "Every key, listed in one pop-up."],
  ["Follows selection", "The page scrolls to whatever you picked."],
  ["Esc clears it", "Close overlays, deselect, start over."],
];

const LEAD =
  "Syntaxly does a handful of things and does them quickly. Every demo below is live, so poke at them.";

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
];

const TILE_TONES = [
  "var(--primary)",
  "#ffd84d",
  "#ff7ab8",
  "#8ab6ff",
  "#ff9a5c",
  "#b5f23d",
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

const letters = (text: string, line: number, start = 0) => {
  let n = start;

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

function Hl({ text, q }: { text: string; q: string }) {
  const i = q ? text.toLowerCase().indexOf(q) : -1;

  if (i === -1) return <>{text}</>;

  return (
    <>
      {text.slice(0, i)}
      <mark className={styles.mark}>{text.slice(i, i + q.length)}</mark>
      {text.slice(i + q.length)}
    </>
  );
}

function Meta({
  n,
  title,
  count,
}: {
  n: number;
  title: string;
  count: number;
}) {
  return (
    <div
      className={`${styles.meta} ${styles.reveal} ${styles.wipe} ${
        n % 2 ? styles.right : styles.left
      }`}
      data-reveal
    >
      <div className={styles.metaInner}>
        <div>
          <div className={styles.metaNum}>{n}</div>
          <h2 className={styles.metaTitle}>{title}</h2>
        </div>
        <span className={styles.metaCount}>Blocks: {count}</span>
      </div>
    </div>
  );
}

function Card({
  icon,
  title,
  text,
  span,
  type,
  dir,
  delay = 0,
  distance,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  span: string;
  type: RevealType;
  dir: RevealDir;
  delay?: number;
  distance?: number;
  children: React.ReactNode;
}) {
  return (
    <article
      className={`${styles.card} ${styles.reveal} ${styles[type]} ${styles[dir]} ${span}`}
      data-reveal
      style={at(delay, distance)}
      onMouseMove={trackPointer}
    >
      <div className={styles.glow} />

      <div className={styles.cardHead}>
        <span className={styles.cardIcon}>{icon}</span>
        <h3 className={styles.cardTitle}>{title}</h3>
      </div>

      <p className={styles.cardText}>{text}</p>

      <div className={styles.demo}>{children}</div>
    </article>
  );
}

function SearchDemo() {
  const [q, setQ] = useState("");
  const s = q.trim().toLowerCase();

  const hits = s
    ? BLOCKS.filter(
        (b) => b.t.toLowerCase().includes(s) || b.c.toLowerCase().includes(s),
      ).slice(0, 4)
    : [];

  return (
    <div className={styles.search}>
      <div className={styles.sRow}>
        <MagnifyingGlass size={18} />

        <input
          className={styles.sInput}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="SCAN BLOCKS..."
          spellCheck={false}
          aria-label="Try searching the blocks"
        />
      </div>

      <div className={styles.sList}>
        {!s && (
          <div className={styles.sIdle}>
            Try
            {["use", "for", "=>"].map((w) => (
              <button key={w} className={styles.sChip} onClick={() => setQ(w)}>
                {w}
              </button>
            ))}
          </div>
        )}

        {s && hits.length === 0 && (
          <div className={styles.sIdle}>NO BLOCKS MATCH</div>
        )}

        {hits.map((h) => (
          <div key={h.t} className={styles.sHit}>
            <span className={styles.sTag}>{h.tag}</span>

            <span className={styles.sBody}>
              <b>
                <Hl text={h.t} q={s} />
              </b>

              <code>
                <Hl text={h.c} q={s} />
              </code>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function KeyboardDemo() {
  const [pos, setPos] = useState({ c: 0, r: 0 });

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const k = e.key;

    if (!k.startsWith("Arrow")) return;

    e.preventDefault();

    setPos((p) => ({
      c:
        k === "ArrowRight"
          ? Math.min(2, p.c + 1)
          : k === "ArrowLeft"
            ? Math.max(0, p.c - 1)
            : p.c,
      r:
        k === "ArrowDown"
          ? Math.min(2, p.r + 1)
          : k === "ArrowUp"
            ? Math.max(0, p.r - 1)
            : p.r,
    }));
  };

  return (
    <div
      className={styles.kb}
      tabIndex={0}
      onKeyDown={onKey}
      role="group"
      aria-label="Click here, then use the arrow keys"
    >
      <div className={styles.kbGrid}>
        {KEY_COLS.map((col, ci) => (
          <div key={col.n} className={styles.kbCol}>
            <span
              className={`${styles.lane} ${pos.c === ci ? styles.laneOn : ""}`}
            >
              {col.n}
            </span>

            {col.b.map((b, ri) => (
              <span
                key={b}
                className={`${styles.cell} ${
                  pos.c === ci && pos.r === ri ? styles.cellOn : ""
                }`}
                style={{ "--c": ci + ri } as CSSProperties}
              >
                {b}
              </span>
            ))}
          </div>
        ))}
      </div>

      <p className={styles.kbHint}>
        Click here, then press <kbd>←</kbd>
        <kbd>↑</kbd>
        <kbd>↓</kbd>
        <kbd>→</kbd>
      </p>
    </div>
  );
}

function UniqueDemo() {
  const [on, setOn] = useState(false);

  return (
    <div className={styles.uq}>
      <button
        className={`${styles.toggle} ${on ? styles.toggleOn : ""}`}
        onClick={() => setOn((v) => !v)}
        aria-pressed={on}
      >
        <DiamondsFour size={18} weight={on ? "fill" : "light"} />

        {on ? "Unique only" : "Show unique only"}

        <kbd>Ctrl</kbd>
        <kbd>U</kbd>
      </button>

      <div className={styles.uqList}>
        {BLOCKS.map((b, i) => (
          <div
            key={b.t}
            className={`${styles.collapse} ${on && !b.u ? styles.off : ""}`}
            style={{ "--c": i } as CSSProperties}
          >
            <div>
              <div className={styles.uqRow}>
                <span>{b.t}</span>

                {b.u && (
                  <DiamondsFour
                    size={14}
                    weight="fill"
                    className={styles.gem}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OverviewDemo() {
  const [compact, setCompact] = useState(false);

  return (
    <div>
      <button
        className={`${styles.toggle} ${compact ? styles.toggleOn : ""}`}
        onClick={() => setCompact((v) => !v)}
        aria-pressed={compact}
      >
        <Columns size={18} weight={compact ? "fill" : "light"} />

        {compact ? "Expand columns" : "Overview"}
      </button>

      <div className={`${styles.ov} ${compact ? styles.ovCompact : ""}`}>
        {OVERVIEW.map((t, i) => (
          <div
            key={t}
            className={styles.ovCol}
            style={{ "--c": i } as CSSProperties}
          >
            <div className={styles.ovMeta}>
              <span>{i + 1}</span>
              <b className={styles.hT}>{t}</b>
              <b className={styles.vT}>{t}</b>
            </div>

            <div className={styles.ovMain}>
              <i />
              <i />
              <i />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ThemeDemo() {
  const [theme, setTheme] = useState("default");

  return (
    <div>
      <div className={styles.themes} role="group" aria-label="Theme">
        {THEMES.map((t) => (
          <button
            key={t.key}
            className={`${styles.themeBtn} ${
              theme === t.key ? styles.themeOn : ""
            }`}
            onClick={() => setTheme(t.key)}
            aria-pressed={theme === t.key}
          >
            <span className={styles.dots}>
              <i style={{ background: t.a }} />
              <i style={{ background: t.b }} />
            </span>

            {t.label}
          </button>
        ))}
      </div>

      <div className={styles.win} data-theme={theme}>
        <div className={styles.winSide} />

        <div className={styles.winCol}>
          <div className={styles.winMeta}>2 HOOKS</div>

          <div className={styles.winMain}>
            <div className={styles.mBlock}>
              <span className={styles.mTab}>useState</span>
              <pre>{"const [n, setN] = useState(0);"}</pre>
            </div>

            <div className={styles.mBlock}>
              <span className={styles.mTab}>useRef</span>
              <pre>{"const r = useRef(null);"}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function YoursDemo() {
  const [size, setSize] = useState(15);
  const [copied, setCopied] = useState(false);
  const [focus, setFocus] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText("const [n, setN] = useState(0);");
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <div>
      <button
        className={`${styles.toggle} ${focus ? styles.toggleOn : ""}`}
        onClick={() => setFocus((v) => !v)}
        aria-pressed={focus}
      >
        <TextAa size={18} weight={focus ? "fill" : "light"} />
        Focus mode
        <kbd>Ctrl</kbd>
        <kbd>Shift</kbd>
        <kbd>F</kbd>
      </button>

      <div className={styles.win}>
        <div
          className={`${styles.winSide} ${styles.winSideTools} ${
            focus ? styles.winSideHide : ""
          }`}
        >
          <button
            onClick={() => setSize((s) => Math.min(s + 1, 22))}
            aria-label="Increase font size"
          >
            <Plus size={12} weight="bold" />
          </button>

          <span>{size}</span>

          <button
            onClick={() => setSize((s) => Math.max(s - 1, 11))}
            aria-label="Decrease font size"
          >
            <Minus size={12} weight="bold" />
          </button>
        </div>

        <div className={styles.winCol}>
          <div className={styles.winMain}>
            <div className={`${styles.mBlock} ${styles.mActive}`}>
              <span className={styles.mTab} style={{ fontSize: size }}>
                useState
              </span>

              <button
                className={styles.mCopy}
                onClick={copy}
                aria-label="Copy snippet"
              >
                {copied ? (
                  <Check size={18} weight="bold" />
                ) : (
                  <Copy size={18} />
                )}
              </button>

              <pre style={{ fontSize: size }}>
                {"const [n, setN] =\n  useState(0);"}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Features() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = root.current?.querySelectorAll("[data-reveal]");

    if (!els) return;

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.setAttribute("data-in", "");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.15 },
    );

    els.forEach((el) => io.observe(el));

    return () => io.disconnect();
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
      <Semicolon className={`${styles.decor} ${styles.decorSemi}`} />
      <Sparkle className={`${styles.decor} ${styles.decorSpark}`} />
      <Donut className={`${styles.decor} ${styles.decorDonut}`} />

      <section className={styles.hero}>
        <aside className={styles.rail}>
          <span className={styles.railName}>FEATURES</span>
        </aside>

        <div className={styles.heroMain} onMouseMove={trackPointer}>
          <div className={styles.orb} />

          <div className={styles.heroInner}>
            <h1 className={styles.title} aria-label="Few features. All sharp.">
              <span className={styles.line}>{letters("Few features.", 0)}</span>

              <span className={styles.line}>
                {letters("All", 1)}{" "}
                <em className={styles.hl}>{letters("sharp.", 1, 4)}</em>
                <span className={styles.sticker} aria-hidden="true">
                  all demos are live
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

              <a
                href="#big"
                className={`${styles.btn} ${styles.btnA} ${styles.heroBtn}`}
              >
                Try them <ArrowDown size={18} weight="bold" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="big">
        <Meta n={1} title="The big ones" count={6} />

        <div className={styles.bento}>
          <Card
            span={styles.s4}
            icon={<MagnifyingGlass size={30} weight="regular" />}
            title="Search every block"
            text="One shortcut opens a scanner across all columns. It matches titles and code, and highlights what it found."
            type="slide"
            dir="right"
            delay={0}
          >
            <SearchDemo />
          </Card>

          <Card
            span={styles.s2}
            icon={<Keyboard size={30} weight="regular" />}
            title="Keyboard first"
            text="Arrow through blocks and columns without touching the mouse."
            type="slide"
            dir="left"
            delay={0.1}
          >
            <KeyboardDemo />
          </Card>

          <Card
            span={styles.s2}
            icon={<DiamondsFour size={30} weight="regular" />}
            title="Unique filter"
            text="Hide the common stuff and keep only syntax unique to the language."
            type="wipe"
            dir="right"
            delay={0}
          >
            <UniqueDemo />
          </Card>

          <Card
            span={styles.s4}
            icon={<Columns size={30} weight="regular" />}
            title="Overview mode"
            text="Collapse every column into a narrow strip to see the whole language at once, then expand the one you need."
            type="wipe"
            dir="left"
            delay={0.1}
          >
            <OverviewDemo />
          </Card>

          <Card
            span={styles.s3}
            icon={<Palette size={30} weight="regular" />}
            title="Three themes"
            text="Same layout, different mood. Everything follows the palette."
            type="fade"
            dir="right"
            delay={0}
            distance={24}
          >
            <ThemeDemo />
          </Card>

          <Card
            span={styles.s3}
            icon={<TextAa size={30} weight="regular" />}
            title="Make it yours"
            text="Resize the code, copy a snippet in one click, or hide the chrome and read."
            type="fade"
            dir="left"
            delay={0.12}
            distance={24}
          >
            <YoursDemo />
          </Card>
        </div>
      </section>

      <section>
        <Meta n={2} title="The small things" count={SMALL.length} />

        <div className={styles.small}>
          {SMALL.map(([t, d], i) => (
            <div
              key={t}
              className={`${styles.tile} ${styles.reveal} ${styles.wipe} ${styles.right}`}
              data-reveal
              style={
                {
                  ...at(((i % 3) + Math.floor(i / 3)) * 0.08),
                  "--tone": TILE_TONES[i % TILE_TONES.length],
                } as CSSProperties
              }
            >
              <span className={styles.fill} />
              <span className={styles.tileNum}>
                {String(i + 1).padStart(2, "0")}
              </span>

              <span className={styles.tileBody}>
                <b>{t}</b>
                <span>{d}</span>
              </span>
            </div>
          ))}
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
            <span className={styles.maskIn}>See them where they live.</span>
          </span>
        </h2>

        <Link
          href="/syntax"
          className={`${styles.btn} ${styles.btnA} ${styles.reveal} ${styles.wipe} ${styles.right}`}
          data-reveal
          style={at(0.4)}
        >
          Get Started <ArrowUpRight size={18} weight="bold" />
        </Link>
      </section>
    </main>
  );
}
