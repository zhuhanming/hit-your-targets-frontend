import { CurrentToDos } from 'reducers/ToDoDux';
import { CurrentMisc } from 'reducers/MiscDux';

export default interface RootStateInterface {
  todos: CurrentToDos;
  misc: CurrentMisc;
}
