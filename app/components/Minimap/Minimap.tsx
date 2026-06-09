"use client";

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

export default function Minimap({
  columns,
  selectedColumnIndex,
  selectedBlockIndex,
  onSelect,
}: MinimapProps) {
  return (
    <div className={styles.minimap} aria-label="Column minimap">
      <div className={styles.scroll}>
        <div className={styles.scrollSpacer} />

        {columns.map((col, ci) => (
          <div key={col.number} className={styles.lane}>
            <div className={styles.laneLabel} title={col.title}>
              {String(col.number).padStart(2, "0")}
            </div>

            <div className={styles.pills}>
              {col.blocks.map((block, bi) => {
                const isActive =
                  ci === selectedColumnIndex && bi === selectedBlockIndex;

                return (
                  <button
                    key={bi}
                    className={`${styles.pill} ${
                      isActive ? styles.pillActive : ""
                    }`}
                    onClick={() => onSelect(ci, bi)}
                    title={block.title}
                    aria-label={`${col.title} — ${block.title}`}
                    aria-pressed={isActive}
                  />
                );
              })}
            </div>
          </div>
        ))}

        <div className={styles.scrollSpacer} />
      </div>

      <div className={styles.verticalLabel}>MINIMAP</div>
    </div>
  );
}
