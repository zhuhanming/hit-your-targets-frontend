/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';

import ToDo from 'interfaces/ToDo';

export interface CurrentToDos {
  todos: ToDo[];
  isTodoError: boolean;
  incompleteOrder: number[]; // Order for Kanban View to map with
  completeOrder: number[]; // Order for Kanban View to map with
}

const initialState: CurrentToDos = {
  todos: [],
  isTodoError: false,
  incompleteOrder: [],
  completeOrder: []
};

const todos = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // When setting todos, check if the current orders are updated
    // If not updated, manually update. Risks overwriting data but unlikely to occur
    setToDos: (state, action: PayloadAction<ToDo[]>): void => {
      state.todos = action.payload;
      state.isTodoError = false;
      const completeTodos = state.todos.filter(t => t.completed);
      completeTodos.sort(
        (a, b) => Date.parse(b.completeTime) - Date.parse(a.completeTime)
      );
      const completeTodoIds = completeTodos.map(t => t.id);
      if (
        !_.isEqual(_.sortBy(completeTodoIds), _.sortBy(state.completeOrder))
      ) {
        state.completeOrder = completeTodoIds;
      }
      const incompleteTodoIds = state.todos
        .filter(t => !t.completed)
        .map(t => t.id);
      if (
        !_.isEqual(_.sortBy(incompleteTodoIds), _.sortBy(state.incompleteOrder))
      ) {
        state.incompleteOrder = incompleteTodoIds;
      }
    },
    // Updates the todo
    // Updates the orders if there's a change in completed status of the todo
    updateToDo: (state, action: PayloadAction<ToDo>): void => {
      const foundIndex = state.todos.findIndex(x => x.id === action.payload.id);
      const initialCompleted = state.todos[foundIndex].completed;
      state.todos[foundIndex] = action.payload;
      state.isTodoError = false;
      if (initialCompleted !== action.payload.completed) {
        if (initialCompleted) {
          state.completeOrder = state.completeOrder.filter(
            t => t !== action.payload.id
          );
          state.incompleteOrder = state.todos
            .filter(
              t =>
                t.id === action.payload.id ||
                state.incompleteOrder.includes(t.id)
            )
            .map(t => t.id);
        } else {
          state.incompleteOrder = state.incompleteOrder.filter(
            t => t !== action.payload.id
          );
          const completeTodos = state.todos.filter(t => t.completed);
          completeTodos.sort(
            (a, b) => Date.parse(b.completeTime) - Date.parse(a.completeTime)
          );
          const completeTodoIds = completeTodos.map(t => t.id);
          state.completeOrder = completeTodoIds;
        }
      }
    },
    // Add todo and update incompleteOrder
    addToDo: (state, action: PayloadAction<ToDo>): void => {
      state.todos.push(action.payload);
      state.incompleteOrder.push(action.payload.id);
      state.todos.sort((a, b) => Date.parse(a.endTime) - Date.parse(b.endTime));
      state.isTodoError = false;
    },
    // Delete todo and remove todo id from the order it was in
    deleteToDo: (state, action: PayloadAction<number>): void => {
      state.todos = state.todos.filter(x => x.id !== action.payload);
      state.completeOrder = state.completeOrder.filter(
        x => x !== action.payload
      );
      state.incompleteOrder = state.incompleteOrder.filter(
        x => x !== action.payload
      );
      state.isTodoError = false;
    },
    setCompleteOrder: (state, action: PayloadAction<number[]>): void => {
      state.completeOrder = action.payload;
    },
    setIncompleteOrder: (state, action: PayloadAction<number[]>): void => {
      state.incompleteOrder = action.payload;
    },
    // Just in case - not utilised in app
    setToDoError: (state): void => {
      state.isTodoError = true;
    }
  }
});

export const {
  setToDos,
  updateToDo,
  addToDo,
  setToDoError,
  deleteToDo,
  setCompleteOrder,
  setIncompleteOrder
} = todos.actions;

export default todos.reducer;
