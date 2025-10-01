// Import React so that you can use JSX in HeadComponents
import React from "react";
import { ThemeProvider } from "./src/context/ThemeContext";
import { DrawerProvider } from "./src/context/DrawerContext";
import Layout from "./src/components/Layout";
import "./src/styles/index.css";

const HtmlAttributes = {
  lang: "en",
};

const HeadComponents = [
  <script key="my-script" src="https://gatsby.dev/my-script" />,
];

const BodyAttributes = {
  "data-theme": "dark",
};

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

export const onRenderBody = (
  { setBodyAttributes, setHeadComponents },
  pluginOptions
) => {
  setBodyAttributes(BodyAttributes);
  setHeadComponents([
    <script
      src="https://unpkg.com/@elevenlabs/convai-widget-embed"
      async
      type="text/javascript"
    />,
  ]);
};
