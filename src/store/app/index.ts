import { createSlice } from '@reduxjs/toolkit';
import { loadApp } from './middleware';

import { AppState } from './types';

const initialState: AppState = {
  isLoading: true,
};

const search = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadApp.fulfilled, (state) => {
      state.isLoading = false;
    });
  },
});

const { reducer } = search;

export default reducer;

export * from './middleware';

export * from './types';
