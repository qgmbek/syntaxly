"use client";

import { useState } from "react";
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

type Field = "What it is" | "How it's used" | "Example" | "Tip";

const FIELDS: Record<Field, string> = {
  "What it is": "Declares synchronization with systems outside of React.",
  "How it's used":
    "Runs after render when a dependency changes. Return a cleanup.",
  Example:
    "const id = setInterval(tick, 1000); return () => clearInterval(id);",
  Tip: "An empty dependency array runs exactly once, on mount.",
};

const BLOCK_CODE = "useEffect(() => {\n  return () => {};\n}, [dep]);";

const PRINCIPLES = [
  {
    icon: <Lightning size={26} weight="duotone" />,
    title: "Recall, not tutorials",
    text: "You already learned it. Syntaxly gives back the shape of it, fast enough that you never leave your editor's rhythm.",
  },
  {
    icon: <Stack size={26} weight="duotone" />,
    title: "One canvas per language",
    text: "Every topic sits in a block on a single page. Scan the whole language at a glance, then open only what you need.",
  },
  {
    icon: <BracketsCurly size={26} weight="duotone" />,
    title: "Short on purpose",
    text: "If an entry needs scrolling, it is documentation. Each one stays small enough to read in two seconds.",
  },
];

const STATS = [
  { value: "4", label: "fields per entry" },
  { value: "1", label: "page per language" },
  { value: "2s", label: "to recall a syntax" },
];

export default function About() {
  const [field, setField] = useState<Field>("What it is");
  const isCode = field === "Example";
  const [blockCopied, setBlockCopied] = useState(false);

  const copyBlock = async () => {
    try {
      await navigator.clipboard.writeText(BLOCK_CODE);
      setBlockCopied(true);
      setTimeout(() => setBlockCopied(false), 1500);
    } catch {}
  };

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <aside className={styles.rail}>
          <span className={styles.railName}>ABOUT</span>
        </aside>

        <div className={styles.heroMain}>
          <div className={styles.orb} />

          <div className={styles.heroInner}>
            <h1 className={styles.title}>
              <span className={styles.line}>
                <span>Docs are for learning.</span>
              </span>

              <span className={styles.line}>
                <span style={{ animationDelay: "0.12s" }}>Syntaxly is for</span>
              </span>

              <span className={styles.line}>
                <span style={{ animationDelay: "0.24s" }}>
                  <em className={styles.highlighted}>remembering.</em>
                </span>
              </span>
            </h1>

            <div className={styles.heroFoot}>
              <p className={styles.lead}>
                A cheatsheet for the moment you know exactly what you want to
                write and can&apos;t recall how it&apos;s spelled.
              </p>

              <Link
                href="/syntax"
                className={`${styles.button} ${styles.primaryButton}`}
              >
                Get Started
                <ArrowUpRight size={18} weight="bold" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.story}>
        <h2 className={styles.sectionTitle}>Why it exists</h2>

        <div className={styles.storyText}>
          <p>
            Every developer has the same moment. You come back to a framework
            after a few months, your hands know what they want, and your memory
            returns nothing. So you open the docs, scroll past the introduction,
            skim three paragraphs, and find the one line you needed.
          </p>

          <p>
            That fifteen-minute detour is the problem Syntaxly removes. It skips
            the explaining and keeps the boilerplate, so a quick refresher stays
            quick.
          </p>
        </div>
      </section>

      <section className={styles.principles}>
        <h2 className={styles.sectionTitle}>How it&apos;s built</h2>

        <div className={styles.rows}>
          {PRINCIPLES.map((p) => (
            <article key={p.title} className={styles.row}>
              <div className={styles.rowIcon}>{p.icon}</div>
              <h3 className={styles.rowTitle}>{p.title}</h3>
              <p className={styles.rowText}>{p.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.anatomy}>
        <div className={styles.anatomyIntro}>
          <h2 className={styles.sectionTitle}>Anatomy of an entry</h2>

          <p className={styles.anatomyText}>
            Every syntax is broken into the same four fields, so you always know
            where to look. Pick one.
          </p>

          <div className={styles.miniColumn}>
            <div className={styles.miniBlock}>
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

        <div className={styles.panel}>
          <div className={styles.tabs} role="tablist">
            {(Object.keys(FIELDS) as Field[]).map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={field === f}
                onClick={() => setField(f)}
                className={`${styles.tab} ${
                  field === f ? styles.tabActive : ""
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className={styles.panelBody} key={field}>
            {isCode ? (
              <code className={styles.code}>{FIELDS[field]}</code>
            ) : (
              <p className={styles.panelText}>{FIELDS[field]}</p>
            )}
          </div>

          <div className={styles.panelFoot}>useEffect · React</div>
        </div>
      </section>

      <section className={styles.stats}>
        {STATS.map((s) => (
          <div key={s.label} className={styles.stat}>
            <span className={styles.statValue}>{s.value}</span>
            <span className={styles.statLabel}>{s.label}</span>
          </div>
        ))}
      </section>

      <section className={styles.maker}>
        <h2 className={styles.sectionTitle}>Who&apos;s behind it</h2>

        <p className={styles.makerText}>
          Syntaxly is built by Yer, a computer science student who got tired of
          re-reading docs for things he already knew. It&apos;s made with
          Next.js and TypeScript, and it grows one language at a time.
        </p>
      </section>

      <section className={styles.cta}>
        <h2 className={styles.ctaTitle}>Stop scrolling docs.</h2>

        <div className={styles.buttons}>
          <Link
            href="/syntax"
            className={`${styles.button} ${styles.primaryButton}`}
          >
            Get Started
            <ArrowUpRight size={18} weight="bold" />
          </Link>

          <Link href="/" className={`${styles.button} ${styles.ghostButton}`}>
            Back home
          </Link>
        </div>
      </section>
    </main>
  );
}
