"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowCounterClockwise,
  Copy,
  Check,
  MagnifyingGlass,
} from "@phosphor-icons/react";

import styles from "./HowItWorks.module.css";

const STEPS = ["Scan", "Search", "Open", "Copy"];

const TARGETS = [0.38, 1.1, 1.52, 1.84];

const QUERY = "usest";

const COLS = [
  {
    n: 1,
    title: "Fundamentals",
    blocks: [
      ["Variables", "let x = 42;"],
      ["Constants", "const PI = 3.14;"],
    ],
  },
  {
    n: 2,
    title: "Hooks",
    blocks: [
      ["useState", "const [n, setN] = useState(0);"],
      ["useEffect", "useEffect(() => {}, [dep]);"],
      ["useRef", "const ref = useRef(null);"],
    ],
  },
  {
    n: 3,
    title: "Functions",
    blocks: [
      ["Arrow", "const add = (a, b) => a + b;"],
      ["Spread", "const b = [...a, 4];"],
    ],
  },
];

const KEYS = [
  { keys: ["Ctrl", "K"], text: "Search every block" },
  { keys: ["↑", "↓"], text: "Move between blocks" },
  { keys: ["←", "→"], text: "Move between columns" },
  { keys: ["Ctrl", "U"], text: "Unique syntax only" },
  { keys: ["Ctrl", "Shift", "F"], text: "Focus mode" },
  { keys: ["+", "-"], text: "Resize the code" },
];

const SHAPE = `{
  title: "useState",
  code: "const [n, setN] = useState(0);",
  language: "tsx",
  unique: false,
  explanation: {
    what: "State hook that re-renders on change.",
    how: "Call it at the top level of a component.",
    example: "setN(prev => prev + 1)",
    tips: "Use the functional form for prev values."
  }
}`;

const PIPE = [
  {
    n: 1,
    title: "Read",
    blocks: [
      {
        tab: "Start at the source",
        text: "Official docs and the language spec first. Blog posts only help me find the right page.",
      },
      {
        tab: "Skip the tutorial",
        text: "Go straight to the API reference. Tutorials explain, references define.",
      },
      {
        tab: "Mind the version",
        text: "Note which version a page covers before trusting a single line.",
      },
    ],
  },
  {
    n: 2,
    title: "Search",
    blocks: [
      {
        tab: "Docs, then code",
        text: "Find the page, then find real usage of it.",
        code: "site:react.dev useEffect cleanup",
      },
      {
        tab: "Search the repo",
        text: "See how the maintainers write it.",
        code: "repo:facebook/react useEffect language:tsx",
      },
      {
        tab: "Read the issues",
        text: "Gotchas live in issues and release notes, not in the docs.",
      },
    ],
  },
  {
    n: 3,
    title: "Note",
    blocks: [
      {
        tab: "One shape",
        text: "Every note has the same four fields, so nothing gets skipped.",
        code: "what / how\nexample / tip",
      },
      {
        tab: "Source + version",
        text: "The link and version stay beside each note.",
        code: "react.dev · v19",
      },
      {
        tab: "Write the gotcha",
        text: "If it surprised me once, it goes in the tip.",
      },
    ],
  },
  {
    n: 4,
    title: "Scan code",
    blocks: [
      {
        tab: "Look at many",
        text: "Open several real projects and see how each one writes it.",
      },
      {
        tab: "Count the forms",
        text: "The form that shows up most often is usually the idiomatic one.",
        code: 'grep -rn "useEffect(" src',
      },
      {
        tab: "Prefer the shortest",
        text: "Among the correct forms, keep the one that is fastest to recall.",
      },
    ],
  },
  {
    n: 5,
    title: "Distill",
    blocks: [
      {
        tab: "Cut",
        text: "Remove everything that isn't the boilerplate.",
      },
      {
        tab: "Try it",
        text: "Run the snippet in a scratch file before it ships.",
      },
      {
        tab: "Link back",
        text: "Keep the source so a block can be re-checked later.",
      },
    ],
  },
];

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
    <div className={styles.meta}>
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

export default function HowItWorks() {
  const [run, setRun] = useState(0);
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState("");
  const [copied, setCopied] = useState(false);
  const [done, setDone] = useState(false);
  const [t, setT] = useState(0);

  const tRef = useRef(0);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = stageRef.current;

    if (!el) return;

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    io.observe(el);

    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    tRef.current = 0;
    setT(0);
    setStep(0);
    setTyped("");
    setCopied(false);
    setDone(false);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStep(3);
      setTyped(QUERY);
      setCopied(true);
      setDone(true);
      tRef.current = TARGETS[3];
      setT(TARGETS[3]);
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];

    const at = (ms: number, fn: () => void) => timers.push(setTimeout(fn, ms));

    at(1800, () => setStep(1));

    QUERY.split("").forEach((_, i) =>
      at(2300 + i * 170, () => setTyped(QUERY.slice(0, i + 1))),
    );

    at(3700, () => setStep(2));
    at(5800, () => setStep(3));
    at(6600, () => setCopied(true));
    at(7200, () => setDone(true));

    return () => timers.forEach(clearTimeout);
  }, [run, started]);

  useEffect(() => {
    if (
      !started ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const from = tRef.current;
    const target = TARGETS[step];
    const t0 = performance.now();

    let raf = 0;

    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / 700);
      const v = from + (target - from) * (1 - Math.pow(1 - p, 3));

      tRef.current = v;
      setT(v);

      if (p < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [step, run, started]);

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <aside className={styles.rail}>
          <span className={styles.railName}>HOW IT WORKS</span>
        </aside>

        <div className={styles.heroMain}>
          <div className={styles.orb} />

          <div className={styles.heroInner}>
            <h1 className={styles.title}>
              <span className={styles.line}>
                <span>Four moves.</span>
              </span>

              <span className={styles.line}>
                <span style={{ animationDelay: "0.12s" }}>
                  <em className={styles.hl}>Two seconds.</em>
                </span>
              </span>
            </h1>

            <div className={styles.heroFoot}>
              <p className={styles.lead}>
                Scan, search, open, copy. That is the whole product. Scroll down
                and watch it run against a stopwatch.
              </p>

              <a href="#demo" className={`${styles.btn} ${styles.btnA}`}>
                Watch it run
                <ArrowDown size={18} weight="bold" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="demo" className={styles.demo}>
        <Meta n={1} title="The loop" count={4} />

        <div className={styles.stageWrap} ref={stageRef}>
          <div className={styles.bar}>
            <div className={styles.clock} aria-live="off">
              {t.toFixed(2).padStart(5, "0")}
              <span>s</span>
            </div>

            <ol
              className={styles.chips}
              style={{ "--s": step } as CSSProperties}
            >
              {STEPS.map((s, i) => (
                <li
                  key={s}
                  className={`${styles.chip} ${
                    i === step ? styles.chipOn : ""
                  } ${i < step || done ? styles.chipDone : ""}`}
                >
                  <span>{i + 1}</span>
                  {s}
                </li>
              ))}
            </ol>
          </div>

          <div className={styles.progress}>
            <i
              style={{
                transform: `scaleX(${done ? 1 : (step + 1) / 4})`,
              }}
            />
          </div>

          <div className={styles.stage}>
            <div
              className={`${styles.view} ${step === 0 ? styles.on : ""}`}
              aria-hidden={step !== 0}
            >
              <div className={styles.cols}>
                {COLS.map((c, ci) => (
                  <div
                    key={c.n}
                    className={`${styles.col} ${styles.stag}`}
                    style={{ "--i": ci } as CSSProperties}
                  >
                    <div className={styles.colMeta}>
                      <span>{c.n}</span>
                      {c.title}
                    </div>

                    <div className={styles.colMain}>
                      {c.blocks.map(([title, code]) => (
                        <div
                          key={title}
                          className={`${styles.block} ${
                            title === "useState" ? styles.pulse : ""
                          }`}
                        >
                          <span className={styles.tab}>{title}</span>
                          <pre className={styles.code}>{code}</pre>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className={`${styles.view} ${step === 1 ? styles.on : ""}`}
              aria-hidden={step !== 1}
            >
              <div className={styles.search}>
                <div
                  className={`${styles.searchRow} ${styles.stag}`}
                  style={{ "--i": 0 } as CSSProperties}
                >
                  <MagnifyingGlass size={20} />

                  <span className={styles.typed}>
                    {typed}
                    <i className={styles.caret} />
                  </span>
                </div>

                <div
                  className={`${styles.result} ${styles.stag}`}
                  style={{ "--i": 2 } as CSSProperties}
                >
                  <span className={styles.resTag}>02 · Hooks</span>

                  <span className={styles.resBody}>
                    <b>
                      <mark>useSt</mark>ate
                    </b>

                    <code>
                      const [n, setN] = <mark>useSt</mark>ate(0);
                    </code>
                  </span>
                </div>
              </div>
            </div>

            <div
              className={`${styles.view} ${step >= 2 ? styles.on : ""}`}
              aria-hidden={step < 2}
            >
              <div className={styles.open}>
                <div
                  className={`${styles.block} ${styles.blockBig} ${
                    styles.active
                  } ${styles.stag} ${copied ? styles.pressed : ""}`}
                  style={{ "--i": 0 } as CSSProperties}
                >
                  <span className={styles.tab}>useState</span>

                  <span className={styles.copyIcon}>
                    {copied ? (
                      <Check size={20} weight="bold" />
                    ) : (
                      <Copy size={20} />
                    )}
                  </span>

                  <pre className={styles.code}>
                    {"const [n, setN] = useState(0);"}
                  </pre>

                  {copied && <span className={styles.toast}>Copied</span>}
                </div>

                <div
                  className={`${styles.explain} ${styles.stag}`}
                  style={{ "--i": 2 } as CSSProperties}
                >
                  <div className={styles.eHead}>useState</div>

                  <div>
                    <label>WHAT IT IS</label>
                    <p>
                      State hook that forces a re-render when state changes.
                    </p>
                  </div>

                  <div>
                    <label>HOW IT IS USED</label>
                    <p>Call it at the top level of your component.</p>
                  </div>

                  <div>
                    <label>PRO TIP</label>
                    <p>
                      Use the functional form when you need the previous value.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.foot}>
            <p className={`${styles.verdict} ${done ? styles.verdictOn : ""}`}>
              Recalled in <b>1.84s</b>. Reading the docs for it: about{" "}
              <b>15 minutes</b>.
            </p>

            <button
              className={styles.replay}
              onClick={() => setRun((r) => r + 1)}
            >
              <ArrowCounterClockwise size={18} weight="bold" />
              Replay
            </button>
          </div>
        </div>
      </section>

      <section>
        <Meta n={2} title="How we write it" count={PIPE.length} />

        <div className={styles.body}>
          <p className={styles.intro}>
            Every block is distilled from somewhere. This is the route a syntax
            takes through the official docs, the search bar and real code before
            it earns a spot.
          </p>
        </div>

        <div className={styles.pipeBand}>
          <div className={styles.pipe}>
            {PIPE.map((c) => (
              <div key={c.n} className={styles.pCol}>
                <div className={styles.pMeta}>
                  <span>{c.n}</span>
                  {c.title}
                  <em>Blocks: {c.blocks.length}</em>
                </div>

                <div className={styles.pMain}>
                  {c.blocks.map((b) => (
                    <div key={b.tab} className={styles.pBlock}>
                      <span className={styles.tab}>{b.tab}</span>

                      {b.code && <pre className={styles.pCode}>{b.code}</pre>}

                      <p className={styles.pText}>{b.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.body}>
          <p className={styles.rule}>
            The test: if it takes longer to read than to retype,{" "}
            <mark>cut it.</mark>
          </p>
        </div>
      </section>

      <section>
        <Meta n={3} title="Keyboard first" count={KEYS.length} />

        <div className={styles.body}>
          <p className={styles.intro}>
            You never have to leave the home row. Every move above has a key.
          </p>

          <div className={styles.keyGrid}>
            {KEYS.map((k) => (
              <div key={k.text} className={styles.keyTile}>
                <span className={styles.fill} />

                <span className={styles.keyRow}>
                  {k.keys.map((x) => (
                    <kbd key={x} className={styles.kbd}>
                      {x}
                    </kbd>
                  ))}
                </span>

                <span className={styles.keyText}>{k.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <Meta n={4} title="Under the hood" count={1} />

        <div className={`${styles.body} ${styles.hood}`}>
          <div>
            <p className={styles.intro}>
              Every language is a typed list of columns and blocks. Add one
              block and it shows up in the column, the search, the minimap and
              the keyboard navigation. Nothing else to wire.
            </p>

            <p className={styles.small}>
              Next.js · TypeScript · CSS modules · no backend
            </p>
          </div>

          <div className={styles.darkPanel}>
            <div className={`${styles.block} ${styles.shape}`}>
              <span className={styles.tab}>data.ts</span>
              <pre className={styles.code}>{SHAPE}</pre>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <h2 className={styles.ctaTitle}>Your turn. Beat 1.84s.</h2>

        <Link href="/syntax" className={`${styles.btn} ${styles.btnA}`}>
          Get Started
        </Link>
      </section>
    </main>
  );
}
