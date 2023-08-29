import { Game } from '../models';
import { GameCard } from '../ui';
import { List } from 'antd';

type GameListProps = {
  games: Game[];
  onCardClick: (id: number) => VoidFunction;
};

function GameList(props: GameListProps) {
  const { games, onCardClick } = props;
  return (
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
      dataSource={games}
      renderItem={(game) => (
        <List.Item className="w-full h-full">
          <GameCard game={game} onClick={onCardClick(game.id)} />
        </List.Item>
      )}
    />
  );
}

export { GameList };
