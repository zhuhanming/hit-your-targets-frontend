/* eslint-disable no-return-assign */
import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import './KanbanPanelHeader.scss';

const KanbanPanelHeaderGhost: React.SFC = () => {
  return (
    <div className="kanban-panel-header">
      <div className="kanban-panel-header__details">
        <div className="kanban-panel-header__completed">
          <input
            className="is-checkradio is-success"
            id="completed-checkbox"
            type="checkbox"
            name="completed"
            checked={false}
            readOnly
          />
          {/*  eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="completed-checkbox" />
        </div>
        <div className="kanban-panel-header__title">
          <div className="kanban-panel-header__date">
            <SkeletonTheme>
              <Skeleton />
            </SkeletonTheme>
          </div>
          <SkeletonTheme>
            <Skeleton />
          </SkeletonTheme>
        </div>
        <div className="kanban-panel-header__expand">
          <i className="fas fa-ellipsis-v" />
        </div>
      </div>
    </div>
  );
};

export default KanbanPanelHeaderGhost;
