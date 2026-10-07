"use client";

import { useEffect, useRef, useState } from "react";
import { Cookie, CaretDown } from "@phosphor-icons/react";
import styles from "./Cookieconsent.module.css";

const KEY = "syntaxly-consent";
const CHANGED = "syntaxly:consent";
const REOPEN = "syntaxly:cookie-settings";

export type Consent = "all" | "essential";

export function getConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(KEY);

    if (!raw) return null;

    const choice = JSON.parse(raw)?.choice;

    return choice === "all" || choice === "essential" ? choice : null;
  } catch {
    return null;
  }
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(REOPEN));
}

const STORED = [
  ["Essential", "Always on", "Remembers the choice you make here."],
  [
    "Preferences",
    "If you accept",
    "Your theme and font size, kept in this browser.",
  ],
  [
    "Analytics",
    "None right now",
    "Syntaxly doesn't track you. We'll say so here if that changes.",
  ],
];

export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [details, setDetails] = useState(false);

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (getConsent() === null) setOpen(true);

    const reopen = () => {
      setLeaving(false);
      setOpen(true);
    };

    window.addEventListener(REOPEN, reopen);

    return () => {
      window.removeEventListener(REOPEN, reopen);

      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  const choose = (choice: Consent) => {
    try {
      localStorage.setItem(
        KEY,
        JSON.stringify({
          v: 1,
          choice,
          ts: Date.now(),
        }),
      );
    } catch {}

    window.dispatchEvent(
      new CustomEvent(CHANGED, {
        detail: choice,
      }),
    );

    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (calm) {
      setOpen(false);
      return;
    }

    setLeaving(true);

    timer.current = setTimeout(() => {
      setOpen(false);
      setLeaving(false);
      setDetails(false);
    }, 450);
  };

  if (!open) return null;

  return (
    <div
      className={`${styles.bar} ${leaving ? styles.leaving : ""}`}
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-desc"
    >
      <div className={styles.inner}>
        <div
          id="cookie-details"
          className={`${styles.details} ${details ? styles.detailsOpen : ""}`}
        >
          <div className={styles.clip}>
            <div className={styles.blocks}>
              {STORED.map(([title, tag, text]) => (
                <div key={title} className={styles.block}>
                  <span className={styles.tab}>{title}</span>
                  <span className={styles.tag}>{tag}</span>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.lead}>
            <span className={styles.icon}>
              <Cookie size={26} weight="duotone" aria-hidden="true" />
            </span>

            <div className={styles.copy}>
              <h2 id="cookie-title" className={styles.title}>
                Cookies
              </h2>

              <p id="cookie-desc" className={styles.text}>
                Syntaxly has no ads and no tracking. Accept to let it remember
                your theme and font size in this browser, or keep only what it
                needs to work.{" "}
                <button
                  className={styles.toggle}
                  onClick={() => setDetails((d) => !d)}
                  aria-expanded={details}
                  aria-controls="cookie-details"
                >
                  What&apos;s stored
                  <CaretDown
                    size={12}
                    weight="bold"
                    className={`${styles.caret} ${
                      details ? styles.caretOpen : ""
                    }`}
                  />
                </button>{" "}
                <a href="/us/privacy" className={styles.link}>
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>

          <div className={styles.actions}>
            <button
              className={`${styles.btn} ${styles.accept}`}
              onClick={() => choose("all")}
            >
              Accept
            </button>

            <button
              className={`${styles.btn} ${styles.essential}`}
              onClick={() => choose("essential")}
            >
              Essential only
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
