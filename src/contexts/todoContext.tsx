import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

const defaultContextData = {
  loadTodos: () => null,
  createTodo: (data: any) => null,
  createSubTodo: (data: any) => null,
  updateTodo: (id: number, data: any) => null,
  updateSubTodo: (data: any) => null,
  deleteTodo: (data: any) => null,
  deleteSubTodo: (data: any) => null
};

const TodoContext = React.createContext<TodoContextInterface>(
  defaultContextData
);

const TodoProvider = props => {
  const dispatch = useDispatch();
  // const selectTodos = (state: RootStateInterface) => state.todos;
  // const { todos } = useSelector(selectTodos);

  const loadTodos = () => {
    const fetchData = async () => {
      try {
        const responses = await ApiService.get('todos');
        const todos = responses.data;
        todos.sort((a, b) => Date.parse(a.endTime) - Date.parse(b.endTime));
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

  const createTodo = async code => {
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

  const updateTodo = async (id, code) => {
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

  const deleteTodo = async id => {
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

  return (
    <TodoContext.Provider
      value={{ loadTodos, createTodo, updateTodo, deleteTodo }}
      {...props}
    />
  );
};

const useTodo = () => {
  const context = React.useContext(TodoContext);
  if (context === undefined) {
    throw new Error(`useTodo must be used within a TodoProvider`);
  }
  return context;
};

export { TodoProvider, useTodo };
