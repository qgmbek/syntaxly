"use client";

import { useEffect, useState } from "react";
import styles from "./LanguageInfoColumn.module.css";

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

export default function LanguageInfoColumn({
  data,
  onClose,
}: LanguageInfoColumnProps) {
  const [visible, setVisible] = useState(false);
  const [rendered, setRendered] = useState<LanguageInfoData | null>(null);

  useEffect(() => {
    if (data) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true);
      const t = setTimeout(() => setRendered(data), 80);
      return () => clearTimeout(t);
    } else {
      setVisible(false);
    }
  }, [data]);

  return (
    <div
      className={`${styles.wrapper} ${visible ? styles.open : ""}`}
      aria-hidden={!visible}
    >
      <div className={styles.column}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.categoryBadge}>
              {rendered?.category ?? ""}
            </div>
            <div className={styles.headerName}>{rendered?.name ?? ""}</div>
            <div className={styles.tagline}>{rendered?.tagline ?? ""}</div>
          </div>
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
            <>
              <section className={styles.section}>
                <div className={styles.sectionLabel}>what it is</div>
                <p className={styles.sectionText}>{rendered.description}</p>
              </section>

              <section className={styles.section}>
                <div className={styles.sectionLabel}>history</div>
                <p className={styles.sectionText}>{rendered.history}</p>
              </section>

              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <div className={styles.statValue}>
                    {rendered.githubStars}
                  </div>
                  <div className={styles.statLabel}>GitHub Stars</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statValue}>
                    {rendered.weeklyDownloads}
                  </div>
                  <div className={styles.statLabel}>Weekly Downloads</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statValue}>
                    {rendered.popularityRank}
                  </div>
                  <div className={styles.statLabel}>Popularity</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statValue}>
                    {rendered.yearCreated}
                  </div>
                  <div className={styles.statLabel}>Created</div>
                </div>
              </div>

              <div className={styles.infoGrid}>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Created by</span>
                  <span className={styles.infoValue}>{rendered.createdBy}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Latest Version</span>
                  <span className={styles.infoValue}>
                    {rendered.latestVersion}
                  </span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>License</span>
                  <span className={styles.infoValue}>{rendered.license}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Website</span>
                  <span className={styles.infoValue}>{rendered.website}</span>
                </div>
              </div>

              <section className={styles.section}>
                <div className={styles.sectionLabel}>when to use it</div>
                <ul className={styles.list}>
                  {rendered.useCases.map((useCase, i) => (
                    <li key={i} className={styles.listItem}>
                      {useCase}
                    </li>
                  ))}
                </ul>
              </section>

              <section className={styles.section}>
                <div className={styles.sectionLabel}>key features</div>
                <div className={styles.tagList}>
                  {rendered.keyFeatures.map((feature, i) => (
                    <span key={i} className={styles.featureTag}>
                      {feature}
                    </span>
                  ))}
                </div>
              </section>

              <section className={styles.section}>
                <div className={styles.sectionLabel}>used by</div>
                <div className={styles.tagList}>
                  {rendered.usedBy.map((company, i) => (
                    <span key={i} className={styles.companyTag}>
                      {company}
                    </span>
                  ))}
                </div>
              </section>

              <section className={styles.section}>
                <div className={styles.sectionLabel}>ecosystem</div>
                <p className={styles.sectionText}>{rendered.ecosystem}</p>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
