import React, { useEffect } from 'react';

import TodoBody from 'components/todoBody';
import ToDo from 'interfaces/ToDo';
import ErrorMessage from 'components/errorMessage';

import './TodoBodyModalBody.scss';

interface TodoBodyModalBodyProps {
  id: number;
  todos: ToDo[];
  isKanban?: boolean;
  setFocus: (id: number | null) => void;
}

const TodoBodyModalBody: React.SFC<TodoBodyModalBodyProps> = ({
  id,
  todos,
  isKanban = false,
  setFocus
}) => {
  if (id === null) return <></>;
  const todo = todos.find(ele => ele.id === id);
  if (typeof todo === 'undefined') {
    return <ErrorMessage />;
  }

  return (
    <div className="todo-body-modal-body">
      <TodoBody todo={todo} setFocus={setFocus} isKanban={isKanban} />
    </div>
  );
};

export default TodoBodyModalBody;
