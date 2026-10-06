"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { MagnifyingGlass, Plus, ArrowUpRight, X } from "@phosphor-icons/react";
import styles from "./Faq.module.css";

type Item = {
  cat: string;
  q: string;
  a: string;
  keys?: string[][];
  link?: [string, string];
};

const CATS = [
  "All",
  "General",
  "Using it",
  "Keyboard",
  "Content",
  "Apps & privacy",
];

const ITEMS: Item[] = [
  {
    cat: "General",
    q: "What is Syntaxly?",
    a: "A syntax cheatsheet for programming. Topics sit in columns, syntaxes sit in blocks, and every block opens a short breakdown: what it is, how it's used, an example and a tip.",
  },
  {
    cat: "General",
    q: "Who is it for?",
    a: "Anyone who understands the concepts but blanks on the exact spelling, usually after a few months away from a language or framework.",
  },
  {
    cat: "General",
    q: "Is it free?",
    a: "Yes. Syntaxly has no accounts, no sign-up and no paywall right now.",
  },
  {
    cat: "General",
    q: "Do I need an account?",
    a: "No. Open it and start looking things up. Your theme and font size can stay in your browser.",
  },
  {
    cat: "Using it",
    q: "How do I find a syntax fast?",
    a: "Open search. It scans every column and matches both titles and code, so you can look up `useRef` or `=>` equally well.",
    keys: [["Ctrl", "K"]],
  },
  {
    cat: "Using it",
    q: "What does the unique filter do?",
    a: "It hides the syntax every language shares and keeps only the pieces unique to this one, so you see what is actually worth relearning.",
    keys: [["Ctrl", "U"]],
  },
  {
    cat: "Using it",
    q: "What is Overview mode?",
    a: "It collapses every column into a narrow strip so you can see the whole language at once. Click a column to expand it again.",
  },
  {
    cat: "Using it",
    q: "Can I copy the code?",
    a: "Yes. Every block has a copy button, and you may use the snippets in your own projects.",
    link: ["/terms", "Read the Terms of Use"],
  },
  {
    cat: "Keyboard",
    q: "Which shortcuts are there?",
    a: "Search, the unique filter, focus mode, font size, moving between blocks and columns, and Esc to close or deselect.",
    keys: [
      ["Ctrl", "K"],
      ["Ctrl", "U"],
      ["Ctrl", "Shift", "F"],
      ["+"],
      ["-"],
      ["←", "→", "↑", "↓"],
      ["Esc"],
    ],
  },
  {
    cat: "Keyboard",
    q: "Can I use it without a mouse?",
    a: "Yes. The arrow keys move between blocks and columns, and the page follows your selection.",
  },
  {
    cat: "Content",
    q: "Where does the content come from?",
    a: "Official documentation first, then real code from open-source projects, distilled into the shortest correct form.",
    link: ["/how-it-works", "See how we write it"],
  },
  {
    cat: "Content",
    q: "A snippet looks wrong. What now?",
    a: "Tell us through the contact page with the block name and what you expected. Syntax changes between versions, so also check the official docs for the one you use.",
    link: ["/contact", "Get in touch"],
  },
  {
    cat: "Content",
    q: "Which languages are covered?",
    a: "JavaScript and React for now, with TypeScript-specific syntax marked. More languages and libraries are planned, starting with the familiar ones.",
  },
  {
    cat: "Apps & privacy",
    q: "Is there an app?",
    a: "Not yet. Windows, iOS and Android versions are in the making. The web version works today on any screen.",
    link: ["/download", "See the download page"],
  },
  {
    cat: "Apps & privacy",
    q: "What do you store about me?",
    a: "Nothing personal by default. Preferences like theme and font size can stay in your browser.",
    link: ["/privacy", "Read the Privacy Policy"],
  },
];

function Hl({ text, q }: { text: string; q: string }) {
  const i = q ? text.toLowerCase().indexOf(q) : -1;

  if (i === -1) return <>{text}</>;

  return (
    <>
      {text.slice(0, i)}
      <mark className={styles.mark}>{text.slice(i, i + q.length)}</mark>
      {text.slice(i + q.length)}
    </>
  );
}

function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/(`[^`]+`)/g).map((p, i) =>
        p.startsWith("`") ? (
          <code key={i} className={styles.code}>
            {p.slice(1, -1)}
          </code>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}

export default function Faq() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");
  const [open, setOpen] = useState<number | null>(0);
  const input = useRef<HTMLInputElement>(null);

  const q = query.trim().toLowerCase();

  const list = useMemo(
    () =>
      ITEMS.map((it, id) => ({ ...it, id })).filter(
        (it) =>
          (cat === "All" || it.cat === cat) &&
          (!q ||
            it.q.toLowerCase().includes(q) ||
            it.a.toLowerCase().includes(q)),
      ),
    [cat, q],
  );

  const counts = useMemo(() => {
    const m: Record<string, number> = { All: ITEMS.length };

    ITEMS.forEach((i) => {
      m[i.cat] = (m[i.cat] ?? 0) + 1;
    });

    return m;
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing =
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement;

      if (e.key === "/" && !typing) {
        e.preventDefault();
        input.current?.focus();
      }
    };

    window.addEventListener("keydown", onKey);

    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.orb} />

        <div className={styles.heroInner}>
          <h1 className={styles.title}>
            <span className={styles.line}>
              <span>Questions,</span>
            </span>

            <span className={styles.line}>
              <span style={{ animationDelay: "0.12s" }}>
                <em className={styles.hl}>answered.</em>
              </span>
            </span>
          </h1>

          <p className={styles.lead}>
            The short version of everything people ask about Syntaxly. Search,
            or pick a column.
          </p>
        </div>
      </header>

      <div className={styles.searchBar}>
        <div className={styles.searchInner}>
          <MagnifyingGlass size={22} />

          <input
            ref={input}
            className={styles.input}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setQuery("");
                e.currentTarget.blur();
              }
            }}
            placeholder="SEARCH QUESTIONS..."
            spellCheck={false}
            aria-label="Search the FAQ"
          />

          {query ? (
            <button
              className={styles.clear}
              onClick={() => setQuery("")}
              aria-label="Clear search"
            >
              <X size={16} weight="bold" />
            </button>
          ) : (
            <kbd className={styles.slash}>/</kbd>
          )}

          <span className={styles.count}>
            {list.length} of {ITEMS.length}
          </span>
        </div>
      </div>

      <div className={styles.chips} role="group" aria-label="Filter by topic">
        <div className={styles.chipsInner}>
          {CATS.map((c) => (
            <button
              key={c}
              className={`${styles.chip} ${cat === c ? styles.chipOn : ""}`}
              onClick={() => setCat(c)}
              aria-pressed={cat === c}
            >
              {c}
              <span>{counts[c]}</span>
            </button>
          ))}
        </div>
      </div>

      <section className={styles.list}>
        {list.length === 0 && (
          <div className={styles.empty}>
            <span className={styles.emptyCode}>NO QUESTIONS MATCH</span>
            <span className={styles.emptyQ}>{query}</span>

            <a href="/contact" className={styles.emptyLink}>
              Ask it yourself
              <ArrowUpRight size={16} weight="bold" />
            </a>
          </div>
        )}

        {list.map((it, n) => {
          const isOpen = open === it.id || list.length === 1;

          return (
            <div
              key={it.id}
              className={`${styles.item} ${isOpen ? styles.itemOpen : ""}`}
              style={{ "--i": Math.min(n, 8) } as CSSProperties}
            >
              <h3 className={styles.h3}>
                <button
                  className={styles.q}
                  onClick={() =>
                    setOpen(isOpen && list.length > 1 ? null : it.id)
                  }
                  aria-expanded={isOpen}
                  aria-controls={`faq-${it.id}`}
                  id={`faq-btn-${it.id}`}
                >
                  <span className={styles.num}>
                    {String(n + 1).padStart(2, "0")}
                  </span>

                  <span className={styles.qText}>
                    <Hl text={it.q} q={q} />
                  </span>

                  <span className={styles.plus}>
                    <Plus size={22} weight="bold" />
                  </span>
                </button>
              </h3>

              <div
                id={`faq-${it.id}`}
                role="region"
                aria-labelledby={`faq-btn-${it.id}`}
                className={styles.panel}
              >
                <div className={styles.panelClip}>
                  <div className={styles.ans}>
                    <span className={styles.tab}>{it.cat}</span>

                    <p className={styles.a}>
                      <Rich text={it.a} />
                    </p>

                    {it.keys && (
                      <div className={styles.keys}>
                        {it.keys.map((g) => (
                          <span key={g.join("")} className={styles.group}>
                            {g.map((k) => (
                              <kbd key={k} className={styles.kbd}>
                                {k}
                              </kbd>
                            ))}
                          </span>
                        ))}
                      </div>
                    )}

                    {it.link && (
                      <a href={it.link[0]} className={styles.link}>
                        {it.link[1]}
                        <ArrowUpRight size={16} weight="bold" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      <section className={styles.cta}>
        <h2 className={styles.ctaTitle}>Still stuck?</h2>

        <div className={styles.ctaBtns}>
          <a href="/contact" className={`${styles.btn} ${styles.btnA}`}>
            Ask us
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
