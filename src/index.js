import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from 'easy-peasy';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from './store';

const app = (
  <StoreProvider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StoreProvider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
