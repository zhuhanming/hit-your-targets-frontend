import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import './KanbanCreationPanel.scss';

const KanbanCreationPanelGhost: React.SFC = () => {
  return (
    <div className="box kanban-creation inactive">
      <SkeletonTheme>
        <Skeleton />
      </SkeletonTheme>
    </div>
  );
};

export default KanbanCreationPanelGhost;