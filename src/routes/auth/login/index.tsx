import React, { useReducer } from 'react';

import ErrorMessage from 'components/errorMessage';
import BrandLogo from 'components/svgr/BrandLogo';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

import '../Auth.scss';

const Login: React.FunctionComponent = () => {
  const [state, setState] = useReducer(
    (
      s: {
        email: string | null;
        isSignedUp: boolean;
        isError: boolean;
        errorMessage: string | null;
      },
      a: {
        email?: string | null;
        isSignedUp?: boolean;
        isError?: boolean;
        errorMessage?: string | null;
      }
    ) => ({ ...s, ...a }),
    {
      email: null,
      isSignedUp: true,
      isError: false,
      errorMessage: null,
    }
  );

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
                  <ErrorMessage
                    message={`${
                      state.errorMessage
                        ? state.errorMessage
                        : 'Something went wrong. Please try again.'
                    }`}
                  />
                )}
                {state.isSignedUp && (
                  <LoginForm
                    email={state.email}
                    handleError={(e: Error): void =>
                      setState({ isError: true, errorMessage: e.message })
                    }
                    handleChangeForm={(data: string): void => {
                      setState({
                        email: data,
                        isSignedUp: false,
                        isError: false,
                        errorMessage: null,
                      });
                    }}
                  />
                )}
                {!state.isSignedUp && (
                  <SignupForm
                    email={state.email}
                    handleError={(e: Error): void =>
                      setState({ isError: true, errorMessage: e.message })
                    }
                    handleChangeForm={(data: string): void => {
                      setState({
                        email: data,
                        isSignedUp: true,
                        isError: false,
                        errorMessage: null,
                      });
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
