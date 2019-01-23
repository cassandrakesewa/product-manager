import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import reducer from './store/reducers/reducer';
import { loadState, saveState } from './localStorage';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedState = loadState();

const store = createStore(reducer, persistedState, composeEnhancers(applyMiddleware(thunk)));

store.subscribe(() => {
  // console.log("savesate", store.getState());
  saveState(
    store.getState()
  );
})

const app = (
    <Provider store={store}>
      <BrowserRouter> 
        <App />
      </BrowserRouter>
    </Provider>
);

ReactDOM.render(
  app,
  document.getElementById('root')
);

registerServiceWorker();

