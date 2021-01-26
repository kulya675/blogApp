import React from 'react';
import ReactDOM from 'react-dom';

import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import { store } from './redux/store';

import App from './components/App/App';

import './index.scss';

ReactDOM.render(
  <Provider store={store}>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </Provider>,
  document.getElementById('root')
);
