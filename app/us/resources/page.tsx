"use client";

import { useEffect, useRef, type CSSProperties } from "react";

import { ArrowUpRight, ArrowDown } from "@phosphor-icons/react";

import styles from "./Resources.module.css";

type Res = {
  name: string;
  desc: string;
  tag: string;
  href: string;
  host?: string;
};

const GROUPS: { title: string; items: Res[] }[] = [
  {
    title: "Official docs",
    items: [
      {
        name: "React",
        desc: "Hooks, components and the reference for every API.",
        tag: "Docs",
        href: "https://react.dev",
        host: "react.dev",
      },
      {
        name: "TypeScript",
        desc: "The handbook and the full language reference.",
        tag: "Docs",
        href: "https://www.typescriptlang.org/docs/",
        host: "typescriptlang.org",
      },
      {
        name: "Next.js",
        desc: "Routing, rendering and data fetching, straight from the team.",
        tag: "Docs",
        href: "https://nextjs.org/docs",
        host: "nextjs.org",
      },
      {
        name: "MDN Web Docs",
        desc: "The reference for JavaScript, HTML, CSS and the web platform.",
        tag: "Docs",
        href: "https://developer.mozilla.org",
        host: "developer.mozilla.org",
      },
    ],
  },
  {
    title: "Specs & references",
    items: [
      {
        name: "ECMAScript specification",
        desc: "What the language actually guarantees, written by the standards committee.",
        tag: "Spec",
        href: "https://tc39.es/ecma262/",
        host: "tc39.es",
      },
      {
        name: "Can I use",
        desc: "Check browser support before trusting a feature.",
        tag: "Tool",
        href: "https://caniuse.com",
        host: "caniuse.com",
      },
      {
        name: "DevDocs",
        desc: "Many docs sets in one fast, searchable place.",
        tag: "Tool",
        href: "https://devdocs.io",
        host: "devdocs.io",
      },
    ],
  },
  {
    title: "Search the code",
    items: [
      {
        name: "GitHub code search",
        desc: "How to search real repositories for the way people write something.",
        tag: "Tool",
        href: "https://docs.github.com/en/search-github/github-code-search",
        host: "docs.github.com",
      },
      {
        name: "Sourcegraph",
        desc: "Search across many open-source repositories at once.",
        tag: "Tool",
        href: "https://sourcegraph.com",
        host: "sourcegraph.com",
      },
    ],
  },
  {
    title: "Practice",
    items: [
      {
        name: "javascript.info",
        desc: "A modern JavaScript tutorial that explains the why.",
        tag: "Learn",
        href: "https://javascript.info",
        host: "javascript.info",
      },
      {
        name: "Exercism",
        desc: "Exercises with mentoring, in many languages.",
        tag: "Learn",
        href: "https://exercism.org",
        host: "exercism.org",
      },
    ],
  },
  {
    title: "On Syntaxly",
    items: [
      {
        name: "How it works",
        desc: "How a block gets from the docs onto the page.",
        tag: "Page",
        href: "/us/how-it-works",
      },
      {
        name: "Download",
        desc: "The apps that are in the making.",
        tag: "Page",
        href: "/us/download",
      },
      {
        name: "Terms of Use",
        desc: "The rules for using Syntaxly.",
        tag: "Legal",
        href: "/us/terms",
      },
      {
        name: "Privacy Policy",
        desc: "What happens to your information.",
        tag: "Legal",
        href: "/us/privacy",
      },
      {
        name: "Brand",
        desc: "The logo, colors, type and voice.",
        tag: "Page",
        href: "/us/brand",
      },
    ],
  },
];

function Meta({
  n,
  title,
  count,
}: {
  n: number;
  title: string;
  count: number;
}) {
  return (
    <div className={styles.meta}>
      <div className={styles.metaInner}>
        <div>
          <div className={styles.metaNum}>{n}</div>
          <h2 className={styles.metaTitle}>{title}</h2>
        </div>
        <span className={styles.metaCount}>Blocks: {count}</span>
      </div>
    </div>
  );
}

export default function Resources() {
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
      { threshold: 0.2 },
    );

    els.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);

  return (
    <main className={styles.page} ref={root}>
      <section className={styles.hero}>
        <aside className={styles.rail}>
          <span className={styles.railName}>RESOURCES</span>
        </aside>

        <div className={styles.heroMain}>
          <div className={styles.orb} />

          <div className={styles.heroInner}>
            <h1 className={styles.title}>
              <span className={styles.line}>
                <span>Read the</span>
              </span>

              <span className={styles.line}>
                <span style={{ animationDelay: "0.12s" }}>
                  <em className={styles.hl}>source.</em>
                </span>
              </span>
            </h1>

            <div className={styles.heroFoot}>
              <p className={styles.lead}>
                The official docs, specs and tools behind every block. Start
                here when a snippet isn&apos;t enough.
              </p>

              <a href="#list" className={`${styles.btn} ${styles.btnA}`}>
                Browse
                <ArrowDown size={18} weight="bold" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <div id="list">
        {GROUPS.map((g, gi) => (
          <section key={g.title}>
            <Meta n={gi + 1} title={g.title} count={g.items.length} />

            <div className={styles.rows}>
              {g.items.map((r, i) => {
                const external = Boolean(r.host);

                return (
                  <a
                    key={r.name}
                    href={r.href}
                    className={`${styles.row} ${styles.reveal}`}
                    data-reveal
                    style={{ "--d": i } as CSSProperties}
                    {...(external
                      ? {
                          target: "_blank",
                          rel: "noopener noreferrer",
                        }
                      : {})}
                  >
                    <span className={styles.mark}>{r.name[0]}</span>

                    <span className={styles.rowBody}>
                      <b className={styles.rowName}>{r.name}</b>
                      <span className={styles.rowDesc}>{r.desc}</span>
                    </span>

                    <span className={styles.tag}>{r.tag}</span>

                    <span className={styles.host}>{r.host ?? "syntaxly"}</span>

                    <ArrowUpRight
                      size={22}
                      weight="bold"
                      className={styles.arrow}
                      aria-hidden="true"
                    />
                  </a>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <p className={styles.note}>
        Links marked with a domain open other websites. Syntaxly is independent
        and is not affiliated with or endorsed by any of them.
      </p>

      <section className={styles.cta}>
        <h2 className={styles.ctaTitle}>Found a better source?</h2>

        <div className={styles.ctaBtns}>
          <a href="/us/contact" className={`${styles.btn} ${styles.btnA}`}>
            Tell us
            <ArrowUpRight size={18} weight="bold" />
          </a>

          <a href="/syntax" className={`${styles.btn} ${styles.btnB}`}>
            Open Syntaxly
          </a>
        </div>
      </section>
    </main>
  );
}
