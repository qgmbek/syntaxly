import styles from "./Column.module.css";
import CodeBlock from "../CodeBlock/CodeBlock";

interface Block {
  title: string;
  code: string;
  language?: string;
}

interface ColumnData {
  number: number;
  title: string;
  blocks: Block[];
}

interface ColumnProps {
  data: ColumnData;
  onBlockClick?: (block: Block, blockIndex: number) => void;
  activeBlockIndex?: number | null;
  compact?: boolean;
  columnIndex?: number;
  fontSize?: number;
}

export default function Column({
  data,
  onBlockClick,
  activeBlockIndex,
  compact = false,
  columnIndex = 0,
  fontSize = 16,
}: ColumnProps) {
  const delay = compact ? `${columnIndex * 30}ms` : `${columnIndex * 20}ms`;

  return (
    <div
      className={`${styles.column} ${compact ? styles.compact : ""}`}
      style={{ transitionDelay: delay }}
    >
      <div className={styles.meta}>
        <div className={styles.number}>{data.number}</div>
        <div className={styles.countBadge}>{data.blocks.length}</div>
        <div className={styles.title}>{data.title}</div>
      </div>

      <div className={styles.main}>
        {data.blocks.map((block, i) => (
          <div
            key={block.title}
            className={`${styles.block} ${activeBlockIndex === i ? styles.blockActive : ""}`}
            onClick={() => onBlockClick?.(block, i)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && onBlockClick?.(block, i)}
          >
            <div
              className={styles.blockTitle}
              style={{ fontSize }}
            >
              {block.title}
            </div>
            <CodeBlock
              code={block.code}
              language={block.language ?? "tsx"}
              fontSize={fontSize}
            />
          </div>
        ))}
      </div>
    </div>
  );
}