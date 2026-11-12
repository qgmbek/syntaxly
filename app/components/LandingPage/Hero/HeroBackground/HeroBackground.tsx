"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type RefObject,
} from "react";

import styles from "./HeroBackground.module.css";
import { Eye, MeltingClock } from "@/app/ui/HandDrawn";

const CELL_SIZE = 80;
const MAGNET_REACH = 90;

interface Cell {
  top: number;
  left: number;
  width: number;
  height: number;
  row: number;
  col: number;
}

interface HeroBackgroundProps {
  containerRef: RefObject<HTMLElement | null>;
  buttonRef: RefObject<HTMLAnchorElement | null>;
  mounted: boolean;
}

const sampleDistinct = <T,>(arr: T[], count: number): T[] => {
  const shuffled = [...arr];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, Math.min(count, shuffled.length));
};

export default function HeroBackground({
  containerRef,
  buttonRef,
  mounted,
}: HeroBackgroundProps) {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
    cell: CELL_SIZE,
  });

  const [highlightOpacities, setHighlightOpacities] = useState<number[]>([]);
  const lastHoverCellRef = useRef<number | null>(null);

  // Measure the Hero container.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateDimensions = () => {
      const { width, height } = container.getBoundingClientRect();

      const cell =
        Number.parseFloat(
          getComputedStyle(container).getPropertyValue("--grid"),
        ) || CELL_SIZE;

      setDimensions({ width, height, cell });
    };

    updateDimensions();

    const observer = new ResizeObserver(updateDimensions);
    observer.observe(container);

    return () => observer.disconnect();
  }, [containerRef]);

  const cells = useMemo(() => {
    if (!dimensions.width || !dimensions.height) return [];

    const size = dimensions.cell;
    const cols = Math.ceil(dimensions.width / size) + 1;
    const rows = Math.ceil(dimensions.height / size) + 1;

    const result: Cell[] = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        result.push({
          top: row * size,
          left: col * size,
          width: size,
          height: size,
          row,
          col,
        });
      }
    }

    return result;
  }, [dimensions.width, dimensions.height, dimensions.cell]);

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

    const size = dimensions.cell;
    const cols = Math.ceil(dimensions.width / size) + 1;
    const rows = Math.ceil(dimensions.height / size) + 1;

    const clearHighlights = () => {
      lastHoverCellRef.current = null;
      setHighlightOpacities(new Array(rows * cols).fill(0));

      if (buttonRef.current) {
        buttonRef.current.style.translate = "";
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const button = buttonRef.current;

      if (button) {
        const b = button.getBoundingClientRect();

        const ex = Math.max(b.left - event.clientX, 0, event.clientX - b.right);

        const ey = Math.max(b.top - event.clientY, 0, event.clientY - b.bottom);

        if (Math.hypot(ex, ey) < MAGNET_REACH) {
          const dx = event.clientX - (b.left + b.width / 2);
          const dy = event.clientY - (b.top + b.height / 2);

          const x = Math.max(-12, Math.min(12, dx * 0.22));
          const y = Math.max(-8, Math.min(8, dy * 0.3));

          button.style.translate = `${x}px ${y}px`;
        } else {
          button.style.translate = "";
        }
      }

      const col = Math.floor((event.clientX - rect.left) / size);
      const row = Math.floor((event.clientY - rect.top) / size);

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
    dimensions.cell,
    generateRandomHighlights,
    containerRef,
    buttonRef,
  ]);

  useEffect(() => {
    const size = dimensions.cell;
    const cols = Math.ceil(dimensions.width / size) + 1;
    const rows = Math.ceil(dimensions.height / size) + 1;

    if (dimensions.width && dimensions.height) {
      setHighlightOpacities(new Array(rows * cols).fill(0));
      lastHoverCellRef.current = null;
    }
  }, [dimensions.width, dimensions.height, dimensions.cell]);

  const gridCols = Math.ceil(dimensions.width / dimensions.cell) + 1;
  const gridRows = Math.ceil(dimensions.height / dimensions.cell) + 1;

  return (
    <div
      className={`${styles.background} ${mounted ? styles.mounted : ""}`}
      aria-hidden="true"
    >
      <div className={styles.grid} />

      <div className={styles.bgOrb} />

      <Eye className={`${styles.decor} ${styles.decorEye}`} />
      <MeltingClock className={`${styles.decor} ${styles.decorClock}`} />

      <div className={styles.overlayContainer}>
        {cells.map((cell, index) => {
          const opacity = highlightOpacities[index] || 0;

          const cellStyle = {
            top: cell.top,
            left: cell.left,
            width: cell.width,
            height: cell.height,
            opacity,
            "--d": Math.hypot(
              cell.col - gridCols / 2,
              cell.row - gridRows / 2,
            ).toFixed(2),
          } as CSSProperties;

          return (
            <div
              key={`${cell.row}-${cell.col}`}
              className={styles.overlayCell}
              style={cellStyle}
            />
          );
        })}
      </div>
    </div>
  );
}
