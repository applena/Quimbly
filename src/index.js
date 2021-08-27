import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';

import './reset.scss';
import './global.scss';

import createStore from './store/index.js';
const store = createStore();

function Main() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<Main />, rootElement);

