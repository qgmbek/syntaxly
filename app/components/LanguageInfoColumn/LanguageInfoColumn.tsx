"use client";

import { useEffect, useState, type CSSProperties } from "react";
import styles from "./LanguageInfoColumn.module.css";
import {
  Smiley,
  Sparkle,
  Burst,
  Bolt,
  Spiral,
  Semicolon,
  Braces,
  Pointer,
  Coffee,
  Rocket,
  Goldfish,
  SleepyMoon,
} from "../../../app/ui/HandDrawn";

export interface LanguageInfoData {
  name: string;
  tagline: string;
  description: string;
  category: string;
  createdBy: string;
  yearCreated: number;
  latestVersion: string;
  license: string;
  website: string;
  githubStars: string;
  weeklyDownloads: string;
  usedBy: string[];
  keyFeatures: string[];
  history: string;
  useCases: string[];
  popularityRank: string;
  ecosystem: string;
}

interface LanguageInfoColumnProps {
  data: LanguageInfoData | null;
  onClose: () => void;
}

const DOODLES = [
  Smiley,
  Sparkle,
  Burst,
  Bolt,
  Spiral,
  Semicolon,
  Braces,
  Pointer,
  Coffee,
  Rocket,
  Goldfish,
  SleepyMoon,
];

const FILLS = [
  "var(--h-butter)",
  "var(--h-pink)",
  "var(--h-cyan)",
  "var(--paper-2)",
];

const seedOf = (text: string) =>
  Array.from(text).reduce((sum, ch, i) => sum + ch.charCodeAt(0) * (i + 1), 0);

const group = (s: number) => ({ "--s": s }) as CSSProperties;
const item = (k: number) => ({ "--k": k }) as CSSProperties;

export default function LanguageInfoColumn({
  data,
  onClose,
}: LanguageInfoColumnProps) {
  const [visible, setVisible] = useState(false);
  const [rendered, setRendered] = useState<LanguageInfoData | null>(null);
  const [session, setSession] = useState(0);

  useEffect(() => {
    if (data) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true);
      const t = setTimeout(() => {
        setRendered(data);
        setSession((s) => s + 1);
      }, 80);
      return () => clearTimeout(t);
    } else {
      setVisible(false);
    }
  }, [data]);

  const seed = rendered ? seedOf(rendered.name) : 0;
  const Doodle = DOODLES[seed % DOODLES.length];

  return (
    <div
      className={`${styles.wrapper} ${visible ? styles.open : ""}`}
      aria-hidden={!visible}
    >
      <div className={styles.column}>
        <div className={styles.header}>
          <div className={styles.headerContent} key={session}>
            <div className={styles.categoryBadge}>
              {rendered?.category ?? ""}
            </div>
            <div className={styles.headerName}>{rendered?.name ?? ""}</div>
            <div className={styles.tagline}>{rendered?.tagline ?? ""}</div>
          </div>

          {rendered && (
            <Doodle
              key={session}
              className={styles.doodle}
              style={
                {
                  "--fill": FILLS[seed % FILLS.length],
                  rotate: `${(seed % 17) - 8}deg`,
                } as CSSProperties
              }
            />
          )}

          <button
            className={styles.close}
            onClick={onClose}
            aria-label="Close language info"
          >
            ✕
          </button>
        </div>

        <div
          className={`${styles.main} ${rendered ? styles.contentVisible : ""}`}
        >
          {rendered && (
            <div key={session}>
              <section className={styles.section} style={group(0)}>
                <div className={styles.sectionLabel}>what it is</div>
                <p className={styles.sectionText}>{rendered.description}</p>
              </section>

              <section className={styles.section} style={group(1)}>
                <div className={styles.sectionLabel}>history</div>
                <p className={styles.sectionText}>{rendered.history}</p>
              </section>

              <div className={styles.statsGrid} style={group(2)}>
                <div className={styles.statCard} style={item(0)}>
                  <div className={styles.statValue}>{rendered.githubStars}</div>
                  <div className={styles.statLabel}>GitHub Stars</div>
                </div>
                <div className={styles.statCard} style={item(1)}>
                  <div className={styles.statValue}>
                    {rendered.weeklyDownloads}
                  </div>
                  <div className={styles.statLabel}>Weekly Downloads</div>
                </div>
                <div className={styles.statCard} style={item(2)}>
                  <div className={styles.statValue}>
                    {rendered.popularityRank}
                  </div>
                  <div className={styles.statLabel}>Popularity</div>
                </div>
                <div className={styles.statCard} style={item(3)}>
                  <div className={styles.statValue}>{rendered.yearCreated}</div>
                  <div className={styles.statLabel}>Created</div>
                </div>
              </div>

              <div className={styles.infoGrid} style={group(3)}>
                <div className={styles.infoRow} style={item(0)}>
                  <span className={styles.infoLabel}>Created by</span>
                  <span className={styles.infoValue}>{rendered.createdBy}</span>
                </div>
                <div className={styles.infoRow} style={item(1)}>
                  <span className={styles.infoLabel}>Latest Version</span>
                  <span className={styles.infoValue}>
                    {rendered.latestVersion}
                  </span>
                </div>
                <div className={styles.infoRow} style={item(2)}>
                  <span className={styles.infoLabel}>License</span>
                  <span className={styles.infoValue}>{rendered.license}</span>
                </div>
                <div className={styles.infoRow} style={item(3)}>
                  <span className={styles.infoLabel}>Website</span>
                  <span className={styles.infoValue}>{rendered.website}</span>
                </div>
              </div>

              <section className={styles.section} style={group(4)}>
                <div className={styles.sectionLabel}>when to use it</div>
                <ul className={styles.list}>
                  {rendered.useCases.map((useCase, i) => (
                    <li key={i} className={styles.listItem} style={item(i)}>
                      {useCase}
                    </li>
                  ))}
                </ul>
              </section>

              <section className={styles.section} style={group(5)}>
                <div className={styles.sectionLabel}>key features</div>
                <div className={styles.tagList}>
                  {rendered.keyFeatures.map((feature, i) => (
                    <span key={i} className={styles.featureTag} style={item(i)}>
                      {feature}
                    </span>
                  ))}
                </div>
              </section>

              <section className={styles.section} style={group(6)}>
                <div className={styles.sectionLabel}>used by</div>
                <div className={styles.tagList}>
                  {rendered.usedBy.map((company, i) => (
                    <span key={i} className={styles.companyTag} style={item(i)}>
                      {company}
                    </span>
                  ))}
                </div>
              </section>

              <section className={styles.section} style={group(7)}>
                <div className={styles.sectionLabel}>ecosystem</div>
                <p className={styles.sectionText}>{rendered.ecosystem}</p>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
