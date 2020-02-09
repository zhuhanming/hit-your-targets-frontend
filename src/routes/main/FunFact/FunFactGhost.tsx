import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import './FunFact.scss';

const FunFactGhost: React.SFC = () => {
  return (
    <div className="fun-fact">
      <div className="fun-fact__intro ">
        <SkeletonTheme>
          <Skeleton />
        </SkeletonTheme>
      </div>
      <div className="fun-fact__stat">
        <SkeletonTheme>
          <Skeleton />
        </SkeletonTheme>
      </div>
      <div className="fun-fact__ending">
        <SkeletonTheme>
          <Skeleton />
        </SkeletonTheme>
      </div>
    </div>
  );
};

export default FunFactGhost;
