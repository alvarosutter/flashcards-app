interface IQueryErrorProps {
  message: string;
}

function QueryError({ message }: IQueryErrorProps) {
  return <h1 style={{ textAlign: 'center' }}>{message}</h1>;
}

export default QueryError;
