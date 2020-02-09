import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import TodoCreationField from 'routes/list/TodoList/TodoCreationField';

import './KanbanCreationPanel.scss';

interface KanbanCreationPanelProps {
  index: number;
}

const KanbanCreationPanel: React.SFC<KanbanCreationPanelProps> = ({
  index
}) => {
  const [isForm, setIsForm] = useState(false);
  if (!isForm) {
    // Returns the button to start todo creation
    return (
      // Non-draggable Draggable wrapper - needed to prevent overlapping when dropping
      <Draggable draggableId="kanban-creation" index={index} isDragDisabled>
        {(provided): React.ReactNode => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="box kanban-creation inactive"
            onClick={(): void => setIsForm(true)}
            role="button"
            onKeyDown={(): void => setIsForm(true)}
            tabIndex={0}
          >
            Create Task
          </div>
        )}
      </Draggable>
    );
  }
  return (
    // Non-draggable Draggable wrapper - needed to prevent overlapping when dropping
    <Draggable draggableId="kanban-creation" index={index} isDragDisabled>
      {(provided): React.ReactNode => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="box kanban-creation is-very-transparent"
        >
          <TodoCreationField
            isKanban
            cancelCallback={(): void => setIsForm(false)}
          />
        </div>
      )}
    </Draggable>
  );
};

export default KanbanCreationPanel;
