"use client";

import { useEffect, useState } from "react";
import styles from "./ExplanationColumn.module.css";

export interface ExplanationData {
  blockTitle: string;
  what: string;
  how: string;
  example: string;
  tip?: string;
}

interface ExplanationColumnProps {
  data: ExplanationData | null;
  onClose: () => void;
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
