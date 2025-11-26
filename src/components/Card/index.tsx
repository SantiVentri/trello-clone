// Styles
import styles from "./Card.module.css";

// Types
import { Card } from "@/types"

export default function ListCard({ card }: { card: Card }) {
    return (
        <div className={styles.card}>
            {card.title}
        </div>
    )
}