import React from 'react';

// import { retryPromise } from 'utils';
import { useUser } from 'contexts/userContext';
import Loading from 'components/loading';
import './App.scss';

const loadAuthenticatedApp = () => import('./AuthenticatedApp');
const AuthenticatedApp = React.lazy(loadAuthenticatedApp);
const UnauthenticatedApp = React.lazy(() => import('./UnauthenticatedApp'));

const App: React.FC = () => {
  const user = useUser();

  React.useEffect(() => {
    loadAuthenticatedApp();
  }, []);

  return (
    <React.Suspense fallback={<Loading className="app unauth" />}>
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  );
};

export default App;
