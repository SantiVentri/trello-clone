'use client'

// Styles
import styles from "./page.module.css";

// Hooks
import { useBoard } from "@/context/BoardContext";

// Components
import Board from "@/components/Board";

export default function Home() {
  const { mounted } = useBoard();

  if (!mounted) {
    return null;
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Board />
      </main>
    </div>
  );
}
