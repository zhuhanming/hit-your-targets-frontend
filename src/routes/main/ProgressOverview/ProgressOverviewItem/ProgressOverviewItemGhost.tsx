import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import './ProgressOverviewItemGhost.scss';

const ProgressOverviewItem = () => {
  return (
    <li className="progress-item">
      <SkeletonTheme>
        <div className="progress-item__content progress-item__content-ghost">
          <span className="progress-item__title progress-item__title-ghost">
            <Skeleton />
          </span>
          <span className="progress-item__date progress-item__date-ghost">
            <Skeleton />
          </span>
        </div>
        <div className="progress-item__content progress-item__content-ghost">
          <span className="progress-item__bar progress-item__bar-ghost">
            <Skeleton />
          </span>
        </div>
      </SkeletonTheme>
    </li>
  );
};

export default ProgressOverviewItem;
