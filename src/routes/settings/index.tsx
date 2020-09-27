import React from 'react';

import { useAuth } from 'contexts/authContext';
import PageContainer from 'components/pageContainer';
import PageSection from 'components/pageSection';

import './Settings.scss';

// Settings page - work in progress
const Settings: React.FunctionComponent = () => {
  const { logout } = useAuth();

  return (
    <>
      <PageContainer titleText="Settings">
        <PageSection>
          <h2 className="subtitle settings__title">User Preferences</h2>
          <button
            type="button"
            className="button is-rounded is-danger"
            onClick={logout}
          >
            Logout
          </button>
        </PageSection>
      </PageContainer>
    </>
  );
};

export default Settings;
