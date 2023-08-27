import { Layout } from './layout';
import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ROUTES } from './config';

const IndexPage = lazy(() => import('./pages/IndexPage'));
const GamePage = lazy(() => import('./pages/GamePage'));

const router = createBrowserRouter([
  {
    path: ROUTES.index.path,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <IndexPage />,
      },
      {
        path: ROUTES.games.path,
        element: <GamePage />,
      },
    ],
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
