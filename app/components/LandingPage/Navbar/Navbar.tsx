"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";
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
  const wrapRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  const [menu, setMenu] = useState<MenuKey | null>(null);
  const [shown, setShown] = useState<MenuKey>("features");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  const placePill = (el: HTMLElement) => {
    const nav = navRef.current;
    if (!nav) return;

    const wasHidden = nav.style.getPropertyValue("--po") !== "1";

    if (wasHidden) nav.style.setProperty("--pt", "0s");

    nav.style.setProperty("--px", `${el.offsetLeft}px`);
    nav.style.setProperty("--pw", `${el.offsetWidth}px`);
    nav.style.setProperty("--po", "1");

    if (wasHidden) {
      requestAnimationFrame(() =>
        requestAnimationFrame(() => nav.style.removeProperty("--pt")),
      );
    }
  };

  const hidePill = () => navRef.current?.style.setProperty("--po", "0");

  const open = (key: MenuKey) => {
    setShown(key);
    setMenu(key);
  };

  const closeMenus = () => {
    setMenu(null);
    setMobileOpen(false);
    hidePill();
  };

  const trackItem = (e: MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
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

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let frame = 0;
    let lastY = window.scrollY;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;

      wrap.style.setProperty(
        "--prog",
        max > 0 ? Math.min(1, Math.max(0, y / max)).toFixed(4) : "0",
      );

      setScrolled(y > 24);

      if (Math.abs(y - lastY) > 6) {
        if (!reduce) setHidden(y > 240 && y > lastY);
        lastY = y;
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  const tucked = hidden && !menu && !mobileOpen;

  return (
    <div
      ref={wrapRef}
      className={`${styles.headerWrapper} ${scrolled ? styles.scrolled : ""} ${
        tucked ? styles.tucked : ""
      }`}
      onMouseLeave={() => {
        setMenu(null);
        hidePill();
      }}
      onFocusCapture={() => setHidden(false)}
    >
      <div
        className={`${styles.scrim} ${menu ? styles.scrimOn : ""}`}
        aria-hidden="true"
      />

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

        <nav
          ref={navRef}
          className={styles.centerNav}
          aria-label="Main navigation"
          onMouseLeave={() => {
            if (!menu) hidePill();
          }}
        >
          <span className={styles.pill} aria-hidden="true" />

          {(Object.keys(MENUS) as MenuKey[]).map((key) => (
            <div
              key={key}
              className={styles.navItem}
              onMouseEnter={(e) => {
                open(key);
                placePill(e.currentTarget);
              }}
            >
              <button
                type="button"
                className={`${styles.navButton} ${
                  menu === key ? styles.navActive : ""
                }`}
                aria-expanded={menu === key}
                aria-haspopup="true"
                onClick={() => (menu === key ? setMenu(null) : open(key))}
                onFocus={(e) => {
                  open(key);
                  if (e.currentTarget.parentElement) {
                    placePill(e.currentTarget.parentElement);
                  }
                }}
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
              onMouseEnter={(e) => {
                setMenu(null);
                placePill(e.currentTarget);
              }}
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

        <span className={styles.progress} aria-hidden="true" />
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
              style={{ "--item-index": index } as CSSProperties}
              tabIndex={menu ? 0 : -1}
              onClick={closeMenus}
              onMouseMove={trackItem}
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
                style={{ "--item-index": index } as CSSProperties}
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
