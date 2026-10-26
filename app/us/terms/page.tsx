"use client";

import {
  Fragment,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
} from "react";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react";
import styles from "./Terms.module.css";

const UPDATED = "October 2, 2026";

const LEAD =
  "The rules for using Syntaxly. Every section starts with a one-line summary, and the full text below is the part that counts.";

const TITLE_TONES = [
  "#ffd84d",
  "#ff7ab8",
  "#8ab6ff",
  "#ff9a5c",
  "#b5f23d",
  "#ffffff",
  "#ffd84d",
  "#ff7ab8",
];

const PH: Record<string, string> = {
  OWNER: "[Your name or company]",
  EMAIL: "hello@yourdomain.com",
  JURISDICTION: "[Your country]",
};

type Section = {
  title: string;
  short: string;
  body: (string | string[])[];
};

const SECTIONS: Section[] = [
  {
    title: "Acceptance of these terms",
    short: "Using Syntaxly means you agree to this page.",
    body: [
      "By accessing or using Syntaxly (the “Service”), you agree to be bound by these Terms of Use. If you do not agree, please do not use the Service.",
      "You must be legally able to agree to these terms where you live.",
    ],
  },
  {
    title: "What Syntaxly is",
    short: "A free syntax cheatsheet. It can change.",
    body: [
      "Syntaxly is a reference that organizes programming syntax into columns and blocks, each with a short explanation, an example and a tip. It is provided for general learning and quick recall.",
      "We may add, change or remove features, languages or content at any time, with or without notice.",
    ],
  },
  {
    title: "Using the Service",
    short: "Be decent. Don't break it.",
    body: [
      "You agree to use the Service lawfully and not to:",
      [
        "disrupt or overload the Service or the infrastructure behind it;",
        "scrape or crawl it in a way that degrades performance for other people;",
        "circumvent technical limits or security measures;",
        "present Syntaxly's content, design or branding as your own.",
      ],
    ],
  },
  {
    title: "Content and code snippets",
    short: "Copy the snippets. Don't clone the site.",
    body: [
      "Code examples in Syntaxly are meant to be copied. You may use the snippets in your own projects.",
      "The design, text, explanations, layout, name and logo of Syntaxly belong to {OWNER}. You may not copy or redistribute them as a whole without permission.",
    ],
  },
  {
    title: "Third-party names",
    short: "We're independent of the tools we document.",
    body: [
      "React, TypeScript, JavaScript and other technology names are trademarks of their respective owners. Syntaxly is independent and is not affiliated with or endorsed by them.",
    ],
  },
  {
    title: "Accuracy",
    short: "Great for recall. Check the docs for production.",
    body: [
      "Examples are simplified for quick recall and can be incomplete or out of date. Always check the official documentation before relying on them in production.",
    ],
  },
  {
    title: "Disclaimer and liability",
    short: "It's provided as is.",
    body: [
      "The Service is provided “as is” and “as available”, without warranties of any kind, express or implied.",
      "To the fullest extent permitted by law, {OWNER} is not liable for any indirect, incidental or consequential damages, or for loss of data, profits or business, arising from your use of the Service.",
    ],
  },
  {
    title: "Privacy",
    short: "The Privacy Policy covers your data.",
    body: [
      "Our Privacy Policy explains what information Syntaxly collects and how it is used. By using the Service you also accept it.",
    ],
  },
  {
    title: "Changes to these terms",
    short: "We'll update the date when we change them.",
    body: [
      "We may update these terms from time to time. The date at the top of this page shows when they last changed. Continuing to use the Service after an update means you accept the new terms.",
    ],
  },
  {
    title: "Governing law",
    short: "Local law applies.",
    body: [
      "These terms are governed by the laws of {JURISDICTION}, without regard to conflict-of-law rules. Disputes will be handled in the courts of {JURISDICTION}, unless your local law requires otherwise.",
    ],
  },
  {
    title: "Contact",
    short: "Questions? Say hello.",
    body: [
      "Questions about these terms? Use the contact page or write to {EMAIL}.",
    ],
  },
];

const at = (seconds: number, distance?: number) =>
  ({
    "--delay": `${seconds}s`,
    ...(distance ? { "--dist": `${distance}px` } : {}),
  }) as CSSProperties;

const trackPointer = (e: MouseEvent<HTMLElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
};

const letters = (text: string, line: number) => {
  let n = 0;

  return text.split(" ").map((word, w, all) => (
    <span key={w}>
      <span className={styles.word}>
        {word.split("").map((letter) => {
          const i = n++;

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
      {w < all.length - 1 ? " " : ""}
    </span>
  ));
};

const fill = (text: string) =>
  text.split(/(\{[A-Z]+\})/g).map((part, i) => {
    const key = part.slice(1, -1);

    return PH[key] && part.startsWith("{") ? (
      <mark key={i} className={styles.ph}>
        {PH[key]}
      </mark>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    );
  });

export default function Terms() {
  const [active, setActive] = useState(0);
  const [tocIn, setTocIn] = useState(false);
  const bar = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLElement>(null);
  const layoutRef = useRef<HTMLDivElement>(null);
  const tocRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      cancelAnimationFrame(raf);

      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;

        if (bar.current) {
          bar.current.style.transform = `scaleX(${p})`;
        }

        rootRef.current?.style.setProperty(
          "--hp",
          Math.min(1, window.scrollY / window.innerHeight).toFixed(4),
        );
        rootRef.current?.style.setProperty("--pp", p.toFixed(4));

        const lay = layoutRef.current;
        const toc = tocRef.current;

        if (lay && toc) {
          const r = lay.getBoundingClientRect();
          const top = Math.min(
            Math.max(100, r.top + 80),
            r.bottom - 140 - toc.offsetHeight,
          );

          toc.style.top = `${top}px`;
        }
      });
    };

    update();

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(Number((e.target as HTMLElement).dataset.i));
          }
        });
      },
      { rootMargin: "-25% 0px -65% 0px" },
    );

    document.querySelectorAll("[data-i]").forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const layout = layoutRef.current;

    if (!root) return;

    const reveal = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.setAttribute("data-in", "");
            reveal.unobserve(e.target);
          }
        }),
      { threshold: 0.15 },
    );

    root.querySelectorAll("[data-reveal]").forEach((el) => reveal.observe(el));

    const started = performance.now();

    let tocWatch: IntersectionObserver | undefined;
    let tocTimer: ReturnType<typeof setTimeout> | undefined;

    if (layout) {
      tocWatch = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            tocWatch?.disconnect();

            tocTimer = setTimeout(
              () => setTocIn(true),
              Math.max(0, 1500 - (performance.now() - started)),
            );
          }
        },
        { rootMargin: "0px 0px -35% 0px" },
      );

      tocWatch.observe(layout);
    }

    return () => {
      reveal.disconnect();
      tocWatch?.disconnect();
      if (tocTimer) clearTimeout(tocTimer);
    };
  }, []);

  const go = (i: number) => (e: React.MouseEvent) => {
    e.preventDefault();

    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    document.getElementById(`s${i + 1}`)?.scrollIntoView({
      behavior: calm ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <main className={styles.page} ref={rootRef}>
      <span className={`${styles.decor} ${styles.d1}`} aria-hidden="true" />
      <span className={`${styles.decor} ${styles.d2}`} aria-hidden="true" />
      <span className={`${styles.decor} ${styles.d3}`} aria-hidden="true" />

      <div className={styles.progress}>
        <div ref={bar} className={styles.progressBar} />
      </div>

      <header className={styles.hero} onMouseMove={trackPointer}>
        <div className={styles.orb} />

        <div className={styles.heroInner}>
          <h1 className={styles.title} aria-label="Terms of Use.">
            <span className={styles.line}>{letters("Terms of", 0)}</span>

            <span className={styles.line}>
              <em className={styles.hl}>{letters("Use.", 1)}</em>
              <span className={styles.sticker} aria-hidden="true">
                in plain english
              </span>
            </span>
          </h1>

          <div className={styles.heroFoot}>
            <p className={styles.lead}>
              {LEAD.split(" ").map((word, i) => (
                <span key={i}>
                  <span
                    className={styles.leadWord}
                    style={{ "--i": i } as CSSProperties}
                  >
                    {word}
                  </span>{" "}
                </span>
              ))}
            </p>

            <span className={styles.updated}>Last updated {UPDATED}</span>
          </div>
        </div>
      </header>

      <div className={styles.layout} ref={layoutRef}>
        <div className={styles.tocCol}>
          <nav
            className={styles.toc}
            aria-label="Sections"
            ref={tocRef}
            {...(tocIn ? { "data-in": "" } : {})}
          >
            <span
              className={styles.tocMarker}
              style={{ transform: `translateY(${active * 40}px)` }}
              aria-hidden="true"
            />

            {SECTIONS.map((s, i) => (
              <a
                key={s.title}
                href={`#s${i + 1}`}
                onClick={go(i)}
                className={`${styles.tocLink} ${
                  active === i ? styles.tocActive : ""
                }`}
                style={{ "--c": i } as CSSProperties}
                aria-current={active === i ? "location" : undefined}
              >
                <span className={styles.tocNum}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s.title}
              </a>
            ))}
          </nav>
        </div>

        <div className={styles.content}>
          {SECTIONS.map((s, i) => (
            <section
              key={s.title}
              id={`s${i + 1}`}
              data-i={i}
              className={styles.section}
            >
              <div className={styles.head} data-reveal>
                <span className={styles.num}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className={styles.h2}>{s.title}</h2>
              </div>

              <div
                className={`${styles.short} ${styles.reveal} ${styles.wipe} ${styles.right}`}
                data-reveal
                style={at(0.1)}
              >
                <span className={styles.shortTab}>In short</span>
                <p>{s.short}</p>
              </div>

              {s.body.map((b, j) =>
                Array.isArray(b) ? (
                  <ul
                    key={j}
                    className={`${styles.list} ${styles.reveal} ${styles.fade} ${styles.right}`}
                    data-reveal
                    style={at(0, 8)}
                  >
                    {b.map((li, k) => (
                      <li key={li} style={{ "--c": k } as CSSProperties}>
                        {fill(li)}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p
                    key={j}
                    className={`${styles.p} ${styles.reveal} ${styles.fade} ${styles.right}`}
                    data-reveal
                    style={at(0, 8)}
                  >
                    {fill(b)}
                  </p>
                ),
              )}
            </section>
          ))}

          <div className={styles.end}>
            <Link
              href="/contact"
              className={`${styles.btn} ${styles.btnA} ${styles.reveal} ${styles.wipe} ${styles.right}`}
              data-reveal
              style={at(0)}
            >
              Contact <ArrowUpRight size={18} weight="bold" />
            </Link>

            <Link
              href="/"
              className={`${styles.btn} ${styles.btnB} ${styles.reveal} ${styles.wipe} ${styles.right}`}
              data-reveal
              style={at(0.12)}
            >
              Back home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
