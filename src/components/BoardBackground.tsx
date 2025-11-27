'use client'

import { useBoard } from "@/context/BoardContext";
import { useEffect } from "react";

export default function BoardBackground() {
    const { data, mounted } = useBoard();

    useEffect(() => {
        if (mounted && data.backgroundImage) {
            document.body.style.backgroundImage = `url("${data.backgroundImage}")`;
        }
    }, [data.backgroundImage, mounted]);

    return null;
}
