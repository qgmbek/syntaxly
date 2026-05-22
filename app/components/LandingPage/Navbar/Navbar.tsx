"use client";

import { useState } from "react";
import Image from "next/image";
import { CaretDown } from "@phosphor-icons/react";

import styles from "./Navbar.module.css";

type MenuType = "offers" | "audience" | null;

export default function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeMenu, setActiveMenu] = useState<MenuType>(null);

  const handleMouseEnter = (index: number, menu: MenuType) => {
    setHoveredIndex(index);
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setActiveMenu(null);
  };

  return (
    <div className={styles.headerWrapper} onMouseLeave={handleMouseLeave}>
      <header className={styles.navbar}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>✦</div>
          <span className={styles.logoText}>obsidian</span>
        </div>

        <nav className={styles.centerNav}>
          <div
            className={styles.navItem}
            onMouseEnter={() => handleMouseEnter(0, "offers")}
          >
            <button
              className={`${styles.navButton} ${
                activeMenu === "offers" || hoveredIndex === 0
                  ? styles.activeButton
                  : ""
              }`}
            >
              What we offer
              <div
                className={`${styles.caret} ${
                  activeMenu === "offers" ? styles.caretRotate : ""
                }`}
              >
                <CaretDown size={13} weight="bold" />
              </div>
            </button>

            <div
              className={`${styles.hoverBackground} ${
                hoveredIndex === 0 ? styles.hoverVisible : ""
              }`}
            />
          </div>

          <div
            className={styles.navItem}
            onMouseEnter={() => handleMouseEnter(1, "audience")}
          >
            <button
              className={`${styles.navButton} ${
                activeMenu === "audience" || hoveredIndex === 1
                  ? styles.activeButton
                  : ""
              }`}
            >
              Who&apos;s it for
              <div
                className={`${styles.caret} ${
                  activeMenu === "audience" ? styles.caretRotate : ""
                }`}
              >
                <CaretDown size={13} weight="bold" />
              </div>
            </button>

            <div
              className={`${styles.hoverBackground} ${
                hoveredIndex === 1 ? styles.hoverVisible : ""
              }`}
            />
          </div>

          <div
            className={styles.navItem}
            onMouseEnter={() => handleMouseEnter(2, null)}
          >
            <button
              className={`${styles.navButton} ${
                hoveredIndex === 2 ? styles.activeButton : ""
              }`}
            >
              Pricing
            </button>

            <div
              className={`${styles.hoverBackground} ${
                hoveredIndex === 2 ? styles.hoverVisible : ""
              }`}
            />
          </div>

          <div
            className={styles.navItem}
            onMouseEnter={() => handleMouseEnter(3, null)}
          >
            <button
              className={`${styles.navButton} ${
                hoveredIndex === 3 ? styles.activeButton : ""
              }`}
            >
              About
            </button>

            <div
              className={`${styles.hoverBackground} ${
                hoveredIndex === 3 ? styles.hoverVisible : ""
              }`}
            />
          </div>
        </nav>

        <button className={styles.ctaButton}>Get started</button>
      </header>

      <div
        className={`${styles.megaMenu} ${activeMenu ? styles.menuOpen : ""}`}
      >
        <div className={styles.menuContainer}>
          {activeMenu === "offers" && (
            <div className={styles.gridTwoColumn}>
              <div className={styles.card}>
                <div className={styles.visualBox}>
                  <Image
                    src=""
                    alt="AI Practice"
                    fill
                    sizes="110px"
                    className={styles.cardImage}
                  />
                </div>

                <div>
                  <h3 className={styles.cardTitle}>AI Practice Management</h3>

                  <p className={styles.cardDescription}>
                    Your clients, meetings, and tasks - captured by AI,
                    searchable in seconds.
                  </p>
                </div>
              </div>

              <div className={styles.card}>
                <div className={styles.visualBox}>
                  <Image
                    src=""
                    alt="Execution"
                    fill
                    sizes="110px"
                    className={styles.cardImage}
                  />
                </div>

                <div>
                  <h3 className={styles.cardTitle}>Execution & Custody</h3>

                  <p className={styles.cardDescription}>
                    Trade, rebalance, and custody - all in one seamless,
                    high-performance interface.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeMenu === "audience" && (
            <div className={styles.gridTwoColumn}>
              <div className={styles.card}>
                <div className={styles.visualBox}>
                  <Image
                    src=""
                    alt="Wealth Managers"
                    fill
                    sizes="110px"
                    className={styles.cardImage}
                  />
                </div>

                <div>
                  <h3 className={styles.cardTitle}>RIAs & Wealth Managers</h3>

                  <p className={styles.cardDescription}>
                    Empower your practice with automated back-offices and
                    high-end execution tools.
                  </p>
                </div>
              </div>

              <div className={styles.card}>
                <div className={styles.visualBox}>
                  <Image
                    src=""
                    alt="z Offices"
                    fill
                    sizes="110px"
                    className={styles.cardImage}
                  />
                </div>

                <div>
                  <h3 className={styles.cardTitle}>Family Offices</h3>

                  <p className={styles.cardDescription}>
                    Consolidate multi-custodial complex portfolios under a
                    secure unified architecture.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
