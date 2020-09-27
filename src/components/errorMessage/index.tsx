import React from 'react';

interface ErrorMessageProps {
  message?: string;
  className?: string;
}

const ErrorMessage: React.FunctionComponent<ErrorMessageProps> = ({
  message = 'Failed to fetch some data. Please refresh the page to try again.',
  className = '',
}) => {
  return (
    <article className={`${className} errorMessage message is-danger`}>
      <div className="errorMessage__message message-body">{message}</div>
    </article>
  );
};

export default ErrorMessage;
