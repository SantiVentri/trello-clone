import { BoardData } from "@/types";

export const initialData: BoardData = {
    title: "My Trello Board",
    lists: [
        {
        id: "1",
        title: "To Do",
        cards: [
            { id: "1", title: "Project setup", checked: false},
            { id: "2", title: "Board implementation", checked: false },
        ],
        },
        {
        id: "2",
        title: "In Progress",
        cards: [{ id: "3", title: "Card component", checked: false }],
        },
        {
        id: "3",
        title: "Done",
        cards: [],
        },
    ],
};
