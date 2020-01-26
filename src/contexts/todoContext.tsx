import React from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import TodoContextInterface from 'interfaces/TodoContext';
// import RootStateInterface from 'interfaces/RootState';
import {
  setToDos,
  setToDoError,
  updateToDo,
  addToDo,
  deleteToDo
} from 'reducers/ToDoDux';
import ApiService from 'services/apiService';
import ToDo from 'interfaces/ToDo';

const TodoContext = React.createContext<TodoContextInterface | undefined>(
  undefined
);

const TodoProvider: React.SFC = props => {
  const dispatch = useDispatch();
  // const selectTodos = (state: RootStateInterface) => state.todos;
  // const { todos } = useSelector(selectTodos);

  const loadTodos = (): void => {
    const fetchData = async (): Promise<void> => {
      try {
        const responses = await ApiService.get('todos');
        const todos = responses.data;
        todos.sort(
          (a: ToDo, b: ToDo) => Date.parse(a.endTime) - Date.parse(b.endTime)
        );
        dispatch(setToDos(todos));
      } catch (error) {
        dispatch(setToDoError());
        toast.error(
          'Failed to retrieve tasks. Please refresh the page to try again.'
        );
        throw new Error(error.message);
      }
    };
    fetchData();
  };

  const createTodo = async (code: {
    title: string;
    description: string;
    startTime: string;
    endTime: string;
    completed: boolean;
    tags: string[];
  }): Promise<void> => {
    try {
      const responses = await ApiService.post('todos', code);
      dispatch(addToDo(responses.data));
    } catch (error) {
      dispatch(setToDoError());
      toast.error(
        'Failed to create task. Please refresh the page to try again.'
      );
      throw new Error(error.message);
    }
  };

  const createSubTodo = async (
    id: number,
    code: {
      title: string;
      startTime: string;
      endTime: string;
      completed: boolean;
    }
  ): Promise<void> => {
    try {
      const responses = await ApiService.post(`todos/${id}/subtodos`, code);
      dispatch(updateToDo(responses.data));
    } catch (error) {
      dispatch(setToDoError());
      toast.error(
        'Failed to create subtask. Please refresh the page to try again.'
      );
      throw new Error(error.message);
    }
  };

  const updateTodo = async (
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
  ): Promise<void> => {
    try {
      const responses = await ApiService.patch(`todos/${id}`, code);
      dispatch(updateToDo(responses.data));
    } catch (error) {
      dispatch(setToDoError());
      toast.error(
        'Failed to update tasks. Please refresh the page to try again.'
      );
      throw new Error(error.message);
    }
  };

  const updateSubTodo = async (
    todoId: number,
    subtodoId: number,
    code: {
      title?: string;
      startTime?: string;
      endTime?: string;
      completed?: boolean;
    }
  ): Promise<void> => {
    try {
      const responses = await ApiService.patch(
        `todos/${todoId}/subtodos/${subtodoId}`,
        code
      );
      dispatch(updateToDo(responses.data));
    } catch (error) {
      dispatch(setToDoError());
      toast.error(
        'Failed to update subtask. Please refresh the page to try again.'
      );
      throw new Error(error.message);
    }
  };

  const deleteTodo = async (id: number): Promise<void> => {
    try {
      const responses = await ApiService.delete(`todos/${id}`);
      // console.log(responses);
      dispatch(deleteToDo(responses.data));
    } catch (error) {
      dispatch(setToDoError());
      toast.error(
        'Failed to delete task. Please refresh the page to try again.'
      );
      throw new Error(error.message);
    }
  };

  const deleteSubTodo = async (
    todoId: number,
    subtodoId: number
  ): Promise<void> => {
    try {
      const responses = await ApiService.delete(
        `todos/${todoId}/subtodos/${subtodoId}`
      );
      // console.log(responses);
      dispatch(updateToDo(responses.data));
    } catch (error) {
      dispatch(setToDoError());
      toast.error(
        'Failed to delete subtask. Please refresh the page to try again.'
      );
      throw new Error(error.message);
    }
  };

  return (
    <TodoContext.Provider
      value={{
        loadTodos,
        createTodo,
        createSubTodo,
        updateTodo,
        updateSubTodo,
        deleteTodo,
        deleteSubTodo
      }}
      {...props}
    />
  );
};

const useTodo = (): TodoContextInterface => {
  const context = React.useContext(TodoContext);
  if (context === undefined) {
    throw new Error(`useTodo must be used within a TodoProvider`);
  }
  return context;
};

export { TodoProvider, useTodo };
