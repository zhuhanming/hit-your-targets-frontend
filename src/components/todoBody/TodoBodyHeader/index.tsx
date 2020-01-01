/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import moment from 'moment';
import { toast } from 'react-toastify';

import { useTodo } from 'contexts/todoContext';

import '../TodoBody.scss';

const TodoBodyHeader = ({ todo, setFocus, isMobile }) => {
  const { updateTodo, deleteTodo } = useTodo();

  const { title, id, subtodos, completed, updatedAt } = todo;
  const hasSubtodos = subtodos.length > 0;

  const handleComplete = () => {
    if (Array.isArray(subtodos) && subtodos.length === 0) {
      updateTodo(id, {
        completed: !completed,
        completeTime: moment().format()
      });
      if (!completed) {
        toast.success(`👍 Great job! ${title} completed!`);
      } else {
        toast.warn("Don't lose heart!");
      }
      if (!isMobile) setFocus(null);
    }
  };

  const deleteItem = () => {
    const toDelete = window.confirm(
      'Are you sure you want to delete this task? You cannot undo this action.'
    );
    if (toDelete)
      try {
        deleteTodo(id);
        toast.success(`${title} has been deleted!`);
        setFocus(null);
      } catch (error) {
        console.log(error.message);
      }
  };

  return (
    <>
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
            ref={el => el && (el.indeterminate = hasSubtodos && !completed)}
            disabled={hasSubtodos}
          />
          {/*  eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="completed-checkbox" />
          <p className="todo-body__completed__header">
            <span className="todo-body__completed__sep"> | </span>
            {`Last updated ${moment(updatedAt).fromNow()}`}
          </p>
        </div>
        <button type="button" onClick={deleteItem}>
          <i className="fas fa-trash" />
        </button>
      </div>
    </>
  );
};

export default TodoBodyHeader;
