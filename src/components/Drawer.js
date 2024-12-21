import React, { useState } from "react";
import "../styles/Drawer.css";
import { useLocation, navigate } from "gatsby";
// import { NavigationContext } from "../utils/context";
import { useTheme } from "../utils/ThemeContext";
import { Link } from "gatsby";
import git from "../images/github.svg";
import gitDark from "../images/github-dark.svg";
import linkedIn from "../images/linkedin.svg";
import linkedInDark from "../images/linkedin-dark.svg";

export default function Drawer({
  isOpen,
  closeDrawer,
  delayCloseIcon,
  delayAnimation,
  iconBar1,
  iconBar2,
  scrollHandlers,
  activeLink,
}) {
  const { theme } = useTheme();
  const location = window.location;

  const handleNavigateWithClose = (path) => {
    closeDrawer();

    // Wait for the animation to complete
    const animationDuration = 1000;
    setTimeout(() => {
      navigate(path);
    }, animationDuration);
  };

  const renderConditionalLinks = () => {
    switch (location.pathname) {
      case "/":
        return (
          <div className="links-container">
            <div
              onClick={() => {
                scrollHandlers.about();
              }}
              className="mobile-link-container bottom-spacing"
            >
              <span
                style={{ width: activeLink === 1 ? `75px` : `0px` }}
                className={
                  theme === "dark"
                    ? "mobile-link-line-reversed"
                    : "light-mobile-link-line-reversed"
                }
              ></span>
              {theme === "dark" ? (
                <p
                  className="drawer-link"
                  style={{ color: activeLink === 1 ? `#CEFF00` : `#FFF` }}
                >
                  ABOUT ME
                </p>
              ) : (
                <p
                  className="drawer-link"
                  style={{ color: activeLink === 1 ? `#9F00EA` : `#555151` }}
                >
                  ABOUT ME
                </p>
              )}
            </div>
            <div
              onClick={() => {
                scrollHandlers.workExperience();
              }}
              className="mobile-link-container bottom-spacing"
            >
              <span
                style={{ width: activeLink === 2 ? `75px` : `0px` }}
                className={
                  theme === "dark"
                    ? "mobile-link-line"
                    : "light-mobile-link-line"
                }
              ></span>
              {theme === "dark" ? (
                <p
                  className="drawer-link"
                  style={{ color: activeLink === 2 ? `#00A3FF` : `#FFF` }}
                >
                  WORK EXPERIENCE
                </p>
              ) : (
                <p
                  className="drawer-link"
                  style={{ color: activeLink === 2 ? `#EA8D00` : `#555151` }}
                >
                  WORK EXPERIENCE
                </p>
              )}
            </div>
            <div
              onClick={() => {
                scrollHandlers.projects();
              }}
              className="mobile-link-container bottom-spacing"
            >
              <span
                style={{ width: activeLink === 3 ? `75px` : `0px` }}
                className={
                  theme === "dark"
                    ? "mobile-link-line-reversed"
                    : "light-mobile-link-line-reversed"
                }
              ></span>
              {theme === "dark" ? (
                <p
                  className="drawer-link"
                  style={{ color: activeLink === 3 ? `#CEFF00` : `#FFF` }}
                >
                  RECENT PROJECTS
                </p>
              ) : (
                <p
                  className="drawer-link"
                  style={{ color: activeLink === 3 ? `#9F00EA` : `#555151` }}
                >
                  RECENT PROJECTS
                </p>
              )}
            </div>
            <div className="mobile-link-container bottom-spacing">
              <span
                style={{ width: `0px` }}
                className="mobile-link-line-reversed"
              ></span>
              <Link to="/projects/" className="no-decoration">
                <p
                  className="drawer-link"
                  style={{ color: theme === "dark" ? `#FFF` : `#555151` }}
                >
                  ALL PROJECTS
                </p>
              </Link>
            </div>
            <div
              onClick={() => {
                scrollHandlers.contact();
              }}
              className="mobile-link-container bottom-spacing"
            >
              <span
                style={{ width: activeLink === 4 ? `75px` : `0px` }}
                className={
                  theme === "dark"
                    ? "mobile-link-line"
                    : "light-mobile-link-line"
                }
              ></span>
              {theme === "dark" ? (
                <p
                  className="drawer-link"
                  style={{ color: activeLink === 4 ? `#00A3FF` : `#FFF` }}
                >
                  CONTACT ME
                </p>
              ) : (
                <p
                  className="drawer-link"
                  style={{ color: activeLink === 4 ? `#EA8D00` : `#555151` }}
                >
                  CONTACT ME
                </p>
              )}
            </div>
            <div className="mobile-link-container bottom-spacing">
              <span
                style={{ width: `0px` }}
                className="mobile-link-line"
              ></span>
              <Link to="/blogs/all-blogs/" className="no-decoration">
              <p className="static-link" data-theme={theme}>
                BLOG
              </p>
              </Link>
            </div>
          </div>
        );
      case "/projects/":
        return (
          <div className="links-container">
            <div className="mobile-link-container bottom-spacing">
              <span
                style={{ width: "0px" }}
                className="mobile-link-line-reversed"
              ></span>
              <Link to="/blogs/all-blogs" className="no-decoration">
                <p
                  className="drawer-link"
                  style={{ color: theme === "dark" ? "#FFF" : "#555151" }}
                >
                  BLOG
                </p>
              </Link>
            </div>
            <div className="mobile-link-container bottom-spacing">
              <span
                style={{ width: "0px" }}
                className="mobile-link-line-reversed"
              ></span>
              <Link to="/" className="no-decoration">
                <p
                  className="drawer-link"
                  style={{ color: theme === "dark" ? "#FFF" : "#555151" }}
                >
                  HOME
                </p>
              </Link>
            </div>
          </div>
        );
      case "/blogs/all-blogs/":
        return (
          <div className="links-container">
            <div className="mobile-link-container bottom-spacing">
              <span
                style={{ width: "0px" }}
                className="mobile-link-line-reversed"
              ></span>
              <Link to="/" className="no-decoration">
                <p
                  className="drawer-link"
                  style={{ color: theme === "dark" ? "#FFF" : "#555151" }}
                >
                  HOME
                </p>
              </Link>
            </div>
            <div className="mobile-link-container bottom-spacing">
              <span
                style={{ width: "0px" }}
                className="mobile-link-line-reversed"
              ></span>
              <Link to="/projects/" className="no-decoration">
                <p
                  className="drawer-link"
                  style={{ color: theme === "dark" ? "#FFF" : "#555151" }}
                >
                  ALL PROJECTS
                </p>
              </Link>
            </div>
          </div>
        );
      // Add more cases for other routes as needed
      default:
        return null;
    }
  };

  return (
    <div
      style={{ marginLeft: isOpen, transitionDelay: delayAnimation }}
      className={
        theme === "dark" ? "drawer-container" : "light-drawer-container"
      }
    >
      <div className="drawer-top">
        <div onClick={closeDrawer} className="toggle-close">
          <span
            style={{ transitionDelay: delayCloseIcon, transform: iconBar1 }}
            className={theme === "dark" ? "close-bar-1" : "light-close-bar-1"}
          ></span>
          <span
            style={{ transitionDelay: delayCloseIcon, transform: iconBar2 }}
            className={theme === "dark" ? "close-bar-2" : "light-close-bar-2"}
          ></span>
        </div>
      </div>
      <div className="drawer-bottom">
        {renderConditionalLinks()}

        <div className="socials-container">
          <a href="https://github.com/know-mad" target="_blank" rel="noopener">
            <img
              className="social-link"
              src={theme === "dark" ? git : gitDark}
              alt="some alt text"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/david-velez-5b29a833b"
            target="_blank"
            rel="noopener"
          >
            <img
              className="social-link"
              src={theme === "dark" ? linkedIn : linkedInDark}
              alt="some alt text"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
