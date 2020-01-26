import React from 'react';

import './ConfirmationModalBody.scss';

interface ConfirmationModalBodyProps {
  message: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  handleConfirm: VoidFunction;
  handleCancel: VoidFunction;
  confirmButtonClassName?: string;
  cancelButtonClassName?: string;
}

const ConfirmationModalBody: React.SFC<ConfirmationModalBodyProps> = ({
  message,
  confirmButtonText = 'Confirm',
  cancelButtonText = 'Cancel',
  handleConfirm,
  handleCancel,
  confirmButtonClassName = '',
  cancelButtonClassName = ''
}) => {
  return (
    <div className="confirmation-modal-body">
      <div className="confirmation-modal-body__header">
        <h1 className="title is-4">Are you sure?</h1>
      </div>
      <div className="confirmation-modal-body__message">
        <h2 className="subtitle is-6">{message}</h2>
      </div>
      <div className="confirmation-modal-body__buttons">
        <button
          onClick={handleConfirm}
          type="button"
          className={`confirmation-modal-body__button button ${confirmButtonClassName}`}
        >
          {confirmButtonText}
        </button>
        <button
          onClick={handleCancel}
          type="button"
          className={`confirmation-modal-body__button button ${cancelButtonClassName}`}
        >
          {cancelButtonText}
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModalBody;
