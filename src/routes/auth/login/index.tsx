import React, { useReducer } from 'react';

import ErrorMessage from 'components/errorMessage';
import BrandLogo from 'components/svgr/BrandLogo';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

import '../Auth.scss';

const Login = () => {
  const [state, setState] = useReducer((s, a) => ({ ...s, ...a }), {
    email: null,
    isSignedUp: true,
    isError: false
  });

  return (
    <>
      <div className="auth columns is-marginless is-centered is-vcentered">
        <div className="column is-one-third-desktop is-half-tablet is-full-mobile">
          <div className="columns is-marginless is-centered is-multiline">
            <div className="column is-full is-paddingless">
              <div className="columns is-centered is-marginless is-paddingless auth__brand-logo">
                <div className="column is-one-fifth is-one-fifth-mobile is-paddingless">
                  <BrandLogo style={{ width: '100%', height: 'auto' }} />
                </div>
              </div>
            </div>
            <div className="column is-full">
              <div className="box is-slightly-transparent">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
