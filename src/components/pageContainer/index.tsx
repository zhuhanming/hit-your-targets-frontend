import React from 'react';

import PageTitle from 'components/pageContainer/pageTitle';
import PageSection from 'components/pageSection';

import './PageContainer.scss';

const PageContainer = ({ children, titleText, className = '' }) => {
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
