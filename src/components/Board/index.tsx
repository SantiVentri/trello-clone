// Styles
import styles from "./Board.module.css";

// Components
import BoardList from "../List";
import ListCard from "../Card";

// Types
import { Plus } from "lucide-react";
import { List, Card } from "@/types";

// Hooks
import { useBoard } from "@/context/BoardContext";
import { useState } from "react";
import { createPortal } from "react-dom";
import { DndContext, DragEndEvent, DragOverEvent, DragStartEvent, PointerSensor, useSensor, useSensors, DragOverlay } from "@dnd-kit/core";
import { SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";

export default function Board() {
    const { data, onToggleCard, onDeleteList, onAddList, onUpdateListTitle, onUpdateCardTitle, onAddCard, onReorderLists, onMoveCard } = useBoard();

    const [activeColumn, setActiveColumn] = useState<List | null>(null);
    const [activeCard, setActiveCard] = useState<Card | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10,
            },
        })
    );

    function onDragStart(event: DragStartEvent) {
        if (event.active.data.current?.type === "Column") {
            setActiveColumn(event.active.data.current.list);
            return;
        }

        if (event.active.data.current?.type === "Card") {
            setActiveCard(event.active.data.current.card);
            return;
        }
    }

    function onDragEnd(event: DragEndEvent) {
        setActiveColumn(null);
        setActiveCard(null);

        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const isActiveColumn = active.data.current?.type === "Column";
        if (isActiveColumn) {
            onReorderLists(activeId, overId);
        }
    }

    function onDragOver(event: DragOverEvent) {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const isActiveCard = active.data.current?.type === "Card";
        const isOverCard = over.data.current?.type === "Card";
        const isOverColumn = over.data.current?.type === "Column";

        if (isActiveCard && (isOverCard || isOverColumn)) {
            onMoveCard(activeId, overId);
        }
    }

    return (
        <DndContext
            sensors={sensors}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDragOver={onDragOver}
        >
            <div className={styles.container}>
                <SortableContext items={data.lists.map(l => l.id)} strategy={horizontalListSortingStrategy}>
                    {data.lists.map((list) => (
                        <BoardList
                            key={list.id}
                            list={list}
                            onToggleCard={onToggleCard}
                            onDeleteList={onDeleteList}
                            onUpdateListTitle={onUpdateListTitle}
                            onUpdateCardTitle={onUpdateCardTitle}
                            onAddCard={onAddCard}
                        />
                    ))}
                </SortableContext>
                <button className={styles.addListButton} onClick={onAddList}>
                    <Plus size={16} />
                    <p>Add another list</p>
                </button>
            </div>
            {createPortal(
                <DragOverlay>
                    {activeColumn && (
                        <BoardList
                            list={activeColumn}
                            onToggleCard={onToggleCard}
                        />
                    )}
                    {activeCard && (
                        <ListCard
                            card={activeCard}
                            onToggleCard={onToggleCard}
                        />
                    )}
                </DragOverlay>,
                document.body
            )}
        </DndContext>
    );
}