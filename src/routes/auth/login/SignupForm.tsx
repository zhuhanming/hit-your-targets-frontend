import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useAuth } from 'contexts/authContext';

import './SignupForm.scss';

type SignupFormProps = {
  email: string | null;
  handleError: Function;
  handleChangeForm: Function;
};

const SignupForm = ({
  email,
  handleError,
  handleChangeForm
}: SignupFormProps) => {
  const { signup } = useAuth();
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

  const handleSignup = async data => {
    setIsLoading(true);
    await signup(data).catch(() => {
      handleError();
    });
  };

  const onChangeForm = () => {
    const value = getValues().email;
    handleChangeForm(value);
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleSignup)}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          ref={register({ required: 'This field is required', maxLength: 80 })}
        />
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
        <input
          type="password"
          placeholder="Confirm Password"
          name="passwordConfirmation"
          ref={register({ required: 'This field is required' })}
        />

        <button type="submit" className={`${isLoading ? 'is-loading' : ''}`}>
          Sign Up
        </button>
      </form>
      <button onClick={onChangeForm} type="button" className="as-non-button">
        <span>I already have an account</span>
      </button>
    </>
  );
};

export default SignupForm;
