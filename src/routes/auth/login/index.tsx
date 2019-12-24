import React, { useReducer } from 'react';

import ErrorMessage from 'components/errorMessage';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const Login = () => {
  const [state, setState] = useReducer((s, a) => ({ ...s, ...a }), {
    email: null,
    isSignedUp: true,
    isError: false
  });

  return (
    <>
      <div className="columns is-marginless is-centered">
        <div className="column is-one-third-desktop is-half-tablet is-full-mobile">
          {state.isError && (
            <ErrorMessage message="Something went wrong. Please try again." />
          )}
          {state.isSignedUp && (
            <LoginForm
              email={state.email}
              handleError={() => setState({ isError: true })}
              handleChangeForm={data => {
                setState({ email: data, isSignedUp: false });
              }}
            />
          )}
          {!state.isSignedUp && (
            <SignupForm
              email={state.email}
              handleError={() => setState({ isError: true })}
              handleChangeForm={data => {
                setState({ email: data, isSignedUp: true });
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
