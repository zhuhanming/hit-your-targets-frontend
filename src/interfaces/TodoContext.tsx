import ToDo from './ToDo';

export default interface TodoContextInterface {
  loadTodos: () => null;
  createTodo: (data: any) => null;
  createSubTodo: (id: number, data: any) => null;
  updateTodo: (id: number, data: any) => null;
  updateSubTodo: (todoId: number, subtodoId: number, data: any) => null;
  deleteTodo: (id: number) => null;
  deleteSubTodo: (todoId: number, subtodoId: number) => null;
}
