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
    onUpdateCardDesc: (cardId: Id, newDesc: string) => void;
    onAddCard: (listId: Id, title: string) => void;
    onAddList: () => void;
    onReorderLists: (activeId: Id, overId: Id) => void;
    onMoveCard: (activeId: Id, overId: Id) => void;
}

const BoardContext = createContext<BoardContextType | undefined>(undefined);

function arrayMove<T>(array: T[], from: number, to: number): T[] {
    const newArray = array.slice();
    newArray.splice(to < 0 ? newArray.length + to : to, 0, newArray.splice(from, 1)[0]);
    return newArray;
}

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

    const onUpdateCardDesc = (cardId: Id, newDesc: string) => {
        const newLists = data.lists.map(list => ({
            ...list,
            cards: list.cards.map(card =>
                card.id === cardId ? { ...card, description: newDesc } : card
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

    const onReorderLists = (activeId: Id, overId: Id) => {
        const oldIndex = data.lists.findIndex(list => list.id === activeId);
        const newIndex = data.lists.findIndex(list => list.id === overId);

        if (oldIndex !== newIndex) {
            setData({ ...data, lists: arrayMove(data.lists, oldIndex, newIndex) });
        }
    };

    const onMoveCard = (activeId: Id, overId: Id) => {
        const activeList = data.lists.find(list => list.cards.some(c => c.id === activeId));
        if (!activeList) return;

        const overList = data.lists.find(list => list.id === overId || list.cards.some(c => c.id === overId));
        if (!overList) return;

        if (activeList.id === overList.id) {
            // Same list
            const oldIndex = activeList.cards.findIndex(c => c.id === activeId);
            const newIndex = activeList.cards.findIndex(c => c.id === overId);
            if (oldIndex !== newIndex) {
                const newCards = arrayMove(activeList.cards, oldIndex, newIndex);
                const newLists = data.lists.map(l => l.id === activeList.id ? { ...l, cards: newCards } : l);
                setData({ ...data, lists: newLists });
            }
        } else {
            // Different list
            const activeCard = activeList.cards.find(c => c.id === activeId);
            if (!activeCard) return;

            const newActiveCards = activeList.cards.filter(c => c.id !== activeId);
            const newOverCards = [...overList.cards];

            const overCardIndex = overList.cards.findIndex(c => c.id === overId);
            let newIndex = overCardIndex >= 0 ? overCardIndex : newOverCards.length;

            newOverCards.splice(newIndex, 0, activeCard);

            const newLists = data.lists.map(l => {
                if (l.id === activeList.id) return { ...l, cards: newActiveCards };
                if (l.id === overList.id) return { ...l, cards: newOverCards };
                return l;
            });
            setData({ ...data, lists: newLists });
        }
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
            onUpdateCardDesc,
            onAddCard,
            onAddList,
            onReorderLists,
            onMoveCard
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
