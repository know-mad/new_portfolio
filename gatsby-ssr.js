// Import React so that you can use JSX in HeadComponents
import React from "react";
import { ThemeProvider } from "./src/utils/ThemeContext";
import { DrawerProvider } from "./src/utils/DrawerContext";

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
    <DrawerProvider>
      <ThemeProvider>{element}</ThemeProvider>
    </DrawerProvider>
  );
};

export const onRenderBody = ({ setBodyAttributes }, pluginOptions) => {
  setBodyAttributes(BodyAttributes);
};
