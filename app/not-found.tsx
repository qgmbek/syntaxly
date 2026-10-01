import Link from "next/link";
import styles from "./not-found.module.css";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.bgOrb} />

      <div className={styles.content}>
        <div className={styles.errorCode}>404</div>
        <div className={styles.title}>
          Page not <span className={styles.highlighted}>found</span>
        </div>
        <div className={styles.subtitle}>
          The syntax you&apos;re looking for doesn&apos;t exist or has been
          moved to a different scope.
        </div>
        <Link href="/" className={styles.button}>
          <ArrowLeftIcon size={18} weight="bold" /> Return home
        </Link>
      </div>
    </div>
  );
}
