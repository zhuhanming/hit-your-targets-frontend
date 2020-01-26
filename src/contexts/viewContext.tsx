import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ViewContextInterface, { View } from 'interfaces/ViewContext';
import RootStateInterface from 'interfaces/RootState';
import { setView, CurrentMisc } from 'reducers/MiscDux';

const defaultContextData = {
  viewSelected: View.TODAY,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateView: (newView: View): void => {}
};

const ViewContext = React.createContext<ViewContextInterface>(
  defaultContextData
);

const ViewProvider: React.SFC = props => {
  const dispatch = useDispatch();
  const selectMisc = (state: RootStateInterface): CurrentMisc => state.misc;
  const { view } = useSelector(selectMisc);
  const viewSelected = view;

  const updateView = (newView: View): void => {
    dispatch(setView(newView));
  };

  return (
    <ViewContext.Provider value={{ viewSelected, updateView }} {...props} />
  );
};

const useView = (): ViewContextInterface => {
  const context = React.useContext(ViewContext);
  if (context === undefined) {
    throw new Error(`useView must be used within a ViewProvider`);
  }
  return context;
};

export { ViewProvider, useView };
