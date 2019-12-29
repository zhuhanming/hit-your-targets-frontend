import React from 'react';
import { Link } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import TodoListItem from 'components/todoListItem';
import TodoListItemGhost from 'components/todoListItem/TodoListItemGhost';
import { LIST } from 'constants/routes';
import ErrorMessage from 'components/errorMessage';

import './TasksForToday.scss';

const TasksForToday = ({ todos, isLoading, isError }) => {
  if (isLoading)
    return (
      <div className="tasks">
        <ul>
          <TodoListItemGhost />
          <TodoListItemGhost />
          <TodoListItemGhost />
        </ul>
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
  // eslint-disable-next-line no-param-reassign
  if (todos.length > 5) todos = todos.slice(0, 5);
  const { length } = todos;
  return (
    <div className="tasks">
      <ul className="todo-list">
        <ReactCSSTransitionGroup
          transitionName="slide"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
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
        </ReactCSSTransitionGroup>
        <ReactCSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {todos.length === 0 && (
            <article className="message is-success">
              <span className="message-body">
                Great job, you&apos;re done for the day!
              </span>
            </article>
          )}
        </ReactCSSTransitionGroup>
      </ul>
      <button type="button" className="is-size-7 tasks__cta as-non-button">
        <Link to={LIST}>View More</Link>
      </button>
    </div>
  );
};

export default TasksForToday;
