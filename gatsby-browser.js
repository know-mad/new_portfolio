import React from "react";
import { ThemeProvider } from "./src/utils/ThemeContext";
import { DrawerProvider } from "./src/utils/DrawerContext";

export const wrapRootElement = ({ element }) => {
  return (
    <ThemeProvider>
      <DrawerProvider>{element}</DrawerProvider>
    </ThemeProvider>
  );
};
