// Styles
import styles from "./Board.module.css";

// Components
import BoardList from "../List";

// Types
import { BoardData, Id } from "@/types";
import { Plus } from "lucide-react";

// Props interface
interface BoardProps {
    data: BoardData;
    onToggleCard: (cardId: Id) => void;
    onDeleteList?: (listId: Id) => void;
}

export default function Board({ data, onToggleCard, onDeleteList }: BoardProps) {
    return (
        <div className={styles.container}>
            {data.lists.map((list) => (
                <BoardList key={list.id} list={list} onToggleCard={onToggleCard} onDeleteList={onDeleteList} />
            ))}
            <button className={styles.addListButton}>
                <Plus size={16} />
                <p>Add another list</p>
            </button>
        </div>
    );
}