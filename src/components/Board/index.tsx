// Styles
import styles from "./Board.module.css";

// Components & Icons
import BoardList from "../List";
import ListCard from "../Card";
import Details from "../Details";
import { Plus } from "lucide-react";

// Types
import { List, Card, Id } from "@/types";

// Context and Hooks
import { useBoard } from "@/context/BoardContext";
import { useState } from "react";
import { createPortal } from "react-dom";

// DND Kit Imports
import {
    DndContext,
    DragEndEvent,
    DragOverEvent,
    DragStartEvent,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay,
    closestCorners
} from "@dnd-kit/core";
import { SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";

// Componente principal del tablero
export default function Board() {
    // Obtención de datos y funciones del contexto global del tablero
    const { data, onAddList, onReorderLists, onMoveCard } = useBoard();

    // Estados para rastrear el elemento que se está arrastrando actualmente (columna o tarjeta)
    const [activeColumn, setActiveColumn] = useState<List | null>(null);
    const [activeCard, setActiveCard] = useState<Card | null>(null);
    const [detailsCard, setDetailsCard] = useState<Card | null>(null);

    // Configuración de sensores para detectar el arrastre (requiere mover 10px para activar)
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10,
            },
        })
    );

    // Función auxiliar para encontrar el ID de la lista que contiene un elemento dado
    const findContainer = (id: Id) => {
        if (data.lists.find((list) => list.id === id)) {
            return id;
        }
        const listWithCard = data.lists.find((list) => list.cards.some((card) => card.id === id));
        return listWithCard?.id;
    };

    // Manejador que se ejecuta al iniciar el arrastre
    function onDragStart(event: DragStartEvent) {
        // Si se arrastra una columna, guardamos su referencia en el estado
        if (event.active.data.current?.type === "Column") {
            setActiveColumn(event.active.data.current.list);
            return;
        }

        // Si se arrastra una tarjeta, guardamos su referencia en el estado
        if (event.active.data.current?.type === "Card") {
            setActiveCard(event.active.data.current.card);
            return;
        }
    }

    // Manejador que se ejecuta mientras se arrastra un elemento sobre otro
    function onDragOver(event: DragOverEvent) {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        // Verificamos qué tipo de elementos están interactuando
        const isActiveCard = active.data.current?.type === "Card";
        const isOverCard = over.data.current?.type === "Card";
        const isOverColumn = over.data.current?.type === "Column";

        if (!isActiveCard) return;

        // Lógica para mover tarjetas entre listas durante el arrastre
        if (isActiveCard && (isOverCard || isOverColumn)) {
            const activeContainer = findContainer(activeId);
            const overContainer = findContainer(overId);

            // Si los contenedores son iguales o inválidos, no hacemos nada para evitar actualizaciones innecesarias
            if (!activeContainer || !overContainer || activeContainer === overContainer) {
                return;
            }

            // Ejecutamos el movimiento de la tarjeta entre listas
            onMoveCard(activeId, overId);
        }
    }

    // Manejador que se ejecuta al soltar el elemento arrastrado
    function onDragEnd(event: DragEndEvent) {
        setActiveColumn(null);
        setActiveCard(null);

        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const isActiveColumn = active.data.current?.type === "Column";
        const isActiveCard = active.data.current?.type === "Card";

        // Si se soltó una columna, reordenamos las listas
        if (isActiveColumn) {
            onReorderLists(activeId, overId);
        }
        // Si se soltó una tarjeta, finalizamos su movimiento (reordenamiento en la misma lista)
        else if (isActiveCard) {
            onMoveCard(activeId, overId);
        }
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners} // Algoritmo de detección de colisiones optimizado
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
                            onOpenDetails={setDetailsCard}
                        />
                    ))}
                </SortableContext>
                <button className={styles.addListButton} onClick={onAddList}>
                    <Plus size={16} />
                    <p>Add another list</p>
                </button>
            </div>
            {detailsCard && (
                <Details
                    {...detailsCard}
                    isDetailsOpen={!!detailsCard}
                    onClose={() => setDetailsCard(null)}
                />
            )}
            {createPortal(
                <DragOverlay>
                    {activeColumn && (
                        <BoardList
                            list={activeColumn}
                        />
                    )}
                    {activeCard && (
                        <ListCard
                            card={activeCard}
                        />
                    )}
                </DragOverlay>,
                document.body
            )}
        </DndContext>
    );
}