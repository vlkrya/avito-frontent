import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './Router.tsx';
import './index.css';
import './reset.css';

import { Provider } from 'react-redux';
import { store } from './store';
import { loadApp } from './store/app/middleware.ts';

// load app
store.dispatch(loadApp());

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router />
    </Provider>
  </React.StrictMode>
);
