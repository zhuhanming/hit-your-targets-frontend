import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { getDisplayDate, isWarning } from 'utils/timeUtils';
import { useTodo } from 'contexts/todoContext';

import './TodoListItem.scss';

const TodoListItem = ({ todo, isExpanded = false, currentKey, keyLimit }) => {
  const { title, completed, endTime, id } = todo;
  const [isChecked, setIsChecked] = useState(completed);
  const { updateTodo } = useTodo();
  const displayDate = getDisplayDate(endTime);
  const warning = isWarning(endTime);
  const handleCheck = async () => {
    try {
      setIsChecked(true);
      await updateTodo(id, { completed: !completed });
      toast.success(`👍 Great job! ${title} completed!`);
    } catch (error) {
      setIsChecked(false);
    }
  };

  return (
    <li className="list-item">
      <input
        type="checkbox"
        className="is-checkradio is-success list-item__content__checkbox"
        id={id}
        name={id}
        checked={isChecked}
        onChange={handleCheck}
      />
      <label
        className={`list-item__content ${
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
