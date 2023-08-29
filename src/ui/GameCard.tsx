import { Game } from '../models';
import { formateDate } from '../utils/formatDate';
import { Card } from 'antd';
import Meta from 'antd/es/card/Meta';

type GameCardProps = {
  game: Game;
  onClick: VoidFunction;
};

function GameCard(props: GameCardProps) {
  const { onClick, game } = props;

  return (
    <Card
      hoverable
      size="small"
      className="h-full w-full overflow-scroll"
      onClick={onClick}
      cover={<img alt={game.title} src={game.thumbnail} />}
    >
      <Meta title={game.title} description={game.short_description} />
      <div className="flex flex-col gap-[2px] text-[14px] mt-2">
        <div>{game.publisher}</div>
        <div>{game.genre}</div>
        <div>{formateDate(game.release_date)}</div>
      </div>
    </Card>
  );
}

export type { GameCardProps };
export { GameCard };
