"use client";

import { Fragment, useEffect, useRef } from "react";
import { Keyboard, X } from "@phosphor-icons/react";

import styles from "./KeyboardShortcutsModal.module.css";

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SHORTCUTS = [
  { keys: ["Ctrl", "K"], desc: "Open Search / Command Palette" },
  { keys: ["Ctrl", "U"], desc: "Toggle TypeScript / Unique Syntax view" },
  { keys: ["Ctrl", "Shift", "F"], desc: "Toggle Focus / Reading Mode" },
  { keys: ["+"], desc: "Increase application font size" },
  { keys: ["-"], desc: "Decrease application font size" },
  { keys: ["↑", "↓"], desc: "Navigate blocks up and down" },
  { keys: ["←", "→"], desc: "Navigate columns left and right" },
  { keys: ["Esc"], desc: "Close overlays, menus, or clear selections" },
];

export default function KeyboardShortcutsModal({
  isOpen,
  onClose,
}: KeyboardShortcutsModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) closeRef.current?.focus();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="shortcuts-title"
      >
        <div className={styles.meta}>
          <div className={styles.titleRow}>
            <Keyboard size={26} weight="regular" aria-hidden="true" />
            <h3 id="shortcuts-title" className={styles.title}>
              Keyboard Shortcuts
            </h3>
          </div>

          <button
            ref={closeRef}
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close shortcuts"
            title="Close (Esc)"
          >
            <X size={18} weight="bold" />
          </button>

          <span className={styles.count}>Shortcuts: {SHORTCUTS.length}</span>
        </div>

        <ul className={styles.list}>
          {SHORTCUTS.map((item) => (
            <li key={item.desc} className={styles.row}>
              <span className={styles.desc}>{item.desc}</span>
              <span className={styles.keys}>
                {item.keys.map((key, i) => (
                  <Fragment key={key}>
                    <kbd className={styles.kbd}>{key}</kbd>
                    {i < item.keys.length - 1 && (
                      <span className={styles.plus} aria-hidden="true">
                        +
                      </span>
                    )}
                  </Fragment>
                ))}
              </span>
            </li>
          ))}
        </ul>

        <div className={styles.footer}>
          <button className={styles.dismiss} onClick={onClose}>
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}