/* eslint-disable no-return-assign */
import React from 'react';
import moment from 'moment';
import { toast } from 'react-toastify';
import * as Sentry from '@sentry/react';
import { getDisplayDate, isWarning } from 'utils/timeUtils';

import ToDo from 'interfaces/ToDo';
import { useTodo } from 'contexts/todoContext';

import './KanbanPanelHeader.scss';

interface KanbanPanelHeaderProps {
  todo: ToDo;
  setTodoInFocus: (todo: number | null) => void;
}

// Contains checkbox, display date, title and vertical ellipsis
const KanbanPanelHeader: React.FunctionComponent<KanbanPanelHeaderProps> = ({
  todo,
  setTodoInFocus,
}) => {
  const { updateTodo } = useTodo();
  const { id, title, completed, subtodos, endTime } = todo;
  const hasSubtodos = subtodos.length > 0;
  const displayDate = getDisplayDate(endTime);
  const warning = isWarning(endTime);

  // Check if change in completion is valid, then doing so
  const handleComplete = async (): Promise<void> => {
    // Check iftasks have no subtodos
    if (Array.isArray(subtodos) && subtodos.length === 0) {
      try {
        await updateTodo(id, {
          completed: !completed,
          completeTime: moment().format(),
        });
        if (!completed) {
          toast.success(`👍 Great job! ${title} completed!`);
        } else {
          toast.warn("Don't lose heart!");
        }
      } catch (error) {
        Sentry.captureException(error);
      }
    }
  };

  // Passes the id upwards
  const handleModalOpen = (): void => {
    setTodoInFocus(id);
  };

  return (
    <div className="kanban-panel-header">
      <div className="kanban-panel-header__details">
        <div className="kanban-panel-header__completed">
          <input
            className="is-checkradio is-success"
            id={`completed-checkbox-${id}`}
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
          <label htmlFor={`completed-checkbox-${id}`} />
        </div>
        <div className="kanban-panel-header__title">
          <div
            className={`kanban-panel-header__date ${
              // eslint-disable-next-line no-nested-ternary
              completed ? 'has-text-success ' : warning ? 'has-text-danger' : ''
            }`}
          >
            {displayDate}
          </div>
          {title}
        </div>
        <div
          className="kanban-panel-header__expand"
          onClick={handleModalOpen}
          role="button"
          aria-label="View More"
          tabIndex={0}
          onKeyDown={handleModalOpen}
        >
          <i className="fas fa-ellipsis-v" />
        </div>
      </div>
    </div>
  );
};

export default KanbanPanelHeader;
