"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  CaretDown,
  List,
  X,
  Lightning,
  Stack,
  BracketsCurly,
  MagnifyingGlass,
  DiamondsFour,
  Columns,
  Palette,
} from "@phosphor-icons/react";

import styles from "./Navbar.module.css";

type MenuKey = "features" | "tools";

type MenuItem = {
  icon: ReactNode;
  title: string;
  text: string;
  href: string;
};

const MENUS: Record<MenuKey, { label: string; items: MenuItem[] }> = {
  features: {
    label: "Features",
    items: [
      {
        icon: <Lightning size={26} weight="regular" />,
        title: "Instant recall",
        text: "The boilerplate you forgot, in two seconds instead of a documentation detour.",
        href: "/syntax",
      },
      {
        icon: <Stack size={26} weight="regular" />,
        title: "One canvas",
        text: "Every topic sits in a column on a single page. Scan a whole language at a glance.",
        href: "/syntax",
      },
      {
        icon: <BracketsCurly size={26} weight="regular" />,
        title: "Live breakdown",
        text: "Click any block for what it is, how it's used, an example, and a tip.",
        href: "/syntax",
      },
    ],
  },
  tools: {
    label: "Tools",
    items: [
      {
        icon: <MagnifyingGlass size={26} weight="regular" />,
        title: "Quick search",
        text: "Jump to any block from anywhere with Ctrl K.",
        href: "/syntax",
      },
      {
        icon: <DiamondsFour size={26} weight="regular" />,
        title: "Unique filter",
        text: "Show only the syntax that is unique to the language. Ctrl U.",
        href: "/syntax",
      },
      {
        icon: <Columns size={26} weight="regular" />,
        title: "Focus mode",
        text: "Hide the chrome and keep only the columns. Ctrl Shift F.",
        href: "/syntax",
      },
      {
        icon: <Palette size={26} weight="regular" />,
        title: "Themes",
        text: "Three palettes, one click, same layout.",
        href: "/syntax",
      },
    ],
  },
};

const LINKS = [
  { label: "About", href: "/us/about" },
  { label: "Contact", href: "/us/contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  const [menu, setMenu] = useState<MenuKey | null>(null);
  const [shown, setShown] = useState<MenuKey>("features");
  const [mobileOpen, setMobileOpen] = useState(false);

  const open = (key: MenuKey) => {
    setShown(key);
    setMenu(key);
  };

  const closeMenus = () => {
    setMenu(null);
    setMobileOpen(false);
  };

  useEffect(() => {
    closeMenus();
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenus();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className={styles.headerWrapper} onMouseLeave={() => setMenu(null)}>
      <header className={styles.navbar}>
        <Link
          href="/"
          className={styles.logo}
          aria-label="Syntaxly home"
          onClick={closeMenus}
        >
          <span className={styles.logoMark} aria-hidden="true">
            ✦
          </span>
          <span className={styles.logoText}>syntaxly</span>
        </Link>

        <nav className={styles.centerNav} aria-label="Main navigation">
          {(Object.keys(MENUS) as MenuKey[]).map((key) => (
            <div
              key={key}
              className={styles.navItem}
              onMouseEnter={() => open(key)}
            >
              <button
                type="button"
                className={`${styles.navButton} ${
                  menu === key ? styles.navActive : ""
                }`}
                aria-expanded={menu === key}
                aria-haspopup="true"
                onClick={() => (menu === key ? setMenu(null) : open(key))}
                onFocus={() => open(key)}
              >
                {MENUS[key].label}

                <span
                  className={`${styles.caret} ${
                    menu === key ? styles.caretRotate : ""
                  }`}
                  aria-hidden="true"
                >
                  <CaretDown size={13} weight="bold" />
                </span>
              </button>
            </div>
          ))}

          {LINKS.map((link) => (
            <div
              key={link.href}
              className={styles.navItem}
              onMouseEnter={() => setMenu(null)}
            >
              <Link
                href={link.href}
                className={`${styles.navButton} ${
                  pathname === link.href ? styles.current : ""
                }`}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
              </Link>
            </div>
          ))}
        </nav>

        <div className={styles.right}>
          <Link
            href="/syntax"
            className={styles.ctaButton}
            onClick={closeMenus}
          >
            Get started
            <span className={styles.ctaArrow} aria-hidden="true">
              ↗
            </span>
          </Link>

          <button
            type="button"
            className={styles.menuToggle}
            onClick={() => {
              setMobileOpen((current) => !current);
              setMenu(null);
            }}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="syntaxly-mobile-menu"
          >
            {mobileOpen ? <X size={24} /> : <List size={24} />}
          </button>
        </div>
      </header>

      <div
        className={`${styles.megaMenu} ${menu ? styles.menuOpen : ""}`}
        aria-hidden={!menu}
        inert={!menu}
      >
        <div className={styles.menuContainer} key={shown}>
          {MENUS[shown].items.map((item, index) => (
            <Link
              key={item.title}
              href={item.href}
              className={styles.item}
              style={
                {
                  "--item-index": index,
                } as React.CSSProperties
              }
              tabIndex={menu ? 0 : -1}
              onClick={closeMenus}
            >
              <span className={styles.itemIcon} aria-hidden="true">
                {item.icon}
              </span>

              <span className={styles.itemContent}>
                <span className={styles.itemTitle}>{item.title}</span>
                <span className={styles.itemText}>{item.text}</span>
              </span>

              <span className={styles.itemArrow} aria-hidden="true">
                ↗
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div
        id="syntaxly-mobile-menu"
        className={`${styles.mobilePanel} ${
          mobileOpen ? styles.mobileOpen : ""
        }`}
        aria-hidden={!mobileOpen}
        inert={!mobileOpen}
      >
        {(Object.keys(MENUS) as MenuKey[]).map((key) => (
          <div key={key} className={styles.mobileGroup}>
            <span className={styles.mobileGroupLabel}>{MENUS[key].label}</span>

            {MENUS[key].items.map((item, index) => (
              <Link
                key={`${key}-${item.title}`}
                href={item.href}
                className={styles.mobileLink}
                style={
                  {
                    "--item-index": index,
                  } as React.CSSProperties
                }
                onClick={closeMenus}
              >
                <span>{item.title}</span>
                <span className={styles.mobileArrow} aria-hidden="true">
                  ↗
                </span>
              </Link>
            ))}
          </div>
        ))}

        <div className={styles.mobileFooter}>
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.mobileSecondary}
              onClick={closeMenus}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/syntax"
            className={styles.mobileCta}
            onClick={closeMenus}
          >
            Get started <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
