import React from 'react';

import './PageSection.scss';

const PageSection = ({ children, className = '' }) => {
  return <div className={`column is-full ${className}`}>{children}</div>;
};

export default PageSection;
