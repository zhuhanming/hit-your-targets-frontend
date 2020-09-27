/* eslint-disable no-param-reassign */
import React from 'react';
import { TransitionGroup } from 'react-transition-group';
import moment from 'moment';

import TodoListItem from 'components/todoListItem';
import TodoListItemGhost from 'components/todoListItem/TodoListItemGhost';
import { useView } from 'contexts/viewContext';
import { useSearch } from 'contexts/searchContext';
import ViewSelector from 'components/viewSelector';
import ErrorMessage from 'components/errorMessage';
import { View } from 'interfaces/ViewContext';
import SearchBar from 'components/searchBar';
import SlideTransition from 'components/slideTransition';
import FadeTransition from 'components/fadeTransition';
import ToDo from 'interfaces/ToDo';

import TodoCreationField from './TodoCreationField';
import './TodoList.scss';

interface TodoListProps {
  todos: ToDo[];
  isLoading: boolean;
  isError: boolean;
  setFocus: (id: number | null) => void;
  focus: null | number;
  isMobile?: boolean;
}

// Left side of screen - list of tasks in List View
const TodoList: React.SFC<TodoListProps> = ({
  todos,
  isLoading,
  isError,
  setFocus,
  focus,
  isMobile = false,
}) => {
  const { viewSelected } = useView();
  const { searchType } = useSearch();
  if (isError)
    return (
      <div className="todo-list">
        <ViewSelector isMobile={isMobile} />
        <TodoCreationField />
        <div className="box todo-list__box is-slightly-transparent">
          <ErrorMessage message="Failed to retrieve tasks. Please refresh your page to try again." />
        </div>
      </div>
    );

  if (isLoading)
    return (
      <div className="todo-list">
        <ViewSelector isMobile={isMobile} />
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
        (todo) =>
          !todo.completed &&
          moment(todo.endTime).isSameOrBefore(moment(), 'day')
      );
      break;
    case View.NEXT_SEVEN_DAYS:
      todos = todos.filter(
        (todo) =>
          !todo.completed &&
          moment(todo.endTime).isSameOrBefore(moment().add(7, 'days'), 'day')
      );
      break;
    case View.ALL:
      todos = todos.filter((todo) => !todo.completed);
      break;
    case View.COMPLETED:
      todos = todos.filter((todo) => todo.completed);
      todos.sort(
        (a, b) => Date.parse(b.completeTime) - Date.parse(a.completeTime)
      );
      break;
    default:
      break;
  }
  const { length } = todos;

  const items =
    // eslint-disable-next-line no-nested-ternary
    length > 0 ? (
      todos.map((ele: ToDo, key: number) => {
        return (
          <SlideTransition key={`list-item-${ele.id}`}>
            <TodoListItem
              todo={ele}
              currentKey={key}
              keyLimit={length - 1}
              isExpanded
              setFocus={setFocus}
              focus={focus}
            />
          </SlideTransition>
        );
      })
    ) : searchType === null ? (
      <FadeTransition key="empty-todo-list">
        <article className="message is-success">
          <span className="message-body tasks__empty-text">
            Create a task by typing into the field above!
          </span>
        </article>
      </FadeTransition>
    ) : (
      <FadeTransition key="no-todo-found">
        <article className="message is-danger">
          <span className="message-body tasks__empty-text">
            No task found that meets the requirements! Try changing your search
            or the selected view!
          </span>
        </article>
      </FadeTransition>
    );

  return (
    <div className="todo-list">
      <ViewSelector isMobile={isMobile} />
      {searchType === null && <TodoCreationField />}
      {searchType && <SearchBar />}
      <div className="box todo-list__box is-slightly-transparent is-not-loading">
        <TransitionGroup>
          <FadeTransition key={`todo-list-${viewSelected}`}>
            <ul className="todo-list__list">
              <TransitionGroup>{items}</TransitionGroup>
            </ul>
          </FadeTransition>
        </TransitionGroup>
      </div>
    </div>
  );
};

export default TodoList;
