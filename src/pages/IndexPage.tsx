import { Card, Col, Row, Select, Space, List } from 'antd';
import { useGetFilteredGamesByGenresAndPlatformQuery } from '../store';
import Meta from 'antd/es/card/Meta';
import { DefaultOptionType } from 'antd/es/select';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../config';

const platformOptions: DefaultOptionType[] = [
  {
    label: 'All',
    value: null,
  },
  {
    label: 'PC (Windows)',
    value: 'pc',
  },
  {
    label: 'Browser (Web)',
    value: 'browser',
  },
];

const genreOptions: DefaultOptionType[] = [
  {
    label: '3d',
    value: '3d',
  },
  {
    label: 'MMORPG',
    value: 'mmorpg',
  },
  {
    label: 'Fantasy',
    value: 'fantasy',
  },
  {
    label: 'PVP',
    value: 'pvp',
  },
  {
    label: 'Shooter',
    value: 'shooter',
  },
  {
    label: 'MOBA',
    value: 'moba',
  },
  {
    label: 'Batlle Royale',
    value: 'battle-royale',
  },
  {
    label: 'Sci-Fi',
    value: 'sci-fi',
  },
  {
    label: 'Racing',
    value: 'racing',
  },
  {
    label: 'Social',
    value: 'social',
  },
  {
    label: 'Sports',
    value: 'sports',
  },
];

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
    <>
      <Space className="w-full h-full" size={[160, 8]}>
        <Select
          allowClear
          className="w-full"
          placeholder="Platform"
          rootClassName="w-full"
          onSelect={setSelectedPlatform}
          options={platformOptions}
        />
        <Select
          mode="multiple"
          allowClear
          className="w-full"
          placeholder="Genre"
          rootClassName="w-full"
          onClear={onGenreClear}
          onDeselect={onGenreDeselect}
          onSelect={onGenreSelect}
          options={genreOptions}
        />
      </Space>
      {isLoading || isFetching ? (
        <Row gutter={16}>
          <Col span={8} className="gutter-row">
            <Card loading className="w-full" />
          </Col>

          <Col span={8} className="gutter-row">
            <Card loading className="w-full" />
          </Col>

          <Col span={8} className="gutter-row">
            <Card loading className="w-full" />
          </Col>

          <Col span={8} className="gutter-row">
            <Card loading className="w-full" />
          </Col>
        </Row>
      ) : (
        <>
          {isError ? (
            <div>Error!{isErrorMessage && error}</div>
          ) : data?.length ? (
            <List
              grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 4,
                lg: 4,
                xl: 6,
                xxl: 3,
              }}
              dataSource={data}
              renderItem={(game) => (
                <Card
                  hoverable
                  size="small"
                  className="max-h-[400px]"
                  onClick={onCardClick(game.id)}
                  cover={<img alt={game.title} src={game.thumbnail} />}
                >
                  <Meta
                    title={game.title}
                    description={game.short_description}
                  />
                  <p>{game.developer}</p>
                  <p>{game.platform}</p>
                  <p>{game.genre}</p>
                </Card>
              )}
            />
          ) : (
            <div>Sorry! No data available</div>
          )}
        </>
      )}
    </>
  );
}

export default IndexPage;
