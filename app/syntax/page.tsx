"use client";

import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import {
  Columns,
  DiamondsFour,
  MagnifyingGlass,
  Keyboard,
  ArrowLeft,
  ArrowRight,
} from "@phosphor-icons/react";

import LanguageInfoColumn, {
  LanguageInfoData,
} from "../components/LanguageInfoColumn/LanguageInfoColumn";

import Column from "../components/Column/Column";
import ExplanationColumn, {
  ExplanationData,
} from "../components/ExplanationColumn/ExplanationColumn";
import SearchOverlay from "../components/SearchOverlay/SearchOverlay";
import Minimap from "../components/Minimap/Minimap";
import KeyboardShortcutsModal from "../components/KeyboardShortcutsModal/KeyboardShortcutsModal";
import ThemeSwitcher from "../components/ThemeSwitcher/ThemeSwitcher";

import styles from "./syntax.module.css";
import { Data, ColumnData } from "./data";
import { Arrow } from "../ui/HandDrawn";

const LANGUAGE_INFO: LanguageInfoData = {
  name: "React",
  tagline: "A JavaScript library for building user interfaces",
  description:
    "React is a free and open-source front-end JavaScript library for building user interfaces based on components. It lets you compose complex UIs from small, isolated pieces of code called components. React can be used to develop single-page, mobile, or server-rendered applications with frameworks like Next.js.",
  category: "UI Library",
  createdBy: "Jordan Walke (Meta)",
  yearCreated: 2013,
  latestVersion: "19.1.0",
  license: "MIT",
  website: "react.dev",
  githubStars: "233k",
  weeklyDownloads: "27M+",
  popularityRank: "#1",
  usedBy: [
    "Meta",
    "Netflix",
    "Airbnb",
    "Uber",
    "Discord",
    "Shopify",
    "Notion",
    "Figma",
    "Reddit",
    "X (Twitter)",
  ],
  keyFeatures: [
    "Virtual DOM",
    "JSX Syntax",
    "Component-Based",
    "Unidirectional Data Flow",
    "Hooks",
    "Server Components",
    "Concurrent Rendering",
    "Suspense",
  ],
  history:
    "React was created by Jordan Walke, a software engineer at Facebook (now Meta). It was first deployed on Facebook's News Feed in 2011 and later on Instagram in 2012. It was open-sourced at JSConf US in May 2013. React Native for mobile development followed in 2015. React 16 introduced Fiber (2017), React 16.8 brought Hooks (2019), and React 18 added concurrent features (2022). React 19, released in 2024, introduced Server Components and Actions as stable features.",
  useCases: [
    "Single-page applications (SPAs)",
    "Progressive web apps (PWAs)",
    "Server-side rendered websites",
    "Mobile apps via React Native",
    "Dashboards and admin panels",
    "E-commerce storefronts",
    "Interactive data visualizations",
  ],
  ecosystem:
    "React has an enormous ecosystem. Popular tools include Next.js for full-stack frameworks, React Router for navigation, Redux and Zustand for state management, React Query (TanStack Query) for data fetching, Framer Motion for animations, and Storybook for component development. The React team also maintains React Native for cross-platform mobile apps.",
};

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

interface SidebarTip {
  text: string;
  y: number;
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
  const [languageInfoOpen, setLanguageInfoOpen] = useState(false);
  const [sidebarTip, setSidebarTip] = useState<SidebarTip | null>(null);

  const columnGroupRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mainbarRef = useRef<HTMLDivElement>(null);

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

  const scrollLeft = useCallback(() => {
    if (mainbarRef.current) {
      mainbarRef.current.scrollTo({
        left: mainbarRef.current.scrollLeft - 500,
        behavior: "smooth",
      });
    }
  }, []);

  const scrollRight = useCallback(() => {
    if (mainbarRef.current) {
      mainbarRef.current.scrollTo({
        left: mainbarRef.current.scrollLeft + 500,
        behavior: "smooth",
      });
    }
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

  const showSidebarTip = (
    e: MouseEvent<HTMLButtonElement> | FocusEvent<HTMLButtonElement>,
    text: string,
  ) => {
    const r = e.currentTarget.getBoundingClientRect();
    setSidebarTip({
      text,
      y: r.top + r.height / 2,
    });
  };

  return (
    <div className={styles.container}>
      {!focusMode && (
        <div className={styles.sidebar}>
          <div
            className={`${styles.name} ${styles.nameClickable} ${languageInfoOpen ? styles.nameActive : ""}`}
            onClick={() => setLanguageInfoOpen((v) => !v)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) =>
              e.key === "Enter" && setLanguageInfoOpen((v) => !v)
            }
            title="View language details"
          >
            REACT
          </div>

          <div className={styles.fontControls}>
            <button
              className={styles.fontBtn}
              onClick={() => setFontSize((s) => Math.min(s + 1, 24))}
              onMouseEnter={(e) => showSidebarTip(e, "Increase (+)")}
              onMouseLeave={() => setSidebarTip(null)}
              onFocus={(e) => showSidebarTip(e, "Increase (+)")}
              onBlur={() => setSidebarTip(null)}
            >
              +
            </button>
            <span className={styles.fontValue}>{fontSize}</span>
            <button
              className={styles.fontBtn}
              onClick={() => setFontSize((s) => Math.max(s - 1, 10))}
              onMouseEnter={(e) => showSidebarTip(e, "Decrease (-)")}
              onMouseLeave={() => setSidebarTip(null)}
              onFocus={(e) => showSidebarTip(e, "Decrease (-)")}
              onBlur={() => setSidebarTip(null)}
            >
              −
            </button>
          </div>

          <button
            onClick={openSearch}
            className={`${styles.sidebarButton} ${searchOpen ? styles.sidebarButtonCompact : ""}`}
            aria-label="Search blocks"
            onMouseEnter={(e) => showSidebarTip(e, "Search (Ctrl+K)")}
            onMouseLeave={() => setSidebarTip(null)}
            onFocus={(e) => showSidebarTip(e, "Search (Ctrl+K)")}
            onBlur={() => setSidebarTip(null)}
          >
            <MagnifyingGlass size={22} weight="light" aria-hidden="true" />
          </button>

          <button
            onClick={toggleUniqueOnly}
            aria-pressed={uniqueOnly}
            className={`${styles.sidebarButton} ${uniqueOnly ? styles.sidebarButtonCompact : ""}`}
            onMouseEnter={(e) =>
              showSidebarTip(
                e,
                uniqueOnly ? "Show All" : "Unique Only (Ctrl+U)",
              )
            }
            onMouseLeave={() => setSidebarTip(null)}
            onFocus={(e) =>
              showSidebarTip(
                e,
                uniqueOnly ? "Show All" : "Unique Only (Ctrl+U)",
              )
            }
            onBlur={() => setSidebarTip(null)}
          >
            <DiamondsFour size={22} weight={uniqueOnly ? "fill" : "light"} />
          </button>

          <button
            onClick={() => setCompact((c) => !c)}
            className={`${styles.sidebarButton} ${compact ? styles.sidebarButtonCompact : ""}`}
            onMouseEnter={(e) =>
              showSidebarTip(e, compact ? "Expand" : "Overview")
            }
            onMouseLeave={() => setSidebarTip(null)}
            onFocus={(e) => showSidebarTip(e, compact ? "Expand" : "Overview")}
            onBlur={() => setSidebarTip(null)}
          >
            <Columns size={22} weight={compact ? "fill" : "light"} />
          </button>

          <button
            onClick={() => setShortcutsOpen(true)}
            className={styles.sidebarButton}
            aria-label="View Keyboard Shortcuts"
            onMouseEnter={(e) => showSidebarTip(e, "Shortcuts")}
            onMouseLeave={() => setSidebarTip(null)}
            onFocus={(e) => showSidebarTip(e, "Shortcuts")}
            onBlur={() => setSidebarTip(null)}
          >
            <Keyboard size={18} weight="light" />
          </button>

          <ThemeSwitcher
            buttonClassName={styles.sidebarButton}
            activeButtonClassName={styles.sidebarButtonCompact}
            onMouseEnter={(e) => showSidebarTip(e, "Theme")}
            onMouseLeave={() => setSidebarTip(null)}
            onFocus={(e) => showSidebarTip(e, "Theme")}
            onBlur={() => setSidebarTip(null)}
          />
        </div>
      )}

      {sidebarTip && (
        <div
          className={styles.sidebarTip}
          style={{ top: sidebarTip.y }}
          role="presentation"
        >
          {sidebarTip.text}
        </div>
      )}

      <LanguageInfoColumn
        data={languageInfoOpen ? LANGUAGE_INFO : null}
        onClose={() => setLanguageInfoOpen(false)}
      />

      <div className={styles.mainbar} ref={mainbarRef}>
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

      <button
        className={`${styles.scrollButton} ${styles.scrollButtonLeft}`}
        onClick={scrollLeft}
        title="Scroll left"
        aria-label="Scroll left"
      >
        <Arrow draw={false} className={styles.scrollArrow} />
      </button>

      <button
        className={`${styles.scrollButton} ${styles.scrollButtonRight}`}
        onClick={scrollRight}
        title="Scroll right"
        aria-label="Scroll right"
      >
        <Arrow
          draw={false}
          className={`${styles.scrollArrow} ${styles.scrollArrowFlip}`}
        />
      </button>
    </div>
  );
}
