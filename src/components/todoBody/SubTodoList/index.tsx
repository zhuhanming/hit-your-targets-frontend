import React from 'react';

import SubTodoListItem from './SubTodoListItem';
import SubTodoCreationField from './SubTodoCreationField';

import './SubTodoList.scss';

const SubTodoList = ({ todo }) => {
  const { id, startTime, endTime, subtodos } = todo;
  const { length } = subtodos;
  return (
    <>
      <ul>
        {subtodos.map((subtodo, key) => {
          return (
            <SubTodoListItem
              subTodo={subtodo}
              currentKey={key}
              keyLimit={length - 1}
              todoId={id}
              todoStartTime={startTime}
              todoEndTime={endTime}
              key={`subtodo-${subtodo.id}`}
            />
          );
        })}
      </ul>
      <SubTodoCreationField
        id={id}
        todoStartTime={startTime}
        todoEndTime={endTime}
      />
    </>
  );
};

export default SubTodoList;
