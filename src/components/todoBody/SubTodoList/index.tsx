import React from 'react';

import ToDo from 'interfaces/ToDo';
import SubTodoListItem from './SubTodoListItem';
import SubTodoCreationField from './SubTodoCreationField';

import './SubTodoList.scss';

interface SubTodoListProps {
  todo: ToDo;
  setFocus: (id: number | null) => void;
  isMobile: boolean;
}

const SubTodoList: React.SFC<SubTodoListProps> = ({
  todo,
  setFocus,
  isMobile
}) => {
  const { id, startTime, endTime, subtodos, title } = todo;
  const { length } = subtodos;
  const numberCompleted = subtodos.filter(subtodo => subtodo.completed).length;
  const isOneFromCompletion = length - numberCompleted === 1;
  const isFullyCompleted = length === numberCompleted;
  const newSubtodos = subtodos.slice().sort((a, b) => a.id - b.id);
  return (
    <>
      <ul>
        {newSubtodos.map((subtodo, key) => {
          return (
            <SubTodoListItem
              subTodo={subtodo}
              currentKey={key}
              keyLimit={length - 1}
              todoId={id}
              todoStartTime={startTime}
              todoEndTime={endTime}
              key={`subtodo-${subtodo.id}`}
              isFullyCompleted={isFullyCompleted}
              isOneAwayFromCompletion={isOneFromCompletion}
              todoTitle={title}
              setFocus={setFocus}
              isMobile={isMobile}
            />
          );
        })}
      </ul>
      <SubTodoCreationField
        id={id}
        todoStartTime={startTime}
        todoEndTime={endTime}
        isFullyCompleted={isFullyCompleted}
      />
    </>
  );
};

export default SubTodoList;
