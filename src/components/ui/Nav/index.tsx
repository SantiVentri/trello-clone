'use client'

// Styles
import { Ellipsis, Minus, X } from "lucide-react";
import styles from "./Nav.module.css";

// Components
import { useState } from "react";

export default function Nav() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <header className={styles.nav}>
            <h1>My Trello</h1>
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
                    <button>
                        <Minus color="black" size={16} />
                        Close board
                    </button>
                </div>
            </div>
        </header>
    )
}