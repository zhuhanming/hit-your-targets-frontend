import { SearchType, SearchLogic } from 'reducers/SearchDux';
import ToDo from './ToDo';

export default interface SearchContextInterface {
  getFilteredTodos(todos: ToDo[]): ToDo[];
  searchType: SearchType | null;
  titleString: string;
  tags: string[];
  searchLogic: SearchLogic;
}
