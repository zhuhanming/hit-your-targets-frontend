import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Navbar from 'components/navbar';
import Main from 'routes/main';
import Settings from 'routes/settings';
import List from 'routes/list';
import Kanban from 'routes/kanban';
import Calendar from 'routes/calendar';
import {
  UNAUTHED_ROUTES,
  ROOT,
  HOME,
  LIST,
  KANBAN,
  CALENDAR,
  SETTINGS,
} from 'constants/routes';
import { useTheme } from 'contexts/themeContext';

const redirectToRoot = (): React.ReactNode => <Redirect to={ROOT} />;
const redirectToHome = (): React.ReactNode => <Redirect to={HOME} />;

const AuthenticatedApp: React.SFC = () => {
  const { theme } = useTheme();
  return (
    <Router>
      <div className={`app ${theme}`}>
        <Navbar isAuthenticated />
        <Switch>
          <Route exact path={UNAUTHED_ROUTES} render={redirectToRoot} />
          <Route exact path={HOME} component={Main} />
          <Route exact path={SETTINGS} component={Settings} />
          <Route exact path={LIST} component={List} />
          <Route exact path={KANBAN} component={Kanban} />
          <Route exact path={CALENDAR} component={Calendar} />
          <Route exact path="/" render={redirectToHome} />
        </Switch>
      </div>
    </Router>
  );
};

export default AuthenticatedApp;
