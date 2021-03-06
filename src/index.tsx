import React from 'react';
import ReactDOM from 'react-dom';
import whyDidYouRender from '@welldone-software/why-did-you-render';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

import App from 'app';
import AppProviders from 'contexts';
import store, { persistor } from 'app/store';

import * as serviceWorker from './serviceWorker';
import './index.scss';

Sentry.init({
  dsn: 'https://1b70d05e3e604dc2b6b0765b3a258621@sentry.io/1971017',
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

toast.configure({
  position: 'bottom-center',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
});

Modal.setAppElement('#root');

const render = (): void => {
  ReactDOM.render(
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppProviders>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AppProviders>
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
