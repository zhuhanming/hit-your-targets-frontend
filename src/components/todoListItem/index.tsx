import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { getDisplayDate } from 'utils/timeUtils';
import { useTodo } from 'contexts/todoContext';

import './TodoListItem.scss';

const TodoListItem = ({ todo, isExpanded = false, currentKey, keyLimit }) => {
  const { title, completed, endTime, id } = todo;
  const [isChecked, setIsChecked] = useState(completed);
  const { updateTodo } = useTodo();
  const { displayDate, warning } = getDisplayDate(endTime);
  const handleCheck = async () => {
    try {
      await updateTodo(id, { completed: !completed });
      if (!isChecked) {
        toast.success(`👍 Great job! ${title} completed!`);
      } else {
        toast.error(`😮 Oh no, what happened?`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <li className="list-item">
      <input
        type="checkbox"
        className="is-checkradio is-success list-item__content__checkbox"
        id={id}
        name={id}
        defaultChecked={completed}
        onClick={handleCheck}
      />
      <label
        className={`list-item__content ${
          currentKey < keyLimit ? 'has-bottom-border' : ''
        }`}
        htmlFor={id}
      >
        <div
          className={`list-item__title ${completed ? 'has-text-success' : ''} `}
        >
          {title}
        </div>
        <div
          className={`list-item__date is-size-7 ${
            warning ? 'has-text-danger' : ''
          }`}
        >
          {displayDate}
        </div>
      </label>
    </li>
  );
};

export default TodoListItem;
