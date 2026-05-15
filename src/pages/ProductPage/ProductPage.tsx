import { useParams } from 'react-router-dom';

export function ProductPage() {
  const { id } = useParams<{ id: string }>();
  return <h2>Товар {id}</h2>;
}
