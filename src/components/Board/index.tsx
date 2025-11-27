// Styles
import styles from "./Board.module.css";

// Components
import BoardList from "../List";

// Types
import { Plus } from "lucide-react";

// Hooks
import { useBoard } from "@/context/BoardContext";

export default function Board() {
    const { data, onToggleCard, onDeleteList, onAddList, onUpdateListTitle, onUpdateCardTitle, onAddCard } = useBoard();

    return (
        <div className={styles.container}>
            {data.lists.map((list) => (
                <BoardList
                    key={list.id}
                    list={list}
                    onToggleCard={onToggleCard}
                    onDeleteList={onDeleteList}
                    onUpdateListTitle={onUpdateListTitle}
                    onUpdateCardTitle={onUpdateCardTitle}
                    onAddCard={onAddCard}
                />
            ))}
            <button className={styles.addListButton} onClick={onAddList}>
                <Plus size={16} />
                <p>Add another list</p>
            </button>
        </div>
    );
}