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

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const cells = useMemo(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return [];
    const cols = Math.ceil(dimensions.width / CELL_SIZE) + 1;
    const rows = Math.ceil(dimensions.height / CELL_SIZE) + 1;
    const cellList: Cell[] = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        cellList.push({
          top: row * CELL_SIZE,
          left: col * CELL_SIZE,
          width: CELL_SIZE,
          height: CELL_SIZE,
          row,
          col,
        });
      }
    }
    return cellList;
  }, [dimensions.width, dimensions.height]);

  const sampleDistinct = <T,>(arr: T[], k: number): T[] => {
    if (k > arr.length) k = arr.length;
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, k);
  };

  const generateRandomHighlights = useCallback(
    (
      hoverRow: number,
      hoverCol: number,
      totalRows: number,
      totalCols: number,
    ) => {
      const totalCells = totalRows * totalCols;
      const opacities = new Array(totalCells).fill(0);

      const hoverIndex = hoverRow * totalCols + hoverCol;
      opacities[hoverIndex] = 0.95;

      const neighbors: { row: number; col: number; index: number }[] = [];
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          const nr = hoverRow + dr;
          const nc = hoverCol + dc;
          if (nr >= 0 && nr < totalRows && nc >= 0 && nc < totalCols) {
            neighbors.push({
              row: nr,
              col: nc,
              index: nr * totalCols + nc,
            });
          }
        }
      }

      if (neighbors.length === 0) return opacities;

      const nextLineNeighbors = neighbors.filter((n) => n.row === hoverRow + 1);
      const otherNeighbors = neighbors.filter((n) => n.row !== hoverRow + 1);

      const maxNeighborBoxes = 5;
      const possibleCount = Math.min(maxNeighborBoxes, neighbors.length);
      const neighborCount = Math.floor(Math.random() * possibleCount) + 1;

      const maxNextLine = Math.min(2, nextLineNeighbors.length, neighborCount);
      const nextLineCount = Math.floor(Math.random() * (maxNextLine + 1));
      const remainingCount = neighborCount - nextLineCount;

      const selectedNextLine = sampleDistinct(nextLineNeighbors, nextLineCount);
      const selectedOthers = sampleDistinct(otherNeighbors, remainingCount);

      const selectedNeighbors = [...selectedNextLine, ...selectedOthers];

      for (const neighbor of selectedNeighbors) {
        const opacity = 0.2 + Math.random() * 0.5;
        opacities[neighbor.index] = opacity;
      }

      return opacities;
    },
    [],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container || cells.length === 0) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const col = Math.floor(mouseX / CELL_SIZE);
      const row = Math.floor(mouseY / CELL_SIZE);
      const cols = Math.ceil(dimensions.width / CELL_SIZE) + 1;
      const rows = Math.ceil(dimensions.height / CELL_SIZE) + 1;

      let currentHoverIndex: number | null = null;
      if (row >= 0 && row < rows && col >= 0 && col < cols) {
        currentHoverIndex = row * cols + col;
      }

      if (currentHoverIndex !== lastHoverCellRef.current) {
        lastHoverCellRef.current = currentHoverIndex;
        if (currentHoverIndex !== null) {
          const hoverRow = Math.floor(currentHoverIndex / cols);
          const hoverCol = currentHoverIndex % cols;
          const newOpacities = generateRandomHighlights(
            hoverRow,
            hoverCol,
            rows,
            cols,
          );
          setHighlightOpacities(newOpacities);
        } else {
          setHighlightOpacities(new Array(rows * cols).fill(0));
        }
      }
    };

    const handleMouseLeave = () => {
      lastHoverCellRef.current = null;
      const cols = Math.ceil(dimensions.width / CELL_SIZE) + 1;
      const rows = Math.ceil(dimensions.height / CELL_SIZE) + 1;
      setHighlightOpacities(new Array(rows * cols).fill(0));
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [
    cells.length,
    dimensions.width,
    dimensions.height,
    generateRandomHighlights,
  ]);

  useEffect(() => {
    if (cells.length > 0) {
      const cols = Math.ceil(dimensions.width / CELL_SIZE) + 1;
      const rows = Math.ceil(dimensions.height / CELL_SIZE) + 1;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHighlightOpacities(new Array(rows * cols).fill(0));
      lastHoverCellRef.current = null;
    }
  }, [dimensions.width, dimensions.height, cells.length]);

  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.overlayContainer}>
        {cells.map((cell, idx) => (
          <div
            key={idx}
            className={styles.overlayCell}
            style={{
              top: cell.top,
              left: cell.left,
              width: cell.width,
              height: cell.height,
              backgroundColor: `rgba(255, 215, 0, ${highlightOpacities[idx] || 0})`,
            }}
          />
        ))}
      </div>

      <div className={styles.content}>
        <div className={styles.title}>Syntax cheatsheet for programming.</div>
        <div className={styles.subtitle}>
          Browse every syntax at a glance, organized into blocks by topic. Click
          any one to see a quick refresher: definition, usage, example, and
          tips.
        </div>
        <div className={styles.buttonContainer}>
          <a href="/syntax" className={styles.getButton}>
            Get Started
          </a>
          <a href="/syntax" className={styles.learnButton}>
            Learn Syntaxly
          </a>
        </div>
      </div>
    </div>
  );
}
