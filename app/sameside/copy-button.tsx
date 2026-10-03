"use client";

import { useState } from "react";
import styles from "./sameside.module.css";

/** A copyable command or prompt block. */
export default function CopyBlock({ text, wrap = false }: { text: string; wrap?: boolean }) {
  const [label, setLabel] = useState("Copy");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setLabel("Copied");
    } catch {
      setLabel("Select to copy");
    }
    setTimeout(() => setLabel("Copy"), 1800);
  };

  return (
    <div className={styles.code}>
      <pre className={wrap ? styles.wrap : undefined}>{text}</pre>
      <button type="button" className={styles.copy} onClick={copy}>{label}</button>
    </div>
  );
}
