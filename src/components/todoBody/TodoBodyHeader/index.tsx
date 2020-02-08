/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import moment from 'moment';
import { toast } from 'react-toastify';
import * as Sentry from '@sentry/browser';

import { useTodo } from 'contexts/todoContext';
import Modal from 'components/modal';
import ConfirmationModalBody from 'components/confirmationModalBody';
import ToDo from 'interfaces/ToDo';

import '../TodoBody.scss';

interface TodoBodyHeaderProps {
  todo: ToDo;
  setFocus: (id: number | null) => void;
  isMobile: boolean;
}

const TodoBodyHeader: React.SFC<TodoBodyHeaderProps> = ({
  todo,
  setFocus,
  isMobile
}) => {
  const { updateTodo, deleteTodo } = useTodo();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { title, id, subtodos, completed, updatedAt } = todo;
  const hasSubtodos = subtodos.length > 0;

  const handleComplete = async (): Promise<void> => {
    if (Array.isArray(subtodos) && subtodos.length === 0) {
      try {
        await updateTodo(id, {
          completed: !completed,
          completeTime: moment().format()
        });
        if (!completed) {
          toast.success(`👍 Great job! ${title} completed!`);
        } else {
          toast.warn("Don't lose heart!");
        }
        if (!isMobile) setFocus(null);
      } catch (error) {
        Sentry.captureException(error);
      }
    }
  };

  const deleteItem = async (): Promise<void> => {
    try {
      await deleteTodo(id);
      toast.success(`${title} has been deleted!`);
      setFocus(null);
    } catch (error) {
      Sentry.captureException(error);
    }
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        handleClose={(): void => setIsModalOpen(false)}
      >
        <ConfirmationModalBody
          message="Are you sure you want to delete this task? You cannot undo this action."
          handleConfirm={deleteItem}
          handleCancel={(): void => setIsModalOpen(false)}
          confirmButtonClassName="is-danger"
          cancelButtonClassName="is-light"
          confirmButtonText="Delete"
        />
      </Modal>
      <div className="todo-body__top-bar">
        <div className="todo-body__completed">
          <input
            className="is-checkradio is-success"
            id="completed-checkbox"
            type="checkbox"
            name="completed"
            checked={completed}
            onChange={handleComplete}
            // eslint-disable-next-line no-param-reassign
            ref={(el: HTMLInputElement): boolean =>
              // eslint-disable-next-line no-param-reassign
              el && (el.indeterminate = hasSubtodos && !completed)
            }
            disabled={hasSubtodos}
          />
          {/*  eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="completed-checkbox" />
          <p className="todo-body__completed__header">
            <span className="todo-body__completed__sep"> | </span>
            {`Last updated ${moment(updatedAt).fromNow()}`}
          </p>
        </div>
        <button type="button" onClick={(): void => setIsModalOpen(true)}>
          <i className="fas fa-trash" />
        </button>
      </div>
    </>
  );
};

export default TodoBodyHeader;
