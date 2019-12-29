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
      state.isTodoError = false;
    },
    updateToDo: (state, action: PayloadAction<ToDo>) => {
      const foundIndex = state.todos.findIndex(x => x.id === action.payload.id);
      state.todos[foundIndex] = action.payload;
      state.isTodoError = false;
    },
    addToDo: (state, action: PayloadAction<ToDo>) => {
      state.todos.push(action.payload);
      state.todos.sort((a, b) => Date.parse(a.endTime) - Date.parse(b.endTime));
      state.isTodoError = false;
    },
    setToDoError: state => {
      state.isTodoError = true;
    }
  }
});

export const { setToDos, updateToDo, addToDo, setToDoError } = todos.actions;

export default todos.reducer;
