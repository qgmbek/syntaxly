"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react";
import styles from "./Terms.module.css";

const UPDATED = "October 2, 2026";

const PH: Record<string, string> = {
  OWNER: "[Khogambyek Yersin]",
  EMAIL: "hogambek011@gmail.com",
  JURISDICTION: "[World]",
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
  const bar = useRef<HTMLDivElement>(null);

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

  const go = (i: number) => (e: React.MouseEvent) => {
    e.preventDefault();

    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    document.getElementById(`s${i + 1}`)?.scrollIntoView({
      behavior: calm ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <main className={styles.page}>
      <div className={styles.progress}>
        <div ref={bar} className={styles.progressBar} />
      </div>

      <header className={styles.hero}>
        <div className={styles.orb} />

        <div className={styles.heroInner}>
          <h1 className={styles.title}>
            <span className={styles.line}>
              <span>Terms of</span>
            </span>

            <span className={styles.line}>
              <span style={{ animationDelay: "0.12s" }}>
                <em className={styles.hl}>Use.</em>
              </span>
            </span>
          </h1>

          <div className={styles.heroFoot}>
            <p className={styles.lead}>
              The rules for using Syntaxly. Every section starts with a one-line
              summary, and the full text below is the part that counts.
            </p>

            <span className={styles.updated}>Last updated {UPDATED}</span>
          </div>
        </div>
      </header>

      <div className={styles.layout}>
        <nav className={styles.toc} aria-label="Sections">
          {SECTIONS.map((s, i) => (
            <a
              key={s.title}
              href={`#s${i + 1}`}
              onClick={go(i)}
              className={`${styles.tocLink} ${
                active === i ? styles.tocActive : ""
              }`}
              aria-current={active === i ? "location" : undefined}
            >
              <span className={styles.tocNum}>
                {String(i + 1).padStart(2, "0")}
              </span>
              {s.title}
            </a>
          ))}
        </nav>

        <div className={styles.content}>
          {SECTIONS.map((s, i) => (
            <section
              key={s.title}
              id={`s${i + 1}`}
              data-i={i}
              className={styles.section}
            >
              <div className={styles.head}>
                <span className={styles.num}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className={styles.h2}>{s.title}</h2>
              </div>

              <div className={styles.short}>
                <span className={styles.shortTab}>In short</span>
                <p>{s.short}</p>
              </div>

              {s.body.map((b, j) =>
                Array.isArray(b) ? (
                  <ul key={j} className={styles.list}>
                    {b.map((li) => (
                      <li key={li}>{fill(li)}</li>
                    ))}
                  </ul>
                ) : (
                  <p key={j} className={styles.p}>
                    {fill(b)}
                  </p>
                ),
              )}
            </section>
          ))}

          <div className={styles.end}>
            <Link href="/contact" className={`${styles.btn} ${styles.btnA}`}>
              Contact <ArrowUpRight size={18} weight="bold" />
            </Link>

            <Link href="/" className={`${styles.btn} ${styles.btnB}`}>
              Back home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
