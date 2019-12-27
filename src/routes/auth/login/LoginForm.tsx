import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useAuth } from 'contexts/authContext';
import { useTheme } from 'contexts/themeContext';
import { emailRegex } from 'constants/regex';

import '../styles.scss';

type LoginFormProps = {
  email: string | null;
  handleError: Function;
  handleChangeForm: Function;
};

const LoginForm = ({
  email,
  handleError,
  handleChangeForm
}: LoginFormProps) => {
  const { login } = useAuth();
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  const getDefaultValues = () => {
    if (email) return { email };
    return {};
  };

  const { register, handleSubmit: validateInputs, getValues, errors } = useForm(
    {
      defaultValues: getDefaultValues()
    }
  );

  const handleLogin = async data => {
    setIsLoading(true);
    await login(data).catch(() => {
      handleError();
      setIsLoading(false);
    });
  };

  const onChangeForm = () => {
    const value = getValues().email;
    handleChangeForm(value);
  };

  return (
    <>
      <h1 className="title auth__title is-4">Login</h1>
      <form className="form" onSubmit={validateInputs(handleLogin)}>
        <div className="field">
          <label className="form__label label" htmlFor="email">
            Email
          </label>
          <div className="control">
            <input
              id="email"
              className={`input ${errors.email ? 'is-danger' : ''}`}
              type="text"
              placeholder="Email"
              name="email"
              ref={register({
                required: 'This field is required',
                validate: value => {
                  if (!value.match(emailRegex)) {
                    return 'Your email address is not of the correct format';
                  }

                  return true;
                }
              })}
            />
            {errors.email && (
              <p className="help is-danger">{(errors.email as any).message}</p>
            )}
          </div>
        </div>
        <div className="field">
          <label className="form__label label" htmlFor="password">
            Password
          </label>
          <div className="control">
            <input
              id="password"
              className={`input ${errors.password ? 'is-danger' : ''}`}
              type="password"
              placeholder="Password"
              name="password"
              ref={register({ required: 'This field is required' })}
            />
          </div>
          {errors.password && (
            <p className="help is-danger">{(errors.password as any).message}</p>
          )}
        </div>

        <div className="field">
          <div className="control">
            <button
              type="submit"
              className={`form__button button ${theme} ${
                isLoading ? 'is-loading' : ''
              }`}
            >
              <strong>Login Now</strong>
            </button>
          </div>
        </div>
      </form>
      <button
        onClick={onChangeForm}
        type="button"
        className="as-non-button auth__toggle is-size-7"
      >
        <span>Don&apos;t have an account?</span>
      </button>
    </>
  );
};

export default LoginForm;
