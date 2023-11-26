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
