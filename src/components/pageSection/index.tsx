import React from 'react';

import './PageSection.scss';

interface PageSectionProps {
  className?: string;
}

const PageSection: React.SFC<PageSectionProps> = ({
  children,
  className = ''
}) => {
  return <div className={`column is-full ${className}`}>{children}</div>;
};

export default PageSection;
