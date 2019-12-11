import React from 'react';
import ReactDOM from 'react-dom';
import whyDidYouRender from '@welldone-software/why-did-you-render';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import App from 'app';
// import AppProviders from 'contexts';


import * as serviceWorker from './serviceWorker';
import './index.css';

import store, { persistor } from 'app/store';

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        {/* <AppProviders> */}
        <App />
        {/* </AppProviders> */}
      </PersistGate>
    </Provider>,
    document.getElementById('root')
  );
};

render();

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./app/App', render);
  whyDidYouRender(React);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
