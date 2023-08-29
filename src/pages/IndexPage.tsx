import { Card, Col, Row, Space } from 'antd';
import { useGetFilteredGamesByGenresAndPlatformQuery } from '../store';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../config';
import { GameList } from '../features/GameList';
import { SelectPanel } from '@/features/SelectPanel';

const SKELETON_ARRAY = Array.from({ length: 6 });

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
          <Row gutter={16}>
            {SKELETON_ARRAY.map(() => (
              <Col xs={24} sm={12} md={8} lg={6} xl={4} xxl={4}>
                <Card loading className="w-full h-[400] m-2" />
              </Col>
            ))}
          </Row>
        ) : (
          <>
            {isError ? (
              <div>Error!{isErrorMessage && error}</div>
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
