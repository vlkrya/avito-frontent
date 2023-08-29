import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './Router.tsx';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store';

import 'antd/dist/reset.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router />
    </Provider>
  </React.StrictMode>
);
