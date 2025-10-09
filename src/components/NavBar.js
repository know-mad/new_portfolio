import React from "react";
import ThemeToggler from "./ThemeToggler";
import { Link } from "gatsby";
import { useLocation } from "@reach/router";
import "../styles/NavBar.css";

import darkBackArrow from "../images/arrow-icon.svg";
import lightBackArrow from "../images/alt-arrow-icon-light.svg";

export default function NavBar({
  theme,
  openDrawer,
  isDrawerOpen,
  toggleTheme,
}) {
  const location = useLocation();
  const articlePage =
    location.pathname.startsWith("/blogs/") &&
    location.pathname !== "/blogs/all-blogs/";
  const projectPage =
    location.pathname.startsWith("/projects/") &&
    location.pathname !== "/projects/all-projects/";

  const demoPage =
    location.pathname.startsWith("/ai/") &&
    location.pathname !== "/ai/ai-solutions/" &&
    location.pathname !== "/ai/";

  const renderDynamicPageTitles = () => {
    if (
      location.pathname.startsWith("/blogs/") &&
      location.pathname !== "/blogs/all-blogs/"
    ) {
      return (
        <h1 className="page-heading-extra-bold" data-theme={theme}>
          Article
        </h1>
      );
    }

    if (
      location.pathname.startsWith("/projects/") &&
      location.pathname !== "/projects/all-projects/"
    ) {
      return (
        <h1 className="page-heading-extra-bold" data-theme={theme}>
          Project
        </h1>
      );
    }

    if (
      location.pathname.startsWith("/ai/") &&
      location.pathname !== "/ai/ai-solutions/" &&
      location.pathname !== "/ai/"
    ) {
      return (
        <h1 className="page-heading-extra-bold" data-theme={theme}>
          Ai Demo
        </h1>
      );
    }

    switch (location.pathname) {
      case "/projects/all-projects/":
        return (
          <h1 className="page-heading-extra-bold" data-theme={theme}>
            Project Archives
          </h1>
        );
      case "/blogs/all-blogs/":
        return (
          <h1 className="page-heading-extra-bold" data-theme={theme}>
            Blog
          </h1>
        );
      case "/ai/":
        return (
          <h1 className="page-heading-extra-bold" data-theme={theme}>
            Ai
          </h1>
        );
      case "/ai/ai-solutions/":
        return (
          <h1 className="page-heading-extra-bold" data-theme={theme}>
            Ai Solutions
          </h1>
        );
      default:
        return null;
    }
  };

  const renderRoute = () => {
    if (articlePage) {
      return "/blogs/all-blogs/";
    } else if (projectPage) {
      return "/projects/all-projects/";
    } else {
      return "/ai/ai-solutions/";
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          {articlePage || projectPage || demoPage ? (
            <Link to={renderRoute()} className="back-navigator-link">
              <img
                className="back-arrow"
                src={theme === "dark" ? darkBackArrow : lightBackArrow}
                alt="some alt text"
              />
              <p className="mobile-back-button" data-theme={theme}>
                Back
              </p>
            </Link>
          ) : (
            <div
              onClick={openDrawer}
              style={{
                marginLeft: isDrawerOpen ? `-350px` : `0`,
                transitionDelay: isDrawerOpen ? `0.5s` : `1s`,
              }}
              className="toggle-open"
            >
              <span
                className={
                  theme === "dark" ? "toggle-bar-1" : "light-toggle-bar-1"
                }
                style={{
                  top: isDrawerOpen ? `50%` : `0`,
                  transitionDelay: isDrawerOpen ? `0s` : `1.5s`,
                }}
              ></span>
              <span
                className={
                  theme === "dark" ? "toggle-bar-2" : "light-toggle-bar-2"
                }
              ></span>
              <span
                className={
                  theme === "dark" ? "toggle-bar-3" : "light-toggle-bar-3"
                }
                style={{
                  bottom: isDrawerOpen ? `50%` : `0`,
                  transitionDelay: isDrawerOpen ? `0s` : `1.5s`,
                }}
              ></span>
            </div>
          )}
        </div>
        <div className="navbar-center">{renderDynamicPageTitles()}</div>
        <div className="navbar-right">
          {/* Functionality passed to Layout component to use universally across the site */}
          {location.pathname !== "/" && (
            <ThemeToggler theme={theme} toggleTheme={toggleTheme} />
          )}
        </div>
      </nav>
      {location.pathname !== "/" && (
        <nav className="alt-navbar">
          <div className="alt-navbar-left">
            <div className="alt-navbar-title">{renderDynamicPageTitles()}</div>
            <div className="alt-navbar-links">
              <div className="alt-navbar-link">
                <Link
                  to="/"
                  className="link-bold no-decoration"
                  data-theme={theme}
                >
                  <p>home</p>
                </Link>
              </div>
              <div className="alt-navbar-link">
                <Link
                  to="/projects/all-projects/"
                  className="link-bold no-decoration"
                  data-theme={theme}
                >
                  <p>projects</p>
                </Link>
                {location.pathname === "/projects/all-projects/" && (
                  <span className="active-route-indicator" data-theme={theme} />
                )}
              </div>
              <div className="alt-navbar-link">
                <Link
                  to="/ai/"
                  className="link-bold no-decoration"
                  data-theme={theme}
                >
                  <p>ai</p>
                </Link>
                {location.pathname === "/ai/" && (
                  <span className="active-route-indicator" data-theme={theme} />
                )}
              </div>
              <div className="alt-navbar-link">
                <Link
                  to="/blogs/all-blogs/"
                  className="link-bold no-decoration"
                  data-theme={theme}
                >
                  <p>blog</p>
                </Link>
                {location.pathname === "/blogs/all-blogs/" && (
                  <span className="active-route-indicator" data-theme={theme} />
                )}
              </div>
            </div>
          </div>
          <div className="alt-navbar-right">
            <ThemeToggler theme={theme} toggleTheme={toggleTheme} />
          </div>
        </nav>
      )}
    </>
  );
}
