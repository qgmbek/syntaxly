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
}

export default function Column({ data }: ColumnProps) {
  return (
    <div className={styles.column}>
      <div className={styles.meta}>
        <div className={styles.number}>{data.number}</div>
        <div className={styles.title}>{data.title}</div>
      </div>

      <div className={styles.main}>
        {data.blocks.map((block) => (
          <div key={block.title} className={styles.block}>
            <div className={styles.blockTitle}>{block.title}</div>
            <CodeBlock code={block.code} language={block.language ?? "tsx"} />
          </div>
        ))}
      </div>
    </div>
  );
}