/* eslint-disable no-nested-ternary */
/* eslint-disable no-return-assign */
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import moment from 'moment';
import * as Sentry from '@sentry/react';

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

// Individual list item in a todo list - used in Main and List View
const TodoListItem: React.FunctionComponent<TodoListItemProps> = ({
  todo,
  isExpanded = false, // isExpanded is true for List View
  currentKey,
  keyLimit,
  focus = null,
  setFocus = (id: number | null): void => {
    // Initial declaration
    Sentry.captureMessage(
      `setFocus function has not been passed in correctly - todo id: ${id}`
    );
  },
}) => {
  const { title, completed, endTime, id, subtodos } = todo;
  const [isChecked, setIsChecked] = useState(completed);
  const isInFocus = focus === id;
  const { updateTodo } = useTodo();
  const displayDate = getDisplayDate(endTime);
  const hasSubtodos = subtodos.length > 0;
  const warning = isWarning(endTime);

  // Handle change in completion status of task
  const handleCheck = async (): Promise<void> => {
    // If the click happened in Main OR in List View but the task is already in focus
    if (!isExpanded || isInFocus) {
      // Tasks cannot be completed directly when they have subtasks
      if (!hasSubtodos) {
        try {
          setIsChecked(true);
          await updateTodo(id, {
            completed: !completed,
            completeTime: moment().format(),
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
      // Set List View focus to this task
      setFocus(id);
    }
  };

  // Uses tooltips fervently to indicate to users what can or cannot be done
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
        // Shows interminate state if subtasks are found
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
