// Styles
import styles from "./Board.module.css";

// Components
import BoardList from "../List";

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
                <BoardList key={list.id} list={list} />
            ))}
        </div>
    );
}