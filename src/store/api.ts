import { API_KEY, API_URL } from '../config';
import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  headers: {
    'X-RapidAPI-Key': API_KEY,
  },
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 3 });

const api = createApi({
  baseQuery: baseQueryWithRetry,
  reducerPath: 'api',
  endpoints: () => ({}),
});

export { api };
