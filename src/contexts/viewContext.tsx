import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ViewContextInterface, { View } from 'interfaces/ViewContext';
import RootStateInterface from 'interfaces/RootState';
import { setView } from 'reducers/MiscDux';

const defaultContextData = {
  viewSelected: View.TODAY,
  updateView: (newView: View) => null
};

const ViewContext = React.createContext<ViewContextInterface>(
  defaultContextData
);

const ViewProvider = props => {
  const dispatch = useDispatch();
  const selectMisc = (state: RootStateInterface) => state.misc;
  const { view } = useSelector(selectMisc);
  const viewSelected = view;

  const updateView = (newView: View) => {
    dispatch(setView(newView));
  };

  return (
    <ViewContext.Provider value={{ viewSelected, updateView }} {...props} />
  );
};

const useView = () => {
  const context = React.useContext(ViewContext);
  if (context === undefined) {
    throw new Error(`useView must be used within a ViewProvider`);
  }
  return context;
};

export { ViewProvider, useView };
