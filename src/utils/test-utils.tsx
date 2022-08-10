import { ReactNode } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { MemoryHistoryOptions } from "history";
import { initStore } from "../store";

export const Wrapper = (component: ReactNode) => {
  const store = initStore();
  return (
    <Provider store={store}>
      <BrowserRouter>{component}</BrowserRouter>
    </Provider>
  );
};

export const WrapperWithHistory = (
  component: ReactNode,
  options: MemoryHistoryOptions = {}
) => {
  const store = initStore();
  return (
    <Provider store={store}>
      <MemoryRouter {...options}>{component}</MemoryRouter>
    </Provider>
  );
};
