// Styles
import styles from "./List.module.css";

// Types
import { List, Id } from "@/types"

// Components
import ListCard from "../Card";
import DeleteListButton from "./DeleteListButton/delete-list-button";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function BoardList({ list, onToggleCard, onDeleteList, onUpdateListTitle }: { list: List; onToggleCard: (cardId: Id) => void; onDeleteList?: (listId: Id) => void; onUpdateListTitle?: (listId: Id, newTitle: string) => void }) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(list.title);

    const handleTitleBlur = () => {
        setIsEditing(false);
        if (title.trim() === "") {
            setTitle(list.title);
            return;
        }
        if (title !== list.title && onUpdateListTitle) {
            onUpdateListTitle(list.id, title);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleTitleBlur();
        }
    };

    return (
        <div>
            <div className={styles.list}>
                <div className={styles.titles}>
                    {isEditing ? (
                        <input
                            className={styles.listTitleInput}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            onBlur={handleTitleBlur}
                            onKeyDown={handleKeyDown}
                            autoFocus
                        />
                    ) : (
                        <h3 
                            className={styles.listTitle} 
                            onClick={() => setIsEditing(true)}
                        >
                            {list.title}
                        </h3>
                    )}
                    {onDeleteList && <DeleteListButton listId={list.id} onDelete={onDeleteList} />}
                </div>
                <div className={styles.cards}>
                    {list.cards.map((card) => (
                        <ListCard key={card.id} card={card} onToggleCard={onToggleCard} />
                    ))}
                </div>
                <button className={styles.addCardButton}>
                    <Plus size={16} />
                    <p>Add another card</p>
                </button>
            </div>
        </div>
    )
}