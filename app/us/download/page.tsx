"use client";

import { ArrowUpRight } from "@phosphor-icons/react";
import styles from "./Download.module.css";

const WEB = [
  ["No install", "Open it in any browser."],
  ["Every screen", "Phone, tablet or desktop."],
  ["Same shortcuts", "Ctrl K, arrows, focus mode."],
  ["Always current", "Nothing to update."],
];

export default function Download() {
  return (
    <main className={styles.page}>
      <aside className={styles.rail}>
        <span className={styles.railName}>DOWNLOAD</span>
      </aside>

      <div className={styles.main}>
        <div className={styles.orb} />

        <div className={styles.intro}>
          <h1 className={styles.title}>
            <span className={styles.line}>
              <span>The apps are</span>
            </span>

            <span className={styles.line}>
              <span style={{ animationDelay: "0.12s" }}>
                <em className={styles.hl}>in the making.</em>
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
              The web version works today.
            </span>
          </div>

          <div className={styles.tiles}>
            {WEB.map(([label, desc], i) => (
              <div key={label} className={styles.tile}>
                <span className={styles.fill} />

                <span className={styles.num}>
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span className={styles.body}>
                  <b className={styles.label}>{label}</b>
                  <span className={styles.desc}>{desc}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}