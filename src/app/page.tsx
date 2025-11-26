'use client'

// Styles
import styles from "./page.module.css";

// Hooks
import { useLocalStorage } from "@/hooks/useLocalStorage";

// Components
import Board from "@/components/Board";

// Data
import { initialData } from "@/data/initialData";
import { useEffect } from "react";

export default function Home() {
  const [data, setData, mounted] = useLocalStorage("trello-board", initialData);

  if (!mounted) {
    return null;
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Board data={data} />
      </main>
    </div>
  );
}
