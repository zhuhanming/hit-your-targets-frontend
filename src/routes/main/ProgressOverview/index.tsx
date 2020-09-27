/* eslint-disable no-param-reassign */
import React from 'react';
import { Link } from 'react-router-dom';

import { LIST } from 'constants/routes';
import ErrorMessage from 'components/errorMessage';
import ToDo from 'interfaces/ToDo';
import ProgressOverviewItem from './ProgressOverviewItem';
import ProgressOverviewItemGhost from './ProgressOverviewItem/ProgressOverviewItemGhost';

import './ProgressOverview.scss';

interface ProgressOverviewProps {
  todos: ToDo[];
  isLoading: boolean;
  isError: boolean;
}

const ProgressOverview: React.SFC<ProgressOverviewProps> = ({
  todos,
  isLoading,
  isError,
}) => {
  if (isLoading)
    return (
      <div className="tasks">
        <ul>
          <ProgressOverviewItemGhost />
          <ProgressOverviewItemGhost />
          <ProgressOverviewItemGhost />
        </ul>
        <button type="button" className="is-size-7 tasks__cta as-non-button">
          <Link to={LIST}>View More</Link>
        </button>
      </div>
    );
  if (isError)
    return (
      <div className="tasks">
        <ErrorMessage message="An error has occurred. Please refresh the page." />
        <button type="button" className="is-size-7 tasks__cta as-non-button">
          <Link to={LIST}>View More</Link>
        </button>
      </div>
    );
  if (todos.length > 3) {
    const completedTodos = todos.filter((todo) => !todo.completed);
    if (completedTodos.length >= 3) {
      todos = completedTodos.slice(0, 3);
    } else {
      todos = todos
        .slice()
        .sort((a, b) =>
          // eslint-disable-next-line no-nested-ternary
          a.completed === b.completed ? 0 : a.completed ? 1 : -1
        )
        .slice(0, 3);
    }
  }
  const { length } = todos;
  return (
    <div className="tasks">
      <ul>
        {todos.map((ele, key) => {
          return (
            <ProgressOverviewItem
              todo={ele}
              currentKey={key}
              key={`progress-item-${ele.id}`}
              keyLimit={length - 1}
            />
          );
        })}
        {todos.length === 0 && (
          <article className="message is-info">
            <span className="message-body tasks__empty-text">
              You have not created any tasks yet!
            </span>
          </article>
        )}
      </ul>
      <button type="button" className="is-size-7 tasks__cta as-non-button">
        <Link to={LIST}>View More</Link>
      </button>
    </div>
  );
};

export default ProgressOverview;
