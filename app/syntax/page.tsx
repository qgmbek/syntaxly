"use client";

import { useState, Fragment, useMemo } from "react";
import { Columns, DiamondsFour, MagnifyingGlass } from "@phosphor-icons/react";

import Column from "../components/Column/Column";
import ExplanationColumn, {
  ExplanationData,
} from "../components/ExplanationColumn/ExplanationColumn";
import SearchOverlay from "../components/SearchOverlay/SearchOverlay";
import Minimap from "../components/Minimap/Minimap";

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

  const [tsOnly, setTsOnly] = useState(false);

  const COLUMNS: ColumnData[] = useMemo(() => {
    if (!tsOnly) return Data;
    return Data.reduce<ColumnData[]>((acc, col) => {
      const filtered = col.blocks.filter((b) => b.unique === true);
      if (filtered.length > 0) acc.push({ ...col, blocks: filtered });
      return acc;
    }, []);
  }, [tsOnly]);

  function openSearch() {
    setSearchQuery("");
    setSearchOpen(true);
  }

  function closeSearch() {
    setSearchOpen(false);
  }

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

  function toggleTsOnly() {
    setTsOnly((v) => !v);
    setSelected(null);
  }

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.name}>REACT</div>

        <div className={styles.fontControls}>
          <button
            className={styles.fontBtn}
            onClick={() => setFontSize((s) => Math.min(s + 1, 24))}
            title="Increase font size"
          >
            +
          </button>
          <span className={styles.fontValue}>{fontSize}</span>
          <button
            className={styles.fontBtn}
            onClick={() => setFontSize((s) => Math.max(s - 1, 10))}
            title="Decrease font size"
          >
            −
          </button>
        </div>

        <button
          onClick={openSearch}
          title="Search blocks"
          className={`${styles.expandButton} ${
            searchOpen ? styles.expandButtonCompact : ""
          }`}
          aria-label="Search blocks"
        >
          <MagnifyingGlass size={18} weight="regular" aria-hidden="true" />
        </button>

        <button
          onClick={toggleTsOnly}
          title={tsOnly ? "Show all blocks" : "Show TypeScript-only syntax"}
          aria-pressed={tsOnly}
          className={`${styles.expandButton} ${tsOnly ? styles.expandButtonCompact : ""}`}
        >
          <DiamondsFour size={18} weight={tsOnly ? "fill" : "regular"} />
        </button>

        <button
          onClick={() => setCompact((c) => !c)}
          title={compact ? "Expand columns" : "Overview"}
          className={`${styles.expandButton} ${
            compact ? styles.expandButtonCompact : ""
          }`}
        >
          <Columns size={18} weight={compact ? "fill" : "regular"} />
        </button>
      </div>

      <div className={styles.mainbar}>
        {COLUMNS.map((col, colIndex) => (
          <Fragment key={col.number}>
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
          </Fragment>
        ))}

        {tsOnly && COLUMNS.length === 0 && (
          <div className={styles.emptyFilter}>
            <DiamondsFour size={32} weight="thin" />
            <p>No TypeScript-unique blocks found.</p>
          </div>
        )}
      </div>

      <Minimap
        columns={COLUMNS}
        selectedColumnIndex={selected?.columnIndex ?? null}
        selectedBlockIndex={selected?.blockIndex ?? null}
        onSelect={handleMinimapSelect}
      />

      {searchOpen && (
        <SearchOverlay
          query={searchQuery}
          onQueryChange={setSearchQuery}
          columns={COLUMNS}
          onClose={closeSearch}
          onSelect={handleSearchSelect}
        />
      )}
    </div>
  );
}
