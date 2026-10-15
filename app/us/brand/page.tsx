"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  Copy,
  Check,
  ArrowUpRight,
  ArrowCounterClockwise,
} from "@phosphor-icons/react";
import styles from "./Brand.module.css";

type Theme = "default" | "monochrome" | "satisfying-fun";

const THEMES: { key: Theme; label: string }[] = [
  { key: "default", label: "Default" },
  { key: "monochrome", label: "Monochrome" },
  { key: "satisfying-fun", label: "Fun" },
];

const SWATCHES = [
  {
    name: "Primary",
    token: "--primary",
    use: "Headers, accents, active states",
  },
  {
    name: "Secondary",
    token: "--secondary",
    use: "Hover, focus, emphasis",
  },
  {
    name: "Ink",
    token: "--black",
    use: "Text, buttons, rules",
  },
  {
    name: "Column",
    token: "--column-bg",
    use: "The workspace",
  },
  {
    name: "Block",
    token: "--column-block-bg",
    use: "Code blocks",
  },
  {
    name: "Panel",
    token: "--explanation-bg",
    use: "Explanations",
  },
];

const VOICE = [
  ["Instant recall.", "A comprehensive learning platform."],
  [
    "Two seconds, not fifteen minutes.",
    "Leverage our robust documentation ecosystem.",
  ],
  ["You already know it.", "Master React today!"],
];

const DONTS = [
  "Don't stretch it",
  "Don't leave the palette",
  "Don't add shadows",
  "Always lowercase",
];

const WORD = "syntaxly";

const at = (seconds: number, distance?: number) =>
  ({
    "--delay": `${seconds}s`,
    ...(distance ? { "--dist": `${distance}px` } : {}),
  }) as CSSProperties;

const toHex = (rgb: string) => {
  const m = rgb.match(/\d+(\.\d+)?/g);

  if (!m) return rgb;

  return (
    "#" +
    m
      .slice(0, 3)
      .map((n) => Math.round(Number(n)).toString(16).padStart(2, "0"))
      .join("")
  ).toUpperCase();
};

const inkFor = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  const lum = 0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255);

  return lum > 150 ? "#000" : "#fff";
};

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

function Lockup({ dark }: { dark?: boolean }) {
  return (
    <div className={`${styles.lockup} ${dark ? styles.lockupDark : ""}`}>
      <span className={styles.markSm}>✦</span>
      <span className={styles.wordSm}>syntaxly</span>
    </div>
  );
}

export default function Brand() {
  const [theme, setTheme] = useState<Theme>("default");
  const [hex, setHex] = useState<string[]>(SWATCHES.map(() => "#000000"));
  const [copied, setCopied] = useState<number | null>(null);
  const [spin, setSpin] = useState(0);
  const [run, setRun] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);
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
    setHex(
      refs.current.map((el) =>
        el ? toHex(getComputedStyle(el).backgroundColor) : "#000000",
      ),
    );
  }, [theme]);

  const copy = async (i: number) => {
    try {
      await navigator.clipboard.writeText(hex[i]);
      setCopied(i);
      setTimeout(() => setCopied(null), 1500);
    } catch {}
  };

  return (
    <main className={styles.page} data-theme={theme} ref={root}>
      <section className={styles.hero}>
        <aside className={styles.rail}>
          <span className={styles.railName}>BRAND</span>
        </aside>

        <div className={styles.heroMain}>
          <div className={styles.orb} />

          <button
            className={styles.bigMark}
            onClick={() => setSpin((s) => s + 1)}
            aria-label="Spin the mark"
          >
            <span
              className={styles.bigGlyph}
              style={{ transform: `rotate(${spin * 90}deg)` }}
            >
              ✦
            </span>
          </button>

          <div className={styles.heroText}>
            <h1 className={styles.word} aria-label={WORD}>
              {WORD.split("").map((letter, i) => (
                <span
                  key={i}
                  aria-hidden="true"
                  className={styles.letter}
                  style={{ "--i": i } as CSSProperties}
                >
                  {letter}
                </span>
              ))}
            </h1>

            <p className={styles.tagline}>
              Syntax, <span className={styles.hl}>remembered.</span>
            </p>

            <div
              className={styles.themes}
              role="group"
              aria-label="Preview theme"
            >
              {THEMES.map((t, i) => (
                <button
                  key={t.key}
                  onClick={() => setTheme(t.key)}
                  aria-pressed={theme === t.key}
                  className={`${styles.themeBtn} ${
                    theme === t.key ? styles.themeOn : ""
                  }`}
                  data-theme={t.key}
                  style={{ "--c": i } as CSSProperties}
                >
                  <span className={styles.dots}>
                    <i />
                    <i />
                  </span>
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section>
        <Meta n={1} title="Logo" count={4} />

        <div className={styles.body}>
          <p
            className={`${styles.intro} ${styles.reveal} ${styles.fade} ${styles.right}`}
            data-reveal
            style={at(0.1)}
          >
            A four-point spark in a square. The square is the block, the spark
            is the moment something clicks. Click the mark above to spin it.
          </p>

          <div className={styles.tiles}>
            <div
              className={`${styles.tile} ${styles.reveal} ${styles.wipe} ${styles.up}`}
              data-reveal
              style={at(0)}
            >
              <span className={styles.markLg}>✦</span>
              <span className={styles.cap}>Mark</span>
            </div>

            <div
              className={`${styles.tile} ${styles.reveal} ${styles.wipe} ${styles.up}`}
              data-reveal
              style={at(0.1)}
            >
              <span className={styles.wordLg}>syntaxly</span>
              <span className={styles.cap}>Wordmark</span>
            </div>

            <div
              className={`${styles.tile} ${styles.tileDark} ${styles.reveal} ${styles.wipe} ${styles.up}`}
              data-reveal
              style={at(0.2)}
            >
              <Lockup dark />
              <span className={styles.cap}>On dark</span>
            </div>

            <div
              className={`${styles.tile} ${styles.reveal} ${styles.wipe} ${styles.up}`}
              data-reveal
              style={at(0.3)}
            >
              <div className={styles.clear}>
                <Lockup />
              </div>
              <span className={styles.cap}>Clear space = mark width</span>
            </div>
          </div>

          <div className={styles.donts} data-reveal style={at(0.2)}>
            {DONTS.map((d, i) => (
              <span key={d} style={{ "--c": i } as CSSProperties}>
                {d}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section>
        <Meta n={2} title="Color" count={SWATCHES.length} />

        <div className={styles.body}>
          <p
            className={`${styles.intro} ${styles.reveal} ${styles.fade} ${styles.right}`}
            data-reveal
            style={at(0.1)}
          >
            Cyan does the talking, purple reacts. Switch themes at the top and
            every swatch re-reads its live value. Click one to copy the hex.
          </p>

          <div className={styles.swatches}>
            {SWATCHES.map((s, i) => (
              <button
                key={s.token}
                ref={(el) => {
                  refs.current[i] = el as unknown as HTMLDivElement;
                }}
                onClick={() => copy(i)}
                className={`${styles.swatch} ${styles.reveal} ${styles.wipe} ${styles.up}`}
                data-reveal
                style={{
                  background: `var(${s.token})`,
                  color: inkFor(hex[i]),
                  ...at(((i % 3) + Math.floor(i / 3)) * 0.08, 24),
                }}
                aria-label={`Copy ${s.name} ${hex[i]}`}
              >
                <span className={styles.swTop}>
                  <span className={styles.swName}>{s.name}</span>
                  {copied === i ? (
                    <Check size={18} weight="bold" />
                  ) : (
                    <Copy size={18} />
                  )}
                </span>

                <span>
                  <span className={styles.swHex}>
                    {copied === i ? "Copied" : hex[i]}
                  </span>
                  <span className={styles.swUse}>{s.use}</span>
                </span>
              </button>
            ))}
          </div>

          <div
            className={styles.ratio}
            data-reveal
            aria-label="Usage ratio: white 60, ink 20, primary 15, secondary 5"
          >
            <span
              style={
                { flex: 60, background: "#fff", "--c": 0 } as CSSProperties
              }
            >
              60% white
            </span>
            <span
              style={
                {
                  flex: 20,
                  background: "var(--black)",
                  color: "#fff",
                  "--c": 1,
                } as CSSProperties
              }
            >
              20% ink
            </span>
            <span
              style={
                {
                  flex: 15,
                  background: "var(--primary)",
                  "--c": 2,
                } as CSSProperties
              }
            >
              15%
            </span>
            <span
              style={
                {
                  flex: 5,
                  background: "var(--secondary)",
                  color: "#fff",
                  "--c": 3,
                } as CSSProperties
              }
            >
              5%
            </span>
          </div>
        </div>
      </section>

      <section>
        <Meta n={3} title="Type" count={3} />

        <div className={`${styles.body} ${styles.typeGrid}`}>
          <div
            className={`${styles.spec} ${styles.reveal} ${styles.slide} ${styles.up}`}
            data-reveal
            style={at(0, 40)}
          >
            <span className={`${styles.aa} ${styles.fSpace}`}>Aa</span>
            <h3>Space Grotesk</h3>
            <p>Display and body. Tight tracking on large sizes (-0.05em).</p>

            <div className={`${styles.scale} ${styles.fSpace}`}>
              <span style={{ fontSize: 56 }}>Recall</span>
              <span style={{ fontSize: 28 }}>Everything you need</span>
              <span style={{ fontSize: 18 }}>Built for instant recall.</span>
            </div>
          </div>

          <div
            className={`${styles.spec} ${styles.reveal} ${styles.slide} ${styles.up}`}
            data-reveal
            style={at(0.1, 40)}
          >
            <span className={`${styles.aa} ${styles.fSans}`}>AA</span>
            <h3>Sansation</h3>
            <p>Column headers and labels. Always uppercase.</p>

            <div
              className={`${styles.scale} ${styles.fSans}`}
              style={{ textTransform: "uppercase" }}
            >
              <span style={{ fontSize: 32 }}>Control flow</span>
              <span style={{ fontSize: 20 }}>Blocks: 5</span>
            </div>
          </div>

          <div
            className={`${styles.spec} ${styles.reveal} ${styles.slide} ${styles.up}`}
            data-reveal
            style={at(0.2, 40)}
          >
            <span className={`${styles.aa} ${styles.fMono}`}>{"{}"}</span>
            <h3>JetBrains Mono</h3>
            <p>Every line of code, always.</p>

            <div className={`${styles.scale} ${styles.fMono}`}>
              <span style={{ fontSize: 15 }}>
                const [n, setN] = useState(0);
              </span>
              <span style={{ fontSize: 15 }}>await Promise.all(tasks);</span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <Meta n={4} title="Components" count={5} />

        <div className={`${styles.body} ${styles.compGrid}`}>
          <div
            className={`${styles.compDark} ${styles.reveal} ${styles.slide} ${styles.right}`}
            data-reveal
            style={at(0, 48)}
          >
            <div className={styles.block}>
              <div className={styles.blockTitle}>useState</div>
              <Copy size={20} className={styles.blockCopy} />
              <pre className={styles.blockCode}>
                {"const [num, setNum] = useState(0);"}
              </pre>
            </div>
            <span className={styles.cap2}>Block</span>
          </div>

          <div
            className={`${styles.compLight} ${styles.reveal} ${styles.slide} ${styles.left}`}
            data-reveal
            style={at(0.1, 48)}
          >
            <div className={styles.row}>
              <kbd className={styles.kbd}>Ctrl</kbd>
              <kbd className={styles.kbd}>K</kbd>
            </div>

            <span className={styles.badge}>WHAT IS IN SYNTAXLY?</span>

            <div className={styles.row}>
              <span className={styles.btnA}>Get Started</span>
              <span className={styles.btnB}>Learn Syntaxly</span>
            </div>

            <div className={styles.tipDemo}>
              Quick search <kbd className={styles.kbd}>Ctrl</kbd>
              <kbd className={styles.kbd}>K</kbd>
            </div>

            <span className={styles.cap}>
              Keycap · Badge · Buttons · Tooltip
            </span>
          </div>
        </div>
      </section>

      <section>
        <Meta n={5} title="Motion" count={2} />

        <div className={styles.body}>
          <p
            className={`${styles.intro} ${styles.reveal} ${styles.fade} ${styles.right}`}
            data-reveal
            style={at(0.1)}
          >
            One curve for everything: fast out, long settle. Things arrive, they
            don&apos;t slide.
          </p>

          <div className={styles.motion}>
            <div
              className={`${styles.track} ${styles.reveal} ${styles.wipe} ${styles.right}`}
              data-reveal
              style={at(0)}
            >
              <span className={styles.cap}>linear</span>
              <i
                key={`a${run}`}
                className={styles.dotLin}
                style={{ "--dd": run === 0 ? "0.7s" : "0s" } as CSSProperties}
              />
            </div>

            <div
              className={`${styles.track} ${styles.reveal} ${styles.wipe} ${styles.right}`}
              data-reveal
              style={at(0.12)}
            >
              <span className={styles.cap}>cubic-bezier(0.16, 1, 0.3, 1)</span>
              <i
                key={`b${run}`}
                className={styles.dotOurs}
                style={{ "--dd": run === 0 ? "0.7s" : "0s" } as CSSProperties}
              />
            </div>
          </div>

          <button
            className={`${styles.replay} ${styles.reveal} ${styles.fade} ${styles.right}`}
            data-reveal
            style={at(0.3)}
            onClick={() => setRun((r) => r + 1)}
          >
            <ArrowCounterClockwise size={18} weight="bold" />
            Replay
          </button>
        </div>
      </section>

      <section>
        <Meta n={6} title="Voice" count={VOICE.length} />

        <div className={styles.body}>
          <p
            className={`${styles.intro} ${styles.reveal} ${styles.fade} ${styles.right}`}
            data-reveal
            style={at(0.1)}
          >
            Short, calm, a little dry. We talk like the cheatsheet we are.
          </p>

          <div className={styles.voice}>
            {VOICE.map(([yes, no], i) => (
              <div
                key={yes}
                className={styles.voiceRow}
                data-reveal
                style={at(i * 0.05)}
              >
                <p className={styles.yes}>{yes}</p>
                <p className={styles.no}>{no}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <h2 className={styles.ctaTitle} data-reveal>
          <span className={styles.mask}>
            <span className={styles.maskIn}>Now go recall something.</span>
          </span>
        </h2>

        <a
          href="/syntax"
          className={`${styles.btnA} ${styles.reveal} ${styles.wipe} ${styles.right}`}
          data-reveal
          style={at(0.4)}
        >
          Get Started
          <ArrowUpRight size={18} weight="bold" />
        </a>
      </section>
    </main>
  );
}
