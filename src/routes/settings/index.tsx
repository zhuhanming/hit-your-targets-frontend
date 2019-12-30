import React from 'react';

import { useAuth } from 'contexts/authContext';
import { useTheme } from 'contexts/themeContext';
import PageContainer from 'components/pageContainer';

const Settings = () => {
  const { logout } = useAuth();
  const { toggle } = useTheme();

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
