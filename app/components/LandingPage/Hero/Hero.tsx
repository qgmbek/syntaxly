"use client";

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import styles from "./Hero.module.css";

const CELL_SIZE = 80;

interface Cell {
  top: number;
  left: number;
  width: number;
  height: number;
  row: number;
  col: number;
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [highlightOpacities, setHighlightOpacities] = useState<number[]>([]);
  const lastHoverCellRef = useRef<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateDimensions = () => {
      const { width, height } = container.getBoundingClientRect();
      setDimensions({ width, height });
    };

    updateDimensions();

    const observer = new ResizeObserver(updateDimensions);
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  const cells = useMemo(() => {
    if (!dimensions.width || !dimensions.height) return [];

    const cols = Math.ceil(dimensions.width / CELL_SIZE) + 1;
    const rows = Math.ceil(dimensions.height / CELL_SIZE) + 1;
    const result: Cell[] = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        result.push({
          top: row * CELL_SIZE,
          left: col * CELL_SIZE,
          width: CELL_SIZE,
          height: CELL_SIZE,
          row,
          col,
        });
      }
    }

    return result;
  }, [dimensions.width, dimensions.height]);

  const sampleDistinct = <T,>(arr: T[], count: number): T[] => {
    const shuffled = [...arr];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled.slice(0, Math.min(count, shuffled.length));
  };

  const generateRandomHighlights = useCallback(
    (
      hoverRow: number,
      hoverCol: number,
      totalRows: number,
      totalCols: number,
    ) => {
      const opacities = new Array(totalRows * totalCols).fill(0);
      opacities[hoverRow * totalCols + hoverCol] = 0.95;

      const neighbors: { row: number; col: number; index: number }[] = [];

      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;

          const row = hoverRow + dr;
          const col = hoverCol + dc;

          if (row >= 0 && row < totalRows && col >= 0 && col < totalCols) {
            neighbors.push({
              row,
              col,
              index: row * totalCols + col,
            });
          }
        }
      }

      if (!neighbors.length) return opacities;

      const nextLine = neighbors.filter((n) => n.row === hoverRow + 1);
      const others = neighbors.filter((n) => n.row !== hoverRow + 1);

      const count =
        Math.floor(Math.random() * Math.min(5, neighbors.length)) + 1;

      const nextLineCount = Math.floor(
        Math.random() * (Math.min(2, nextLine.length, count) + 1),
      );

      const selected = [
        ...sampleDistinct(nextLine, nextLineCount),
        ...sampleDistinct(others, count - nextLineCount),
      ];

      for (const neighbor of selected) {
        opacities[neighbor.index] = 0.2 + Math.random() * 0.5;
      }

      return opacities;
    },
    [],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !cells.length) return;

    const cols = Math.ceil(dimensions.width / CELL_SIZE) + 1;
    const rows = Math.ceil(dimensions.height / CELL_SIZE) + 1;

    const clearHighlights = () => {
      lastHoverCellRef.current = null;
      setHighlightOpacities(new Array(rows * cols).fill(0));
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const col = Math.floor((event.clientX - rect.left) / CELL_SIZE);
      const row = Math.floor((event.clientY - rect.top) / CELL_SIZE);

      if (row < 0 || row >= rows || col < 0 || col >= cols) return;

      const index = row * cols + col;
      if (index === lastHoverCellRef.current) return;

      lastHoverCellRef.current = index;

      setHighlightOpacities(generateRandomHighlights(row, col, rows, cols));
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", clearHighlights);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", clearHighlights);
    };
  }, [
    cells.length,
    dimensions.width,
    dimensions.height,
    generateRandomHighlights,
  ]);

  useEffect(() => {
    const cols = Math.ceil(dimensions.width / CELL_SIZE) + 1;
    const rows = Math.ceil(dimensions.height / CELL_SIZE) + 1;

    if (dimensions.width && dimensions.height) {
      setHighlightOpacities(new Array(rows * cols).fill(0));
      lastHoverCellRef.current = null;
    }
  }, [dimensions.width, dimensions.height]);

  return (
    <section
      ref={containerRef}
      className={`${styles.container} ${mounted ? styles.mounted : ""}`}
    >
      <div className={styles.bgOrb} aria-hidden="true" />

      <div className={styles.overlayContainer} aria-hidden="true">
        {cells.map((cell, index) => {
          const opacity = highlightOpacities[index] || 0;

          const cellStyle: React.CSSProperties = {
            top: cell.top,
            left: cell.left,
            width: cell.width,
            height: cell.height,
            backgroundColor: `rgba(0, 255, 208, ${opacity})`,
          };

          if (opacity > 0) {
            cellStyle.boxShadow = `0 0 ${20 * opacity}px ${
              6 * opacity
            }px rgba(0, 255, 208, ${opacity * 0.7})`;
          }

          return (
            <div
              key={`${cell.row}-${cell.col}`}
              className={styles.overlayCell}
              style={cellStyle}
            />
          );
        })}
      </div>

      <div className={styles.content}>
        <h1 className={styles.title}>
          <span className={`${styles.titleLine} ${styles.titleLineFirst}`}>
            <span className={styles.titleInner}>
              Syntax <span className={styles.highlighted}>cheatsheet</span> for
            </span>
          </span>

          <span className={`${styles.titleLine} ${styles.titleLineSecond}`}>
            <span className={styles.titleInner}>programming.</span>
          </span>
        </h1>

        <p className={styles.subtitle}>
          Browse every syntax at a glance, organized into blocks by topic. Click
          any one to see a quick refresher: definition, usage, example, and
          tips.
        </p>

        <div className={styles.buttonContainer}>
          <a href="/syntax" className={`${styles.button} ${styles.getButton}`}>
            Get Started
            <span className={styles.buttonArrow} aria-hidden="true">
              ↗
            </span>
          </a>

          <a
            href="/syntax"
            className={`${styles.button} ${styles.learnButton}`}
          >
            Learn Syntaxly
          </a>
        </div>
      </div>
    </section>
  );
}
