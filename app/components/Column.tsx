import styles from "./Column.module.css";

export default function Column() {
  return (
    <div className={styles.column}>
      <div className={styles.meta}>
        <div className={styles.number}>1</div>
        <div className={styles.title}>Fundamentals</div>
      </div>

      <div className={styles.main}>
        <div className={styles.block}>
          <div className={styles.blockTitle}>Variables</div>
          <div className={styles.code}></div>
        </div>
        <div className={styles.block}>
          <div className={styles.blockTitle}>While Loops</div>
        </div>
        <div className={styles.block}>
          <div className={styles.blockTitle}>Functions</div>
        </div>
      </div>
    </div>
  );
}
