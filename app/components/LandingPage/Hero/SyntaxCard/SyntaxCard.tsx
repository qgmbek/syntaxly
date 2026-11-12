"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./SyntaxCard.module.css";

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

interface SyntaxCardProps {
  mounted?: boolean;
}

export default function SyntaxCard({ mounted = true }: SyntaxCardProps) {
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

    let timer: ReturnType<typeof setTimeout>;

    if (reduce) {
      setTyped(total);

      timer = setTimeout(() => {
        setIndex((i) => (i + 1) % SNIPPETS.length);
      }, 5000);

      return () => clearTimeout(timer);
    }

    let count = 0;

    const type = () => {
      count += 1;
      setTyped(count);

      if (count < total) {
        timer = setTimeout(type, 32 + Math.random() * 42);
      } else {
        timer = setTimeout(() => {
          setTyped(0);
          setIndex((i) => (i + 1) % SNIPPETS.length);
        }, 3200);
      }
    };

    setTyped(0);
    timer = setTimeout(type, index === 0 ? 2000 : 500);

    return () => clearTimeout(timer);
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
    <aside
      className={`${styles.card} ${mounted ? styles.mounted : ""}`}
      aria-hidden="true"
    >
      <div className={styles.cardMeta}>
        <div className={styles.cardNumber}>{snippet.column.n}</div>

        <div className={styles.cardTitle}>{snippet.column.title}</div>

        <div className={styles.cardCount}>Blocks: {snippet.column.blocks}</div>
      </div>

      <div className={styles.cardMain}>
        <div
          className={`${styles.cardBlock} ${
            typed >= total ? styles.cardBlockOn : ""
          }`}
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
