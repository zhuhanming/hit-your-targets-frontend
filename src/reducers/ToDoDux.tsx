import { createSlice } from "@reduxjs/toolkit";
import ToDo from 'interfaces/ToDo';

const todos = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
  },
  reducers: {
    setToDos: (state, { payload }) =>{
      state = payload;
    },
  }
});

export const{
  setToDos,
} = todos.actions;

export default todos.reducer;