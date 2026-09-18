import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brandSection}>
          <div className={styles.logoWrapper}>
            <div className={styles.logo}></div>
            <span className={styles.brand}>Syntaxly</span>
          </div>
        </div>

        <div className={styles.linksGrid}>
          <div className={styles.column}>
            <div className={styles.heading}>Product</div>
            <Link href="/how-it-works">How it works</Link>
            <Link href="/features">Features</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/faq">FAQ</Link>
          </div>

          <div className={styles.column}>
            <div className={styles.heading}>Company</div>
            <Link href="/about">About</Link>
            <Link href="/careers">Careers</Link>
            <Link href="/brand">Brand</Link>
            <Link href="/contact">Contact</Link>
          </div>

          <div className={styles.column}>
            <div className={styles.heading}>Resources</div>
            <Link href="/download">Download</Link>
            <Link href="/terms">Terms of Use</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/support">Support</Link>
          </div>

          <div className={styles.column}>
            <div className={styles.heading}>Connect</div>
            <Link href="/x">X (Twitter)</Link>
            <Link href="/instagram">Instagram</Link>
            <Link href="/linkedin">LinkedIn</Link>
            <Link href="/youtube">YouTube</Link>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p className={styles.copyright}>
          © 2026 Syntaxly, Inc. All rights reserved.
        </p>

        <h1 className={styles.bigText}>Syntaxly</h1>
      </div>
    </footer>
  );
}