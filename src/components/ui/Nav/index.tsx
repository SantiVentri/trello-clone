'use client'

// Styles
import { Ellipsis, Minus, X } from "lucide-react";
import styles from "./Nav.module.css";

// Components
import { useState } from "react";

// Hooks
import { useLocalStorage } from "@/hooks/useLocalStorage";

// Data
import { initialData } from "@/data/initialData";

export default function Nav() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [data, setData] = useLocalStorage("trello-board", initialData);

    const handleCloseBoard = () => {
        if (window.confirm("¿Estás seguro? Esto borrará todo y restaurará el tablero inicial.")) {
            setData(initialData);
            setIsMenuOpen(false);
            window.location.reload();
        }
    }

    return (
        <header className={styles.nav}>
            <div className={styles.titles}>
                <h1>Trello Clone</h1>
                <span>{data.title}</span>
            </div>
            <nav>
                <button className={styles.settings} onClick={() => setIsMenuOpen(true)}>
                    <Ellipsis color="white" />
                </button>
            </nav>
            <div className={`${styles.modal} ${isMenuOpen ? styles.open : styles.closed}`}>
                <div className={styles.modalHeader}>
                    <h4>Menú</h4>
                    <button onClick={() => setIsMenuOpen(false)}>
                        <X color="#4a4a4a" size={18} />
                    </button>
                </div>
                <div className={styles.modalContent}>
                    <button>
                        <Minus color="black" size={16} />
                        Change background
                    </button>
                    <button onClick={handleCloseBoard}>
                        <Minus color="black" size={16} />
                        Close board
                    </button>
                </div>
            </div>
        </header>
    )
}