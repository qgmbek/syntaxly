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
}

export default function Column({ data, onBlockClick, activeBlockIndex }: ColumnProps) {
  return (
    <div className={styles.column}>
      <div className={styles.meta}>
        <div className={styles.number}>{data.number}</div>
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
            <div className={styles.blockTitle}>{block.title}</div>
            <CodeBlock code={block.code} language={block.language ?? "tsx"} />
          </div>
        ))}
      </div>
    </div>
  );
}