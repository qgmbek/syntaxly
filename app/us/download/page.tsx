"use client";

import type { CSSProperties, MouseEvent } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import styles from "./Download.module.css";

const PLATFORMS = [
  {
    name: "Windows",
    status: "In development",
    desc: "A dedicated desktop app is on the way.",
  },
  {
    name: "iOS",
    status: "In development",
    desc: "A native app for iPhone and iPad is in the works.",
  },
  {
    name: "Android",
    status: "In development",
    desc: "A native app for Android devices is in the works.",
  },
  {
    name: "Web app",
    status: "Available now",
    desc: "Use Syntaxly in any browser, on any screen.",
    ready: true,
  },
];

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

const titleLetters = (text: string, line: number) => {
  let index = 0;

  return text.split(" ").map((word, wordIndex, words) => (
    <span key={wordIndex}>
      <span className={styles.word}>
        {word.split("").map((letter) => {
          const i = index++;

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
      {wordIndex < words.length - 1 ? " " : ""}
    </span>
  ));
};

export default function Download() {
  const trackPointer = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <main className={styles.page}>
      <aside className={styles.rail}>
        <span className={styles.railName}>DOWNLOAD</span>
      </aside>

      <div className={styles.main} onMouseMove={trackPointer}>
        <div className={styles.orb} />
        <span className={`${styles.blob} ${styles.blobPink}`} aria-hidden="true" />
        <span className={`${styles.blob} ${styles.blobBlue}`} aria-hidden="true" />

        <div className={styles.intro}>
          <h1 className={styles.title} aria-label="The apps are in the making.">
            <span className={styles.line} aria-hidden="true">
              <span style={{ animationDelay: "0.2s" }}>
                {titleLetters("The apps are", 0)}
              </span>
            </span>

            <span className={styles.line} aria-hidden="true">
              <span style={{ animationDelay: "0.32s" }}>
                <em className={styles.hl}>
                  {titleLetters("in the making.", 1)}
                </em>
                <span className={styles.sticker} aria-hidden="true">
                  on every screen
                </span>
              </span>
            </span>
          </h1>

          <div className={styles.introFoot}>
            <p className={styles.lead}>
              Windows, iOS and Android versions of Syntaxly are being built.
              Until they land, the web version does everything, on any screen.
            </p>

            <a href="/syntax" className={styles.btn}>
              Open Syntaxly
              <ArrowUpRight size={18} weight="bold" />
            </a>
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.meanBar}>
            <span className={styles.meanTag}>Meanwhile</span>
            <span className={styles.meanText}>
              The web app is ready today.
            </span>
          </div>

          <div className={styles.tiles}>
            {PLATFORMS.map((platform, i) => (
              <div
                key={platform.name}
                className={`${styles.tile} ${platform.ready ? styles.tileReady : ""}`}
                style={{ "--i": i } as CSSProperties}
              >
                <span className={styles.fill} />

                <span className={styles.num}>
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span className={styles.body}>
                  <span className={styles.status}>{platform.status}</span>
                  <b className={styles.label}>{platform.name}</b>
                  <span className={styles.desc}>{platform.desc}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
