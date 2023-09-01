import { createSlice } from '@reduxjs/toolkit';
import { FiltersState } from './types';

const initialState: FiltersState = {
  page: 1,
  platform: 'ALL',
  genre: null,
};

const filters = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setPage: (state, action) => {
      const { payload } = action;

      state.page = payload;
    },

    setPlatform: (state, action) => {
      const { payload } = action;

      state.platform = payload;
    },

    setGenre: (state, action) => {
      const { payload } = action;

      state.genre = payload;
    },

    setFilters(_, action) {
      const { payload } = action;
      const {
        page = initialState.page,
        platform = initialState.platform,
        genre = initialState.genre,
      } = payload;

      return {
        page,
        platform,
        genre,
      };
    },
  },
  extraReducers: () => {},
});

const { reducer, actions } = filters;
const { setFilters } = actions;

export { filters, setFilters };
export default reducer;
