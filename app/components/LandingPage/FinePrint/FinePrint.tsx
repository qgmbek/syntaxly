"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import styles from "./FinePrint.module.css";
import {
  Underline,
  Loop,
  Magnifier,
  Scissors,
} from "../../../../app/ui/HandDrawn";

const LINES = [
  {
    statement: "Vibe coded app for non vibe coders",
    fine: "We actually used a healthy amount of AI.",
    tag: "guilty",
    tone: "var(--primary)",
  },
  {
    statement: "A cheatsheet, not a course",
    fine: "You already learned it. We just remember the spelling.",
    tag: "just spelling",
    tone: "#ffd84d",
  },
  {
    statement: "No account. No newsletter. No cookie banner",
    fine: "There is genuinely nothing to sign up for.",
    tag: "zero forms",
    tone: "#ff7ab8",
  },
  {
    statement: "Two seconds, not fifteen minutes",
    fine: "Timed with a stopwatch. Open How it works and watch it run.",
    tag: "stopwatch proof",
    tone: "#8ab6ff",
  },
  {
    statement: "Copy it, it's yours",
    fine: "The snippets, anyway. The design is ours.",
    tag: "take it",
    tone: "#ff9a5c",
  },
  {
    statement: "Made by one student",
    fine: "Which means every bug has exactly one person to blame. Send it over.",
    tag: "send bugs",
    tone: "#b5f23d",
  },
];

const MARQUEE = [
  "Fine print",
  "No catch",
  "Read it all",
  "Still free",
  "Two seconds",
  "No signup",
  "Copy away",
  "One student",
];

const at = (seconds: number) => ({ "--delay": `${seconds}s` }) as CSSProperties;

const drawAt = (seconds: number) =>
  ({ "--draw-delay": `${seconds}s` }) as CSSProperties;

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

  useEffect(() => {
    const el = root.current;

    if (!el) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
      el.style.setProperty("--p", p.toFixed(4));
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
    <section
      ref={root}
      className={styles.section}
      aria-labelledby="fine-print-title"
    >
      <div className={styles.orb} aria-hidden="true" />

      <Magnifier className={`${styles.decor} ${styles.decorGlass}`} />
      <Scissors className={`${styles.decor} ${styles.decorScissors}`} />

      <div className={styles.inner}>
        <div className={styles.head}>
          <span
            className={`${styles.badge} ${styles.reveal} ${styles.wipe}`}
            data-reveal
            style={at(0)}
          >
            <span className={styles.badgeStar} aria-hidden="true">
              *
            </span>
            THE FINE PRINT
          </span>

          <h2
            id="fine-print-title"
            className={`${styles.intro} ${styles.reveal} ${styles.fade}`}
            data-reveal
            style={at(0.12)}
          >
            Things most landing pages hide in the{" "}
            <span className={styles.under}>
              footer.
              <Underline className={styles.underline} style={drawAt(0.9)} />
            </span>
          </h2>

          <div className={styles.note} data-reveal aria-hidden="true">
            <span className={styles.noteTape} />
            <div className={styles.notePaper}>
              <span className={styles.noteTop}>psst...</span>
              <span className={styles.noteBody}>
                yes, we read it{" "}
                <span className={styles.noteUnder}>
                  too.
                  <Underline
                    className={styles.noteUnderline}
                    style={drawAt(1.4)}
                  />
                </span>
              </span>
            </div>
          </div>
        </div>

        <div
          className={`${styles.ribbons} ${styles.reveal} ${styles.wipe}`}
          data-reveal
          style={at(0.2)}
          aria-hidden="true"
        >
          <div className={`${styles.ribbon} ${styles.ribbonA}`}>
            <div className={styles.track}>
              {[0, 1].map((g) => (
                <div className={styles.group} key={g}>
                  {MARQUEE.map((word) => (
                    <span className={styles.item} key={word}>
                      {word}
                      <span className={styles.mStar}>*</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className={`${styles.ribbon} ${styles.ribbonB}`}>
            <div className={`${styles.track} ${styles.back}`}>
              {[0, 1].map((g) => (
                <div className={styles.group} key={g}>
                  {[...MARQUEE].reverse().map((word) => (
                    <span className={styles.item} key={word}>
                      {word}
                      <span className={styles.mStar}>*</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <ol className={styles.list}>
          {LINES.map((line, i) => (
            <li
              key={line.statement}
              className={`${styles.row} ${i === 0 ? styles.featured : ""}`}
              data-reveal
              style={
                {
                  "--tone": line.tone,
                  "--tilt": `${i % 2 === 0 ? -5 : 4}deg`,
                } as CSSProperties
              }
              onPointerMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty(
                  "--mx",
                  `${e.clientX - r.left}px`,
                );
                e.currentTarget.style.setProperty(
                  "--my",
                  `${e.clientY - r.top}px`,
                );
              }}
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
                  <span className={styles.mark}>{line.fine}</span>
                </p>

                <span className={styles.sticker} aria-hidden="true">
                  {line.tag}
                </span>
              </div>
            </li>
          ))}
        </ol>

        <p
          className={`${styles.end} ${styles.reveal} ${styles.fade}`}
          data-reveal
          style={at(0.1)}
        >
          <span className={styles.endStar} aria-hidden="true">
            *
          </span>
          <span>
            This line has{" "}
            <span className={styles.circled}>
              no fine print
              <Loop className={styles.loop} style={drawAt(0.8)} />
            </span>
            .
          </span>
        </p>
      </div>
    </section>
  );
}
