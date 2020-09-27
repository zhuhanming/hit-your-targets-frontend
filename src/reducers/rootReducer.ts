import { combineReducers } from 'redux';

import todos from 'reducers/ToDoDux';
import misc from 'reducers/MiscDux';
import search from 'reducers/SearchDux';

const rootReducer = combineReducers({
  todos,
  misc,
  search,
});

export default rootReducer;
