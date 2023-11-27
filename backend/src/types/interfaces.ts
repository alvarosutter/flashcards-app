export interface IQueryResult {
  status: 'success' | 'failure';
  data?: unknown;
  message?: string;
  statusCode?: number;
  total?: number;
}

export interface ICreateDeck {
  deckName: string;
  archived: boolean;
}

export interface IPatchDeck {
  deckId: string;
  deckName: string;
  archived: boolean;
}

export interface IPatchLabel {
  labelId: string;
  labelName: string;
}

export interface ICreateCard {
  cardName: string;
  content: string;
  deckId: string;
  labels?: string[];
}

export interface IPatchCard {
  cardId: string;
  cardName: string;
  content: string;
  labels?: string[];
}
