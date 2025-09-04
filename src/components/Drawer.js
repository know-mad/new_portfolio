import React, { useEffect } from "react";
import "../styles/Drawer.css";
import { useTheme } from "../context/ThemeContext";
import { useDrawer } from "../context/DrawerContext";
import { navigate } from "gatsby";
import git from "../images/github.svg";
import gitDark from "../images/github-dark.svg";
import linkedIn from "../images/linkedin.svg";
import linkedInDark from "../images/linkedin-dark.svg";
import { useLocation } from "@reach/router"; // Import useLocation

export default function Drawer({
  isOpen,
  delayCloseIcon,
  delayAnimation,
  iconBar1,
  iconBar2,
  activeLink,
}) {
  const { theme } = useTheme();
  const location = useLocation();
  const { scrollToSection, isScrolling, closeDrawer } = useDrawer();

  const handleNavigate = (route) => {
    closeDrawer();
    setTimeout(() => {navigate(route)}, 1000)
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
        {/* Animated Links Containers */}
        <div
          style={{
            marginLeft: location.pathname === "/" ? 0 : -400,
          }}
          className="home-links-container"
        >
          <div
            onClick={() => {
              scrollToSection("about", 1);
            }}
            className="mobile-link-container bottom-spacing"
          >
            <span
              style={{
                width: activeLink === 1 && !isScrolling ? `75px` : `0px`,
              }}
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
              scrollToSection("work", 2);
            }}
            className="mobile-link-container bottom-spacing"
          >
            <span
              style={{
                width: activeLink === 2 && !isScrolling ? `75px` : `0px`,
              }}
              className={
                theme === "dark" ? "mobile-link-line" : "light-mobile-link-line"
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
              scrollToSection("projects", 3);
            }}
            className="mobile-link-container bottom-spacing"
          >
            <span
              style={{
                width: activeLink === 3 && !isScrolling ? `75px` : `0px`,
              }}
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
          <div
            onClick={() => {
              scrollToSection("contact", 4);
            }}
            className="mobile-link-container bottom-spacing"
          >
            <span
              style={{
                width: activeLink === 4 && !isScrolling ? `75px` : `0px`,
              }}
              className={
                theme === "dark" ? "mobile-link-line" : "light-mobile-link-line"
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
              className="mobile-link-line-reversed"
            ></span>
            <div
              onClick={() => handleNavigate("/projects/all-projects/")}
              className="no-decoration"
            >
              <p
                className="drawer-link"
                style={{ color: theme === "dark" ? `#FFF` : `#555151` }}
              >
                ARCHIVES
              </p>
            </div>
          </div>
          <div className="mobile-link-container bottom-spacing">
            <span style={{ width: `0px` }} className="mobile-link-line"></span>
            <div
              onClick={() => handleNavigate("/blogs/all-blogs/")}
              className="no-decoration"
            >
              <p className="static-link" data-theme={theme}>
                BLOG
              </p>
            </div>
          </div>
        </div>

        {/* Projects */}

        <div
          style={{
            marginLeft:
              location.pathname === "/projects/all-projects/" ? 0 : -400,
          }}
          className="projects-links-container"
        >
          <div className="mobile-link-container bottom-spacing">
            <span
              style={{ width: "0px" }}
              className="mobile-link-line-reversed"
            ></span>
            <div
              onClick={() => handleNavigate("/blogs/all-blogs")}
              className="no-decoration"
            >
              <p
                className="drawer-link"
                style={{ color: theme === "dark" ? "#FFF" : "#555151" }}
              >
                BLOG
              </p>
            </div>
          </div>
          <div className="mobile-link-container bottom-spacing">
            <span
              style={{ width: "0px" }}
              className="mobile-link-line-reversed"
            ></span>
            <div onClick={() => handleNavigate("/")} className="no-decoration">
              <p
                className="drawer-link"
                style={{ color: theme === "dark" ? "#FFF" : "#555151" }}
              >
                HOME
              </p>
            </div>
          </div>
        </div>

        {/* Blogs */}

        <div
          style={{
            marginLeft: location.pathname === "/blogs/all-blogs/" ? 0 : -400,
          }}
          className="blogs-links-container"
        >
          <div className="mobile-link-container bottom-spacing">
            <span
              style={{ width: "0px" }}
              className="mobile-link-line-reversed"
            ></span>
            <div onClick={() => handleNavigate("/")} className="no-decoration">
              <p
                className="drawer-link"
                style={{ color: theme === "dark" ? "#FFF" : "#555151" }}
              >
                HOME
              </p>
            </div>
          </div>
          <div className="mobile-link-container bottom-spacing">
            <span
              style={{ width: "0px" }}
              className="mobile-link-line-reversed"
            ></span>
            <div
              onClick={() => handleNavigate("/projects/all-projects/")}
              className="no-decoration"
            >
              <p
                className="drawer-link"
                style={{ color: theme === "dark" ? "#FFF" : "#555151" }}
              >
                ARCHIVES
              </p>
            </div>
          </div>
        </div>

        {/* Article */}
        <div
          style={{
            marginLeft:
              (location.pathname.startsWith("/blogs/") &&
                location.pathname !== "/blogs/all-blogs/") ||
              (location.pathname.startsWith("/projects/") &&
                location.pathname !== "/projects/all-projects/")
                ? 0
                : -400,
          }}
          className="article-links-container"
        >
          <div className="mobile-link-container bottom-spacing">
            <span
              style={{ width: "0px" }}
              className="mobile-link-line-reversed"
            ></span>
            <div onClick={() => handleNavigate("/")} className="no-decoration">
              <p
                className="drawer-link"
                style={{ color: theme === "dark" ? "#FFF" : "#555151" }}
              >
                HOME
              </p>
            </div>
          </div>
          <div className="mobile-link-container bottom-spacing">
            <span
              style={{ width: "0px" }}
              className="mobile-link-line-reversed"
            ></span>
            <div
              onClick={() => handleNavigate("/blogs/all-blogs/")}
              className="no-decoration"
            >
              <p
                className="drawer-link"
                style={{ color: theme === "dark" ? "#FFF" : "#555151" }}
              >
                BLOG
              </p>
            </div>
          </div>
          <div className="mobile-link-container bottom-spacing">
            <span
              style={{ width: "0px" }}
              className="mobile-link-line-reversed"
            ></span>
            <div
              onClick={() => handleNavigate("/projects/all-projects/")}
              className="no-decoration"
            >
              <p
                className="drawer-link"
                style={{ color: theme === "dark" ? "#FFF" : "#555151" }}
              >
                ARCHIVES
              </p>
            </div>
          </div>
        </div>

        {/* End Links Containers */}

        <div className="mobile-socials-container">
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
