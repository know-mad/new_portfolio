import React from "react";
import ThemeToggler from "./ThemeToggler";
import { Link } from "gatsby";
import { useLocation } from "@reach/router"; // Import useLocation


export default function NavBar({
  theme,
  openDrawer,
  isDrawerOpen,
  toggleTheme,
}) {
  const location = useLocation()
  
  const renderDynamicPageTitles = () => {
    if (location.pathname.startsWith("/blogs/") && location.pathname !== "/blogs/all-blogs/") {
      return (
        <h1 className="page-heading-extra-bold" data-theme={theme}>
          Article
        </h1>
      );
    }

    if (location.pathname.startsWith("/projects/") && location.pathname !== "/projects/all-projects/") { 
      return (
        <h1 className="page-heading-extra-bold" data-theme={theme}>
          Project
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
      default:
        return null;
    }
  };
  

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
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
            {renderDynamicPageTitles()}
            {location.pathname.startsWith("/blogs/") && location.pathname !== "/blogs/all-blogs/" && (
              <Link
              to="/blogs/all-blogs/"
              className="link-bold no-decoration"
              data-theme={theme}
            >
              <p>all blogs</p>
            </Link>
            )}
            {location.pathname.startsWith("/projects/") && location.pathname !== "/projects/all-projects/" && (
              <Link
              to="/projects/all-projects/"
              className="link-bold no-decoration"
              data-theme={theme}
            >
              <p>all projects</p>
            </Link>
            )}
            {location.pathname === "/projects/all-projects/" && (
              <Link
                to="/blogs/all-blogs/"
                className="link-bold no-decoration"
                data-theme={theme}
              >
                <p>blog</p>
              </Link>
            )}
            {location.pathname === "/blogs/all-blogs/" && (
              <Link
                to="/projects/all-projects/"
                className="link-bold no-decoration"
                data-theme={theme}
              >
                <p>projects</p>
              </Link>
            )}
          </div>
          <div className="alt-navbar-right">
            <Link to="/" className="link-bold no-decoration" data-theme={theme}>
              <p>home</p>
            </Link>
            <ThemeToggler theme={theme} toggleTheme={toggleTheme} />
          </div>
        </nav>
      )}
    </>
  );
}


