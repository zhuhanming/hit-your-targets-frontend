import React from 'react';

import './ConfirmationModalBody.scss';

const ConfirmationModalBody = ({
  message,
  confirmButtonText = 'Confirm',
  cancelButtonText = 'Cancel',
  handleConfirm,
  handleCancel
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
          className="confirmation-modal-body__button button is-primary"
        >
          {confirmButtonText}
        </button>
        <button
          onClick={handleCancel}
          type="button"
          className="confirmation-modal-body__button button is-light"
        >
          {cancelButtonText}
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModalBody;
