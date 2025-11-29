// En este archivo se definen los tipos e interfaces de Board, List y Card

export type Id = string | number;

export type Card = {
  id: Id;
  title: string;
  description?: string;
  checked: boolean;
  isDetailsOpen?: boolean;
  onClose?: () => void;
};

export type List = {
  id: Id;
  title: string;
  cards: Card[];
};

export type BoardData = {
  title: string;
  backgroundImage?: string;
  lists: List[];
};