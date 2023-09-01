import {
  Action,
  ThunkAction,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import { api } from './api';
import app from './app';
import filters from './filters';

const reducer = combineReducers({
  [api.reducerPath]: api.reducer,
  app,
  filters,
});

const store = configureStore({
  reducer,
  devTools: import.meta.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

type AppDispatch = typeof store.dispatch;
type RootState = ReturnType<typeof store.getState>;
type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type { AppDispatch, RootState, AppThunk };
export { store };
export * from './games';
