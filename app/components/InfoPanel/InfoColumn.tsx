"use client";

import { useEffect, useState } from "react";
import styles from "./InfoColumn.module.css";

interface InfoColumnProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InfoColumn({ isOpen, onClose }: InfoColumnProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [isOpen]);

  return (
    <div
      className={`${styles.wrapper} ${visible ? styles.open : ""}`}
      aria-hidden={!visible}
    >
      <div className={styles.column}>
        <div className={styles.meta}>
          <div className={styles.title}>React</div>
          <button
            className={styles.close}
            onClick={onClose}
            aria-label="Close info"
          >
            ✕
          </button>
        </div>

        <div className={styles.main}>
          <section className={styles.section}>
            <div className={styles.sectionLabel}>what it is</div>
            <p className={styles.sectionText}>
              React is a JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called "components." React has been designed from the start for gradual adoption, and you can use as little or as much React as you need.
            </p>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionLabel}>where it's used</div>
            <p className={styles.sectionText}>
              React is used by millions of developers worldwide to build web applications, mobile apps (with React Native), desktop applications, and even VR experiences. It's used by companies like Facebook, Instagram, Netflix, Airbnb, and countless others.
            </p>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionLabel}>how it's used</div>
            <p className={styles.sectionText}>
              React uses a declarative paradigm that makes it easy to reason about your application. You describe how the UI should look, and React handles the updates. Key features include:
            </p>
            <ul className={styles.list}>
              <li><strong>Components:</strong> Reusable, self-contained pieces of UI</li>
              <li><strong>JSX:</strong> A syntax extension that lets you write HTML-like code in JavaScript</li>
              <li><strong>Virtual DOM:</strong> Efficient updates by minimizing direct DOM manipulation</li>
              <li><strong>Hooks:</strong> Functions that let you use state and other React features</li>
              <li><strong>One-way Data Flow:</strong> Predictable data flow from parent to child components</li>
            </ul>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionLabel}>history</div>
            <p className={styles.sectionText}>
              React was created by Jordan Walke, a software engineer at Facebook, and was first deployed on Facebook's News Feed in 2011. It was open-sourced at JSConf US in May 2013. Since then, it has grown into one of the most popular front-end libraries, with a vibrant ecosystem and community.
            </p>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionLabel}>key concepts</div>
            <ul className={styles.list}>
              <li><strong>State:</strong> Data that changes over time and affects rendering</li>
              <li><strong>Props:</strong> Read-only data passed from parent to child components</li>
              <li><strong>Effects:</strong> Side effects like data fetching and subscriptions</li>
              <li><strong>Context:</strong> Way to pass data through the component tree without props</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
