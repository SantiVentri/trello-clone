'use client'

// Styles
import { useState, useRef, useEffect } from "react";
import styles from "./Card.module.css";

// Types
import { Card, Id } from "@/types"

export default function ListCard({ card, onToggleCard, onUpdateCardTitle }: { card: Card; onToggleCard: (cardId: Id) => void; onUpdateCardTitle?: (cardId: Id, newTitle: string) => void }) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(card.title);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);

    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsEditing(true);
    };

    const handleTitleBlur = () => {
        setIsEditing(false);
        if (title.trim() === "") {
            setTitle(card.title);
            return;
        }
        if (title !== card.title && onUpdateCardTitle) {
            onUpdateCardTitle(card.id, title);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleTitleBlur();
        }
    };

    return (
        <div className={styles.card} onContextMenu={handleContextMenu}>
            <input
                type="checkbox"
                checked={card.checked}
                onChange={() => onToggleCard(card.id)}
            />
            {isEditing ? (
                <input
                    ref={inputRef}
                    className={styles.cardTitleInput}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={handleTitleBlur}
                    onKeyDown={handleKeyDown}
                    onClick={(e) => e.stopPropagation()}
                />
            ) : (
                <p className={styles.cardTitle}>
                    {card.title}
                </p>
            )}
        </div>
    )
}