// Styles
import styles from "./Details.module.css";

// Types
import { Card } from "@/types";

export default function Details({
    id,
    title,
    checked,
    isDetailsOpen,
    onClose
}: Card) {

    if (!isDetailsOpen) return null;

    return (
        <div className={styles.container} onClick={onClose}>
            <div className={styles.details} onClick={(e) => e.stopPropagation()}>
                <header className={styles.header}>
                    <h2>Card Details</h2>
                    <button className={styles.closeButton} onClick={onClose}>
                        &times;
                    </button>
                </header>
                <div className={styles.content}>
                    <h3>{title}</h3>
                    <p>Card ID: {id}</p>
                    <p>Status: {checked ? "Completed" : "Incomplete"}</p>
                </div>
            </div>
        </div>
    )
}