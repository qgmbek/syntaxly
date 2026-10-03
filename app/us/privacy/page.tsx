"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react";
import styles from "./Privacy.module.css";

const UPDATED = "October 2, 2026";

const PH: Record<string, string> = {
  OWNER: "[Khogambyek Yersin]",
  EMAIL: "hogambek011@gmail.com",
  HOST: "[...]",
};

const GLANCE = [
  {
    title: "Collected",
    code: "personal: none",
    text: "No accounts and no sign-up. Nothing to hand over.",
  },
  {
    title: "On your device",
    code: "theme · font size",
    text: "Preferences stay in your browser and never reach us.",
  },
  {
    title: "Sold",
    code: "never",
    text: "Your information is not for sale, to anyone.",
  },
];

type Section = {
  title: string;
  short: string;
  body: (string | string[])[];
};

const SECTIONS: Section[] = [
  {
    title: "Who we are",
    short: "One person's project, one contact.",
    body: [
      "Syntaxly (the “Service”) is operated by {OWNER}. This policy explains what happens to information when you use it. For anything privacy-related, write to {EMAIL}.",
    ],
  },
  {
    title: "What we collect",
    short: "Nothing personal by default.",
    body: [
      "Syntaxly has no accounts, so we don't ask for your name, email address or a password. We do not knowingly collect personal information through the Service.",
      "If you contact us (for example by email), we receive whatever you choose to send, such as your name, address and message.",
    ],
  },
  {
    title: "Stored in your browser",
    short: "Your settings stay on your device.",
    body: [
      "Syntaxly may save preferences such as your theme and font size in your browser (for example in local storage) so it can remember them next time. This data stays on your device and is not sent to us.",
      "You can remove it at any time by clearing site data in your browser settings.",
    ],
  },
  {
    title: "Hosting and logs",
    short: "Our host keeps basic technical logs.",
    body: [
      "Syntaxly is hosted by {HOST}. Like most hosts, it may automatically log technical details such as IP address, browser type, pages requested and timestamps.",
      "These logs are used to keep the Service running and secure.",
    ],
  },
  {
    title: "Analytics and cookies",
    short: "No ad trackers. We'll say so if that changes.",
    body: [
      "Syntaxly does not currently use advertising trackers. If we add analytics or cookies in the future, we will update this page and describe what they do.",
    ],
  },
  {
    title: "Other websites",
    short: "Their rules apply once you leave.",
    body: [
      "Syntaxly may link to other websites, such as official documentation. We don't control them and aren't responsible for their privacy practices, so please read their policies.",
    ],
  },
  {
    title: "Sharing",
    short: "No selling. Only the essentials.",
    body: [
      "We do not sell personal information. We share information only:",
      [
        "with service providers needed to run Syntaxly, such as our host;",
        "when the law requires it;",
        "to protect the rights, safety and security of Syntaxly and its users.",
      ],
    ],
  },
  {
    title: "Retention and security",
    short: "Kept only as long as needed.",
    body: [
      "Messages you send us are kept as long as needed to respond and to keep a record of the conversation. We take reasonable steps to protect information, but no method of transmission or storage is completely secure.",
    ],
  },
  {
    title: "Your rights",
    short: "Ask and we'll help.",
    body: [
      "Depending on where you live, you may have the right to access, correct or delete personal information we hold about you, or to object to how it is used. To exercise any of these rights, write to {EMAIL}.",
    ],
  },
  {
    title: "Children",
    short: "Not built for young kids.",
    body: [
      "Syntaxly is not directed at young children, and we do not knowingly collect personal information from them. If you believe a child has sent us information, contact us and we will delete it.",
    ],
  },
  {
    title: "Changes to this policy",
    short: "The date at the top tells you.",
    body: [
      "We may update this policy from time to time. The date at the top of this page shows when it last changed. Continuing to use the Service after an update means you accept the new policy.",
    ],
  },
  {
    title: "Contact",
    short: "Questions? Say hello.",
    body: [
      "Questions about privacy? Use the contact page or write to {EMAIL}.",
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

export default function Privacy() {
  const [active, setActive] = useState(0);
  const bar = useRef<HTMLDivElement>(null);
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
              <span>Privacy</span>
            </span>

            <span className={styles.line}>
              <span style={{ animationDelay: "0.12s" }}>
                <em className={styles.hl}>Policy.</em>
              </span>
            </span>
          </h1>

          <div className={styles.heroFoot}>
            <p className={styles.lead}>
              What happens to your information when you use Syntaxly. The short
              version: very little. The details are below, one section at a
              time.
            </p>

            <span className={styles.updated}>Last updated {UPDATED}</span>
          </div>
        </div>
      </header>

      <section className={styles.glance} aria-label="Privacy at a glance">
        <div className={styles.glanceInner}>
          <span className={styles.glanceLabel}>At a glance</span>

          <div className={styles.glanceGrid}>
            {GLANCE.map((g) => (
              <div key={g.title} className={styles.gBlock}>
                <span className={styles.gTab}>{g.title}</span>
                <pre className={styles.gCode}>{g.code}</pre>
                <p className={styles.gText}>{g.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.layout} ref={layoutRef}>
        <div className={styles.tocCol}>
          <nav className={styles.toc} aria-label="Sections" ref={tocRef}>
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
