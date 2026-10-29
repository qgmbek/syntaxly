import type { CSSProperties, SVGProps } from "react";
import { Arrow } from "./HandDrawn";
import styles from "./HandwrittenText.module.css";

// Centerline pen paths, rather than outlines, so the ink follows each letter.
const GLYPHS: Record<string, string> = {
  a: "M11 13 C2 8 0 24 7 22 Q11 20 12 12 L10 22 L14 20",
  b: "M6 4 L2 22 Q4 11 10 12 C18 14 10 26 3 21",
  c: "M12 12 C4 7 -1 22 7 23 L12 20",
  d: "M11 13 C3 8 0 24 7 22 Q11 20 15 4 L11 22 L15 20",
  e: "M3 17 Q15 14 9 11 C3 9 -1 24 11 21",
  f: "M3 29 L8 8 Q11 0 15 6 M2 14 L13 13",
  g: "M11 13 C3 8 0 24 7 22 L12 12 L8 28 Q3 34 0 28",
  h: "M7 4 L2 23 Q7 10 12 13 Q14 15 10 22 L15 21",
  i: "M6 12 L3 21 Q3 24 8 21 M7 6 L7.2 6.2",
  j: "M9 12 L5 28 Q2 33 0 28 M10 6 L10.2 6.2",
  k: "M7 4 L2 23 M13 11 L4 18 L12 23",
  l: "M3 19 Q12 3 8 3 Q4 3 2 20 Q2 25 8 21",
  m: "M4 12 L2 22 Q6 9 10 13 L8 22 Q12 9 16 13 L14 22 L18 21",
  n: "M4 12 L2 22 Q7 9 12 13 L10 22 L15 21",
  o: "M9 11 C0 9 -1 25 8 22 C15 19 15 10 9 11",
  p: "M5 12 L1 30 M4 17 Q10 8 14 13 C17 19 8 25 4 21",
  q: "M11 13 C3 8 0 24 7 22 L12 12 L8 29 L14 25",
  r: "M4 12 L2 22 Q5 10 11 12",
  s: "M12 12 C7 8 2 13 7 16 C16 20 8 25 3 21",
  t: "M9 5 L5 20 Q4 25 10 21 M2 12 L13 11",
  u: "M5 12 L2 20 Q2 27 12 12 L9 22 L14 20",
  v: "M3 12 L6 23 Q11 18 14 11",
  w: "M2 12 L4 23 L10 13 L12 23 Q17 17 18 11",
  x: "M3 12 L12 23 M13 11 L2 23",
  y: "M4 12 L2 20 Q3 26 12 12 L8 28 Q4 34 0 28",
  z: "M3 13 L13 11 L2 23 L13 22",
  A: "M1 24 L12 3 L17 24 M5 16 L15 15",
  B: "M3 24 L7 4 C22 0 21 13 6 13 C24 8 22 27 3 24",
  C: "M16 6 C4 -2 -3 27 13 22",
  D: "M3 24 L7 4 C26 1 23 27 3 24",
  E: "M18 4 L7 5 L3 24 L15 23 M5 14 L14 13",
  F: "M3 23 L7 4 L18 4 M5 13 L14 12",
  G: "M18 6 C5 -2 -3 27 12 23 L17 14 L10 15",
  H: "M6 4 L2 24 M19 3 L14 24 M4 14 L16 13",
  I: "M5 4 L17 3 M11 4 L7 24 M2 24 L14 23",
  J: "M8 4 L20 3 M16 4 L12 21 Q6 30 2 20",
  K: "M7 4 L3 24 M20 3 L5 15 L17 24",
  L: "M7 4 L3 24 L17 23",
  M: "M1 24 L6 4 L11 18 L19 3 L17 24",
  N: "M2 23 L6 4 L13 23 L17 3",
  O: "M12 4 C0 1 -3 28 11 23 C22 18 23 1 12 4",
  P: "M3 24 L7 4 C23 0 20 17 5 15",
  R: "M3 24 L7 4 C23 0 20 17 5 15 L16 24",
  S: "M17 6 C7 -1 0 10 9 13 C23 18 10 30 2 21",
  T: "M2 5 L21 3 M12 4 L7 24",
  U: "M6 4 L2 19 C1 29 15 25 17 15 L20 3",
  V: "M3 4 L6 24 L20 3",
  W: "M2 4 L3 24 L12 10 L14 24 L23 3",
  X: "M4 4 L17 24 M20 3 L1 24",
  Y: "M3 4 L10 14 L20 3 M10 14 L7 24",
  Z: "M5 5 L21 3 L1 24 L17 23",
  Q: "M12 4 C0 1 -3 28 11 23 C22 18 23 1 12 4 M11 18 L20 27",
  ",": "M5 23 L3 27",
  ".": "M4 22 L4.2 22.2",
};

const advance = (letter: string) => {
  if ("ilj.,".includes(letter)) return 9;
  if ("mw".includes(letter)) return 20;
  return /[A-Z]/.test(letter) ? 22 : 16;
};

export function HandwrittenArrow({
  delay,
  className = "",
  style,
  ...props
}: SVGProps<SVGSVGElement> & { delay: number }) {
  return (
    <Arrow
      {...props}
      className={`${styles.arrow} ${className}`}
      style={{ ...style, "--arrow-start": `${delay}ms` } as CSSProperties}
    />
  );
}

export default function HandwrittenText({
  text,
  delay = 0,
  duration = 1100,
}: {
  text: string;
  delay?: number;
  duration?: number;
}) {
  // Keep unsupported copy readable if this small lettering set is reused later.
  if (Array.from(text).some((letter) => letter !== " " && !GLYPHS[letter])) {
    return <span>{text}</span>;
  }

  const step = duration / Math.max(text.length, 1);
  const words = text.split(" ");
  return (
    <span className={styles.text}>
      <span className={styles.accessible}>{text}</span>
      {words.map((word, wordIndex) => {
        const offset =
          words.slice(0, wordIndex).join(" ").length + (wordIndex ? 1 : 0);
        const letters = Array.from(word);
        const width = letters.reduce((sum, letter) => sum + advance(letter), 4);
        return (
          <span key={wordIndex} aria-hidden="true">
            {wordIndex > 0 && " "}
            <svg
              className={styles.word}
              viewBox={`0 0 ${width} 34`}
              style={{ width: `${width / 30}em` }}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              focusable="false"
            >
              {letters.map((letter, i) => (
                <path
                  key={i}
                  d={GLYPHS[letter]}
                  transform={`translate(${letters.slice(0, i).reduce((sum, ch) => sum + advance(ch), 0)} 0)`}
                  pathLength={1}
                  data-draw=""
                  style={{
                    "--draw-delay": `${delay + (offset + i) * step}ms`,
                    "--draw-dur": `${step * 1.15}ms`,
                  } as CSSProperties}
                />
              ))}
            </svg>
          </span>
        );
      })}
    </span>
  );
}
