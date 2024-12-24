import React, { useEffect } from "react";
import Drawer from "./Drawer";
import NavBar from "./NavBar";
import { useDrawer } from "../utils/DrawerContext";
import { useTheme } from "../utils/ThemeContext";
import "../styles/Drawer.css";
import { useLocation } from "@reach/router"; // Import useLocation

export default function Layout({ children, scrollHandlers, activeLink }) {
  const { isDrawerOpen, closeDrawer, openDrawer } = useDrawer();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation()
  

  useEffect(() => {
    if (location.pathname !== "/") {
      const topNav = document.querySelector(".alt-navbar");
      const trigger = document.querySelector(".page-content-container");

      // Initial state setup
      topNav.style.backgroundColor = "transparent";

      const myScrollFunction = () => {
        const res =
          trigger.offsetTop -
          document.documentElement.scrollTop -
          topNav.offsetHeight;

        // Check if content is under the navbar
        if (res <= 0) {
          // Dynamically set the navbar background color based on the theme
          topNav.style.backgroundColor =
            theme === "dark"
              ? "rgba(217,217,217,0.04)"
              : "rgba(146,146,146,0.1)";
          topNav.style.boxShadow =  theme === "dark" ? "0px 0.5px #636363" : "8px 5px 12px #636363";
        } else {
          // Reset background color and box-shadow when the content is not under the navbar
          topNav.style.backgroundColor = "transparent";
          topNav.style.boxShadow = "none";
        }
      };

      // Attach the scroll event listener
      window.addEventListener("scroll", myScrollFunction);

      // Check the navbar background color immediately when the theme changes
      myScrollFunction(); // Trigger the function when theme changes

      // Cleanup function to remove the scroll event listener
      return () => {
        window.removeEventListener("scroll", myScrollFunction);
      };
    }
  }, [theme, location.pathname]); // Re-run the effect when the theme changes

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
        {/* Play with this to see if it is better to have it as part of the layout for all routes */}
        <NavBar
          isDrawerOpen={isDrawerOpen}
          theme={theme}
          openDrawer={openDrawer}
          toggleTheme={toggleTheme}
        />
        <main>{children}</main>
      </div>
    </>
  );
}
