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
    return (
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
    <div className="box kanban-creation is-very-transparent">
      <TodoCreationField
        isKanban
        cancelCallback={(): void => setIsForm(false)}
      />
    </div>
  );
};

export default KanbanCreationPanel;
