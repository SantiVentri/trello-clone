'use client'

import { createContext, useContext, ReactNode } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { initialData } from "@/data/initialData";
import { BoardData, Id } from "@/types";

interface BoardContextType {
    data: BoardData;
    setData: (value: BoardData | ((val: BoardData) => BoardData)) => void;
    mounted: boolean;
    onToggleCard: (cardId: Id) => void;
    onDeleteList: (listId: Id) => void;
    onUpdateListTitle: (listId: Id, newTitle: string) => void;
    onUpdateCardTitle: (cardId: Id, newTitle: string) => void;
    onAddCard: (listId: Id, title: string) => void;
    onAddList: () => void;
}

const BoardContext = createContext<BoardContextType | undefined>(undefined);

export function BoardProvider({ children }: { children: ReactNode }) {
    const [data, setData, mounted] = useLocalStorage<BoardData>("trello-board", initialData);

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

    return (
        <BoardContext.Provider value={{
            data,
            setData,
            mounted,
            onToggleCard,
            onDeleteList,
            onUpdateListTitle,
            onUpdateCardTitle,
            onAddCard,
            onAddList
        }}>
            {children}
        </BoardContext.Provider>
    );
}

export function useBoard() {
    const context = useContext(BoardContext);
    if (context === undefined) {
        throw new Error("useBoard must be used within a BoardProvider");
    }
    return context;
}
