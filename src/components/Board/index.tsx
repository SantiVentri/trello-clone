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
    onAddList?: () => void;
    onUpdateListTitle?: (listId: Id, newTitle: string) => void;
}

export default function Board({ data, onToggleCard, onDeleteList, onAddList, onUpdateListTitle }: BoardProps) {
    return (
        <div className={styles.container}>
            {data.lists.map((list) => (
                <BoardList
                    key={list.id}
                    list={list}
                    onToggleCard={onToggleCard}
                    onDeleteList={onDeleteList}
                    onUpdateListTitle={onUpdateListTitle}
                />
            ))}
            <button className={styles.addListButton} onClick={onAddList}>
                <Plus size={16} />
                <p>Add another list</p>
            </button>
        </div>
    );
}