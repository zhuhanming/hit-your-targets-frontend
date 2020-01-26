import React from 'react';
import { AuthProvider } from './authContext';
import { UserProvider } from './userContext';
import { ThemeProvider } from './themeContext';
import { TodoProvider } from './todoContext';
import { ViewProvider } from './viewContext';
import { SearchProvider } from './searchContext';

const AppProviders: React.SFC = ({ children }) => {
  return (
    <AuthProvider>
      <UserProvider>
        <ThemeProvider>
          <TodoProvider>
            <ViewProvider>
              <SearchProvider>{children}</SearchProvider>
            </ViewProvider>
          </TodoProvider>
        </ThemeProvider>
      </UserProvider>
    </AuthProvider>
  );
};

export default AppProviders;
