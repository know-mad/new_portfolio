import React from "react";
import { ThemeProvider } from "./src/utils/ThemeContext";

export const wrapRootElement = ({ element }) => {
  return <ThemeProvider>{element}</ThemeProvider>;
};
