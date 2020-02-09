import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import ToDo from 'interfaces/ToDo';
import { useSearch } from 'contexts/searchContext';
import SubTodoCreationField from 'components/todoBody/SubTodoList/SubTodoCreationField';
import KanbanPanelHeader from './KanbanPanelHeader';
import KanbanPanelSubtodoItem from './KanbanPanelSubtodoItem';

import './KanbanPanel.scss';

interface KanbanPanelProps {
  todo: ToDo;
  index: number;
  setTodoInFocus: (todo: number | null) => void;
}

const KanbanPanel: React.SFC<KanbanPanelProps> = ({
  todo,
  index,
  setTodoInFocus
}) => {
  const { searchType } = useSearch();
  const { id, subtodos, startTime, endTime, title } = todo;
  const { length } = subtodos;
  const hasSubtodos = length > 0;
  const numberCompleted = subtodos.filter(subtodo => subtodo.completed).length;
  const isFullyCompleted = length === numberCompleted;
  const isOneFromCompletion = length - numberCompleted === 1;

  return (
    <Draggable
      draggableId={id.toString()}
      index={index}
      isDragDisabled={searchType !== null}
    >
      {provided => (
        <div
          className="box kanban-panel is-very-transparent"
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
        >
          <KanbanPanelHeader todo={todo} setTodoInFocus={setTodoInFocus} />
          <ul className="kanban-panel__subtodos">
            {hasSubtodos &&
              subtodos.map(s => (
                <KanbanPanelSubtodoItem
                  todoId={id}
                  todoTitle={title}
                  isOneAwayFromCompletion={isOneFromCompletion}
                  isFullyCompleted={isFullyCompleted}
                  subtodo={s}
                  key={`kanban-panel-${id}-subtodo-${s.id}`}
                />
              ))}
          </ul>
          <div className="kanban-panel__subtodo-creation">
            <SubTodoCreationField
              id={id}
              todoEndTime={endTime}
              todoStartTime={startTime}
              isFullyCompleted={isFullyCompleted}
            />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default KanbanPanel;
