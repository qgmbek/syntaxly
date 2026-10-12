"use client";

import Link from "next/link";
import styles from "./Footer.module.css";
import useReveal from "../../../hooks/useReveal";

export default function Footer() {
  const footerRef = useReveal<HTMLElement>(0.1);

  return (
    <footer ref={footerRef} className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brandSection} data-reveal>
          <div className={styles.logoWrapper}>
            <div className={styles.logo}></div>
            <span className={styles.brand}>Syntaxly</span>
          </div>
        </div>

        <div className={styles.linksGrid}>
          <div className={styles.column} data-reveal style={{ transitionDelay: "0.08s" }}>
            <div className={styles.heading}>Product</div>
            <Link href="/syntax">Open Syntaxly</Link>
            <Link href="/us/how-it-works">How it works</Link>
            <Link href="/us/features">Features</Link>
            <Link href="/us/faq">FAQ</Link>
          </div>

          <div className={styles.column} data-reveal style={{ transitionDelay: "0.16s" }}>
            <div className={styles.heading}>Company</div>
            <Link href="/us/about">About</Link>
            <Link href="/us/roadmap">Roadmap</Link>
            <Link href="/us/brand">Brand</Link>
            <Link href="/us/contact">Contact</Link>
          </div>

          <div className={styles.column} data-reveal style={{ transitionDelay: "0.24s" }}>
            <div className={styles.heading}>Resources</div>
            <Link href="/us/download">Download</Link>
            <Link href="/us/terms">Terms of Use</Link>
            <Link href="/us/privacy">Privacy Policy</Link>
            <Link href="/us/resources">Resources</Link>
          </div>

          <div className={styles.column} data-reveal style={{ transitionDelay: "0.32s" }}>
            <div className={styles.heading}>Connect</div>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://www.tiktok.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              TikTok
            </a>
            <Link href="/us/contact">Discord</Link>
            <a href="">Email</a>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p className={styles.copyright} data-reveal style={{ transitionDelay: "0.4s" }}>Syntaxly. All rights reserved.</p>

        <h1 className={styles.bigText} data-reveal style={{ transitionDelay: "0.48s" }}>Syntaxly</h1>
      </div>
    </footer>
  );
}
