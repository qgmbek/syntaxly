import Link from "next/link";

import styles from "./layout.module.css";

export default function USLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Link href="/" className={styles.logo}>
        <span className={styles.logoMark}>✦</span>
      </Link>

      {children}
    </>
  );
}