import { BoardData } from "@/types";

export const defaultBackgroundImages = [
    "https://images.unsplash.com/photo-1764014588235-d339ae275f19?q=80&w=1238&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1763591342997-7b60f0437e72?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1762769665979-52caeade14a1?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1762923634107-52d04a74c0cf?q=80&w=1181&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
];

export const initialData: BoardData = {
    title: "My Trello Board",
    backgroundImage: defaultBackgroundImages[0],
    lists: [
        {
            id: "list-1",
            title: "To Do",
            cards: [
                {
                    id: "card-1",
                    title: "Project setup",
                    checked: false
                },
                {
                    id: "card-2",
                    title: "Board implementation",
                    checked: false
                },
            ],
        },
        {
            id: "list-2",
            title: "In Progress",
            cards: [
                {
                    id: "card-3",
                    title: "Card component",
                    checked: false
                }
            ],
        },
        {
            id: "list-3",
            title: "Done",
            cards: [],
        },
    ],
};