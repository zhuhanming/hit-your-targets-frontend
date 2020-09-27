import React, { useState } from 'react';
import { toast } from 'react-toastify';
import * as Sentry from '@sentry/react';
import moment from 'moment';

import SubToDo from 'interfaces/SubToDo';
import { getDisplayDate, isWarning } from 'utils/timeUtils';
import { useTodo } from 'contexts/todoContext';

import './KanbanPanelSubtodoItem.scss';

interface KanbanPanelSubtodoItem {
  subtodo: SubToDo;
  todoId: number;
  todoTitle: string;
  isOneAwayFromCompletion: boolean;
  isFullyCompleted: boolean;
}

const KanbanPanelSubtodoItem: React.FunctionComponent<KanbanPanelSubtodoItem> = ({
  todoId,
  todoTitle,
  subtodo,
  isOneAwayFromCompletion,
  isFullyCompleted,
}) => {
  const { updateSubTodo, updateTodo } = useTodo();
  const { id, title, endTime, completed } = subtodo;
  const [isChecked, setIsChecked] = useState(completed);
  const displayDate = getDisplayDate(endTime);
  const warning = isWarning(endTime);

  // Check if change in completion is valid, then make the changes
  const handleComplete = async (): Promise<void> => {
    try {
      await updateSubTodo(todoId, id, {
        completed: !completed,
      });
      // Todo will have to change its status
      // If last subtodo left is completed, then todo is now completed
      // If todo was originally complete, the subtodo now incomplete makes it incomplete as well
      if (isOneAwayFromCompletion || isFullyCompleted) {
        await updateTodo(todoId, {
          completed: !completed,
          completeTime: moment().format(),
        });
      }
      if (!completed) {
        toast.success(
          `👍 Great job! ${title} completed${
            isOneAwayFromCompletion ? ` and ${todoTitle} is fully done` : ''
          }!`
        );
      } else if (isFullyCompleted) {
        toast.warn(`Oh dear! What happened? Task is now incomplete.`);
      } else {
        toast.warn('😅 No rush there!');
      }
      setIsChecked(!isChecked);
    } catch (error) {
      // setIsChecked(completed);
      Sentry.captureException(error);
    }
  };

  return (
    <li className="kanban-panel-subtodo">
      <div className="kanban-panel-subtodo__completed">
        <input
          className="is-checkradio is-success"
          id={`completed-checkbox-${id}`}
          type="checkbox"
          name="completed"
          checked={isChecked}
          onChange={handleComplete}
        />
        {/*  eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor={`completed-checkbox-${id}`} />
      </div>
      <div className="kanban-panel-subtodo__details">
        <div className="kanban-panel-subtodo__title">{title}</div>
        <div
          className={`kanban-panel-subtodo__date ${
            // eslint-disable-next-line no-nested-ternary
            completed ? 'has-text-success ' : warning ? 'has-text-danger' : ''
          }`}
        >
          {displayDate}
        </div>
      </div>
    </li>
  );
};

export default KanbanPanelSubtodoItem;
