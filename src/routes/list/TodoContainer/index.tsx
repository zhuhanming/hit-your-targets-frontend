import React from 'react';
import { useSelector } from 'react-redux';

import TodoBody from 'components/todoBody';
import RootStateInterface from 'interfaces/RootState';
import ErrorMessage from 'components/errorMessage';

import './TodoContainer.scss';

const TodoContainer = ({ id, setFocus }) => {
  const selectTodos = (state: RootStateInterface) => state.todos;
  const { todos } = useSelector(selectTodos);
  if (id === null) return <></>;
  const todo = todos.find(ele => ele.id === id);
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
    <div className="todo-container ">
      <div className="columns is-marginless is-multiline todo-container__columns">
        <div className="column is-full">
          <TodoBody todo={todo} setFocus={setFocus} />
        </div>
      </div>
    </div>
  );
};

export default TodoContainer;
