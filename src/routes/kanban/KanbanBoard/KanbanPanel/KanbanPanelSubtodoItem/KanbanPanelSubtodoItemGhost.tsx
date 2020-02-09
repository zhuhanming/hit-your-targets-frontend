import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import './KanbanPanelSubtodoItem.scss';

const KanbanPanelSubtodoItemGhost: React.SFC = () => {
  return (
    <li className="kanban-panel-subtodo">
      <div className="kanban-panel-subtodo__completed">
        <input
          className="is-checkradio is-success"
          type="checkbox"
          id="kanban-subtodo-ghost"
          checked={false}
          readOnly
        />
        {/*  eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="kanban-subtodo-ghost" />
      </div>
      <div className="kanban-panel-subtodo__details">
        <div className="kanban-panel-subtodo__title">
          <SkeletonTheme>
            <Skeleton />
          </SkeletonTheme>
        </div>
        <div className="kanban-panel-subtodo__date">
          <SkeletonTheme>
            <Skeleton />
          </SkeletonTheme>
        </div>
      </div>
    </li>
  );
};

export default KanbanPanelSubtodoItemGhost;
