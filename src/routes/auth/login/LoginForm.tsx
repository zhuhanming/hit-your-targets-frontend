import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useAuth } from 'contexts/authContext';

import './LoginForm.scss';

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
  const [isLoading, setIsLoading] = useState(false);

  const getDefaultValues = () => {
    if (email) return { email };
    return {};
  };

  const {
    register,
    handleSubmit,
    getValues
    // errors
  } = useForm({
    defaultValues: getDefaultValues()
  });

  const handleLogin = async data => {
    setIsLoading(true);
    await login(data).catch(() => {
      handleError();
    });
  };

  const onChangeForm = () => {
    const value = getValues().email;
    handleChangeForm(value);
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleLogin)}>
        <input
          type="email"
          placeholder="Email"
          name="email"
          ref={register({
            required: 'This field is required',
            pattern: /^\S+@\S+$/i
          })}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          ref={register({ required: 'This field is required' })}
        />

        <button type="submit" className={`${isLoading ? 'is-loading' : ''}`}>
          Login
        </button>
      </form>
      <button onClick={onChangeForm} type="button" className="as-non-button">
        <span>Don&apos;t have an account?</span>
      </button>
    </>
  );
};

export default LoginForm;
