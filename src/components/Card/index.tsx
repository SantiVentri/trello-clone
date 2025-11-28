'use client'

// Styles
import { useState, useRef, useEffect } from "react";
import styles from "./Card.module.css";

// Types
import { Card, Id } from "@/types"
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function ListCard({ card, onToggleCard, onUpdateCardTitle, onOpenDetails }: { card: Card; onToggleCard: (cardId: Id) => void; onUpdateCardTitle?: (cardId: Id, newTitle: string) => void; onOpenDetails?: (card: Card) => void }) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(card.title);
    const inputRef = useRef<HTMLInputElement>(null);

    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging
    } = useSortable({
        id: card.id,
        data: {
            type: "Card",
            card
        }
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

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

    const handleOpenDetails = () => {
        if (onOpenDetails) {
            onOpenDetails(card);
        }
    };

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className={styles.card}
            />
        );
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={styles.card}
            onContextMenu={handleContextMenu}
            onClick={handleOpenDetails}
        >
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
                <p className={styles.cardTitle} onClick={() => setIsEditing(true)}>
                    {card.title}
                </p>
            )}
        </div>
    )
}