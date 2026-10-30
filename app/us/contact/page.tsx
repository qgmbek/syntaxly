"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";

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
import { Smiley, Octopus, Burst } from "../../ui/HandDrawn";

type Item = {
  id: string;
  label: string;
  value: string;
  icon: ReactNode;
  tone: string;
  href?: string;
};

const ITEMS: Item[] = [
  {
    id: "github",
    label: "GitHub",
    value: "github.com",
    icon: <GithubLogo size={34} weight="regular" />,
    tone: "var(--primary)",
    href: "https://github.com",
  },
  {
    id: "email",
    label: "Email",
    value: "hogambek011@gmail.com",
    icon: <EnvelopeSimple size={34} weight="regular" />,
    tone: "#ffd84d",
  },
  {
    id: "discord",
    label: "Discord",
    value: "@",
    icon: <DiscordLogo size={34} weight="regular" />,
    tone: "#8ab6ff",
  },
  {
    id: "tiktok",
    label: "TikTok",
    value: "@",
    icon: <TiktokLogo size={34} weight="regular" />,
    tone: "#ff7ab8",
    href: "https://www.tiktok.com",
  },
];

const TONES = [
  "#ffd84d",
  "#ff7ab8",
  "#8ab6ff",
  "#ff9a5c",
  "#b5f23d",
  "#ffffff",
  "#ffd84d",
  "#ff7ab8",
  "#8ab6ff",
];

const LEAD =
  "Questions, ideas, or a bug in Syntaxly. Pick whichever channel is easiest for you.";

const letters = (text: string, start: number) =>
  text.split("").map((letter, i) => (
    <span
      key={i}
      aria-hidden="true"
      className={styles.letter}
      style={
        {
          "--i": start + i,
          "--tone": TONES[(start + i) % TONES.length],
        } as CSSProperties
      }
    >
      {letter}
    </span>
  ));

export default function Contact() {
  const [copied, setCopied] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const trackPointer = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    e.currentTarget.style.setProperty("--mx", `${x}px`);
    e.currentTarget.style.setProperty("--my", `${y}px`);
    e.currentTarget.style.setProperty(
      "--px",
      ((x / rect.width - 0.5) * 2).toFixed(3),
    );
    e.currentTarget.style.setProperty(
      "--py",
      ((y / rect.height - 0.5) * 2).toFixed(3),
    );
  };

  const resetPointer = (e: MouseEvent<HTMLElement>) => {
    e.currentTarget.style.setProperty("--px", "0");
    e.currentTarget.style.setProperty("--py", "0");
  };

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
              <Check size={22} weight="bold" className={styles.checkPop} />
            ) : (
              <Copy size={22} weight="bold" />
            )}
          </span>
        </span>

        <span
          className={`${styles.tag} ${done ? styles.tagOn : ""}`}
          aria-hidden="true"
        >
          {item.href ? "open" : done ? "got it" : "copy"}
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

      <div
        className={styles.main}
        onMouseMove={trackPointer}
        onMouseLeave={resetPointer}
      >
        <div className={styles.orb} />

        <Smiley className={`${styles.decor} ${styles.decorSmile}`} />
        <Octopus className={`${styles.decor} ${styles.decorOcto}`} />
        <Burst className={`${styles.decor} ${styles.decorBurst}`} />

        <div className={styles.intro}>
          <h1 className={styles.title} aria-label="Say hello.">
            <span className={styles.line}>
              {letters("Say", 0)}{" "}
              <em className={styles.highlighted}>{letters("hello.", 3)}</em>
              <span className={styles.sticker} aria-hidden="true">
                one human reads these
              </span>
            </span>
          </h1>

          <p className={styles.lead}>
            {LEAD.split(" ").map((word, i) => (
              <span key={i}>
                <span
                  className={styles.leadWord}
                  style={{ "--i": i } as CSSProperties}
                >
                  {word}
                </span>{" "}
              </span>
            ))}
          </p>
        </div>

        <div className={styles.tiles}>
          {ITEMS.map((item, index) =>
            item.href ? (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.tile}
                style={{ "--i": index, "--tone": item.tone } as CSSProperties}
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
                style={{ "--i": index, "--tone": item.tone } as CSSProperties}
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