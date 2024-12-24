import React from "react";
import "../styles/ScrollBar.css";
// import { NavigationContext } from "../utils/context";
import { useTheme } from '../utils/ThemeContext';
import ThemeToggler from "./ThemeToggler";

export default function ScrollBar({
  handleClick1,
  handleClick2,
  handleClick3,
  handleClick4,
  activeLink
}) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="scrollbar-container">
      <ThemeToggler theme={theme} toggleTheme={toggleTheme}/>
      <span className="timeline" data-theme={theme}></span>
      <div
        onClick={handleClick1}
        style={{ padding: activeLink === 1 ? `5px` : `0` }}
        className="alt-color__full-stop-outer"
        data-theme={theme}
      >
        <div className="alt-color__full-stop-inner" data-theme={theme}></div>
      </div>
      <span className="timeline__reversed-colors" data-theme={theme}></span>
      <div
        onClick={handleClick2}
        style={{ padding: activeLink === 2 ? `5px` : `0` }}
        className="full-stop-outer"
        data-theme={theme}
      >
        <div className="full-stop-inner" data-theme={theme}></div>
      </div>
      <span className="timeline" data-theme={theme}></span>
      <div
        onClick={handleClick3}
        style={{ padding: activeLink === 3 ? `5px` : `0` }}
        className="alt-color__full-stop-outer"
        data-theme={theme}
      >
        <div className="alt-color__full-stop-inner" data-theme={theme}></div>
      </div>
      <span className="timeline__reversed-colors" data-theme={theme}></span>
      <div
        onClick={handleClick4}
        style={{ padding: activeLink === 4 ? `5px` : `0` }}
        className="full-stop-outer"
        data-theme={theme}
      >
        <div className="full-stop-inner" data-theme={theme}></div>
      </div>
    </div>
  );
}
