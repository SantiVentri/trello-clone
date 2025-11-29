// Styles
import { Ellipsis, Text, Trash2, X } from "lucide-react";
import styles from "./Details.module.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Types
import { Card } from "@/types";
import { useBoard } from "@/context/BoardContext";
import { useEffect, useRef, useState } from "react";

export default function Details({
    id,
    title,
    description,
    checked,
    isDetailsOpen,
    onClose
}: Card) {
    const {
        data,
        onUpdateCardTitle,
        onUpdateCardDesc,
        onToggleCard,
        onDeleteCard
    } = useBoard();

    const card = data.lists.flatMap(l => l.cards).find(c => c.id === id);
    const currentTitle = card?.title ?? title;
    const currentDescription = card?.description ?? description;
    const currentChecked = card?.checked ?? checked;

    const [isEditing, setIsEditing] = useState(false);
    const [isEditingDesc, setIsEditingDesc] = useState(false);
    const [cardTitle, setCardTitle] = useState(currentTitle || "");
    const [desc, setDescription] = useState(currentDescription || "");
    const inputRef = useRef<HTMLInputElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const isCancelledRef = useRef(false);
    const cancelButtonRef = useRef<HTMLButtonElement>(null);
    const isMouseDownOnOverlay = useRef(false);

    useEffect(() => {
        if (isEditing) {
            isCancelledRef.current = false;
            if (inputRef.current) {
                inputRef.current.focus();
                inputRef.current.select();
            }
        }
    }, [isEditing]);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [desc, isEditingDesc]);

    useEffect(() => {
        if (isEditingDesc && textareaRef.current) {
            textareaRef.current.focus();
            textareaRef.current.setSelectionRange(textareaRef.current.value.length, textareaRef.current.value.length);
        }
    }, [isEditingDesc]);

    useEffect(() => {
        setCardTitle(currentTitle || "");
        setDescription(currentDescription || "");
    }, [currentTitle, currentDescription]);

    const handleCheck = () => {
        onToggleCard(id);
    };

    const handleTitleBlur = () => {
        if (isCancelledRef.current) {
            setIsEditing(false);
            return;
        }
        setIsEditing(false);
        if (cardTitle !== currentTitle) {
            onUpdateCardTitle(id, cardTitle);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            inputRef.current?.blur();
        }
        if (e.key === "Escape") {
            isCancelledRef.current = true;
            setCardTitle(currentTitle || "");
            setIsEditing(false);
        }
    };

    const handleDescSave = () => {
        if (desc !== currentDescription) {
            onUpdateCardDesc(id, desc);
        }
        setIsEditingDesc(false);
    };

    const handleDescCancel = () => {
        setDescription(currentDescription || "");
        setIsEditingDesc(false);
    };

    const handleDescBlur = (e: React.FocusEvent) => {
        if (cancelButtonRef.current && e.relatedTarget === cancelButtonRef.current) {
            return;
        }
        handleDescSave();
    };

    const handleDescKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Escape") {
            handleDescCancel();
        }
    };

    const handleOverlayMouseDown = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            isMouseDownOnOverlay.current = true;
        }
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (isMouseDownOnOverlay.current && e.target === e.currentTarget) {
            onClose?.();
        }
        isMouseDownOnOverlay.current = false;
    };

    const handleDeleteCard = () => {
        onDeleteCard(id);
        onClose?.();
    };


    if (!isDetailsOpen) return null;

    return (
        <div
            className={styles.container}
            onMouseDown={handleOverlayMouseDown}
            onClick={handleOverlayClick}
        >
            <div className={styles.details} onClick={(e) => e.stopPropagation()}>
                <div className={styles.bg}>
                    <button className={styles.deleteCardButton} onClick={handleDeleteCard}>
                        <Trash2 size={20} color="red" />
                    </button>
                    <button onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>
                <header className={styles.header}>
                    <input
                        type="checkbox"
                        checked={currentChecked}
                        onChange={handleCheck}
                        onClick={(e) => e.stopPropagation()}
                    />
                    {isEditing ? (
                        <input
                            ref={inputRef}
                            className={styles.cardTitleInput}
                            value={cardTitle}
                            onChange={(e) => setCardTitle(e.target.value)}
                            onBlur={handleTitleBlur}
                            onKeyDown={handleKeyDown}
                            onClick={(e) => e.stopPropagation()}
                        />
                    ) : (
                        <p className={styles.cardTitle} onClick={() => setIsEditing(true)}>
                            {cardTitle}
                        </p>
                    )}
                </header>
                <div className={styles.content}>
                    <div className={styles.description}>
                        <Text size={16} color="#000" />
                        <h4>Description</h4>
                        <div />
                        <div className={styles.descContainer}>
                            {isEditingDesc ? (
                                <>
                                    <textarea
                                        ref={textareaRef}
                                        placeholder="Add a more detailed description..."
                                        value={desc}
                                        onChange={(e) => setDescription(e.target.value)}
                                        onKeyDown={handleDescKeyDown}
                                        onBlur={handleDescBlur}
                                        maxLength={1200}
                                        rows={1}
                                    />
                                    <div className={styles.descButtons}>
                                        <button className={styles.saveButton} onClick={handleDescSave}>Save</button>
                                        <button ref={cancelButtonRef} className={styles.cancelButton} onClick={handleDescCancel}>
                                            <X size={20} />
                                            <span style={{ marginLeft: 4, fontSize: 14 }}>Cancel</span>
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div
                                    className={styles.markdownPreview}
                                    onClick={() => setIsEditingDesc(true)}
                                >
                                    {desc ? (
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                            {desc}
                                        </ReactMarkdown>
                                    ) : (
                                        <p className={styles.placeholder}>Add a more detailed description...</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}