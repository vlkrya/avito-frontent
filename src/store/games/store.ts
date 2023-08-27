import { Game, GameExpandedInfo } from '@/models';
import { api } from '../api';
import { GetGameByIdOptions, GetGamesOptions, GetGamesParams } from './types';
import { GamesApiBaseError } from '../types';

const gamesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getGames: builder.query<Game[], void>({
      query: () => {
        return 'games';
      },
    }),
    getGamesById: builder.query<GameExpandedInfo, GetGameByIdOptions>({
      query: ({ id }) => {
        return {
          method: 'GET',
          url: 'game',
          params: {
            id,
          },
        };
      },
    }),
    getFilteredGamesByGenresAndPlatform: builder.query<Game[], GetGamesOptions>(
      {
        query: ({ genres, platform }) => {
          if (!genres.length && !platform) {
            return 'games';
          }

          const params: GetGamesParams = {
            platform: platform || 'all',
          };

          if (genres.length) {
            params.category = genres.join(',');
          }

          return {
            method: 'GET',
            url: 'games',
            params: params,
          };
        },
        transformResponse(baseQueryReturnValue, meta) {
          if (meta?.response?.status === 201) {
            return [];
          }

          return baseQueryReturnValue as Game[];
        },
        transformErrorResponse(baseQueryReturnValue) {
          if (
            (baseQueryReturnValue.data as GamesApiBaseError)?.status_message
          ) {
            return (baseQueryReturnValue.data as GamesApiBaseError)
              .status_message;
          }

          return baseQueryReturnValue;
        },
      }
    ),
  }),
});

export { gamesApi };
