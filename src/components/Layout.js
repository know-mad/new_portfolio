import React, { useEffect } from "react";
import Drawer from "./Drawer";
import NavBar from "./NavBar";
import { useDrawer } from "../context/DrawerContext";
import { useTheme } from "../context/ThemeContext";
import "../styles/Drawer.css";
import { useLocation } from "@reach/router"; // Import useLocation

import rotateDevice from "../images/rotate-device.svg";
import lightRotateDevice from "../images/light-rotate-device.svg";

export default function Layout({ children }) {
  const { isDrawerOpen, closeDrawer, openDrawer, activeLink } = useDrawer();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  // Lock body scroll when the drawer is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalTouchAction = document.body.style.touchAction;

    const preventTouchMove = (e) => {
      if (isDrawerOpen) {
        e.preventDefault();
      }
    };

    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
      // Prevent iOS scroll bounce
      window.addEventListener("touchmove", preventTouchMove, {
        passive: false,
      });
    } else {
      document.body.style.overflow = originalOverflow || "";
      document.body.style.touchAction = originalTouchAction || "";
      window.removeEventListener("touchmove", preventTouchMove);
    }

    return () => {
      document.body.style.overflow = originalOverflow || "";
      document.body.style.touchAction = originalTouchAction || "";
      window.removeEventListener("touchmove", preventTouchMove);
    };
  }, [isDrawerOpen]);

  useEffect(() => {
    if (location.pathname !== "/") {
      const topNav = document.querySelector(".alt-navbar");
      const trigger = document.querySelector(".page-content-container");

      // Guard: if required elements don't exist on this page, skip
      if (!topNav || !trigger) {
        return;
      }

      // Initial state setup
      topNav.style.backgroundColor = "transparent";

      const myScrollFunction = () => {
        // Elements may be removed on route changes; guard each call
        if (!topNav || !trigger) {
          return;
        }
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
          topNav.style.boxShadow =
            theme === "dark" ? "0px 0.5px #636363" : "8px 5px 12px #636363";
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
      {/* <elevenlabs-convai agent-id="agent_3101k63w19ehf8ra1jjkf5856bs7"></elevenlabs-convai> */}
      <Drawer
        isOpen={isDrawerOpen ? `0` : `-400px`}
        delayCloseIcon={isDrawerOpen ? `1.5s` : `0s`}
        delayAnimation={isDrawerOpen ? `1s` : `0.5s`}
        iconBar1={isDrawerOpen ? `rotate(45deg)` : `rotate(0deg)`}
        iconBar2={isDrawerOpen ? `rotate(-45deg)` : `rotate(0deg)`}
        // closeDrawer={closeDrawer}
        // scrollHandlers={scrollHandlers}
        activeLink={activeLink}
      />
      <div className="layout-container">
        <NavBar
          isDrawerOpen={isDrawerOpen}
          theme={theme}
          openDrawer={openDrawer}
          toggleTheme={toggleTheme}
        />
        <main>{children}</main>
      </div>
      {/* Display a warning when a mobile device is in landscape orientation */}
      <div
        className={
          theme === "dark"
            ? "rotate-warning-container"
            : "light-rotate-warning-container"
        }
      >
        <div className="rotate-warning">
          <p className="copy-font" data-theme={theme}>
            Please rotate your device to portrait orientation for best
            experience.
          </p>
          <img
            className="rotate-icon"
            src={theme === "dark" ? rotateDevice : lightRotateDevice}
            alt="some alt text"
          />
        </div>
      </div>
    </>
  );
}
