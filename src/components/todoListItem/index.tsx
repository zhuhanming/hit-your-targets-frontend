/* eslint-disable no-return-assign */
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { getDisplayDate, isWarning } from 'utils/timeUtils';
import { useTodo } from 'contexts/todoContext';

import './TodoListItem.scss';

const TodoListItem = ({ todo, isExpanded = false, currentKey, keyLimit }) => {
  const { title, completed, endTime, id, subtodos } = todo;
  const [isChecked, setIsChecked] = useState(completed);
  const { updateTodo } = useTodo();
  const displayDate = getDisplayDate(endTime);
  const hasSubtodos = subtodos.length > 0;
  const warning = isWarning(endTime);
  const handleCheck = async () => {
    if (!hasSubtodos) {
      try {
        setIsChecked(true);
        await updateTodo(id, { completed: !completed });
        toast.success(`👍 Great job! ${title} completed!`);
      } catch (error) {
        setIsChecked(false);
      }
    }
  };

  return (
    <li
      className={`list-item ${
        hasSubtodos && !isExpanded ? 'tooltip is-tooltip-bottom' : ''
      }`}
      data-tooltip="There are incomplete subtasks for this task."
    >
      <input
        type="checkbox"
        className="is-checkradio is-success list-item__content__checkbox"
        id={id}
        name={id}
        checked={isChecked}
        onChange={handleCheck}
        // eslint-disable-next-line no-param-reassign
        ref={el => el && (el.indeterminate = hasSubtodos)}
        disabled={hasSubtodos}
      />
      <label
        className={`list-item__content tooltip-container ${
          currentKey < keyLimit ? 'has-bottom-border' : ''
        }`}
        htmlFor={id}
      >
        <div
          className={`list-item__title ${isChecked ? 'has-text-success' : ''} `}
        >
          {title}
        </div>
        <div className={`list-item__date ${warning ? 'has-text-danger' : ''}`}>
          {displayDate}
        </div>
      </label>
    </li>
  );
};

export default TodoListItem;
