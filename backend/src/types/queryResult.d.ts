interface IQueryResult {
  status: 'success' | 'failure';
  data?: unknown;
  message?: string;
  statusCode?: number;
  total?: number;
}

export default IQueryResult;
