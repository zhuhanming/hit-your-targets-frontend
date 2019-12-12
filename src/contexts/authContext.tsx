import React from 'react';
import { useAsync } from 'react-async';

import AuthContextInterface from 'interfaces/AuthContext';
import AuthService from 'services/AuthService';
import Loading from 'components/loading';


const AuthContext = React.createContext<AuthContextInterface | undefined>(undefined);

const AuthProvider = props => {
  const [firstAttemptFinished, setFirstAttemptFinished] = React.useState(false);
  const {
    data = null,
    error,
    isRejected,
    isPending,
    isSettled,
    reload
  } = useAsync({
    promiseFn: AuthService.getUser
  });

  React.useLayoutEffect(() => {
    if (isSettled) {
      setFirstAttemptFinished(true);
    }
  }, [isSettled]);

  if (!firstAttemptFinished) {
    if (isPending) {
      return <Loading />;
    }
    if (isRejected && error) {
      return (
        <div>
          <p>There&apos;s a problem. Try refreshing the app.</p>
          <pre>{error.message}</pre>
        </div>
      )
    }
  }

  const login = code =>
    AuthService.login(code)
      .then(reload)
      .catch(e => {
        return Promise.reject(new Error(e));
      }
      );

  const logout = () => AuthService.logout().then(reload);

  return (
    <AuthContext.Provider
      value={{ data, login, logout }}
      {...props}
    />
  );
};

const useAuth = () =>{
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
};

export { AuthProvider, useAuth };