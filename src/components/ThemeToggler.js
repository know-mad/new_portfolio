import React from 'react'
import moon from "../images/moon.svg";
import sun from "../images/sun.svg";


export default function ThemeToggler({theme, toggleTheme}) {
  return (
    <div onClick={toggleTheme} className="theme-toggle" data-theme={theme}>
    { theme === "dark" ? (
    <img src={moon} alt="some alt text" />
    ) : (
      <img src={sun} alt="some alt text" />
    )}
  </div>
  )
}