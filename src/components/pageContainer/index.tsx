import React from 'react';

import PageTitle from 'components/pageContainer/pageTitle';
import PageSection from 'components/pageSection';

import './PageContainer.scss';

interface PageContainerProps {
  children: React.ReactNode;
  titleText: string;
  className?: string;
}

const PageContainer: React.SFC<PageContainerProps> = ({
  children,
  titleText,
  className = ''
}) => {
  // children should be wrapped up in column
  return (
    <div className={`page-container ${className}`}>
      <div className="columns is-marginless title-container">
        <PageSection>
          <PageTitle titleText={titleText} />
        </PageSection>
      </div>
      <div className="columns is-marginless is-multiline page-container__columns">
        {children}
      </div>
    </div>
  );
};

export default PageContainer;
