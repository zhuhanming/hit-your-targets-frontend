import React from 'react';

import './PageContainer.scss';

const PageContainer = ({ children, className = '' }) => {
  // children should be wrapped up in column
  return (
    <div className={`page-container ${className}`}>
      <div className="columns is-marginless">{children}</div>
    </div>
  );
};

export default PageContainer;
