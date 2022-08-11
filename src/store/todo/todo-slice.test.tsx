import todoReducer, {
  addTodo,
  initialState,
  removeTodo,
  toggleDone,
} from "./todo-slice";
import { PureTodo, TodoState } from "./todo-types";

describe("todo-slice", () => {
  it("should return initial state", () => {
    const state = todoReducer(undefined, { type: "some-test-type" });
    expect(state).toEqual(initialState);
  });

  it("should add todo", () => {
    const initialState: TodoState = { list: [] };
    const newTodo: PureTodo = { text: "some-test-text" };
    const state = todoReducer(initialState, addTodo(newTodo));
    expect(state.list.at(-1)?.text).toBe(newTodo.text);
  });

  it("should remove todo", () => {
    const todo = { id: 1, isDone: true, text: "some-test-text" };
    const initialState: TodoState = { list: [todo] };
    const state = todoReducer(initialState, removeTodo(todo));
    expect(state.list.length).toBe(initialState.list.length - 1);
  });

  it("should toogle done", () => {
    const todo = { id: 1, isDone: true, text: "some-test-text" };
    const initialState: TodoState = { list: [todo] };
    const state = todoReducer(initialState, toggleDone(todo));
    expect(state.list[0].text).toBe(todo.text);
  });
});
