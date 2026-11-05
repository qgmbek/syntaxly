import Link from "next/link";
import styles from "./not-found.module.css";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";
import { Ghost } from "./ui/HandDrawn";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.bgOrb} />

      <div className={styles.content}>
        <div className={styles.errorCode} role="img" aria-label="404">
          <span>4</span>
          <Ghost className={styles.ghost} />
          <span>4</span>
          <span className={styles.tape} aria-hidden="true">
            this page ghosted you
          </span>
        </div>

        <h1 className={styles.title}>
          Page not <span className={styles.highlighted}>found</span>
        </h1>

        <p className={styles.subtitle}>
          The syntax you&apos;re looking for doesn&apos;t exist or has been
          moved to a different scope.
        </p>

        <div className={styles.actions}>
          <Link href="/" className={styles.button}>
            <ArrowLeftIcon size={18} weight="bold" /> Return home
          </Link>

          <Link href="/us" className={styles.link}>
            or look around
          </Link>
        </div>
      </div>
    </div>
  );
}
