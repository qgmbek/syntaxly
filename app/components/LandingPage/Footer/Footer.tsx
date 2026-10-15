"use client";

import { useState, useRef, useEffect, CSSProperties } from "react";
import Link from "next/link";
import styles from "./Footer.module.css";

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

type FooterColumn = {
  title: string;
  links: FooterLink[];
};

const columns: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Open Syntaxly", href: "/syntax" },
      { label: "How it works", href: "/us/how-it-works" },
      { label: "Features", href: "/us/features" },
      { label: "FAQ", href: "/us/faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/us/about" },
      { label: "Roadmap", href: "/us/roadmap" },
      { label: "Brand", href: "/us/brand" },
      { label: "Contact", href: "/us/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Download", href: "/us/download" },
      { label: "Terms of Use", href: "/us/terms" },
      { label: "Privacy Policy", href: "/us/privacy" },
      { label: "Resources", href: "/us/resources" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "GitHub", href: "https://github.com/", external: true },
      { label: "TikTok", href: "https://www.tiktok.com/", external: true },
      { label: "Discord", href: "/us/contact" },
      { label: "Email", href: "" },
    ],
  },
];

const WORDMARK = "Syntaxly";

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

  return (
    <footer
      ref={footerRef}
      className={styles.footer}
      {...(shown ? { "data-in": "" } : {})}
    >
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
              style={{ "--col": col } as CSSProperties}
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

        <h1 className={styles.bigText} aria-label={WORDMARK}>
          {WORDMARK.split("").map((letter, index) => (
            <span
              key={index}
              aria-hidden="true"
              className={styles.letter}
              style={{ "--i": index } as CSSProperties}
            >
              {letter}
            </span>
          ))}
        </h1>
      </div>
    </footer>
  );
}
