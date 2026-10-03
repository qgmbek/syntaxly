"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import {
  GithubLogo,
  EnvelopeSimple,
  DiscordLogo,
  TiktokLogo,
  ArrowUpRight,
  Copy,
  Check,
} from "@phosphor-icons/react";

import styles from "./Contact.module.css";

type Item = {
  id: string;
  label: string;
  value: string;
  icon: ReactNode;
  href?: string;
};

const ITEMS: Item[] = [
  {
    id: "github",
    label: "GitHub",
    value: "github.com",
    icon: <GithubLogo size={34} weight="regular" />,
    href: "https://github.com",
  },
  {
    id: "email",
    label: "Email",
    value: "hogambek011@gmail.com",
    icon: <EnvelopeSimple size={34} weight="regular" />,
  },
  {
    id: "discord",
    label: "Discord",
    value: "@",
    icon: <DiscordLogo size={34} weight="regular" />,
  },
  {
    id: "tiktok",
    label: "TikTok",
    value: "@",
    icon: <TiktokLogo size={34} weight="regular" />,
    href: "https://www.tiktok.com",
  },
];

export default function Contact() {
  const [copied, setCopied] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const copy = async (item: Item) => {
    try {
      await navigator.clipboard.writeText(item.value);
      setCopied(item.id);

      if (timer.current) clearTimeout(timer.current);

      timer.current = setTimeout(() => setCopied(null), 1800);
    } catch {}
  };

  const body = (item: Item) => {
    const done = copied === item.id;

    return (
      <>
        <span className={styles.fill} />

        <span className={styles.tileTop}>
          <span className={styles.icon}>{item.icon}</span>

          <span className={styles.action}>
            {item.href ? (
              <ArrowUpRight size={22} weight="bold" />
            ) : done ? (
              <Check size={22} weight="bold" />
            ) : (
              <Copy size={22} weight="bold" />
            )}
          </span>
        </span>

        <span className={styles.tileBottom}>
          <span className={styles.label}>{done ? "Copied" : item.label}</span>

          <span className={styles.value}>{item.value}</span>
        </span>
      </>
    );
  };

  return (
    <main className={styles.page}>
      <aside className={styles.rail}>
        <span className={styles.railName}>CONTACT</span>
      </aside>

      <div className={styles.main}>
        <div className={styles.orb} />

        <div className={styles.intro}>
          <h1 className={styles.title}>
            <span className={styles.line}>
              <span>
                Say <em className={styles.highlighted}>hello.</em>
              </span>
            </span>
          </h1>

          <p className={styles.lead}>
            Questions, ideas, or a bug in Syntaxly. Pick whichever channel is
            easiest for you.
          </p>
        </div>

        <div className={styles.tiles}>
          {ITEMS.map((item) =>
            item.href ? (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.tile}
                aria-label={`${item.label}: ${item.value}`}
              >
                {body(item)}
              </a>
            ) : (
              <button
                key={item.id}
                type="button"
                onClick={() => copy(item)}
                className={styles.tile}
                aria-label={`Copy ${item.label}: ${item.value}`}
              >
                {body(item)}
              </button>
            ),
          )}
        </div>

        <span className={styles.srOnly} aria-live="polite">
          {copied ? "Copied to clipboard" : ""}
        </span>
      </div>
    </main>
  );
}
