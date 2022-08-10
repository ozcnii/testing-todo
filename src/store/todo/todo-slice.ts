import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "./todo-types";
import { PureTodo, TodoState } from "./todo-types";

const initialState: TodoState = {
  list: [
    {
      id: 1,
      isDone: true,
      text: "hello",
    },
  ],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<PureTodo>) => {
      state.list.push({
        ...action.payload,
        id: Date.now(),
        isDone: false,
      });
    },
    removeTodo: (state, action: PayloadAction<Todo>) => {
      state.list = state.list.filter((item) => item.id !== action.payload.id);
    },
    toggleDone: (state, action: PayloadAction<Todo>) => {
      state.list = state.list.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            isDone: !item.isDone,
          };
        }
        return item;
      });
    },
  },
});

export const { addTodo, removeTodo, toggleDone } = todoSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default todoSlice.reducer;
