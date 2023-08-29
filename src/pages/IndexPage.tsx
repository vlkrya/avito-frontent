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

const SKELETON_ARRAY = new Array(6).fill(null);

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
        <Select
          allowClear
          placeholder="Platform"
          className="min-w-[150px] w-auto"
          defaultValue={selectedPlatform}
          onSelect={setSelectedPlatform}
          options={platformOptions}
        />
        <Select
          mode="multiple"
          allowClear
          placeholder="Genre"
          className="min-w-[150px] w-auto"
          onClear={onGenreClear}
          onDeselect={onGenreDeselect}
          onSelect={onGenreSelect}
          options={genreOptions}
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
              <List
                grid={{
                  gutter: 16,
                  xs: 1,
                  sm: 2,
                  md: 4,
                  lg: 4,
                  xl: 5,
                  xxl: 6,
                }}
                dataSource={data}
                renderItem={(game) => (
                  <List.Item className="w-full h-full">
                    <Card
                      hoverable
                      size="small"
                      className="h-full w-full overflow-scroll"
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
                  </List.Item>
                )}
              />
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
