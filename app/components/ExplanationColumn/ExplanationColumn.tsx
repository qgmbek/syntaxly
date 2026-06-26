"use client";

import { useEffect, useState } from "react";
import styles from "./ExplanationColumn.module.css";

export interface ExplanationData {
  blockTitle: string;
  what: string;
  how: string;
  example: string;
  tip?: string;
  version?: string;
  difficulty?: "beginner" | "intermediate" | "advanced";
  memoryUsage?: number;
}

interface ExplanationColumnProps {
  data: ExplanationData | null;
  onClose: () => void;
}

const MEMORY_MAX = 128;
function memoryBarWidth(bytes: number): string {
  return `${Math.min((bytes / MEMORY_MAX) * 100, 100)}%`;
}
function memoryLabel(bytes: number): string {
  if (bytes <= 8) return "Low";
  if (bytes <= 32) return "Medium";
  if (bytes <= 64) return "High";
  return "Very High";
}
function memoryBarColor(bytes: number): string {
  const t = Math.min(bytes, MEMORY_MAX);
  if (t <= 8) return "hsl(120, 80%, 50%)";
  if (t <= 32) {
    const ratio = (t - 8) / (32 - 8);
    const hue = 120 + ratio * (30 - 120);
    return `hsl(${hue}, 80%, 50%)`;
  }
  if (t <= 64) {
    const ratio = (t - 32) / (64 - 32);
    const hue = 30 + ratio * (0 - 30);
    return `hsl(${hue}, 80%, 50%)`;
  }
  return "hsl(0, 80%, 50%)";
}
function difficultyColor(level: string): string {
  switch (level) {
    case "beginner": return "#00e676";
    case "intermediate": return "#ffb74d";
    case "advanced": return "#ef5350";
    default: return "#aaa";
  }
}

export default function ExplanationColumn({
  data,
  onClose,
}: ExplanationColumnProps) {
  const [visible, setVisible] = useState(false);
  const [rendered, setRendered] = useState<ExplanationData | null>(null);

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
        <div className={styles.meta}>
          <div className={styles.label}>explanation</div>
          <div className={styles.title}>{rendered?.blockTitle ?? ""}</div>
          <button
            className={styles.close}
            onClick={onClose}
            aria-label="Close explanation"
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
                <p className={styles.sectionText}>{rendered.what}</p>
              </section>

              <section className={styles.section}>
                <div className={styles.sectionLabel}>how it works</div>
                <p className={styles.sectionText}>{rendered.how}</p>
              </section>

              <section className={styles.section}>
                <div className={styles.sectionLabel}>example</div>
                <pre className={styles.codeBlock}>{rendered.example}</pre>
              </section>

              {rendered.tip && (
                <section className={`${styles.section} ${styles.tipSection}`}>
                  <div className={styles.sectionLabel}>tip</div>
                  <p className={styles.sectionText}>{rendered.tip}</p>
                </section>
              )}

              {(rendered.version || rendered.difficulty || rendered.memoryUsage != null) && (
                <div className={styles.metaGroup}>
                  <hr className={styles.divider} />

                  {rendered.version && (
                    <div className={styles.metaRow}>
                      <span className={styles.metaLabel}>Version</span>
                      <span className={styles.metaValue}>{rendered.version}</span>
                    </div>
                  )}

                  {rendered.difficulty && (
                    <div className={styles.metaRow}>
                      <span className={styles.metaLabel}>Difficulty</span>
                      <span
                        className={styles.difficultyBadge}
                        style={{ background: difficultyColor(rendered.difficulty) }}
                      >
                        {rendered.difficulty}
                      </span>
                    </div>
                  )}

                  {rendered.memoryUsage != null && (
                    <div className={styles.memorySection}>
                      <div className={styles.metaRow}>
                        <span className={styles.metaLabel}>Memory Footprint</span>
                        <span className={styles.metaValue}>
                          {rendered.memoryUsage} B
                        </span>
                      </div>
                      <div className={styles.memoryBarTrack}>
                        <div
                          className={styles.memoryBarFill}
                          style={{
                            width: memoryBarWidth(rendered.memoryUsage),
                            background: memoryBarColor(rendered.memoryUsage),
                          }}
                        />
                      </div>
                      <div className={styles.memoryQualifier}>
                        {memoryLabel(rendered.memoryUsage)}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}