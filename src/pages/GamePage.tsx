import { useGetGamesByIdQuery } from '../store';
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import debounce from 'debounce';
import { Spin, Carousel, Button } from 'antd';
import { ROUTES } from '../config';
import { formateDate } from '../utils/formatDate';

const REFETCH_DEBOUNCE = 1000;

const GameInfo = ({ title, info }) => {
  return (
    <div>
      <span className="font-semibold">{title}:</span> {info}
    </div>
  );
};

function GamePage() {
  const navigate = useNavigate();
  const { gameId } = useParams();

  const redirectToMain = () => {
    navigate(ROUTES.index.redirect());
  };

  const { data, isLoading, isError, refetch } = useGetGamesByIdQuery({
    id: gameId!,
  });

  const debouncedRefetch = useMemo(
    () => debounce(refetch, REFETCH_DEBOUNCE),
    [refetch]
  );

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spin />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="p-4">
        Failed to fetch game!{' '}
        <Button onClick={debouncedRefetch}>Press to refetch</Button>
      </div>
    );
  }

  const { minimum_system_requirements: systemRequirements } = data;

  return (
    <div className="w-full h-full flex flex-col p-4 gap-2">
      <Button
        onClick={redirectToMain}
        className="w-full md:w-[200px]"
        type="link"
      >
        Return to the main page
      </Button>
      <section className="flex flex-col md:flex-row gap-2">
        <div className="w-full flex flex-1 items-start justify-center">
          <a href={data.game_url} target="_blank">
            <img
              alt={data.title}
              src={data.thumbnail}
              className="w-full rounded"
              height="auto"
              width="auto"
            />
          </a>
        </div>

        <div className="flex flex-col flex-[3] gap-4 text-[18px]">
          <h2 className="text-[32px] font-semibold">{data.title}</h2>
          <div>{data.description}</div>
          <div className="flex flex-col gap-2">
            <h2 className="text-[22px] font-semibold">General info:</h2>
            <GameInfo
              title="Release date"
              info={formateDate(data.release_date)}
            />
            <GameInfo title="Publisher" info={data.publisher} />
            <GameInfo title="Developer" info={data.developer} />
            <GameInfo title="Genre" info={data.genre} />
          </div>

          {systemRequirements && (
            <div className="flex flex-col gap-2">
              <h2 className="text-[22px] font-semibold">
                Minimum System Requirements:
              </h2>

              <GameInfo title="OS" info={systemRequirements.os} />
              <GameInfo title="Memory" info={systemRequirements.memory} />
              <GameInfo title="Processor" info={systemRequirements.processor} />
              <GameInfo title="Storage" info={systemRequirements.storage} />
            </div>
          )}

          <div className="flex flex-col gap-2">
            <h2 className="text-[22px] font-semibold">Screenshots:</h2>
            <div className="w-full max-w-full md:w-[600px]">
              <Carousel autoplay>
                {data.screenshots.map((screenshot) => (
                  <div key={screenshot.id} className="rounded">
                    <img src={screenshot.image} />
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default GamePage;
