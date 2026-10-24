"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
} from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Lightning,
  Stack,
  BracketsCurly,
  Copy,
  Check,
} from "@phosphor-icons/react";

import styles from "./About.module.css";
import useReveal from "../../hooks/useReveal";

type Field = "What it is" | "How it's used" | "Example" | "Tip";

const FIELDS: Record<Field, string> = {
  "What it is": "Declares synchronization with systems outside of React.",
  "How it's used":
    "Runs after render when a dependency changes. Return a cleanup.",
  Example:
    "const id = setInterval(tick, 1000); return () => clearInterval(id);",
  Tip: "An empty dependency array runs exactly once, on mount.",
};

const ORDER = Object.keys(FIELDS) as Field[];

const BLOCK_CODE = "useEffect(() => {\n  return () => {};\n}, [dep]);";

const LEAD =
  "A cheatsheet for the moment you know exactly what you want to write and can't recall how it's spelled.";

const TONES = ["#ffd84d", "#ff7ab8", "#8ab6ff"];

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

const PRINCIPLES = [
  {
    icon: <Lightning size={26} weight="regular" />,
    title: "Recall, not tutorials",
    text: "You already learned it. Syntaxly gives back the shape of it, fast enough that you never leave your editor's rhythm.",
  },
  {
    icon: <Stack size={26} weight="regular" />,
    title: "One canvas per language",
    text: "Every topic sits in a block on a single page. Scan the whole language at a glance, then open only what you need.",
  },
  {
    icon: <BracketsCurly size={26} weight="regular" />,
    title: "Short on purpose",
    text: "If an entry needs scrolling, it is documentation. Each one stays small enough to read in two seconds.",
  },
];

const STATS = [
  { value: "4", label: "fields per entry" },
  { value: "1", label: "page per language" },
  { value: "2s", label: "to recall a syntax" },
];

const at = (seconds: number, distance?: number) =>
  ({
    "--delay": `${seconds}s`,
    ...(distance ? { "--dist": `${distance}px` } : {}),
  }) as CSSProperties;

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

export default function About() {
  const revealRef = useReveal<HTMLElement>(0.15);
  const tabsRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [field, setField] = useState<Field>("What it is");
  const [swapDir, setSwapDir] = useState<"fwd" | "back">("fwd");
  const [touched, setTouched] = useState(false);
  const isCode = field === "Example";
  const [blockCopied, setBlockCopied] = useState(false);

  useEffect(() => {
    const el = revealRef.current;
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
  }, [revealRef]);

  useEffect(() => {
    const tabs = tabsRef.current;
    const el = tabRefs.current[ORDER.indexOf(field)];
    if (!tabs || !el) return;

    const place = (snap: boolean) => {
      if (snap) tabs.style.setProperty("--pt", "0s");

      tabs.style.setProperty("--tx", `${el.offsetLeft}px`);
      tabs.style.setProperty("--ty", `${el.offsetTop}px`);
      tabs.style.setProperty("--tw", `${el.offsetWidth}px`);
      tabs.style.setProperty("--th", `${el.offsetHeight}px`);
      tabs.style.setProperty("--to", "1");

      if (snap) {
        requestAnimationFrame(() =>
          requestAnimationFrame(() => tabs.style.removeProperty("--pt")),
        );
      }
    };

    place(tabs.style.getPropertyValue("--to") !== "1");

    const onResize = () => place(true);
    window.addEventListener("resize", onResize);
    document.fonts?.ready.then(onResize);

    return () => window.removeEventListener("resize", onResize);
  }, [field]);

  const trackPointer = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  const selectField = (f: Field) => {
    if (f === field) return;
    setSwapDir(ORDER.indexOf(f) > ORDER.indexOf(field) ? "fwd" : "back");
    setTouched(true);
    setField(f);
  };

  const copyBlock = async () => {
    try {
      await navigator.clipboard.writeText(BLOCK_CODE);
      setBlockCopied(true);
      setTimeout(() => setBlockCopied(false), 1500);
    } catch {}
  };

  return (
    <main ref={revealRef} className={styles.page}>
      <span className={`${styles.decor} ${styles.d1}`} aria-hidden="true" />
      <span className={`${styles.decor} ${styles.d2}`} aria-hidden="true" />
      <span className={`${styles.decor} ${styles.d3}`} aria-hidden="true" />

      <section className={styles.hero}>
        <aside className={styles.rail}>
          <span className={styles.railName}>ABOUT</span>
        </aside>

        <div className={styles.heroMain} onMouseMove={trackPointer}>
          <div className={styles.orb} />

          <div className={styles.heroInner}>
            <h1
              className={styles.title}
              aria-label="Docs are for learning. Syntaxly is for remembering."
            >
              <span className={styles.line}>
                {letters("Docs are for learning.", 0)}
              </span>

              <span className={styles.line}>
                {letters("Syntaxly is for", 1)}
              </span>

              <span className={styles.line}>
                <em className={styles.highlighted}>
                  {letters("remembering.", 2)}
                </em>
                <span className={styles.sticker} aria-hidden="true">
                  not a tutorial
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

              <Link
                href="/syntax"
                className={`${styles.button} ${styles.primaryButton} ${styles.heroBtn}`}
              >
                Get Started
                <ArrowUpRight size={18} weight="bold" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.story}>
        <h2
          className={`${styles.sectionTitle} ${styles.reveal} ${styles.wipe} ${styles.up}`}
          data-reveal
          style={at(0, 16)}
        >
          Why it exists
        </h2>

        <div className={styles.storyText}>
          <p
            className={`${styles.reveal} ${styles.fade} ${styles.right}`}
            data-reveal
            style={at(0.1)}
          >
            Every developer has the same moment. You come back to a framework
            after a few months, your hands know what they want, and your memory
            returns nothing. So you open the docs, scroll past the introduction,
            skim three paragraphs, and find the one line you needed.
          </p>

          <p
            className={`${styles.reveal} ${styles.fade} ${styles.right}`}
            data-reveal
            style={at(0.25)}
          >
            That fifteen-minute detour is the problem Syntaxly removes. It skips
            the explaining and keeps the boilerplate, so a quick refresher stays
            quick.
          </p>
        </div>
      </section>

      <section className={styles.principles}>
        <h2
          className={`${styles.sectionTitle} ${styles.reveal} ${styles.wipe} ${styles.up}`}
          data-reveal
          style={at(0, 16)}
        >
          How it&apos;s built
        </h2>

        <div className={styles.rows} data-reveal>
          {PRINCIPLES.map((p, index) => (
            <article
              key={p.title}
              className={styles.row}
              data-reveal
              style={
                {
                  ...at(index * 0.12),
                  "--tone": TONES[index % TONES.length],
                } as CSSProperties
              }
              onMouseMove={trackPointer}
            >
              <div className={styles.rowIcon}>{p.icon}</div>
              <h3 className={styles.rowTitle}>{p.title}</h3>
              <p className={styles.rowText}>{p.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.anatomy}>
        <div className={styles.anatomyIntro}>
          <h2
            className={`${styles.sectionTitle} ${styles.reveal} ${styles.wipe} ${styles.up}`}
            data-reveal
            style={at(0, 16)}
          >
            Anatomy of an entry
          </h2>

          <p
            className={`${styles.anatomyText} ${styles.reveal} ${styles.fade} ${styles.right}`}
            data-reveal
            style={at(0.1)}
          >
            Every syntax is broken into the same four fields, so you always know
            where to look. Pick one.
          </p>

          <div
            className={`${styles.miniColumn} ${styles.reveal} ${styles.slide} ${styles.right}`}
            data-reveal
            style={at(0.2, 40)}
          >
            <div
              className={`${styles.miniBlock} ${
                blockCopied ? styles.miniBlockOn : ""
              }`}
            >
              <div className={styles.miniTitle}>useEffect</div>

              <button
                type="button"
                className={styles.miniCopy}
                onClick={copyBlock}
                aria-label="Copy code"
              >
                {blockCopied ? (
                  <Check size={20} weight="bold" />
                ) : (
                  <Copy size={20} />
                )}
              </button>

              <pre className={styles.miniCode}>
                <code>
                  <span className={styles.fn}>useEffect</span>
                  {"(() => {"}
                  {"\n  "}
                  <span className={styles.kw}>return</span>
                  {" () => {};"}
                  {"\n"}
                  {"}, [dep]);"}
                </code>
              </pre>
            </div>
          </div>
        </div>

        <div
          className={`${styles.panel} ${styles.reveal} ${styles.wipe} ${styles.left}`}
          data-reveal
          style={at(0.1, 36)}
        >
          <div ref={tabsRef} className={styles.tabs} role="tablist">
            <span className={styles.tabPill} aria-hidden="true" />

            {ORDER.map((f, i) => (
              <button
                key={f}
                ref={(node) => {
                  tabRefs.current[i] = node;
                }}
                role="tab"
                aria-selected={field === f}
                onClick={() => selectField(f)}
                className={`${styles.tab} ${
                  field === f ? styles.tabActive : ""
                }`}
                style={{ "--c": i } as CSSProperties}
              >
                {f}
              </button>
            ))}
          </div>

          <div
            className={`${styles.panelBody} ${
              touched
                ? swapDir === "fwd"
                  ? styles.swapFwd
                  : styles.swapBack
                : ""
            }`}
            key={field}
          >
            {isCode ? (
              <code className={styles.code}>{FIELDS[field]}</code>
            ) : (
              <p className={styles.panelText}>{FIELDS[field]}</p>
            )}
          </div>

          <div className={styles.panelFoot}>
            <span>useEffect · React</span>

            <span
              className={`${styles.hint} ${touched ? styles.hintGone : ""}`}
              aria-hidden="true"
            >
              try the tabs
            </span>
          </div>
        </div>
      </section>

      <section className={styles.stats}>
        {STATS.map((s, index) => {
          const n = parseInt(s.value, 10);
          const suffix = s.value.replace(/\d+/, "");

          return (
            <div
              key={s.label}
              className={styles.stat}
              data-reveal
              style={at(index * 0.12)}
            >
              <span className={styles.statValue} aria-label={s.value}>
                <span
                  className={styles.odo}
                  aria-hidden="true"
                  style={{ "--n": n } as CSSProperties}
                >
                  <span className={styles.odoCol}>
                    {Array.from({ length: 10 }, (_, d) => (
                      <span key={d}>{d}</span>
                    ))}
                  </span>
                </span>

                {suffix && <span aria-hidden="true">{suffix}</span>}
              </span>

              <span className={styles.statLabel}>{s.label}</span>
            </div>
          );
        })}
      </section>

      <section className={styles.maker}>
        <h2
          className={`${styles.sectionTitle} ${styles.reveal} ${styles.wipe} ${styles.up}`}
          data-reveal
          style={at(0, 16)}
        >
          Who&apos;s behind it
        </h2>

        <p
          className={`${styles.makerText} ${styles.reveal} ${styles.fade} ${styles.right}`}
          data-reveal
          style={at(0.1)}
        >
          Syntaxly is built by Khogambyek Yersin, a computer science student who
          got tired of re-reading docs for things he already knew. It&apos;s
          made with Next.js and TypeScript, and it grows one language at a time.
        </p>
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
          className={`${styles.spark} ${styles.s2}`}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 0C13 8 16 11 24 12C16 13 13 16 12 24C11 16 8 13 0 12C8 11 11 8 12 0Z" />
        </svg>

        <h2 className={styles.ctaTitle} data-reveal>
          <span className={styles.mask}>
            <span className={styles.maskIn}>Stop scrolling docs.</span>
          </span>
        </h2>

        <div className={styles.buttons}>
          <Link
            href="/syntax"
            className={`${styles.button} ${styles.primaryButton} ${styles.reveal} ${styles.wipe} ${styles.right}`}
            data-reveal
            style={at(0.4)}
          >
            Get Started
            <ArrowUpRight size={18} weight="bold" />
          </Link>

          <Link
            href="/"
            className={`${styles.button} ${styles.ghostButton} ${styles.reveal} ${styles.wipe} ${styles.right}`}
            data-reveal
            style={at(0.52)}
          >
            Back home
          </Link>
        </div>
      </section>
    </main>
  );
}