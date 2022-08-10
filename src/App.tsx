import { FC } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { HomePage } from "./pages/home";
import { AboutPage } from "./pages/about";

export const App: FC = () => {
  return (
    <>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </>
  );
};
