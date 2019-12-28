import React from 'react';

import { useUser } from 'contexts/userContext';
import { capitalize } from 'utils';
import PageContainer from 'components/pageContainer';
import PageSection from 'components/pageSection';
import PageTitle from 'components/pageTitle';

const Main = () => {
  const { name } = useUser();

  return (
    <>
      <PageContainer>
        <PageSection>
          <PageTitle titleText={`Welcome back, ${capitalize(name)}`} />
        </PageSection>
      </PageContainer>
    </>
  );
};

export default Main;
