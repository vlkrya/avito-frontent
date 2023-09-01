import { createAsyncThunk } from '@reduxjs/toolkit';

import { AppActionTypes } from './types';
import { getQueryState } from '../../utils';
import { setFilters } from '../filters';

// initialize app
const loadApp = createAsyncThunk(
  AppActionTypes.LOAD,
  async (_, { dispatch }) => {
    const query = getQueryState();

    const filters = {
      platform: query.get('platform'),
      page: Number(query.get('page')),
      genre: query.get('genre'),
    };

    await dispatch(setFilters(filters));
  }
);

export { loadApp };
