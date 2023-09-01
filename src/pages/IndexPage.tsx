import { Space } from 'antd';
import { useGetFilteredGamesByGenresAndPlatformQuery } from '../store';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../config';
import { GameList, SelectPanel, GameListSkeleton } from '../features/';

function IndexPage() {
  const navigate = useNavigate();

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);

  const onGenreSelect = (genre: string) => {
    setSelectedGenres((genres) => [...genres, genre]);
  };

  const onGenreDeselect = (genre: string) => {
    setSelectedGenres((genres) => genres.filter((value) => value !== genre));
  };

  const onGenreClear = () => {
    setSelectedGenres([]);
  };

  const onCardClick = (id: number) => () => {
    navigate(ROUTES.games.redirect(id));
  };

  const { data, isLoading, isError, error, isFetching } =
    useGetFilteredGamesByGenresAndPlatformQuery({
      genres: selectedGenres,
      platform: selectedPlatform,
    });

  const isErrorMessage = typeof error === 'string';

  return (
    <Space direction="vertical" className="w-full h-full">
      <div className="flex w-full gap-2 p-4 pb-0">
        <SelectPanel
          onPlatformSelect={setSelectedPlatform}
          onGenreDeselect={onGenreDeselect}
          onGenreClear={onGenreClear}
          onGenreSelect={onGenreSelect}
        />
      </div>
      <div className="p-4 w-full h-full">
        {isLoading || isFetching ? (
          <GameListSkeleton />
        ) : (
          <>
            {isError ? (
              <div>Error! {isErrorMessage && error}</div>
            ) : data?.length ? (
              <GameList games={data} onCardClick={onCardClick} />
            ) : (
              <div>Sorry! No data available</div>
            )}
          </>
        )}
      </div>
    </Space>
  );
}

export default IndexPage;
