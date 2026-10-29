"use client";

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import styles from "./Hero.module.css";
import { Arrow, Eye, MeltingClock } from "../../../../app/ui/HandDrawn";

const CELL_SIZE = 80;
const MAGNET_REACH = 90;

// Each path follows the pen through one handwritten letter, left to right.
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

const SUBTITLE =
  "Browse every syntax at a glance, organized into blocks by topic. Click any one to see a quick refresher: definition, usage, example, and tips.";

type Kind = "kw" | "fn" | "pa" | "nm" | "pl";
type Token = [string, Kind];

const SNIPPETS: {
  name: string;
  column: { n: number; title: string; blocks: number };
  tokens: Token[];
}[] = [
  {
    name: "Arrow function",
    column: { n: 3, title: "Functions", blocks: 8 },
    tokens: [
      ["const", "kw"],
      [" ", "pl"],
      ["add", "fn"],
      [" ", "pl"],
      ["=", "kw"],
      [" (", "pl"],
      ["a", "pa"],
      [", ", "pl"],
      ["b", "pa"],
      [") ", "pl"],
      ["=>", "kw"],
      [" a ", "pl"],
      ["+", "kw"],
      [" b;\n", "pl"],
      ["add", "fn"],
      ["(", "pl"],
      ["2", "nm"],
      [", ", "pl"],
      ["3", "nm"],
      [");", "pl"],
    ],
  },
  {
    name: "Generics",
    column: { n: 7, title: "Types", blocks: 11 },
    tokens: [
      ["function", "kw"],
      [" ", "pl"],
      ["first", "fn"],
      ["<", "pl"],
      ["T", "pa"],
      [">(", "pl"],
      ["items", "pa"],
      [":", "kw"],
      [" ", "pl"],
      ["T", "pa"],
      ["[])", "pl"],
      [":", "kw"],
      [" ", "pl"],
      ["T", "pa"],
      [" {\n  ", "pl"],
      ["return", "kw"],
      [" items[", "pl"],
      ["0", "nm"],
      ["];\n}", "pl"],
    ],
  },
  {
    name: "useState",
    column: { n: 12, title: "Hooks", blocks: 6 },
    tokens: [
      ["const", "kw"],
      [" [", "pl"],
      ["n", "nm"],
      [", ", "pl"],
      ["setN", "nm"],
      ["] ", "pl"],
      ["=", "kw"],
      ["\n  ", "pl"],
      ["useState", "fn"],
      ["(", "pl"],
      ["0", "nm"],
      [");", "pl"],
    ],
  },
  {
    name: "Destructuring",
    column: { n: 2, title: "Variables", blocks: 9 },
    tokens: [
      ["const", "kw"],
      [" { ", "pl"],
      ["id", "nm"],
      [", ", "pl"],
      ["name", "nm"],
      [" } ", "pl"],
      ["=", "kw"],
      [" user;\n", "pl"],
      ["const", "kw"],
      [" [", "pl"],
      ["a", "nm"],
      [", ", "pl"],
      ["b", "nm"],
      ["] ", "pl"],
      ["=", "kw"],
      [" pair;", "pl"],
    ],
  },
];

interface Cell {
  top: number;
  left: number;
  width: number;
  height: number;
  row: number;
  col: number;
}

const sampleDistinct = <T,>(arr: T[], count: number): T[] => {
  const shuffled = [...arr];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, Math.min(count, shuffled.length));
};

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

function SyntaxCard() {
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState(0);

  const snippet = SNIPPETS[index];

  const total = useMemo(
    () => snippet.tokens.reduce((n, [text]) => n + text.length, 0),
    [snippet],
  );

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let timer = 0;
    let count = 0;

    if (reduce) {
      setTyped(total);
      timer = window.setTimeout(
        () => setIndex((i) => (i + 1) % SNIPPETS.length),
        5000,
      );
      return () => window.clearTimeout(timer);
    }

    const type = () => {
      count += 1;
      setTyped(count);

      if (count < total) {
        timer = window.setTimeout(type, 32 + Math.random() * 42);
      } else {
        timer = window.setTimeout(() => {
          setTyped(0);
          setIndex((i) => (i + 1) % SNIPPETS.length);
        }, 3200);
      }
    };

    setTyped(0);
    timer = window.setTimeout(type, index === 0 ? 2000 : 500);

    return () => window.clearTimeout(timer);
  }, [index, total]);

  let left = typed;

  const parts = snippet.tokens.map(([text, kind], i) => {
    if (left <= 0) return null;

    const slice = text.slice(0, left);
    left -= text.length;

    return (
      <span key={i} className={styles[kind]}>
        {slice}
      </span>
    );
  });

  return (
    <aside className={styles.card} aria-hidden="true">
      <div className={styles.cardMeta}>
        <div className={styles.cardNumber}>{snippet.column.n}</div>
        <div className={styles.cardTitle}>{snippet.column.title}</div>
        <div className={styles.cardCount}>Blocks: {snippet.column.blocks}</div>
      </div>

      <div className={styles.cardMain}>
        <div
          className={`${styles.cardBlock} ${typed >= total ? styles.cardBlockOn : ""}`}
        >
          <div className={styles.cardBlockTitle}>{snippet.name}</div>
          <pre className={styles.code}>
            <code>{parts}</code>
            <span className={styles.caret} />
          </pre>
        </div>
      </div>
    </aside>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [highlightOpacities, setHighlightOpacities] = useState<number[]>([]);
  const lastHoverCellRef = useRef<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateDimensions = () => {
      const { width, height } = container.getBoundingClientRect();
      setDimensions({ width, height });
    };

    updateDimensions();

    const observer = new ResizeObserver(updateDimensions);
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const p = Math.min(
        1,
        Math.max(0, window.scrollY / Math.max(container.offsetHeight, 1)),
      );
      container.style.setProperty("--sp", p.toFixed(4));
      container.style.setProperty("--e", Math.min(1, p * 1.8).toFixed(4));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const cells = useMemo(() => {
    if (!dimensions.width || !dimensions.height) return [];

    const cols = Math.ceil(dimensions.width / CELL_SIZE) + 1;
    const rows = Math.ceil(dimensions.height / CELL_SIZE) + 1;
    const result: Cell[] = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        result.push({
          top: row * CELL_SIZE,
          left: col * CELL_SIZE,
          width: CELL_SIZE,
          height: CELL_SIZE,
          row,
          col,
        });
      }
    }

    return result;
  }, [dimensions.width, dimensions.height]);

  const generateRandomHighlights = useCallback(
    (
      hoverRow: number,
      hoverCol: number,
      totalRows: number,
      totalCols: number,
    ) => {
      const opacities = new Array(totalRows * totalCols).fill(0);
      opacities[hoverRow * totalCols + hoverCol] = 0.95;

      const neighbors: { row: number; col: number; index: number }[] = [];

      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;

          const row = hoverRow + dr;
          const col = hoverCol + dc;

          if (row >= 0 && row < totalRows && col >= 0 && col < totalCols) {
            neighbors.push({
              row,
              col,
              index: row * totalCols + col,
            });
          }
        }
      }

      if (!neighbors.length) return opacities;

      const nextLine = neighbors.filter((n) => n.row === hoverRow + 1);
      const others = neighbors.filter((n) => n.row !== hoverRow + 1);

      const count =
        Math.floor(Math.random() * Math.min(5, neighbors.length)) + 1;

      const nextLineCount = Math.floor(
        Math.random() * (Math.min(2, nextLine.length, count) + 1),
      );

      const selected = [
        ...sampleDistinct(nextLine, nextLineCount),
        ...sampleDistinct(others, count - nextLineCount),
      ];

      for (const neighbor of selected) {
        opacities[neighbor.index] = 0.2 + Math.random() * 0.5;
      }

      return opacities;
    },
    [],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !cells.length) return;

    const cols = Math.ceil(dimensions.width / CELL_SIZE) + 1;
    const rows = Math.ceil(dimensions.height / CELL_SIZE) + 1;

    const clearHighlights = () => {
      lastHoverCellRef.current = null;
      setHighlightOpacities(new Array(rows * cols).fill(0));
      if (buttonRef.current) buttonRef.current.style.translate = "";
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const button = buttonRef.current;

      if (button) {
        const b = button.getBoundingClientRect();
        const ex = Math.max(b.left - event.clientX, 0, event.clientX - b.right);
        const ey = Math.max(b.top - event.clientY, 0, event.clientY - b.bottom);

        if (Math.hypot(ex, ey) < MAGNET_REACH) {
          const dx = event.clientX - (b.left + b.width / 2);
          const dy = event.clientY - (b.top + b.height / 2);
          const x = Math.max(-12, Math.min(12, dx * 0.22));
          const y = Math.max(-8, Math.min(8, dy * 0.3));
          button.style.translate = `${x}px ${y}px`;
        } else {
          button.style.translate = "";
        }
      }

      const col = Math.floor((event.clientX - rect.left) / CELL_SIZE);
      const row = Math.floor((event.clientY - rect.top) / CELL_SIZE);

      if (row < 0 || row >= rows || col < 0 || col >= cols) return;

      const index = row * cols + col;
      if (index === lastHoverCellRef.current) return;

      lastHoverCellRef.current = index;

      setHighlightOpacities(generateRandomHighlights(row, col, rows, cols));
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", clearHighlights);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", clearHighlights);
    };
  }, [
    cells.length,
    dimensions.width,
    dimensions.height,
    generateRandomHighlights,
  ]);

  useEffect(() => {
    const cols = Math.ceil(dimensions.width / CELL_SIZE) + 1;
    const rows = Math.ceil(dimensions.height / CELL_SIZE) + 1;

    if (dimensions.width && dimensions.height) {
      setHighlightOpacities(new Array(rows * cols).fill(0));
      lastHoverCellRef.current = null;
    }
  }, [dimensions.width, dimensions.height]);

  const gridCols = Math.ceil(dimensions.width / CELL_SIZE) + 1;
  const gridRows = Math.ceil(dimensions.height / CELL_SIZE) + 1;

  return (
    <section
      ref={containerRef}
      className={`${styles.container} ${mounted ? styles.mounted : ""}`}
      {...(mounted ? { "data-in": "" } : {})}
    >
      <div className={styles.bgOrb} aria-hidden="true" />

      <Eye className={`${styles.decor} ${styles.decorEye}`} />
      <MeltingClock className={`${styles.decor} ${styles.decorClock}`} />

      <div className={styles.overlayContainer} aria-hidden="true">
        {cells.map((cell, index) => {
          const opacity = highlightOpacities[index] || 0;

          const cellStyle = {
            top: cell.top,
            left: cell.left,
            width: cell.width,
            height: cell.height,
            backgroundColor: `rgba(0, 255, 208, ${opacity})`,
            "--d": Math.hypot(
              cell.col - gridCols / 2,
              cell.row - gridRows / 2,
            ).toFixed(2),
          } as React.CSSProperties;

          if (opacity > 0) {
            cellStyle.boxShadow = `0 0 ${20 * opacity}px ${
              6 * opacity
            }px rgba(0, 255, 208, ${opacity * 0.7})`;
          }

          return (
            <div
              key={`${cell.row}-${cell.col}`}
              className={styles.overlayCell}
              style={cellStyle}
            />
          );
        })}
      </div>

      <SyntaxCard />

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

        <p className={styles.subtitle}>
          {SUBTITLE.split(" ").map((word, i) => (
            <span key={i}>
              <span
                className={styles.sWord}
                style={{ "--i": i } as React.CSSProperties}
              >
                {word}
              </span>{" "}
            </span>
          ))}
        </p>

        <div className={styles.buttonContainer}>
          <a
            ref={buttonRef}
            href="/syntax"
            className={`${styles.button} ${styles.getButton}`}
          >
            Get Started
            <span className={styles.buttonArrow} aria-hidden="true">
              ↗
            </span>
          </a>

          <a
            href="/syntax"
            className={`${styles.button} ${styles.learnButton}`}
          >
            Learn Syntaxly
          </a>
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
    </section>
  );
}
