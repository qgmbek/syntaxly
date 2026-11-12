"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./Hero.module.css";
import SyntaxCard from "./SyntaxCard/SyntaxCard";
import HeroBackground from "./HeroBackground/HeroBackground";
import { Arrow, Eye, MeltingClock } from "../../../../app/ui/HandDrawn";
import PerLetterBlur from "@/app/animations/PerLetterBlur";

const MAGNET_REACH = 90;

const NOTE_STROKES = [
  "M12 12 C7 8 2 13 7 16 C16 20 8 25 3 21",
  "M22 5 L18 20 Q17 25 23 21 M15 12 L26 11",
  "M36 13 C27 8 25 24 32 22 Q36 20 37 12 L35 22 L40 20",
  "M43 12 L41 22 Q44 10 50 12",
  "M59 5 L55 20 Q54 25 60 21 M51 12 L63 11",
  "M77 4 L72 23 Q77 10 82 13 Q84 15 80 22 L85 21",
  "M88 17 Q100 14 94 11 C88 9 84 24 95 21",
  "M101 12 L99 22 Q102 10 108 12",
  "M111 17 Q123 14 117 11 C111 9 107 24 119 21",
];

const WORDS = ["programming.", "JavaScript.", "TypeScript.", "React."];

const TONES = [
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

const letters = (text: string) =>
  text.split("").map((letter, i) => (
    <span
      key={i}
      aria-hidden="true"
      className={styles.letter}
      style={{ "--tone": TONES[i % TONES.length] } as React.CSSProperties}
    >
      {letter}
    </span>
  ));

function WordRotator() {
  const [state, setState] = useState({ index: 0, prev: -1 });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer = 0;

    const tick = () => {
      setState((s) => ({
        index: (s.index + 1) % WORDS.length,
        prev: s.index,
      }));

      timer = window.setTimeout(tick, 2600);
    };

    timer = window.setTimeout(tick, 3400);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <span className={styles.rotator}>
      {WORDS.map((word, i) => (
        <span
          key={word}
          className={styles.rotWord}
          data-state={
            i === state.index
              ? "active"
              : i === state.prev
                ? "leaving"
                : "waiting"
          }
          aria-hidden={i !== state.index}
        >
          {letters(word)}
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));

    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const progress = Math.max(
        0,
        Math.min(1, -rect.top / container.offsetHeight),
      );

      container.style.setProperty("--sp", String(progress));
      container.style.setProperty("--e", String(Math.min(1, progress * 1.8)));
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resetButton = () => {
      if (buttonRef.current) {
        buttonRef.current.style.translate = "";
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      const button = buttonRef.current;
      if (!button) return;

      const rect = button.getBoundingClientRect();

      const dxOutside = Math.max(
        rect.left - event.clientX,
        0,
        event.clientX - rect.right,
      );

      const dyOutside = Math.max(
        rect.top - event.clientY,
        0,
        event.clientY - rect.bottom,
      );

      if (Math.hypot(dxOutside, dyOutside) >= MAGNET_REACH) {
        button.style.translate = "";
        return;
      }

      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);

      const x = Math.max(-12, Math.min(12, dx * 0.22));
      const y = Math.max(-8, Math.min(8, dy * 0.3));

      button.style.translate = `${x}px ${y}px`;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", resetButton);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", resetButton);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className={`${styles.container} ${mounted ? styles.mounted : ""}`}
      {...(mounted ? { "data-in": "" } : {})}
    >
      <HeroBackground
        containerRef={containerRef}
        buttonRef={buttonRef}
        mounted={mounted}
      />
      <Eye className={`${styles.decor} ${styles.decorEye}`} />
      <MeltingClock className={`${styles.decor} ${styles.decorClock}`} />

      <div className={styles.content}>
        <h1
          className={styles.title}
          aria-label="Syntax cheatsheet for programming."
        >
          <span className={styles.titleLine}>
            <span
              className={styles.word}
              style={{ "--w": 0 } as React.CSSProperties}
            >
              {letters("Syntax")}
            </span>{" "}
            <span
              className={styles.word}
              style={{ "--w": 1 } as React.CSSProperties}
            >
              <span className={styles.highlighted}>
                {letters("cheatsheet")}
              </span>
            </span>{" "}
            <span
              className={styles.word}
              style={{ "--w": 2 } as React.CSSProperties}
            >
              {letters("for")}
            </span>
          </span>

          <span className={styles.titleLine}>
            <span
              className={styles.word}
              style={{ "--w": 3 } as React.CSSProperties}
            >
              <WordRotator />
            </span>
          </span>
        </h1>

        <div className={styles.subtitle}>
          <PerLetterBlur>
            Browse every syntax at a glance, organized into blocks by topic.
            Click any one to see a quick refresher: definition, usage, example,
            and tips.
          </PerLetterBlur>
        </div>

        <div className={styles.buttonContainer}>
          <Link
            ref={buttonRef}
            href="/syntax"
            className={`${styles.button} ${styles.getButton}`}
          >
            Get Started
            <span className={styles.buttonArrow} aria-hidden="true">
              ↗
            </span>
          </Link>

          <Link
            href="/syntax"
            className={`${styles.button} ${styles.learnButton}`}
          >
            Learn Syntaxly
          </Link>
        </div>

        <span className={styles.note} aria-hidden="true">
          <svg
            className={styles.noteText}
            viewBox="0 0 124 30"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            focusable="false"
          >
            {NOTE_STROKES.map((path, i) => (
              <path
                key={i}
                d={path}
                pathLength={1}
                data-draw=""
                style={
                  {
                    "--draw-delay": `${2400 + i * 150}ms`,
                    "--draw-dur": "180ms",
                  } as React.CSSProperties
                }
              />
            ))}
          </svg>

          <Arrow className={styles.noteArrow} />
        </span>
      </div>

      <SyntaxCard mounted={mounted} />
    </section>
  );
}
