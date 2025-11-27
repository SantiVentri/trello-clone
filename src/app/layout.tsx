// Styles
import "./globals.css";

// Types
import type { Metadata } from "next";

// Components
import Nav from "@/components/ui/Nav";
import { BoardProvider } from "@/context/BoardContext";
import BoardBackground from "@/components/BoardBackground";

export const metadata: Metadata = {
  title: "Trello Clone | By Santino Ventrice",
  description: "This project is a Trello-like made only for learning purposes and for my portfolio. It's not intended for production use.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <BoardProvider>
          <BoardBackground />
          <Nav />
          <main>
            {children}
          </main>
        </BoardProvider>
      </body>
    </html>
  );
}
