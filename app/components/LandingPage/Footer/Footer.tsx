"use client";

import { useState, useRef, useEffect, MouseEvent, CSSProperties } from "react";
import Link from "next/link";
import { Sun, CircleHalf, Sparkle } from "@phosphor-icons/react";
import styles from "./Footer.module.css";
import { Rocket, SleepyMoon } from "../../../../app/ui/HandDrawn";
import HandwrittenText, { HandwrittenArrow } from "../../../ui/HandwrittenText";

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

type FooterColumn = {
  title: string;
  tone: string;
  links: FooterLink[];
};

type Theme = "default" | "monochrome" | "satisfying-fun";

const columns: FooterColumn[] = [
  {
    title: "Product",
    tone: "#ff7ab8",
    links: [
      { label: "Open Syntaxly", href: "/syntax" },
      { label: "How it works", href: "/us/how-it-works" },
      { label: "Features", href: "/us/features" },
      { label: "FAQ", href: "/us/faq" },
    ],
  },
  {
    title: "Company",
    tone: "#ffd84d",
    links: [
      { label: "About", href: "/us/about" },
      { label: "Roadmap", href: "/us/roadmap" },
      { label: "Brand", href: "/us/brand" },
      { label: "Contact", href: "/us/contact" },
    ],
  },
  {
    title: "Resources",
    tone: "#8ab6ff",
    links: [
      { label: "Download", href: "/us/download" },
      { label: "Terms of Use", href: "/us/terms" },
      { label: "Privacy Policy", href: "/us/privacy" },
      { label: "Resources", href: "/us/resources" },
    ],
  },
  {
    title: "Connect",
    tone: "#ff9a5c",
    links: [
      { label: "GitHub", href: "https://github.com/", external: true },
      { label: "TikTok", href: "https://www.tiktok.com/", external: true },
      { label: "Discord", href: "/us/contact" },
      { label: "Email", href: "" },
    ],
  },
];

const WORDMARK = "Syntaxly";

const TONES = [
  "#ffd84d",
  "#ff7ab8",
  "#8ab6ff",
  "#ff9a5c",
  "#b5f23d",
  "#ffffff",
  "#ffd84d",
  "#ff7ab8",
];

const themes: {
  key: Theme;
  label: string;
  colors: string[];
  Icon: typeof Sun;
}[] = [
  {
    key: "default",
    label: "Default theme",
    colors: ["#00ffd0", "#171717", "#eeeeee"],
    Icon: Sun,
  },
  {
    key: "monochrome",
    label: "Monochrome theme",
    colors: ["#171717", "#ffffff", "#a5a5a5"],
    Icon: CircleHalf,
  },
  {
    key: "satisfying-fun",
    label: "Fun theme",
    colors: ["#ff3d81", "#ffd84d", "#8ab6ff"],
    Icon: Sparkle,
  },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);
  const [activeTheme, setActiveTheme] = useState<Theme>("default");

  useEffect(() => {
    const savedTheme = localStorage.getItem("syntaxly-theme") as Theme | null;
    const isValidTheme = themes.some((theme) => theme.key === savedTheme);
    const theme: Theme = isValidTheme ? savedTheme! : "default";

    document.documentElement.dataset.theme = theme;
    setActiveTheme(theme);
  }, []);

  const changeTheme = (theme: Theme) => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("syntaxly-theme", theme);
    setActiveTheme(theme);
  };

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

  const trackPointer = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <footer
      ref={footerRef}
      className={styles.footer}
      onMouseMove={trackPointer}
      {...(shown ? { "data-in": "" } : {})}
    >
      <div className={styles.glow} aria-hidden="true" />

      <SleepyMoon className={`${styles.decor} ${styles.decorMoon}`} />
      <Rocket className={`${styles.decor} ${styles.decorRocket}`} />

      <div className={styles.top}>
        <div className={styles.brandSection}>
          <div className={styles.logoWrapper}>
            <span className={styles.logo} aria-hidden="true">
              ✦
            </span>
            <span className={styles.brand}>Syntaxly</span>
          </div>

          <div
            className={styles.themeSwitch}
            role="group"
            aria-label="Choose theme"
          >
            {themes.map(({ key, label, colors, Icon }) => (
              <button
                key={key}
                type="button"
                className={`${styles.themeButton} ${
                  activeTheme === key ? styles.themeButtonActive : ""
                }`}
                onClick={() => changeTheme(key)}
                aria-label={label}
                aria-pressed={activeTheme === key}
                title={label}
              >
                <Icon className={styles.themeIcon} weight="regular" />

                <span className={styles.themePalette} aria-hidden="true">
                  {colors.map((color) => (
                    <span
                      key={color}
                      className={styles.themeColor}
                      style={{ "--swatch": color } as CSSProperties}
                    />
                  ))}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.linksGrid}>
          {columns.map((column, col) => (
            <div
              key={column.title}
              className={styles.column}
              style={{ "--col": col, "--tone": column.tone } as CSSProperties}
            >
              <div className={styles.heading}>
                <HandwrittenText
                  text={column.title}
                  delay={400 + col * 90}
                  duration={850}
                />
              </div>

              {column.links.map((link, row) => {
                const style = { "--row": row } as CSSProperties;

                return link.external || link.href === "" ? (
                  <a
                    key={link.label}
                    style={style}
                    href={link.href || undefined}
                    {...(link.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {link.label}
                    {link.external && (
                      <span className={styles.ext} aria-hidden="true">
                        ↗
                      </span>
                    )}
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

      <button
        type="button"
        className={styles.toTop}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <HandwrittenText text="back to top" delay={1400} />
        <HandwrittenArrow className={styles.toTopArrow} delay={2600} />
      </button>

      <div className={styles.bottom}>
        <p className={styles.copyright}>Syntaxly. All rights reserved.</p>

        <h1 className={styles.bigText} aria-label={WORDMARK}>
          {WORDMARK.split("").map((letter, index) => (
            <span
              key={index}
              aria-hidden="true"
              className={styles.letter}
              style={
                {
                  "--i": index,
                  "--tone": TONES[index % TONES.length],
                  "--dir": index % 2 === 0 ? -1 : 1,
                } as CSSProperties
              }
            >
              {letter}
            </span>
          ))}
        </h1>
      </div>
    </footer>
  );
}
