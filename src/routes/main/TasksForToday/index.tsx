import React from 'react';
import { Link } from 'react-router-dom';
import { TransitionGroup } from 'react-transition-group';

import TodoListItem from 'components/todoListItem';
import TodoListItemGhost from 'components/todoListItem/TodoListItemGhost';
import { LIST } from 'constants/routes';
import ErrorMessage from 'components/errorMessage';
import SlideTransition from 'components/slideTransition';
import FadeTransition from 'components/fadeTransition';
import ToDo from 'interfaces/ToDo';

import './TasksForToday.scss';

interface TasksForToday {
  todos: ToDo[];
  isLoading: boolean;
  isError: boolean;
}

const TasksForToday: React.SFC<TasksForToday> = ({
  todos,
  isLoading,
  isError
}) => {
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

  const items =
    length > 0 ? (
      todos.map((ele, key) => {
        return (
          <SlideTransition key={`list-item-${ele.id}`}>
            <TodoListItem todo={ele} currentKey={key} keyLimit={length - 1} />
          </SlideTransition>
        );
      })
    ) : (
      <FadeTransition key="tasks-empty">
        <article className="message is-success">
          <span className="message-body tasks__empty-text">
            Great job, you&apos;re done for the day!
          </span>
        </article>
      </FadeTransition>
    );

  return (
    <div className="tasks">
      <ul className="todo-list">
        <TransitionGroup>{items}</TransitionGroup>
      </ul>
      <button type="button" className="is-size-7 tasks__cta as-non-button">
        <Link to={LIST}>View More</Link>
      </button>
    </div>
  );
};

export default TasksForToday;
