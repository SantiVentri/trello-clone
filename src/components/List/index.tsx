// Styles
import styles from "./List.module.css";

// Types
import { List, Id } from "@/types"

// Components
import ListCard from "../Card";
import DeleteListButton from "./DeleteListButton/delete-list-button";
import { Plus, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function BoardList({ list, onToggleCard, onDeleteList, onUpdateListTitle, onUpdateCardTitle, onAddCard }: { list: List; onToggleCard: (cardId: Id) => void; onDeleteList?: (listId: Id) => void; onUpdateListTitle?: (listId: Id, newTitle: string) => void; onUpdateCardTitle?: (cardId: Id, newTitle: string) => void; onAddCard?: (listId: Id, title: string) => void }) {
    const [isEditing, setIsEditing] = useState(list.title === "New List");
    const [title, setTitle] = useState(list.title);
    const inputRef = useRef<HTMLInputElement>(null);

    const [isAddingCard, setIsAddingCard] = useState(false);
    const [newCardTitle, setNewCardTitle] = useState("");
    const newCardInputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);

    useEffect(() => {
        if (isAddingCard && newCardInputRef.current) {
            newCardInputRef.current.focus();
        }
    }, [isAddingCard]);

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

    const handleAddCard = () => {
        if (newCardTitle.trim() === "") return;
        if (onAddCard) {
            onAddCard(list.id, newCardTitle);
            setNewCardTitle("");
            setIsAddingCard(false);
        }
    };

    return (
        <div>
            <div className={styles.list}>
                <div className={styles.titles}>
                    {isEditing ? (
                        <input
                            ref={inputRef}
                            className={styles.listTitleInput}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            onBlur={handleTitleBlur}
                            onKeyDown={handleKeyDown}
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
                        <ListCard key={card.id} card={card} onToggleCard={onToggleCard} onUpdateCardTitle={onUpdateCardTitle} />
                    ))}
                </div>
                {isAddingCard ? (
                    <div className={styles.addCardForm}>
                        <textarea
                            ref={newCardInputRef}
                            className={styles.addCardInput}
                            placeholder="Enter a title for this card..."
                            value={newCardTitle}
                            onChange={(e) => setNewCardTitle(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    handleAddCard();
                                }
                            }}
                        />
                        <div className={styles.addCardActions}>
                            <button className={styles.saveCardButton} onClick={handleAddCard}>
                                Save
                            </button>
                            <button className={styles.cancelCardButton} onClick={() => setIsAddingCard(false)}>
                                <X size={20} />
                                <span style={{ marginLeft: 4, fontSize: 14 }}>Cancel</span>
                            </button>
                        </div>
                    </div>
                ) : (
                    onAddCard && (
                        <button className={styles.addCardButton} onClick={() => setIsAddingCard(true)}>
                            <Plus size={16} />
                            <p>Add another card</p>
                        </button>
                    )
                )}
            </div>
        </div>
    )
}