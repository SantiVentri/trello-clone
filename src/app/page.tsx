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
import { Id } from "@/types";

export default function Home() {
  const [data, setData, mounted] = useLocalStorage("trello-board", initialData);

  const onToggleCard = (cardId: Id) => {
    const newLists = data.lists.map(list => ({
      ...list,
      cards: list.cards.map(card =>
        card.id === cardId ? { ...card, checked: !card.checked } : card
      )
    }));
    setData({ ...data, lists: newLists });
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Board data={data} onToggleCard={onToggleCard} />
      </main>
    </div>
  );
}
