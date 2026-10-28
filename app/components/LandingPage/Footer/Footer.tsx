"use client";

import { useState, useRef, useEffect, MouseEvent, CSSProperties } from "react";
import Link from "next/link";
import styles from "./Footer.module.css";
import { Arrow, Rocket, SleepyMoon } from "../../../../app/ui/HandDrawn";

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

type FooterColumn = {
  title: string;
  tone: string;
  links: FooterLink[];
};

const columns: FooterColumn[] = [
  {
    title: "Product",
    tone: "#ff7ab8",
    links: [
      { label: "Open Syntaxly", href: "/syntax" },
      { label: "How it works", href: "/us/how-it-works" },
      { label: "Features", href: "/us/features" },
      { label: "FAQ", href: "/us/faq" },
    ],
  },
  {
    title: "Company",
    tone: "#ffd84d",
    links: [
      { label: "About", href: "/us/about" },
      { label: "Roadmap", href: "/us/roadmap" },
      { label: "Brand", href: "/us/brand" },
      { label: "Contact", href: "/us/contact" },
    ],
  },
  {
    title: "Resources",
    tone: "#8ab6ff",
    links: [
      { label: "Download", href: "/us/download" },
      { label: "Terms of Use", href: "/us/terms" },
      { label: "Privacy Policy", href: "/us/privacy" },
      { label: "Resources", href: "/us/resources" },
    ],
  },
  {
    title: "Connect",
    tone: "#ff9a5c",
    links: [
      { label: "GitHub", href: "https://github.com/", external: true },
      { label: "TikTok", href: "https://www.tiktok.com/", external: true },
      { label: "Discord", href: "/us/contact" },
      { label: "Email", href: "" },
    ],
  },
];

const WORDMARK = "Syntaxly";

const TONES = [
  "#ffd84d",
  "#ff7ab8",
  "#8ab6ff",
  "#ff9a5c",
  "#b5f23d",
  "#ffffff",
  "#ffd84d",
  "#ff7ab8",
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = footerRef.current;
    if (!node) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const remaining =
        document.documentElement.scrollHeight -
        (window.scrollY + window.innerHeight);
      const height = node.offsetHeight;

      setShown((current) => {
        if (!current && remaining < height * 0.5) return true;
        if (current && remaining > height * 0.9) return false;
        return current;
      });
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const trackPointer = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <footer
      ref={footerRef}
      className={styles.footer}
      onMouseMove={trackPointer}
      {...(shown ? { "data-in": "" } : {})}
    >
      <div className={styles.glow} aria-hidden="true" />

      <SleepyMoon className={`${styles.decor} ${styles.decorMoon}`} />
      <Rocket className={`${styles.decor} ${styles.decorRocket}`} />

      <div className={styles.top}>
        <div className={styles.brandSection}>
          <div className={styles.logoWrapper}>
            <div className={styles.logo}></div>
            <span className={styles.brand}>Syntaxly</span>
          </div>
        </div>

        <div className={styles.linksGrid}>
          {columns.map((column, col) => (
            <div
              key={column.title}
              className={styles.column}
              style={{ "--col": col, "--tone": column.tone } as CSSProperties}
            >
              <div className={styles.heading}>{column.title}</div>

              {column.links.map((link, row) => {
                const style = { "--row": row } as CSSProperties;

                return link.external || link.href === "" ? (
                  <a
                    key={link.label}
                    style={style}
                    href={link.href}
                    {...(link.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {link.label}
                    {link.external && (
                      <span className={styles.ext} aria-hidden="true">
                        ↗
                      </span>
                    )}
                  </a>
                ) : (
                  <Link key={link.label} style={style} href={link.href}>
                    {link.label}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.bottom}>
        <p className={styles.copyright}>Syntaxly. All rights reserved.</p>

        <button
          type="button"
          className={styles.toTop}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          back to top
          <Arrow
            className={styles.toTopArrow}
            style={{ "--draw-delay": "1.6s" } as CSSProperties}
          />
        </button>

        <h1 className={styles.bigText} aria-label={WORDMARK}>
          {WORDMARK.split("").map((letter, index) => (
            <span
              key={index}
              aria-hidden="true"
              className={styles.letter}
              style={
                {
                  "--i": index,
                  "--tone": TONES[index % TONES.length],
                  "--dir": index % 2 === 0 ? -1 : 1,
                } as CSSProperties
              }
            >
              {letter}
            </span>
          ))}
        </h1>
      </div>
    </footer>
  );
}