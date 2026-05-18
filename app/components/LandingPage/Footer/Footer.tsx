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
            <a href="#">How it works</a>
            <a href="#">Features</a>
            <a href="#">Pricing</a>
            <a href="#">FAQ</a>
          </div>

          <div className={styles.column}>
            <div className={styles.heading}>Company</div>
            <a href="#">About</a>
            <a href="#">Careers</a>
            <a href="#">Brand</a>
            <a href="#">Contact</a>
          </div>

          <div className={styles.column}>
            <div className={styles.heading}>Resources</div>
            <a href="#">Download</a>
            <a href="#">Terms of Use</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Support</a>
          </div>

          <div className={styles.column}>
            <div className={styles.heading}>Connect</div>
            <a href="#">X (Twitter)</a>
            <a href="#">Instagram</a>
            <a href="#">LinkedIn</a>
            <a href="#">YouTube</a>
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
