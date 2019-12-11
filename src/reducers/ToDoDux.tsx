import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ToDo from 'interfaces/ToDo';

interface CurrentToDos {
  todos: ToDo[]
};

let initialState: CurrentToDos = {
  todos: []
};

const todos = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setToDos: (state, action: PayloadAction<ToDo[]> ) =>{
      state.todos = action.payload;
    },
  }
});

export const{
  setToDos,
} = todos.actions;

export default todos.reducer;