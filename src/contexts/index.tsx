import React from 'react';
import { AuthProvider } from './authContext';
import { UserProvider } from './userContext';
import { ThemeProvider } from './themeContext';

const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
      <UserProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </UserProvider>
    </AuthProvider>
  );
};

export default AppProviders;
