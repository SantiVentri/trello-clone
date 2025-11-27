'use client'

// Styles
import styles from "./page.module.css";

// Hooks
import { useBoard } from "@/context/BoardContext";

// Components
import Board from "@/components/Board";

// Data
import { initialData } from "@/data/initialData";
import { useEffect } from "react";
import { Id } from "@/types";

export default function Home() {
  const { data, setData, mounted } = useBoard();

  const onToggleCard = (cardId: Id) => {
    const newLists = data.lists.map(list => ({
      ...list,
      cards: list.cards.map(card =>
        card.id === cardId ? { ...card, checked: !card.checked } : card
      )
    }));
    setData({ ...data, lists: newLists });
  };

  const onDeleteList = (listId: Id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta lista?")) {
      const newLists = data.lists.filter(list => list.id !== listId);
      setData({ ...data, lists: newLists });
    }
  }

  const onUpdateListTitle = (listId: Id, newTitle: string) => {
    const newLists = data.lists.map(list =>
      list.id === listId ? { ...list, title: newTitle } : list
    );
    setData({ ...data, lists: newLists });
  }

  const onUpdateCardTitle = (cardId: Id, newTitle: string) => {
    const newLists = data.lists.map(list => ({
      ...list,
      cards: list.cards.map(card =>
        card.id === cardId ? { ...card, title: newTitle } : card
      )
    }));
    setData({ ...data, lists: newLists });
  };

  const onAddCard = (listId: Id, title: string) => {
    const newCard = {
      id: crypto.randomUUID(),
      title: title,
      checked: false
    };

    const newLists = data.lists.map(list =>
      list.id === listId ? { ...list, cards: [...list.cards, newCard] } : list
    );
    setData({ ...data, lists: newLists });
  };

  const onAddList = () => {
    if (data.lists.length >= 6) {
      alert("No puedes agregar más de 6 listas.");
      return;
    }

    const newList = {
      id: crypto.randomUUID(),
      title: "New List",
      cards: []
    };
    setData({ ...data, lists: [...data.lists, newList] });
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Board
          data={data}
          onToggleCard={onToggleCard}
          onDeleteList={onDeleteList}
          onAddList={onAddList}
          onUpdateListTitle={onUpdateListTitle}
          onUpdateCardTitle={onUpdateCardTitle}
          onAddCard={onAddCard}
        />
      </main>
    </div>
  );
}
