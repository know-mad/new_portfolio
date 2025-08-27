import React from "react";
import { ThemeProvider } from "./src/context/ThemeContext";
import { DrawerProvider } from "./src/context/DrawerContext";
import Layout from "./src/components/Layout";

export const wrapRootElement = ({ element }) => {
  return (
    <ThemeProvider>
      <DrawerProvider>{element}</DrawerProvider>
    </ThemeProvider>
  );
};

// This ensures Drawer is inside Gatsby's Router
export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>;
};
