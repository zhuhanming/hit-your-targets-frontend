import ToDo from './ToDo';

export default interface SearchContextInterface {
  getFilteredTodos(todos: ToDo[]): ToDo[];
}
