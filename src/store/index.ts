import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {},
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
