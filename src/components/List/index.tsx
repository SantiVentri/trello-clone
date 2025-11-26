// Styles
import styles from "./List.module.css";

// Types
import { List, Id } from "@/types"

// Components
import ListCard from "../Card";
import DeleteListButton from "./DeleteListButton/delete-list-button";
import { Plus } from "lucide-react";

export default function BoardList({ list, onToggleCard, onDeleteList }: { list: List; onToggleCard: (cardId: Id) => void; onDeleteList?: (listId: Id) => void }) {
    return (
        <div>
            <div className={styles.list}>
                <div className={styles.titles}>
                    <h3 className={styles.listTitle}>{list.title}</h3>
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