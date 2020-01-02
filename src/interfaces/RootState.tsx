import { CurrentToDos } from 'reducers/ToDoDux';
import { CurrentMisc } from 'reducers/MiscDux';
import { CurrentSearch } from 'reducers/SearchDux';

export default interface RootStateInterface {
  todos: CurrentToDos;
  misc: CurrentMisc;
  search: CurrentSearch;
}
