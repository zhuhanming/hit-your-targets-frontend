import ToDo from './ToDo';

export default interface TodoContextInterface {
  loadTodos: () => null;
  createTodo: (data: any) => null;
  createSubTodo: (data: any) => null;
  updateTodo: (id: number, data: any) => null;
  updateSubTodo: (data: any) => null;
  deleteTodo: (data: any) => null;
  deleteSubTodo: (data: any) => null;
}
