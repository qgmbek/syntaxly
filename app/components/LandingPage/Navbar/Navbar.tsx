"use client";

import styles from "./Navbar.module.css";
import { CaretDown } from "@phosphor-icons/react";

export default function Navbar() {
  return (
    <header className={styles.navbar}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}>◌</div>
        <span className={styles.logoText}>syntaxly</span>
      </div>

      <nav className={styles.centerNav}>
        <div className={styles.navItem}>
          <button className={styles.navButton}>
            What we offer
            <CaretDown size={14} weight="bold" />
          </button>

          <div className={styles.hoverBackground}></div>
        </div>

        <div className={styles.navItem}>
          <button className={styles.navButton}>
            Who&apos;s it for
            <CaretDown size={14} weight="bold" />
          </button>

          <div className={styles.hoverBackground}></div>
        </div>

        <div className={styles.navItem}>
          <button className={styles.navButton}>Contribute</button>

          <div className={styles.hoverBackground}></div>
        </div>

        <div className={styles.navItem}>
          <button className={styles.navButton}>About</button>

          <div className={styles.hoverBackground}></div>
        </div>
      </nav>

      <button className={styles.ctaButton}>Get started</button>
    </header>
  );
}
