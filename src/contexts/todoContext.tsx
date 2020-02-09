import React from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import TodoContextInterface from 'interfaces/TodoContext';
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

// Interacts with backend and redux store to manage tasks
// Any errors encountered are all thrown upwards
const TodoProvider: React.SFC = props => {
  const dispatch = useDispatch();

  // Fetches tasks and load them into redux store
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

  // Create task and add it to redux store
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

  // Create subtask on backend and update task in redux store
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

  // Update task on backend and load the result into redux store
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

  // Update subtask on backend and update task in redux store
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

  // Delete task on backend and in store
  const deleteTodo = async (id: number): Promise<void> => {
    try {
      const responses = await ApiService.delete(`todos/${id}`);
      dispatch(deleteToDo(responses.data));
    } catch (error) {
      dispatch(setToDoError());
      toast.error(
        'Failed to delete task. Please refresh the page to try again.'
      );
      throw new Error(error.message);
    }
  };

  // Delete subtask on backend and update task in store
  const deleteSubTodo = async (
    todoId: number,
    subtodoId: number
  ): Promise<void> => {
    try {
      const responses = await ApiService.delete(
        `todos/${todoId}/subtodos/${subtodoId}`
      );
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
