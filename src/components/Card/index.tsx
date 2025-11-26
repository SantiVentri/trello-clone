'use client'

// Styles
import { useState } from "react";
import styles from "./Card.module.css";

// Types
import { Card, Id } from "@/types"

export default function ListCard({ card, onToggleCard }: { card: Card; onToggleCard: (cardId: Id) => void }) {
    return (
        <div className={styles.card}>
            <input
                type="checkbox"
                checked={card.checked}
                onChange={() => onToggleCard(card.id)}
            />
            <p className={styles.cardTitle}>
                {card.title}
            </p>
        </div>
    )
}