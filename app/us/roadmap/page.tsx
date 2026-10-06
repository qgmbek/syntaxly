"use client";

import { useState, type CSSProperties } from "react";

import { ArrowUpRight, ArrowDown } from "@phosphor-icons/react";

import styles from "./Roadmap.module.css";

const UPDATED = "October 6, 2026";

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

export default function Roadmap() {
  const [open, setOpen] = useState<string | null>("Search every block");

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <aside className={styles.rail}>
          <span className={styles.railName}>ROADMAP</span>
        </aside>

        <div className={styles.heroMain}>
          <div className={styles.orb} />

          <div className={styles.heroInner}>
            <h1 className={styles.title}>
              <span className={styles.line}>
                <span>Where it&apos;s</span>
              </span>
              <span className={styles.line}>
                <span style={{ animationDelay: "0.12s" }}>
                  <em className={styles.hl}>going.</em>
                </span>
              </span>
            </h1>

            <div className={styles.heroFoot}>
              <p className={styles.lead}>
                What is live, what is being built and what is still an idea. It
                is a plan, not a promise.
              </p>

              <span className={styles.updated}>Updated {UPDATED}</span>

              <a href="#board" className={`${styles.btn} ${styles.btnA}`}>
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
            {COLS.map((c) => (
              <div key={c.n} className={styles.col}>
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
        <h2 className={styles.ctaTitle}>Missing something?</h2>

        <div className={styles.ctaBtns}>
          <a href="/us/contact" className={`${styles.btn} ${styles.btnA}`}>
            Tell us
            <ArrowUpRight size={18} weight="bold" />
          </a>

          <a href="/syntax" className={`${styles.btn} ${styles.btnB}`}>
            Open Syntaxly
          </a>
        </div>
      </section>
    </main>
  );
}
