import React from "react";
import moon from "../images/moon-alt.svg";
import sun from "../images/sun.svg";

export default function ThemeToggler({ theme, toggleTheme }) {
  return (
    <div onClick={toggleTheme} className="theme-toggle" data-theme={theme}>
      <div
        style={{ marginRight: theme === "dark" ? 0 : -100 }}
        className="dark-image-container"
      >
        <img className="toggle-icon" src={moon} alt="some alt text" />
      </div>
      <div
        style={{ marginRight: theme === "light" ? 0 : -100 }}
        className="light-image-container"
      >
        <img className="toggle-icon" src={sun} alt="some alt text" />
      </div>
    </div>
  );
}
