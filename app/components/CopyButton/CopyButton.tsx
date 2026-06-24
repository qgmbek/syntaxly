import { useState, useEffect, useCallback } from "react";
import { Copy, Check } from "@phosphor-icons/react";
import styles from "./CopyButton.module.css";

interface CopyButtonProps {
  text: string;
}

export default function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {}
  }, [text]);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <button
      className={`${styles.copyBtn} copyBtn`}
      onClick={(e) => {
        e.stopPropagation();
        handleCopy();
      }}
      title={copied ? "Copied!" : "Copy code"}
      aria-label={copied ? "Copied" : "Copy code to clipboard"}
    >
      {copied ? (
        <Check size={16} weight="bold" />
      ) : (
        <Copy size={16} weight="regular" />
      )}
    </button>
  );
}
