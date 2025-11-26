// Styles
import ListCard from "../Card";
import styles from "./List.module.css";

// Types
import { List } from "@/types"

export default function BoardList({ list }: { list: List }) {
    return (
        <div>
            <div className={styles.list}>
                <h3 className={styles.listTitle}>{list.title}</h3>
                <div className={styles.cards}>
                    {list.cards.map((card) => (
                        <ListCard key={card.id} card={card} />
                    ))}
                </div>
            </div>
        </div>
    )
}