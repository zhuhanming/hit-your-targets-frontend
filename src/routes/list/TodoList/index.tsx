/* eslint-disable no-param-reassign */
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import moment from 'moment';

import TodoListItem from 'components/todoListItem';
import TodoListItemGhost from 'components/todoListItem/TodoListItemGhost';
import { useView } from 'contexts/viewContext';
import ViewSelector from 'components/viewSelector';
import ErrorMessage from 'components/errorMessage';
import { View } from 'interfaces/ViewContext';

import TodoCreationField from './TodoCreationField';
import './TodoList.scss';

const TodoList = ({ todos, isLoading, isError, setFocus, focus }) => {
  const { viewSelected } = useView();
  if (isError)
    return (
      <div className="todo-list">
        <ViewSelector />
        <TodoCreationField />
        <div className="box todo-list__box is-slightly-transparent">
          <ErrorMessage message="Failed to retrieve tasks. Please refresh your page to try again." />
        </div>
      </div>
    );

  if (isLoading)
    return (
      <div className="todo-list">
        <ViewSelector />
        <TodoCreationField />
        <div className="box todo-list__box is-slightly-transparent">
          <TodoListItemGhost />
          <TodoListItemGhost />
          <TodoListItemGhost />
          <TodoListItemGhost />
          <TodoListItemGhost />
        </div>
      </div>
    );
  switch (viewSelected) {
    case View.TODAY:
      todos = todos.filter(
        todo =>
          !todo.completed &&
          moment(todo.endTime).isSameOrBefore(moment(), 'day')
      );
      break;
    case View.NEXT_SEVEN_DAYS:
      todos = todos.filter(
        todo =>
          !todo.completed &&
          moment(todo.endTime).isSameOrBefore(moment().add(7, 'days'), 'day')
      );
      break;
    case View.ALL:
      todos = todos.filter(todo => !todo.completed);
      break;
    case View.COMPLETED:
      todos = todos.filter(todo => todo.completed);
      todos.sort(
        (a, b) => Date.parse(b.completeTime) - Date.parse(a.completeTime)
      );
      break;
    default:
      break;
  }
  const { length } = todos;

  return (
    <div className="todo-list">
      <ViewSelector />
      <TodoCreationField />
      <div className="box todo-list__box is-slightly-transparent is-not-loading">
        <ReactCSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          <ul className="todo-list__list" key={`todo-list-${viewSelected}`}>
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
                    isExpanded
                    setFocus={setFocus}
                    focus={focus}
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
                  <span className="message-body tasks__empty-text">
                    Create a task by typing into the field above!
                  </span>
                </article>
              )}
            </ReactCSSTransitionGroup>
          </ul>
        </ReactCSSTransitionGroup>
      </div>
    </div>
  );
};

export default TodoList;
