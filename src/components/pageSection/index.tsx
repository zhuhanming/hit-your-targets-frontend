import React from 'react';

const PageSection = ({ children, className = '' }) => {
  return <div className={`column is-full ${className}`}>{children}</div>;
};

export default PageSection;
