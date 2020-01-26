import React from 'react';
import ReactModal from 'react-modal';

import './Modal.scss';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  handleClose: VoidFunction;
}

const Modal: React.SFC<ModalProps> = ({ children, isOpen, handleClose }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      closeTimeoutMS={200}
      className="modal__content"
      overlayClassName="modal__overlay"
      onRequestClose={handleClose}
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
