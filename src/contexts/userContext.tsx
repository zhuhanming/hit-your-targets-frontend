import React from 'react';
import { useAuth } from 'contexts/authContext';
import UserContextInterface from 'interfaces/UserContext';

const UserContext = React.createContext<UserContextInterface | undefined>(
  undefined
);

// Allows user data to be accessible from everywhere
const UserProvider: React.SFC = props => {
  const { data } = useAuth();
  return <UserContext.Provider value={data} {...props} />;
};

const useUser = (): UserContextInterface => {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export { UserProvider, useUser };
