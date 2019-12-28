import React from 'react';
import { AuthProvider } from './authContext';
import { UserProvider } from './userContext';
import { ThemeProvider } from './themeContext';
import { TodoProvider } from './todoContext';

const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
      <UserProvider>
        <ThemeProvider>
          <TodoProvider>{children}</TodoProvider>
        </ThemeProvider>
      </UserProvider>
    </AuthProvider>
  );
};

export default AppProviders;
