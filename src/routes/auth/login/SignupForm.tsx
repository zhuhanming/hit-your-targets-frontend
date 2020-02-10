import React, { useState } from 'react';
import { useForm, DeepPartial, FieldError } from 'react-hook-form';

import { useAuth } from 'contexts/authContext';
import { useTheme } from 'contexts/themeContext';
import { emailRegex } from 'constants/regex';
import { SignupCode } from 'interfaces/AuthContext';
import { capitalize } from 'utils';

import '../Auth.scss';

type SignupFormProps = {
  email: string | null;
  handleError: Function;
  handleChangeForm: Function;
};

const SignupForm: React.SFC<SignupFormProps> = ({
  email,
  handleError,
  handleChangeForm
}) => {
  const { signup } = useAuth();
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  const getDefaultValues = (): DeepPartial<SignupCode> => {
    if (email)
      return { email, name: '', password: '', passwordConfirmation: '' };
    return {};
  };

  const {
    register,
    handleSubmit: validateInputs,
    getValues,
    errors,
    watch
  } = useForm({
    defaultValues: getDefaultValues()
  });

  const handleSignup = async (data: SignupCode): Promise<void> => {
    setIsLoading(true);
    // eslint-disable-next-line no-param-reassign
    data = {
      ...data,
      email: data.email.toLowerCase(),
      name: capitalize(data.name)
    };
    await signup(data).catch(e => {
      handleError(e);
      setIsLoading(false);
    });
  };

  // Pass the email on to the login form
  const onChangeForm = (): void => {
    const value = getValues().email;
    handleChangeForm(value);
  };

  return (
    <>
      <h1 className="title auth__title is-4">Sign Up</h1>
      <form className="form" onSubmit={validateInputs(handleSignup)}>
        <div className="field">
          <label className="form__label label" htmlFor="name">
            Name
          </label>
          <div className="control">
            <input
              id="name"
              className={`input ${errors.name ? 'is-danger' : ''}`}
              type="text"
              placeholder="Name"
              name="name"
              ref={register({
                required: 'This field is required',
                validate: (value: string) => {
                  if (value.length > 50) {
                    return 'Your name cannot be longer than 50 characters';
                  }

                  return true;
                }
              })}
            />
            {errors.name && (
              <p className="help is-danger">
                {(errors.name as FieldError).message}
              </p>
            )}
          </div>
        </div>
        <div className="field">
          <label className="form__label label" htmlFor="email">
            Email
          </label>
          <div className="control">
            <input
              id="email"
              type="text"
              placeholder="Email"
              className={`input ${errors.email ? 'is-danger' : ''}`}
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
              ref={register({
                required: 'This field is required',
                validate: (value: string) => {
                  if (value.length < 8) {
                    return 'Your password should have more than 8 characters';
                  }
                  return true;
                }
              })}
            />
            {errors.password && (
              <p className="help is-danger">
                {(errors.password as FieldError).message}
              </p>
            )}
          </div>
        </div>
        <div className="field">
          <label className="form__label label" htmlFor="passwordConfirmation">
            Password Confirmation
          </label>
          <div className="control">
            <input
              id="passwordConfirmation"
              className={`input ${
                errors.passwordConfirmation ? 'is-danger' : ''
              }`}
              type="password"
              placeholder="Confirm Password"
              name="passwordConfirmation"
              ref={register({
                required: 'This field is required',
                validate: (value: string) => {
                  if (value !== watch('password')) {
                    return 'Your password confirmation does not match your password';
                  }
                  return true;
                }
              })}
            />
            {errors.passwordConfirmation && (
              <p className="help is-danger">
                {(errors.passwordConfirmation as FieldError).message}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className={`form__button button ${theme} ${
            isLoading ? 'is-loading' : ''
          }`}
        >
          <strong>Get Started</strong>
        </button>
      </form>
      <button
        onClick={onChangeForm}
        type="button"
        className="as-non-button auth__toggle is-size-7"
      >
        <span>I already have an account</span>
      </button>
    </>
  );
};

export default SignupForm;
