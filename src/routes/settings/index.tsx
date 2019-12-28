import React from 'react';

import { useAuth } from 'contexts/authContext';
import { useTheme } from 'contexts/themeContext';
import PageContainer from 'components/pageContainer';

const Settings = () => {
  const { logout } = useAuth();
  const { toggle } = useTheme();

  return (
    <>
      <PageContainer>
        <button type="button" className="button" onClick={logout}>
          Logout
        </button>
        <button type="button" className="button" onClick={toggle}>
          Change Theme
        </button>
      </PageContainer>
    </>
  );
};

export default Settings;
