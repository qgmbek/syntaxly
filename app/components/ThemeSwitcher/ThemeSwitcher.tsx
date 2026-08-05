"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Palette } from "@phosphor-icons/react";
import { useTheme } from "../../hooks/useTheme";
import { THEMES, THEME_PREVIEW_COLORS, type ThemeId } from "../../lib/theme";
import styles from "./ThemeSwitcher.module.css";

interface ThemeSwitcherProps {
  buttonClassName: string;
  activeButtonClassName: string;
}

export default function ThemeSwitcher({
  buttonClassName,
  activeButtonClassName,
}: ThemeSwitcherProps) {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const selectTheme = (nextTheme: ThemeId) => {
    setTheme(nextTheme);
    setOpen(false);
  };

  const panel = open ? (
    <>
      <button
        type="button"
        className={styles.backdrop}
        aria-label="Close theme panel"
        onClick={() => setOpen(false)}
      />
      <div
        className={styles.panel}
        role="listbox"
        aria-label="Theme options"
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.panelTitle}>Theme</div>
        <div className={styles.options}>
          {THEMES.map((option) => {
            const isActive = theme === option.id;
            return (
              <button
                key={option.id}
                type="button"
                role="option"
                aria-selected={isActive}
                className={`${styles.option} ${isActive ? styles.optionActive : ""}`}
                onClick={() => selectTheme(option.id)}
              >
                <span className={styles.optionLabel}>{option.label}</span>
                <span className={styles.optionDescription}>
                  {option.description}
                </span>
                <span className={styles.swatchRow} aria-hidden="true">
                  <span
                    className={styles.swatch}
                    style={{
                      background: THEME_PREVIEW_COLORS[option.id].primary,
                    }}
                  />
                  <span
                    className={styles.swatch}
                    style={{
                      background: THEME_PREVIEW_COLORS[option.id].secondary,
                    }}
                  />
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  ) : null;

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        title="Theme"
        aria-label="Theme"
        aria-expanded={open}
        aria-haspopup="listbox"
        className={`${buttonClassName} ${open ? activeButtonClassName : ""}`}
      >
        <Palette size={18} weight={open ? "fill" : "regular"} aria-hidden="true" />
      </button>

      {mounted && panel ? createPortal(panel, document.body) : null}
    </div>
  );
}
