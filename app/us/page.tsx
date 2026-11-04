"use client";

import type { CSSProperties } from "react";
import styles from "./Us.module.css";

const PAGES = [
  { href: "/us/about", title: "About", text: "Why Syntaxly exists." },
  { href: "/us/how-it-works", title: "How it works", text: "Four moves, two seconds." },
  { href: "/us/features", title: "Features", text: "The few things it does well." },
  { href: "/us/faq", title: "FAQ", text: "Questions, answered." },
  { href: "/us/roadmap", title: "Roadmap", text: "Where it's going." },
  { href: "/us/download", title: "Download", text: "The apps in the making." },
  { href: "/us/brand", title: "Brand", text: "Logo, colors, type and voice." },
  { href: "/us/resources", title: "Resources", text: "Things worth bookmarking." },
  { href: "/us/contact", title: "Contact", text: "Say hello." },
  { href: "/us/terms", title: "Terms", text: "The rules, in plain English." },
  { href: "/us/privacy", title: "Privacy", text: "What happens to your data." },
];

const TONES = [
  "var(--primary)",
  "#ffd84d",
  "#ff7ab8",
  "#8ab6ff",
  "#ff9a5c",
  "#b5f23d",
];

export default function Us() {
  const surprise = () => {
    const p = PAGES[Math.floor(Math.random() * PAGES.length)];

    window.location.href = p.href;
  };

  return (
    <main className={styles.page}>
      <header className={styles.head}>
        <span className={styles.kicker}>/us</span>

        <h1 className={styles.title}>
          Everything about <em className={styles.hl}>Syntaxly.</em>
        </h1>

        <p className={styles.lead}>
          One page, every room in the house. Pick a door, or let us pick one
          for you.
        </p>
      </header>

      <nav className={styles.grid} aria-label="About Syntaxly">
        {PAGES.map((p, i) => (
          <a
            key={p.href}
            href={p.href}
            className={styles.tile}
            style={
              {
                "--i": i,
                "--tone": TONES[i % TONES.length],
                "--r": `${i % 2 ? 0.5 : -0.5}deg`,
              } as CSSProperties
            }
          >
            <span className={styles.fill} />
            <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>

            <span className={styles.body}>
              <b className={styles.name}>{p.title}</b>
              <span className={styles.text}>{p.text}</span>
            </span>

            <span className={styles.go} aria-hidden="true">
              ↗
            </span>
          </a>
        ))}

        <button
          className={`${styles.tile} ${styles.surprise}`}
          style={{ "--i": PAGES.length, "--r": "-0.5deg" } as CSSProperties}
          onClick={surprise}
        >
          <span className={styles.tape} aria-hidden="true" />
          <span className={styles.body}>
            <b className={styles.name}>Surprise me</b>
            <span className={styles.text}>well pick a door for you.</span>
          </span>
        </button>
      </nav>
    </main>
  );
}