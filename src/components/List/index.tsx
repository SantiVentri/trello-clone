// Styles
import styles from "./List.module.css";

// Types
import { List, Id } from "@/types"

// Components
import ListCard from "../Card";

export default function BoardList({ list, onToggleCard }: { list: List; onToggleCard: (cardId: Id) => void }) {
    return (
        <div>
            <div className={styles.list}>
                <h3 className={styles.listTitle}>{list.title}</h3>
                <div className={styles.cards}>
                    {list.cards.map((card) => (
                        <ListCard key={card.id} card={card} onToggleCard={onToggleCard} />
                    ))}
                </div>
            </div>
        </div>
    )
}