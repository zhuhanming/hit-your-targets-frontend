import React from 'react';
import { 
  BrowserRouter as Router, 
  Switch, 
  Route, 
  Redirect 
} from 'react-router-dom';
// import Navbar from 'components/navbar';
import { 
  UNAUTHED_ROUTES, 
  ROOT, 
  HOME, 
  LIST, 
  KANBAN, 
  CALENDAR, 
  SETTINGS 
} from 'constants/routes';

const redirectToRoot = () => <Redirect to={ROOT} />;
const redirectToHome = () => <Redirect to={HOME} />

const AuthenticatedApp = () => {
  // const user = useUser();

  return (
    <Router>
      <div className="app">
        {/* <Navbar /> */}
        <Switch>
          <Route exact path={UNAUTHED_ROUTES} render={redirectToRoot} />
          {/* <Route exact path={HOME} component={Main} />
          <Route exact path={SETTINGS} component={Settings} />
          <Route exact path={LIST} component={List} />
          <Route exact path={KANBAN} component={Kanban} />
          <Route exact path={CALENDAR} component={Calendar} /> */}
          <Route exact path="/" render={redirectToHome} />
        </Switch>
      </div>
    </Router>
  )
}