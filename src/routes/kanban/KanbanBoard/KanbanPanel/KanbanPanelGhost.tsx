import React from 'react';

import KanbanPanelSubtodoItemGhost from './KanbanPanelSubtodoItem/KanbanPanelSubtodoItemGhost';
import KanbanPanelHeaderGhost from './KanbanPanelHeader/KanbanPanelHeaderGhost';

import './KanbanPanel.scss';

const KanbanPanelGhost = () => {
  return (
    <div className="box kanban-panel is-very-transparent">
      <KanbanPanelHeaderGhost />
      <ul className="kanban-panel__subtodos">
        <KanbanPanelSubtodoItemGhost />
        <KanbanPanelSubtodoItemGhost />
        <KanbanPanelSubtodoItemGhost />
      </ul>
      <div className="kanban-panel__subtodo-creation">
        + Press enter to add a Subtask
      </div>
    </div>
  );
};

export default KanbanPanelGhost;
