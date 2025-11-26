// Styles
import styles from "./DeleteListButton.module.css"

// Types
import { Trash2 } from "lucide-react";

export default function DeleteListButton({ listId, onDelete }: { listId: string | number; onDelete: (listId: string | number) => void }) {
    return (
        <button className={styles.button} onClick={() => onDelete(listId)}>
            <Trash2 size={18} color="red" />
        </button>
    )
}