export default interface TodoContextInterface {
  loadTodos: () => void;
  createTodo: (code: {
    title: string;
    description: string;
    startTime: string;
    endTime: string;
    completed: boolean;
    tags: string[];
  }) => Promise<void>;
  createSubTodo: (
    id: number,
    code: {
      title: string;
      startTime: string;
      endTime: string;
      completed: boolean;
    }
  ) => Promise<void>;
  updateTodo: (
    id: number,
    code: {
      title?: string;
      description?: string;
      startTime?: string;
      endTime?: string;
      completeTime?: string;
      tags?: string[];
      completed?: boolean;
    }
  ) => Promise<void>;
  updateSubTodo: (
    todoId: number,
    subtodoId: number,
    code: {
      title?: string;
      startTime?: string;
      endTime?: string;
      completed?: boolean;
    }
  ) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
  deleteSubTodo: (todoId: number, subtodoId: number) => Promise<void>;
}
