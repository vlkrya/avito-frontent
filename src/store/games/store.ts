import { api } from '../api';

const gamesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getGames: builder.query({
      query: () => 'games',
    }),
  }),
});

export { gamesApi };
