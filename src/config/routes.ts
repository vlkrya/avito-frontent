const ROUTES = {
  index: {
    path: '/',
    redirect: () => '/',
  },
  games: {
    path: '/game/:gameId',
    redirect: (id: number) => `/game/${id}`,
  },
};

export { ROUTES };
