import { useGetGamesByIdQuery } from '../store';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import debounce from 'debounce';
import { Card } from 'antd';

const REFETCH_DEBOUNCE = 1000;

function GamePage() {
  const { gameId } = useParams();

  const { data, isLoading, isError, refetch } = useGetGamesByIdQuery({
    id: gameId!,
  });

  const debouncedRefetch = useMemo(
    () => debounce(refetch, REFETCH_DEBOUNCE),
    [refetch]
  );

  if (isLoading) {
    return <div>Loading game...</div>;
  }

  if (isError) {
    return (
      <div>
        Failed to fetch game!{' '}
        <button onClick={debouncedRefetch}>Press to refetch</button>
      </div>
    );
  }

  return (
    <div>
      <Card>
        <div>{data?.title}</div>
        <div>{data?.description}</div>
      </Card>
    </div>
  );
}

export default GamePage;
