"use client";

import { useEffect, useState } from "react";
import styles from "./CodeBlock.module.css";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export default function CodeBlock({ code, language = "tsx" }: CodeBlockProps) {
  const [html, setHtml] = useState("");

  useEffect(() => {
    fetch("/api/highlight", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, language }),
    })
      .then((res) => res.json())
      .then((data) => setHtml(data.html));
  }, [code, language]);

  return (
    <div
      className={styles.code}
      dangerouslySetInnerHTML={{ __html: html || `<pre>${code}</pre>` }}
    />
  );
}