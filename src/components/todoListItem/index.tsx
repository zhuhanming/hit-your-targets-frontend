/* eslint-disable no-nested-ternary */
/* eslint-disable no-return-assign */
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import moment from 'moment';
import * as Sentry from '@sentry/browser';

import { getDisplayDate, isWarning } from 'utils/timeUtils';
import { useTodo } from 'contexts/todoContext';
import ToDo from 'interfaces/ToDo';

import './TodoListItem.scss';

interface TodoListItemProps {
  todo: ToDo;
  isExpanded?: boolean;
  currentKey: number;
  keyLimit: number;
  setFocus?: (id: number | null) => void;
  focus?: null | number;
}

const TodoListItem: React.SFC<TodoListItemProps> = ({
  todo,
  isExpanded = false,
  currentKey,
  keyLimit,
  focus = null,
  setFocus = (id: number | null): void => {
    Sentry.captureMessage(
      `setFocus function has not been passed in correctly - todo id: ${id}`
    );
  }
}) => {
  const { title, completed, endTime, id, subtodos } = todo;
  const [isChecked, setIsChecked] = useState(completed);
  const isInFocus = focus === id;
  const { updateTodo } = useTodo();
  const displayDate = getDisplayDate(endTime);
  const hasSubtodos = subtodos.length > 0;
  const warning = isWarning(endTime);

  const handleCheck = async (): Promise<void> => {
    if (!isExpanded || isInFocus) {
      if (!hasSubtodos) {
        try {
          setIsChecked(true);
          await updateTodo(id, {
            completed: !completed,
            completeTime: moment().format()
          });
          if (!completed) {
            setFocus(null);
            toast.success(`👍 Great job! ${title} completed!`);
          } else {
            setFocus(null);
            toast.warn('😮 Oh dear, what happened?');
          }
        } catch (error) {
          setIsChecked(false);
        }
      }
    } else {
      setFocus(id);
    }
  };

  return (
    <li
      className={`list-item ${
        isInFocus
          ? 'tooltip is-tooltip-bottom'
          : hasSubtodos && !isExpanded
          ? 'tooltip is-tooltip-bottom'
          : ''
      }`}
      data-tooltip={`${
        hasSubtodos
          ? completed
            ? 'You can create new subtasks or uncheck completed ones.'
            : 'There are incomplete subtasks for this task.'
          : completed
          ? 'Click again to mark as undone.'
          : 'Click again to mark as done.'
      }`}
    >
      <input
        type="checkbox"
        className="is-checkradio is-success list-item__content__checkbox"
        id={id.toString()}
        name={id.toString()}
        checked={isChecked}
        onChange={handleCheck}
        // eslint-disable-next-line no-param-reassign
        ref={(el: HTMLInputElement): boolean =>
          // eslint-disable-next-line no-param-reassign
          el && (el.indeterminate = hasSubtodos && !completed)
        }
        disabled={
          (!isExpanded && hasSubtodos) ||
          (isExpanded && isInFocus && hasSubtodos)
        }
      />
      <label
        className={`list-item__content tooltip-container ${
          isInFocus ? 'is-in-focus' : ''
        } ${
          currentKey < keyLimit
            ? 'has-bottom-border'
            : isExpanded
            ? ''
            : 'not-expanded'
        } `}
        htmlFor={id.toString()}
      >
        <div
          className={`list-item__title ${isChecked ? 'has-text-success' : ''} `}
        >
          {title}
        </div>
        <div
          className={`list-item__date ${
            completed
              ? 'has-text-success '
              : warning
              ? 'has-text-danger'
              : isInFocus
              ? 'is-in-focus'
              : ''
          }`}
        >
          {displayDate}
        </div>
      </label>
    </li>
  );
};

export default TodoListItem;
