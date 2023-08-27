import { API_KEY, API_URL } from '../config';
import {
  FetchArgs,
  createApi,
  fetchBaseQuery,
  retry,
} from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  headers: {
    'X-RapidAPI-Key': API_KEY,
  },
});

const baseQueryWithRetry = retry(
  async (args: string | FetchArgs, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);

    // Drop error if 404 -> no need to retry if nothings is found
    if (result.error?.status === 404) {
      retry.fail(result.error);
    }

    return result;
  },
  { maxRetries: 3 }
);

const KEEP_UNUSED_DATA_TIME = 5 * 60;

const api = createApi({
  baseQuery: baseQueryWithRetry,
  reducerPath: 'api',
  keepUnusedDataFor: KEEP_UNUSED_DATA_TIME,
  endpoints: () => ({}),
});

export { api };
