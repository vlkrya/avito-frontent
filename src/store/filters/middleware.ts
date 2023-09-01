import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { filters } from '.';

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: isAnyOf(
    filters.actions.setGenre,
    filters.actions.setPage,
    filters.actions.setPlatform,
    filters.actions.setFilters
  ),
  effect: () => {
    alert('hi');
  },
});

export { listenerMiddleware };
