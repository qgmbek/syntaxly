"use client";

import {
  MagnifyingGlass,
  ArrowRight,
  X,
  ArrowsVertical,
  ArrowBendDownLeft,
} from "@phosphor-icons/react";

import styles from "./Searchoverlay.module.css";
import { useCallback, useEffect, useRef, useState } from "react";

interface Block {
  title: string;
  code: string;
  language?: string;
  explanation: unknown;
}

interface ColumnData {
  number: number;
  title: string;
  blocks: Block[];
}

interface SearchResult {
  col: ColumnData;
  colIndex: number;
  block: Block;
  blockIndex: number;
}

interface SearchOverlayProps {
  query: string;
  onQueryChange: (q: string) => void;
  columns: ColumnData[];
  onClose: () => void;
  onSelect: (colIndex: number, blockIndex: number) => void;
}

function highlight(text: string, query: string): string {
  if (!query.trim()) return text;

  const idx = text.toLowerCase().indexOf(query.toLowerCase());

  if (idx === -1) return text;

  return (
    text.slice(0, idx) +
    `<mark class="${styles.mark}">${text.slice(idx, idx + query.length)}</mark>` +
    text.slice(idx + query.length)
  );
}

export default function SearchOverlay({
  query,
  onQueryChange,
  columns,
  onClose,
  onSelect,
}: SearchOverlayProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [scanKey, setScanKey] = useState(0);

  const matches: SearchResult[] = query.trim()
    ? columns.flatMap((col, ci) =>
        col.blocks
          .map((block, bi) => ({
            col,
            colIndex: ci,
            block,
            blockIndex: bi,
          }))
          .filter(
            ({ block }) =>
              block.title.toLowerCase().includes(query.toLowerCase()) ||
              block.code.toLowerCase().includes(query.toLowerCase()),
          ),
      )
    : [];

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setActiveIndex(0);
    setScanKey((k) => k + 1);
  }, [query]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, matches.length - 1));
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      }

      if (e.key === "Enter" && matches[activeIndex]) {
        const m = matches[activeIndex];
        onSelect(m.colIndex, m.blockIndex);
      }
    },
    [matches, activeIndex, onClose, onSelect],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const colLabel = (col: ColumnData) =>
    `COL·${String(col.number).padStart(2, "0")} ${col.title.toUpperCase()}`;

  const totalBlocks = columns.reduce((a, c) => a + c.blocks.length, 0);

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={styles.panel}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Search blocks"
      >
        <div className={styles.inputRow}>
          <MagnifyingGlass
            size={15}
            weight="regular"
            className={styles.searchIcon}
            aria-hidden="true"
          />

          <input
            ref={inputRef}
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="SCAN BLOCKS..."
            className={styles.input}
            spellCheck={false}
            autoComplete="off"
          />

          {query && (
            <button
              className={styles.clearBtn}
              onClick={() => onQueryChange("")}
              aria-label="Clear search"
              type="button"
            >
              <X size={16} weight="bold" />
            </button>
          )}

          <kbd className={styles.esc}>ESC</kbd>

          {query && <div className={styles.scanLine} key={`scan-${scanKey}`} />}
        </div>

        <div className={styles.results} role="listbox">
          {!query.trim() && (
            <div className={styles.idle}>
              <div className={styles.idleIcon}>
                <MagnifyingGlass size={24} weight="thin" />
              </div>

              <p className={styles.idleText}>Type to scan across all columns</p>

              <p className={styles.idleHint}>
                {columns.length} COLUMNS · {totalBlocks} BLOCKS INDEXED
              </p>
            </div>
          )}

          {query.trim() && matches.length === 0 && (
            <div className={styles.empty}>
              <span className={styles.emptyCode}>NO BLOCKS MATCH</span>
              <span className={styles.emptyQuery}>{query}</span>
            </div>
          )}

          {matches.map((m, i) => (
            <div
              key={`${m.colIndex}-${m.blockIndex}`}
              className={`${styles.resultItem} ${
                i === activeIndex ? styles.resultItemActive : ""
              }`}
              onClick={() => onSelect(m.colIndex, m.blockIndex)}
              onMouseEnter={() => setActiveIndex(i)}
              role="option"
              aria-selected={i === activeIndex}
            >
              <span className={styles.colLabel}>{colLabel(m.col)}</span>

              <div className={styles.resultBody}>
                <span
                  className={styles.blockTitle}
                  dangerouslySetInnerHTML={{
                    __html: highlight(m.block.title, query),
                  }}
                />

                <span
                  className={styles.snippet}
                  dangerouslySetInnerHTML={{
                    __html: highlight(
                      m.block.code.replace(/\n/g, " · ").slice(0, 60),
                      query,
                    ),
                  }}
                />
              </div>

              <ArrowRight
                size={13}
                weight="bold"
                className={styles.arrow}
                aria-hidden="true"
              />
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <span>
            {query.trim()
              ? `${matches.length} MATCH${
                  matches.length !== 1 ? "ES" : ""
                } FOUND`
              : `${columns.length} COLUMNS · ${totalBlocks} BLOCKS INDEXED`}
          </span>

          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <ArrowsVertical size={14} />
            NAVIGATE ·
            <ArrowBendDownLeft size={14} /> OPEN · ESC CLOSE
          </span>
        </div>
      </div>
    </div>
  );
}
