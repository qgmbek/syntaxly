"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type FocusEvent,
} from "react";

import styles from "./Minimap.module.css";

interface Block {
  title: string;
}

interface ColumnData {
  number: number;
  title: string;
  blocks: Block[];
}

interface MinimapProps {
  columns: ColumnData[];
  selectedColumnIndex: number | null;
  selectedBlockIndex: number | null;
  onSelect: (colIndex: number, blockIndex: number) => void;
}

interface Tip {
  block: string;
  column: string;
  y: number;
}

export default function Minimap({
  columns,
  selectedColumnIndex,
  selectedBlockIndex,
  onSelect,
}: MinimapProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [tip, setTip] = useState<Tip | null>(null);

  const offsets = columns.reduce<number[]>((acc, col, i) => {
    acc.push(i === 0 ? 0 : acc[i - 1] + columns[i - 1].blocks.length);
    return acc;
  }, []);

  useEffect(() => {
    const box = scrollRef.current;
    const el = box?.querySelector<HTMLElement>('[data-active="true"]');

    if (!box || !el) return;

    const b = box.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    const pad = 24;

    if (r.top < b.top + pad) {
      box.scrollTop -= b.top + pad - r.top;
    } else if (r.bottom > b.bottom - pad) {
      box.scrollTop += r.bottom - (b.bottom - pad);
    }
  }, [selectedColumnIndex, selectedBlockIndex]);

  const showTip = (
    e: MouseEvent<HTMLButtonElement> | FocusEvent<HTMLButtonElement>,
    block: string,
    column: string,
  ) => {
    const r = e.currentTarget.getBoundingClientRect();

    setTip({
      block,
      column,
      y: r.top + r.height / 2,
    });
  };

  return (
    <div className={styles.minimap} aria-label="Column minimap">
      <div
        className={styles.scroll}
        ref={scrollRef}
        onScroll={() => setTip(null)}
      >
        <div className={styles.scrollSpacer} />

        {columns.map((col, ci) => {
          const laneActive = ci === selectedColumnIndex;

          return (
            <div key={col.number} className={styles.lane}>
              <div
                className={`${styles.laneLabel} ${
                  laneActive ? styles.laneLabelActive : ""
                }`}
                style={{ "--l": Math.min(ci, 8) } as CSSProperties}
                title={col.title}
              >
                {String(col.number).padStart(2, "0")}
              </div>

              <div className={styles.pills}>
                {col.blocks.map((block, bi) => {
                  const isActive = laneActive && bi === selectedBlockIndex;

                  return (
                    <button
                      key={bi}
                      className={`${styles.pill} ${
                        isActive ? styles.pillActive : ""
                      }`}
                      style={
                        { "--p": Math.min(offsets[ci] + bi, 40) } as CSSProperties
                      }
                      data-active={isActive}
                      onClick={() => onSelect(ci, bi)}
                      onMouseEnter={(e) => showTip(e, block.title, col.title)}
                      onMouseLeave={() => setTip(null)}
                      onFocus={(e) => showTip(e, block.title, col.title)}
                      onBlur={() => setTip(null)}
                      aria-label={`${col.title} — ${block.title}`}
                      aria-pressed={isActive}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}

        <div className={styles.scrollSpacer} />
      </div>

      <div className={styles.verticalLabel}>MINIMAP</div>

      {tip && (
        <div className={styles.tip} style={{ top: tip.y }} role="presentation">
          <span className={styles.tipBlock} key={tip.block}>
            {tip.block}
          </span>
          <span className={styles.tipColumn} key={tip.column}>
            {tip.column}
          </span>
        </div>
      )}
    </div>
  );
}