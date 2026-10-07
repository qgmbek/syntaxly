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
            <Link href="/syntax">Open Syntaxly</Link>
            <Link href="/us/how-it-works">How it works</Link>
            <Link href="/us/features">Features</Link>
            <Link href="/us/faq">FAQ</Link>
          </div>

          <div className={styles.column}>
            <div className={styles.heading}>Company</div>
            <Link href="/us/about">About</Link>
            <Link href="/us/roadmap">Roadmap</Link>
            <Link href="/us/brand">Brand</Link>
            <Link href="/us/contact">Contact</Link>
          </div>

          <div className={styles.column}>
            <div className={styles.heading}>Resources</div>
            <Link href="/us/download">Download</Link>
            <Link href="/us/terms">Terms of Use</Link>
            <Link href="/us/privacy">Privacy Policy</Link>
            <Link href="/us/resources">Resources</Link>
          </div>

          <div className={styles.column}>
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
        <p className={styles.copyright}>Syntaxly. All rights reserved.</p>

        <h1 className={styles.bigText}>Syntaxly</h1>
      </div>
    </footer>
  );
}
