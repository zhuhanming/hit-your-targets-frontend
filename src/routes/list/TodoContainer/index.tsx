import React from 'react';

import TodoBody from 'components/todoBody';
import ErrorMessage from 'components/errorMessage';
import { useSearch } from 'contexts/searchContext';
import ToDo from 'interfaces/ToDo';

import './TodoContainer.scss';

interface TodoContainerProps {
  id: number | null;
  setFocus: (id: number | null) => void;
  todos: ToDo[];
  isMobile?: boolean;
  isKanban?: boolean;
}

// Container for Todo on right half of screen
const TodoContainer: React.FunctionComponent<TodoContainerProps> = ({
  id,
  setFocus,
  todos,
  isMobile = false,
  isKanban = false,
}) => {
  const { searchType } = useSearch();
  if (id === null) return <></>;
  const todo = todos.find((ele) => ele.id === id);
  if (typeof todo === 'undefined' && searchType) return <></>;
  if (typeof todo === 'undefined')
    return (
      <div className="todo-container">
        <div className="columns is-marginless is-multiline todo-container__columns">
          <div className="column is-full">
            <ErrorMessage message="Something's wrong... Please refresh the page." />
          </div>
        </div>
      </div>
    );
  return (
    <div className="todo-container">
      <div className="columns is-marginless is-multiline todo-container__columns">
        <div className="column is-full todo-container__column">
          <TodoBody
            todo={todo}
            setFocus={setFocus}
            isMobile={isMobile}
            isKanban={isKanban}
          />
        </div>
      </div>
    </div>
  );
};

export default TodoContainer;
