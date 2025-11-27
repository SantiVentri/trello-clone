'use client'

// Styles
import { Ellipsis, ImageIcon, Minus, Trash2, X } from "lucide-react";
import styles from "./Nav.module.css";

// Components
import { useState, useRef, useEffect } from "react";

// Hooks
import { useLocalStorage } from "@/hooks/useLocalStorage";

// Data
import { initialData } from "@/data/initialData";
import Image from "next/image";
import Link from "next/link";

export default function Nav() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [data, setData] = useLocalStorage("trello-board", initialData);
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(data.title);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setTitle(data.title);
    }, [data.title]);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);

    const handleCloseBoard = () => {
        if (window.confirm("¿Estás seguro? Esto borrará todo y restaurará el tablero inicial.")) {
            setData(initialData);
            setIsMenuOpen(false);
            window.location.reload();
        }
    }

    const handleTitleBlur = () => {
        setIsEditing(false);
        if (title.trim() === "") {
            setTitle(data.title);
            return;
        }
        if (title !== data.title) {
            setData({ ...data, title });
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleTitleBlur();
        }
    };

    return (
        <header className={styles.nav}>
            <div className={styles.titles}>
                <h1>Trello Clone</h1>
                {isEditing ? (
                    <input
                        ref={inputRef}
                        className={styles.boardTitleInput}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onBlur={handleTitleBlur}
                        onKeyDown={handleKeyDown}
                    />
                ) : (
                    <span
                        className={styles.boardTitle}
                        onClick={() => setIsEditing(true)}
                    >
                        {data.title}
                    </span>
                )}
            </div>
            <nav>
                <button className={styles.settings} onClick={() => setIsMenuOpen(true)}>
                    <Ellipsis color="white" />
                </button>
            </nav>
            <div className={`${styles.modal} ${isMenuOpen ? styles.open : styles.closed}`}>
                <div className={styles.modalHeader}>
                    <h4>Menu</h4>
                    <button onClick={() => setIsMenuOpen(false)}>
                        <X color="#4a4a4a" size={18} />
                    </button>
                </div>
                <div className={styles.modalContent}>
                    <Link href="https://github.com/santiventri/trello-clone" target="_blank">
                        <Image
                            src={require("../../../../public/icons/GitHub.png")}
                            height={20}
                            width={20}
                            alt="Github Icon"
                        />
                        <p>See repository</p>
                    </Link>
                    <button>
                        <ImageIcon color="black" size={16} />
                        <p>Change background (In development)</p>
                    </button>
                    <button onClick={handleCloseBoard} style={{ color: "red" }}>
                        <Trash2 size={16} />
                        <p>Close board</p>
                    </button>
                </div>
            </div>
        </header>
    )
}