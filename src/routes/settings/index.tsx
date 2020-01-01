import React from 'react';

import { useAuth } from 'contexts/authContext';
import PageContainer from 'components/pageContainer';

const Settings = () => {
  const { logout } = useAuth();

  return (
    <>
      <PageContainer titleText="Settings">
        <button
          type="button"
          className="button is-rounded is-danger"
          onClick={logout}
        >
          Logout
        </button>
      </PageContainer>
    </>
  );
};

export default Settings;
