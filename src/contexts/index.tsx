import React from 'react';
import { AuthProvider } from './authContext';
import { UserProvider } from './userContext';
import { ThemeProvider } from './themeContext';
import { TodoProvider } from './todoContext';
import { ViewProvider } from './viewContext';

const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
      <UserProvider>
        <ThemeProvider>
          <TodoProvider>
            <ViewProvider>{children}</ViewProvider>
          </TodoProvider>
        </ThemeProvider>
      </UserProvider>
    </AuthProvider>
  );
};

export default AppProviders;
