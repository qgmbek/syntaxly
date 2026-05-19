"use client";

import { useEffect, useState } from "react";
import styles from "./CodeBlock.module.css";

interface CodeBlockProps {
  code: string;
  language?: string;
  fontSize?: number;
}

export default function CodeBlock({
  code,
  language = "tsx",
  fontSize = 16,
}: CodeBlockProps) {
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
      style={{ fontSize }}
      dangerouslySetInnerHTML={{ __html: html || `<pre>${code}</pre>` }}
    />
  );
}