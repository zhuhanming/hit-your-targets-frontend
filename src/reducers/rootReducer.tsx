import { combineReducers } from 'redux';

import todos from 'reducers/ToDoDux';
import misc from 'reducers/MiscDux';

const rootReducer = combineReducers({
  todos,
  misc
});

export default rootReducer;