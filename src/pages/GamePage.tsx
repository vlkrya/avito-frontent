import { useGetGamesByIdQuery } from '../store';
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import debounce from 'debounce';
import { Spin, Carousel, Button } from 'antd';
import { ROUTES } from '../config';
import { formateDate } from '../utils/formatDate';
import { PageInfo } from '../ui';

const REFETCH_DEBOUNCE = 1000;

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

  return (
    <div className="w-full h-full flex flex-col p-4 gap-2">
      <Button
        onClick={redirectToMain}
        className="w-full md:w-[200px]"
        type="link"
      >
        Return to the main page
      </Button>
      {isLoading && (
        <div className="w-full h-full flex justify-center items-center">
          <Spin />
        </div>
      )}
      {(isError || !data) && (
        <div>
          Failed to fetch game!{' '}
          <Button onClick={debouncedRefetch}>Press to refetch</Button>
        </div>
      )}
      {data && (
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
              <PageInfo
                title="Release date"
                info={formateDate(data.release_date)}
              />
              <PageInfo title="Publisher" info={data.publisher} />
              <PageInfo title="Developer" info={data.developer} />
              <PageInfo title="Genre" info={data.genre} />
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-[22px] font-semibold">
                Minimum System Requirements:
              </h2>

              <PageInfo title="OS" info={data.minimum_system_requirements.os} />
              <PageInfo
                title="Memory"
                info={data.minimum_system_requirements.memory}
              />
              <PageInfo
                title="Processor"
                info={data.minimum_system_requirements.processor}
              />
              <PageInfo
                title="Storage"
                info={data.minimum_system_requirements.storage}
              />
            </div>

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
      )}
    </div>
  );
}

export default GamePage;
