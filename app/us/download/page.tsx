"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type PointerEvent,
} from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowDown } from "@phosphor-icons/react";
import styles from "./Download.module.css";

type Kind = "win" | "ios" | "android" | "web";

const PLATFORMS: {
  name: string;
  kind: Kind;
  status: string;
  desc: string;
  ready?: boolean;
  tilt: number;
}[] = [
  {
    name: "Windows",
    kind: "win",
    status: "in development",
    desc: "A dedicated desktop app is on the way.",
    tilt: -3,
  },
  {
    name: "iOS",
    kind: "ios",
    status: "in development",
    desc: "A native app for iPhone and iPad is in the works.",
    tilt: 2.5,
  },
  {
    name: "Android",
    kind: "android",
    status: "in development",
    desc: "A native app for Android devices is in the works.",
    tilt: -2,
  },
  {
    name: "Web app",
    kind: "web",
    status: "available now",
    desc: "Use Syntaxly in any browser, on any screen.",
    ready: true,
    tilt: 3,
  },
];

const FRAMES: { kind: string; label: string; cols: number }[] = [
  { kind: "laptop", label: "laptop", cols: 3 },
  { kind: "tablet", label: "tablet", cols: 2 },
  { kind: "phone", label: "phone", cols: 1 },
];

const TODO = [
  "Search every block",
  "Filter down to what's unique",
  "See a whole language at once",
  "Pick one of three themes",
  "Never leave the keyboard",
];

const STRIP = ["windows", "ios", "android"];

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

const at = (seconds: number) => ({ "--delay": `${seconds}s` }) as CSSProperties;

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

function Device({ kind, ready }: { kind: Kind; ready?: boolean }) {
  const cols = kind === "win" || kind === "web" ? 3 : 1;

  return (
    <div
      className={`${styles.device} ${styles[kind]} ${
        ready ? styles.devReady : styles.devWip
      }`}
      aria-hidden="true"
    >
      <div className={styles.chrome}>
        <i />
        <i />
        <i />
      </div>

      <div className={styles.screen} style={{ "--cols": cols } as CSSProperties}>
        {Array.from({ length: cols * 3 }, (_, k) => (
          <i
            key={k}
            className={styles.bar}
            style={{ "--k": k } as CSSProperties}
          />
        ))}
      </div>

      {!ready && <span className={styles.construction}>in the making</span>}
    </div>
  );
}

function Frame({ kind, label, cols }: { kind: string; label: string; cols: number }) {
  return (
    <figure className={`${styles.frame} ${styles[kind]}`}>
      <div className={styles.fScreen}>
        {Array.from({ length: cols }, (_, c) => (
          <div key={c} className={styles.fCol}>
            <span className={styles.fMeta} />
            <span className={styles.fBlock}>
              <b />
              <code>{c === 0 ? "useState(0)" : c === 1 ? "=> a + b" : "await x"}</code>
            </span>
            <span className={styles.fBlock}>
              <b />
              <code className={c === 0 ? styles.type : undefined}>
                {c === 0 ? "const [n, setN]" : "[...a, 4]"}
              </code>
            </span>
          </div>
        ))}
      </div>

      <figcaption className={styles.fCap}>{label}</figcaption>
    </figure>
  );
}

export default function Download() {
  const root = useRef<HTMLElement>(null);
  const drag = useRef<{
    i: number;
    sx: number;
    sy: number;
    ox: number;
    oy: number;
  } | null>(null);

  const [pos, setPos] = useState(PLATFORMS.map(() => ({ x: 0, y: 0 })));
  const [top, setTop] = useState(-1);
  const [moved, setMoved] = useState(false);
  const [dragging, setDragging] = useState<number | null>(null);

  useEffect(() => {
    const el = root.current;

    if (!el) return;

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.setAttribute("data-in", "");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.15 },
    );

    el.querySelectorAll("[data-reveal]").forEach((n) => io.observe(n));

    return () => io.disconnect();
  }, []);

  const trackPointer = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  const down = (i: number) => (e: PointerEvent<HTMLElement>) => {
    if (window.innerWidth <= 900) return;
    if ((e.target as HTMLElement).closest("a")) return;

    e.currentTarget.setPointerCapture(e.pointerId);

    drag.current = {
      i,
      sx: e.clientX,
      sy: e.clientY,
      ox: pos[i].x,
      oy: pos[i].y,
    };

    setTop(i);
    setDragging(i);
  };

  const move = (e: PointerEvent<HTMLElement>) => {
    const d = drag.current;

    if (!d) return;

    const x = d.ox + e.clientX - d.sx;
    const y = d.oy + e.clientY - d.sy;

    setMoved(true);
    setPos((p) => p.map((v, i) => (i === d.i ? { x, y } : v)));
  };

  const up = () => {
    drag.current = null;
    setDragging(null);
  };

  const reset = () => {
    setPos(PLATFORMS.map(() => ({ x: 0, y: 0 })));
    setMoved(false);
  };

  return (
    <main className={styles.page} ref={root}>
      <section className={styles.hero}>
        <aside className={styles.rail}>
          <span className={styles.railName}>DOWNLOAD</span>
        </aside>

        <div className={styles.main} onMouseMove={trackPointer}>
          <div className={styles.orb} />

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
                Until they land, the web version does everything, on any
                screen.
              </p>

              <div className={styles.heroBtns}>
                <Link href="/syntax" className={styles.btn}>
                  Open Syntaxly
                  <ArrowUpRight size={18} weight="bold" />
                </Link>

                <a href="#bench" className={styles.jump}>
                  see the bench
                  <ArrowDown size={20} weight="bold" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.ribbon} aria-hidden="true">
        <div className={styles.track}>
          {[0, 1].map((g) => (
            <div className={styles.group} key={g}>
              {Array.from({ length: 3 }).flatMap((_, r) =>
                STRIP.map((t) => (
                  <span className={styles.ribbonItem} key={`${r}-${t}`}>
                    {t} · in the making
                    <span className={styles.ribbonStar}>*</span>
                  </span>
                )),
              )}
            </div>
          ))}
        </div>

        <div className={styles.hazard} />
      </div>

      <section id="bench" className={styles.bench}>
        <h2
          className={`${styles.secTitle} ${styles.reveal} ${styles.wipe} ${styles.up}`}
          data-reveal
          style={at(0)}
        >
          The workbench
        </h2>

        <p
          className={`${styles.secText} ${styles.reveal} ${styles.fade}`}
          data-reveal
          style={at(0.1)}
        >
          Three apps on the bench and one already out of the box. Pull them
          around if you like, nobody is watching.
        </p>

        <div className={styles.table}>
          {PLATFORMS.map((p, i) => (
            <article
              key={p.name}
              className={`${styles.card} ${p.ready ? styles.cardReady : ""} ${
                styles.reveal
              } ${styles.wipe} ${styles.up}`}
              data-reveal
              data-drag={dragging === i ? "" : undefined}
              style={
                {
                  ...at(i * 0.1),
                  "--r": `${p.tilt}deg`,
                  "--x": `${pos[i].x}px`,
                  "--y": `${pos[i].y}px`,
                  "--z": top === i ? 5 : 1,
                } as CSSProperties
              }
              onPointerDown={down(i)}
              onPointerMove={move}
              onPointerUp={up}
              onPointerCancel={up}
            >
              <span className={styles.pin} aria-hidden="true" />

              <Device kind={p.kind} ready={p.ready} />

              <span className={styles.status}>{p.status}</span>
              <b className={styles.label}>{p.name}</b>
              <span className={styles.desc}>{p.desc}</span>

              {p.ready && (
                <Link href="/syntax" className={styles.cardLink}>
                  open it now
                </Link>
              )}
            </article>
          ))}
        </div>

        <div className={styles.benchFoot}>
          <span className={styles.hint}>drag the cards around</span>

          <button
            className={`${styles.reset} ${moved ? styles.resetOn : ""}`}
            onClick={reset}
            tabIndex={moved ? 0 : -1}
          >
            tidy the table
          </button>
        </div>
      </section>

      <section className={styles.every}>
        <h2
          className={`${styles.secTitle} ${styles.reveal} ${styles.wipe} ${styles.up}`}
          data-reveal
          style={at(0)}
        >
          Meanwhile, everywhere
        </h2>

        <p
          className={`${styles.secText} ${styles.reveal} ${styles.fade}`}
          data-reveal
          style={at(0.1)}
        >
          The web app already fits every screen you own. Same blocks, same
          shortcuts, one address.
        </p>

        <div className={styles.frames}>
          {FRAMES.map((f, i) => (
            <div
              key={f.kind}
              className={`${styles.reveal} ${styles.slide} ${styles.up}`}
              data-reveal
              style={at(i * 0.12)}
            >
              <Frame {...f} />
            </div>
          ))}
        </div>
      </section>

      <section className={styles.today}>
        <h2
          className={`${styles.secTitle} ${styles.reveal} ${styles.wipe} ${styles.up}`}
          data-reveal
          style={at(0)}
        >
          What works today
        </h2>

        <ul className={styles.todo}>
          {TODO.map((t, i) => (
            <li
              key={t}
              className={styles.reveal}
              data-reveal
              style={at(0.1 + i * 0.1)}
            >
              {t}
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.cta}>
        <h2 className={styles.ctaTitle} data-reveal>
          <span className={styles.mask}>
            <span className={styles.maskIn}>Which one first?</span>
          </span>
        </h2>

        <p
          className={`${styles.secText} ${styles.reveal} ${styles.fade}`}
          data-reveal
          style={at(0.3)}
        >
          Tell us which app you would use most and it moves up the pile.
        </p>

        <div className={styles.ctaBtns}>
          <Link
            href="/contact"
            className={`${styles.btn} ${styles.reveal} ${styles.wipe} ${styles.right}`}
            data-reveal
            style={at(0.4)}
          >
            Tell us
            <ArrowUpRight size={18} weight="bold" />
          </Link>

          <Link
            href="/syntax"
            className={`${styles.ghost} ${styles.reveal} ${styles.wipe} ${styles.right}`}
            data-reveal
            style={at(0.52)}
          >
            Open Syntaxly
          </Link>
        </div>
      </section>
    </main>
  );
}