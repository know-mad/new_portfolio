import React  from "react";
import Drawer from "./Drawer";
import { useDrawer } from "../utils/DrawerContext";
import "../styles/Drawer.css"

export default function Layout({ children, scrollHandlers, activeLink }) {
  const { isDrawerOpen, closeDrawer } = useDrawer();

  return (
    <>
      <Drawer
        isOpen={isDrawerOpen ? `0` : `-400px`}
        delayCloseIcon={isDrawerOpen ? `1.5s` : `0s`}
        delayAnimation={isDrawerOpen ? `1s` : `0.5s`}
        iconBar1={isDrawerOpen ? `rotate(45deg)` : `rotate(0deg)`}
        iconBar2={isDrawerOpen ? `rotate(-45deg)` : `rotate(0deg)`}
        closeDrawer={closeDrawer}
        scrollHandlers={scrollHandlers}
        activeLink={activeLink}
      />
      <div className="layout-container">
        <main>{children}</main>
      </div>
    </>
  );
}
