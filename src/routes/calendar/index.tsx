import React from 'react';

import PageContainer from 'components/pageContainer';
import PageSection from 'components/pageSection';

import './Calendar.scss';

const Calendar: React.FunctionComponent = () => {
  return (
    <PageContainer titleText="Calendar View">
      <PageSection>
        <div className="message is-info">
          <div className="message-body">
            This is a work in progress, check back soon!
          </div>
        </div>
      </PageSection>
    </PageContainer>
  );
};

export default Calendar;
