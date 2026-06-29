"use client";

import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import {
  Columns,
  DiamondsFour,
  MagnifyingGlass,
  Keyboard,
} from "@phosphor-icons/react";

import Column from "../components/Column/Column";
import ExplanationColumn, {
  ExplanationData,
} from "../components/ExplanationColumn/ExplanationColumn";
import SearchOverlay from "../components/SearchOverlay/SearchOverlay";
import Minimap from "../components/Minimap/Minimap";
import KeyboardShortcutsModal from "../components/KeyboardShortcutsModal/KeyboardShortcutsModal";

import styles from "./syntax.module.css";
import { Data, ColumnData } from "./data";

interface Block {
  title: string;
  code: string;
  language?: string;
  unique?: boolean;
  explanation: ExplanationData;
}

interface Selected {
  columnIndex: number;
  blockIndex: number;
  explanation: ExplanationData;
}

export default function Syntax() {
  const [selected, setSelected] = useState<Selected | null>(null);
  const [compact, setCompact] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [uniqueOnly, setUniqueOnly] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [focusMode, setFocusMode] = useState(false);

  const columnGroupRefs = useRef<(HTMLDivElement | null)[]>([]);

  const COLUMNS: ColumnData[] = useMemo(() => {
    if (!uniqueOnly) return Data;
    return Data.reduce<ColumnData[]>((acc, col) => {
      const filtered = col.blocks.filter((b) => b.unique === true);
      if (filtered.length > 0) acc.push({ ...col, blocks: filtered });
      return acc;
    }, []);
  }, [uniqueOnly]);

  useEffect(() => {
    if (selected === null) return;
    const el = columnGroupRefs.current[selected.columnIndex];
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
    }
  }, [selected?.columnIndex, selected?.blockIndex]);

  const openSearch = useCallback(() => {
    setSearchQuery("");
    setSearchOpen(true);
  }, []);

  const closeSearch = useCallback(() => {
    setSearchOpen(false);
  }, []);

  const toggleUniqueOnly = useCallback(() => {
    setUniqueOnly((v) => !v);
    setSelected(null);
  }, []);

  const toggleFocusMode = useCallback(() => {
    setFocusMode((prev) => !prev);
    setSelected(null);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isTyping =
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement;

      if (isTyping) {
        if (e.key === "Escape" && searchOpen) {
          e.preventDefault();
          closeSearch();
        }
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        openSearch();
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "u") {
        e.preventDefault();
        toggleUniqueOnly();
        return;
      }

      if (
        (e.metaKey || e.ctrlKey) &&
        e.shiftKey &&
        e.key.toLowerCase() === "f"
      ) {
        e.preventDefault();
        toggleFocusMode();
        return;
      }

      if (e.key === "+" || e.key === "=") {
        e.preventDefault();
        setFontSize((s) => Math.min(s + 1, 24));
        return;
      }
      if (e.key === "-") {
        e.preventDefault();
        setFontSize((s) => Math.max(s - 1, 10));
        return;
      }

      if (e.key === "Escape") {
        if (shortcutsOpen) {
          setShortcutsOpen(false);
        } else if (searchOpen) {
          closeSearch();
        } else {
          setSelected(null);
        }
        return;
      }

      if (searchOpen || shortcutsOpen) return;

      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        if (COLUMNS.length === 0) return;
        e.preventDefault();

        setSelected((prev) => {
          let colIdx = prev ? prev.columnIndex : 0;
          let blockIdx = prev ? prev.blockIndex : 0;

          if (!prev) {
            return {
              columnIndex: 0,
              blockIndex: 0,
              explanation: COLUMNS[0].blocks[0]?.explanation,
            };
          }

          if (e.key === "ArrowUp") {
            blockIdx = Math.max(0, blockIdx - 1);
          } else if (e.key === "ArrowDown") {
            blockIdx = Math.min(
              COLUMNS[colIdx].blocks.length - 1,
              blockIdx + 1,
            );
          } else if (e.key === "ArrowLeft") {
            colIdx = Math.max(0, colIdx - 1);
            const maxBlocks = COLUMNS[colIdx].blocks.length;
            blockIdx = maxBlocks > 0 ? Math.min(maxBlocks - 1, blockIdx) : 0;
          } else if (e.key === "ArrowRight") {
            colIdx = Math.min(COLUMNS.length - 1, colIdx + 1);
            const maxBlocks = COLUMNS[colIdx].blocks.length;
            blockIdx = maxBlocks > 0 ? Math.min(maxBlocks - 1, blockIdx) : 0;
          }

          return {
            columnIndex: colIdx,
            blockIndex: blockIdx,
            explanation: COLUMNS[colIdx].blocks[blockIdx]?.explanation,
          };
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    searchOpen,
    shortcutsOpen,
    COLUMNS,
    openSearch,
    closeSearch,
    toggleUniqueOnly,
    toggleFocusMode,
  ]);

  function handleSearchSelect(colIndex: number, blockIndex: number) {
    closeSearch();
    if (compact) setCompact(false);
    setSelected({
      columnIndex: colIndex,
      blockIndex,
      explanation: COLUMNS[colIndex].blocks[blockIndex].explanation,
    });
  }

  function handleBlockClick(
    columnIndex: number,
    block: Block,
    blockIndex: number,
  ) {
    if (compact) {
      setCompact(false);
      setSelected({
        columnIndex,
        blockIndex: 0,
        explanation: block.explanation,
      });
      return;
    }
    if (
      selected?.columnIndex === columnIndex &&
      selected?.blockIndex === blockIndex
    ) {
      setSelected(null);
      return;
    }
    setSelected({ columnIndex, blockIndex, explanation: block.explanation });
  }

  function handleMinimapSelect(colIndex: number, blockIndex: number) {
    if (compact) setCompact(false);
    const block = COLUMNS[colIndex].blocks[blockIndex];
    if (
      selected?.columnIndex === colIndex &&
      selected?.blockIndex === blockIndex
    ) {
      setSelected(null);
      return;
    }
    setSelected({
      columnIndex: colIndex,
      blockIndex,
      explanation: block.explanation,
    });
  }

  return (
    <div className={styles.container}>
      {!focusMode && (
        <div className={styles.sidebar}>
          <div className={styles.name}>REACT</div>

          <div className={styles.fontControls}>
            <button
              className={styles.fontBtn}
              onClick={() => setFontSize((s) => Math.min(s + 1, 24))}
              title="Increase font size (+)"
            >
              +
            </button>
            <span className={styles.fontValue}>{fontSize}</span>
            <button
              className={styles.fontBtn}
              onClick={() => setFontSize((s) => Math.max(s - 1, 10))}
              title="Decrease font size (-)"
            >
              −
            </button>
          </div>

          <button
            onClick={openSearch}
            title="Search blocks (Ctrl+K)"
            className={`${styles.expandButton} ${searchOpen ? styles.expandButtonCompact : ""}`}
            aria-label="Search blocks"
          >
            <MagnifyingGlass size={18} weight="regular" aria-hidden="true" />
          </button>

          <button
            onClick={toggleUniqueOnly}
            title={
              uniqueOnly
                ? "Show all blocks"
                : "Show unique blocks only (Ctrl+U)"
            }
            aria-pressed={uniqueOnly}
            className={`${styles.expandButton} ${uniqueOnly ? styles.expandButtonCompact : ""}`}
          >
            <DiamondsFour size={18} weight={uniqueOnly ? "fill" : "regular"} />
          </button>

          <button
            onClick={() => setCompact((c) => !c)}
            title={compact ? "Expand columns" : "Overview"}
            className={`${styles.expandButton} ${compact ? styles.expandButtonCompact : ""}`}
          >
            <Columns size={18} weight={compact ? "fill" : "regular"} />
          </button>

          <button
            onClick={() => setShortcutsOpen(true)}
            title="Keyboard Shortcuts"
            className={styles.expandButton}
            aria-label="View Keyboard Shortcuts"
          >
            <Keyboard size={18} weight="regular" />
          </button>
        </div>
      )}

      <div className={styles.mainbar}>
        {COLUMNS.map((col, colIndex) => (
          <div
            key={col.number}
            className={styles.columnGroup}
            ref={(el) => {
              columnGroupRefs.current[colIndex] = el;
            }}
          >
            <Column
              data={col}
              fontSize={fontSize}
              activeBlockIndex={
                selected?.columnIndex === colIndex ? selected.blockIndex : null
              }
              onBlockClick={(block, blockIndex) =>
                handleBlockClick(colIndex, block as Block, blockIndex)
              }
              compact={compact}
              columnIndex={colIndex}
            />
            {!compact && (
              <ExplanationColumn
                data={
                  selected?.columnIndex === colIndex
                    ? selected.explanation
                    : null
                }
                onClose={() => setSelected(null)}
              />
            )}
          </div>
        ))}

        {uniqueOnly && COLUMNS.length === 0 && (
          <div className={styles.emptyFilter}>
            <DiamondsFour size={32} weight="thin" />
            <p>No unique blocks found.</p>
          </div>
        )}
      </div>

      {!focusMode && (
        <Minimap
          columns={COLUMNS}
          selectedColumnIndex={selected?.columnIndex ?? null}
          selectedBlockIndex={selected?.blockIndex ?? null}
          onSelect={handleMinimapSelect}
        />
      )}

      {searchOpen && (
        <SearchOverlay
          query={searchQuery}
          onQueryChange={setSearchQuery}
          columns={COLUMNS}
          onClose={closeSearch}
          onSelect={handleSearchSelect}
        />
      )}

      <KeyboardShortcutsModal
        isOpen={shortcutsOpen}
        onClose={() => setShortcutsOpen(false)}
      />
    </div>
  );
}
