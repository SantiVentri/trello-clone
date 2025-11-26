// Styles
import styles from "./Board.module.css";

// Types
import { BoardData } from "@/types";

// Props interface
interface BoardProps {
    data: BoardData;
}

export default function Board({ data }: BoardProps) {
    return (
        <div className={styles.container}>
            {data.lists.map((list) => (
                <div key={list.id} className={styles.list}>
                    <h3 className={styles.listTitle}>{list.title}</h3>
                    <div className={styles.cards}>
                        {list.cards.map((card) => (
                            <div key={card.id} className={styles.card}>
                                {card.title}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}