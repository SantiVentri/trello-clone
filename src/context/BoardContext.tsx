'use client'

import { createContext, useContext, ReactNode } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { initialData } from "@/data/initialData";
import { BoardData } from "@/types";

interface BoardContextType {
    data: BoardData;
    setData: (value: BoardData | ((val: BoardData) => BoardData)) => void;
    mounted: boolean;
}

const BoardContext = createContext<BoardContextType | undefined>(undefined);

export function BoardProvider({ children }: { children: ReactNode }) {
    const [data, setData, mounted] = useLocalStorage<BoardData>("trello-board", initialData);

    return (
        <BoardContext.Provider value={{ data, setData, mounted }}>
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
