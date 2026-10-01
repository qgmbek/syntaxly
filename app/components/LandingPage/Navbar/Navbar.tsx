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
        icon: <Lightning size={26} weight="duotone" />,
        title: "Instant recall",
        text: "The boilerplate you forgot, in two seconds instead of a documentation detour.",
        href: "/syntax",
      },
      {
        icon: <Stack size={26} weight="duotone" />,
        title: "One canvas",
        text: "Every topic sits in a column on a single page. Scan a whole language at a glance.",
        href: "/syntax",
      },
      {
        icon: <BracketsCurly size={26} weight="duotone" />,
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
        icon: <MagnifyingGlass size={26} weight="duotone" />,
        title: "Quick search",
        text: "Jump to any block from anywhere with Ctrl K.",
        href: "/syntax",
      },
      {
        icon: <DiamondsFour size={26} weight="duotone" />,
        title: "Unique filter",
        text: "Show only the syntax that is unique to the language. Ctrl U.",
        href: "/syntax",
      },
      {
        icon: <Columns size={26} weight="duotone" />,
        title: "Focus mode",
        text: "Hide the chrome and keep only the columns. Ctrl Shift F.",
        href: "/syntax",
      },
      {
        icon: <Palette size={26} weight="duotone" />,
        title: "Themes",
        text: "Three palettes, one click, same layout.",
        href: "/syntax",
      },
    ],
  },
};

const LINKS = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menu, setMenu] = useState<MenuKey | null>(null);
  const [shown, setShown] = useState<MenuKey>("features");
  const [mobileOpen, setMobileOpen] = useState(false);

  const open = (key: MenuKey) => {
    setMenu(key);
    setShown(key);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(null);
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", onKey);

    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className={styles.headerWrapper} onMouseLeave={() => setMenu(null)}>
      <header className={styles.navbar}>
        <Link href="/" className={styles.logo} aria-label="Syntaxly home">
          <span className={styles.logoMark}>✦</span>
          <span className={styles.logoText}>syntaxly</span>
        </Link>

        <nav className={styles.centerNav} aria-label="Main">
          {(Object.keys(MENUS) as MenuKey[]).map((key) => (
            <div
              key={key}
              className={styles.navItem}
              onMouseEnter={() => open(key)}
            >
              <button
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
                >
                  <CaretDown size={13} weight="bold" />
                </span>
              </button>
            </div>
          ))}

          {LINKS.map((l) => (
            <div
              key={l.href}
              className={styles.navItem}
              onMouseEnter={() => setMenu(null)}
            >
              <Link
                href={l.href}
                className={`${styles.navButton} ${
                  pathname === l.href ? styles.current : ""
                }`}
                aria-current={pathname === l.href ? "page" : undefined}
              >
                {l.label}
              </Link>
            </div>
          ))}
        </nav>

        <div className={styles.right}>
          <Link href="/syntax" className={styles.ctaButton}>
            Get started
          </Link>

          <button
            className={styles.menuToggle}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <List size={24} />}
          </button>
        </div>
      </header>

      <div className={`${styles.megaMenu} ${menu ? styles.menuOpen : ""}`}>
        <div className={styles.menuContainer} key={shown}>
          {MENUS[shown].items.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className={styles.item}
              tabIndex={menu ? 0 : -1}
            >
              <span className={styles.itemIcon}>{item.icon}</span>

              <span>
                <span className={styles.itemTitle}>{item.title}</span>
                <span className={styles.itemText}>{item.text}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>

      {mobileOpen && (
        <div className={styles.mobilePanel}>
          {(Object.keys(MENUS) as MenuKey[]).flatMap((key) =>
            MENUS[key].items.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className={styles.mobileLink}
              >
                {item.title}
              </Link>
            )),
          )}

          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={styles.mobileLink}>
              {l.label}
            </Link>
          ))}

          <Link href="/syntax" className={styles.mobileCta}>
            Get started
          </Link>
        </div>
      )}
    </div>
  );
}
