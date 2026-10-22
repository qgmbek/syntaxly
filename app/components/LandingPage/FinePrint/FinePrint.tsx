"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import styles from "./FinePrint.module.css";

const LINES = [
  {
    statement: "Vibe coded app for non vibe coders",
    fine: "We actually used a healthy amount of AI.",
  },
  {
    statement: "A cheatsheet, not a course",
    fine: "You already learned it. We just remember the spelling.",
  },
  {
    statement: "No account. No newsletter. No cookie banner",
    fine: "There is genuinely nothing to sign up for.",
  },
  {
    statement: "Two seconds, not fifteen minutes",
    fine: "Timed with a stopwatch. Open How it works and watch it run.",
  },
  {
    statement: "Copy it, it's yours",
    fine: "The snippets, anyway. The design is ours.",
  },
  {
    statement: "Made by one student",
    fine: "Which means every bug has exactly one person to blame. Send it over.",
  },
];

const at = (seconds: number) => ({ "--delay": `${seconds}s` }) as CSSProperties;

export default function FinePrint() {
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
      { threshold: 0.25 },
    );

    els.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={root}
      className={styles.section}
      aria-labelledby="fine-print-title"
    >
      <div className={styles.orb} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.head}>
          <span
            className={`${styles.badge} ${styles.reveal} ${styles.wipe}`}
            data-reveal
            style={at(0)}
          >
            THE FINE PRINT
          </span>

          <h2
            id="fine-print-title"
            className={`${styles.intro} ${styles.reveal} ${styles.fade}`}
            data-reveal
            style={at(0.12)}
          >
            Things most landing pages hide in the footer.
          </h2>
        </div>

        <ol className={styles.list}>
          {LINES.map((line, i) => (
            <li
              key={line.statement}
              className={`${styles.row} ${i === 0 ? styles.featured : ""}`}
              data-reveal
            >
              <span className={styles.index}>
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className={styles.copy}>
                <h3 className={styles.statement}>
                  <span className={styles.mask}>
                    <span className={styles.maskIn}>
                      {line.statement}
                      <span className={styles.star} aria-hidden="true">
                        *
                      </span>
                    </span>
                  </span>
                </h3>

                <p className={styles.small}>
                  <span className={styles.smallStar} aria-hidden="true">
                    *
                  </span>
                  {line.fine}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}