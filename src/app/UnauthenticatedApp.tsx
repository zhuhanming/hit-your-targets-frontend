import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import Login from 'routes/auth/login/';
// import Navbar from 'components/navbar';

import {
  LOGIN,
  // FACEBOOK_CALLBACK,
  ROOT
} from 'constants/routes';
// import FacebookCallback from 'routes/auth/facebookCallback';
import { useTheme } from 'contexts/themeContext';

const redirectToLogin = () => <Redirect to={LOGIN} />;

const UnauthenticatedApp = () => {
  const { theme } = useTheme();
  return (
    <Router>
      <div className={`app unauth ${theme}`}>
        {/* <Navbar isAuthenticated={false} /> */}
        <Switch>
          <Route path={LOGIN}>
            <Login />
          </Route>
          {/* <Route path={`${FACEBOOK_CALLBACK}`}> */}
          {/* <FacebookCallback /> */}
          {/* </Route> */}
          <Route path={ROOT} render={redirectToLogin} />
        </Switch>
      </div>
    </Router>
  );
};

export default UnauthenticatedApp;
