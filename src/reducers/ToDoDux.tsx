/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ToDo from 'interfaces/ToDo';

export interface CurrentToDos {
  todos: ToDo[];
  isTodoError: boolean;
}

const initialState: CurrentToDos = {
  todos: [],
  isTodoError: false
};

const todos = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setToDos: (state, action: PayloadAction<ToDo[]>) => {
      state.todos = action.payload;
    },
    updateToDo: (state, action: PayloadAction<ToDo>) => {
      const foundIndex = state.todos.findIndex(x => x.id === action.payload.id);
      state.todos[foundIndex] = action.payload;
    },
    setToDoError: (state, action: PayloadAction<boolean>) => {
      state.isTodoError = action.payload;
    }
  }
});

export const { setToDos, updateToDo, setToDoError } = todos.actions;

export default todos.reducer;
