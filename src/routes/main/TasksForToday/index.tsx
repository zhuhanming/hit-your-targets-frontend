import React from 'react';
import { Link } from 'react-router-dom';

import TodoListItem from 'components/todoListItem';
import TodoListItemGhost from 'components/todoListItem/TodoListItemGhost';
import { LIST } from 'constants/routes';

import './TasksForToday.scss';

const TasksForToday = ({ todos, isLoading }) => {
  if (isLoading)
    return (
      <ul>
        <TodoListItemGhost />
        <TodoListItemGhost />
        <TodoListItemGhost />
      </ul>
    );
  if (todos.length === 0)
    return (
      <div className="tasks">
        <span className="tasks__empty-text">
          Great job, you&apos;re done for the day!
        </span>
        <button type="button" className="is-size-7 tasks__cta as-non-button">
          <Link to={LIST}>View More</Link>
        </button>
      </div>
    );
  // eslint-disable-next-line no-param-reassign
  if (todos.length > 5) todos = todos.slice(0, 5);
  const { length } = todos;
  if (isLoading) return <></>;
  return (
    <div className="tasks">
      <ul>
        {todos.map((ele, key) => {
          return (
            <TodoListItem
              todo={ele}
              currentKey={key}
              key={`list-item-${ele.id}`}
              keyLimit={length - 1}
            />
          );
        })}
      </ul>
      <button type="button" className="is-size-7 tasks__cta as-non-button">
        <Link to={LIST}>View More</Link>
      </button>
    </div>
  );
};

export default TasksForToday;
