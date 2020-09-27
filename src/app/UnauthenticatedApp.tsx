import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Login from 'routes/auth/login/';

import { LOGIN, ROOT } from 'constants/routes';
import { useTheme } from 'contexts/themeContext';

const redirectToLogin = (): React.ReactNode => <Redirect to={LOGIN} />;

const UnauthenticatedApp: React.FunctionComponent = () => {
  const { theme } = useTheme();
  return (
    <Router>
      <div className={`app unauth ${theme}`}>
        <Switch>
          <Route path={LOGIN}>
            <Login />
          </Route>
          <Route path={ROOT} render={redirectToLogin} />
        </Switch>
      </div>
    </Router>
  );
};

export default UnauthenticatedApp;
