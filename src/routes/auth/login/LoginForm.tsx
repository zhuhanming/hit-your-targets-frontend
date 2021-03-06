import React, { useState } from 'react';
import { useForm, FieldError, DeepPartial } from 'react-hook-form';

import { useAuth } from 'contexts/authContext';
import { useTheme } from 'contexts/themeContext';
import { emailRegex } from 'constants/regex';
import { LoginCode } from 'interfaces/AuthContext';

import '../Auth.scss';

type LoginFormProps = {
  email: string | null;
  handleError: (e: Error) => void;
  handleChangeForm: (value: string) => void;
};

const LoginForm: React.FunctionComponent<LoginFormProps> = ({
  email,
  handleError,
  handleChangeForm,
}) => {
  const { login } = useAuth();
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  const getDefaultValues = (): DeepPartial<LoginCode> => {
    if (email) return { email, password: '' };
    return {};
  };

  const { register, handleSubmit: validateInputs, getValues, errors } = useForm(
    {
      defaultValues: getDefaultValues(),
    }
  );

  const handleLogin = async (data: LoginCode): Promise<void> => {
    setIsLoading(true);
    // eslint-disable-next-line no-param-reassign
    data = { ...data, email: data.email.toLowerCase() };
    await login(data).catch((e) => {
      handleError(e);
      setIsLoading(false);
    });
  };

  // Pass the email on to the signup form
  const onChangeForm = (): void => {
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
                validate: (value) => {
                  if (!value.match(emailRegex)) {
                    return 'Your email address is not of the correct format!';
                  }

                  return true;
                },
              })}
            />
            {errors.email && (
              <p className="help is-danger">
                {(errors.email as FieldError).message}
              </p>
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
            <p className="help is-danger">
              {(errors.password as FieldError).message}
            </p>
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
