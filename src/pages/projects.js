import React, { useState, useRef } from "react";
import "../styles/projects.css";
import { useTheme } from "../utils/ThemeContext";
import ThemeToggler from "../components/ThemeToggler";
import { Link } from "gatsby";

import arrow from "../images/arrow-icon.svg";
import arrowLight from "../images/arrow-icon-light.svg";
import link from "../images/link-arrow.svg";
import lightLink from "../images/light-link-arrow.svg";
import data from "../data/data.json";
import RotateWarning from "../components/RotateWarning";

export default function AllProjects() {
  const { theme, toggleTheme } = useTheme();
  const [pageTitle, setPageTitle] = useState(true)

  const rows = data;

  const [expandedRow, setExpandedRow] = useState(null); // Track the currently expanded row
  const refs = useRef(rows.map(() => React.createRef())); // Create refs for each row

  const toggleAccordion = (rowId) => {
    const newExpandedRow = expandedRow === rowId ? null : rowId; // Determine the new expanded row
    const previousRowRef =
      expandedRow !== null ? refs.current[expandedRow - 1] : null; // Ref for the currently expanded row
    const currentRowRef = refs.current[rowId - 1]; // Ref for the newly clicked row

    // Collapse the previously expanded row
    if (previousRowRef && previousRowRef.current) {
      previousRowRef.current.style.height = `${previousRowRef.current.scrollHeight}px`;
      requestAnimationFrame(() => {
        previousRowRef.current.style.height = "0";
      });
    }

    // Expand the newly clicked row (if it's not the same as the currently expanded row)
    if (newExpandedRow && currentRowRef && currentRowRef.current) {
      currentRowRef.current.style.height = `${currentRowRef.current.scrollHeight}px`;
      currentRowRef.current.addEventListener(
        "transitionend",
        () => {
          if (newExpandedRow === rowId) {
            currentRowRef.current.style.height = "auto";
          }
        },
        { once: true }
      );
    }

    setExpandedRow(newExpandedRow); // Update the state to track the newly expanded row
  };

  return (
    <>
    <RotateWarning />
    <div className="project-page-container">
      <div className="page-navigation-container">
        <Link to="/" className="back-navigation" data-theme={theme}>
          <img
            className="back-arrow"
            src={theme === "dark" ? arrow : arrowLight}
            alt="some alt text here"
          />
        </Link>
        <Link onMouseEnter={() => setPageTitle(false)} onMouseLeave={() => setPageTitle(true)} to="/" className="desktop-back-navigation" data-theme={theme}>
          <img
            className="back-arrow"
            src={theme === "dark" ? arrow : arrowLight}
            alt="some alt text here"
          />
        </Link>
        <div className="page-title">
          <span
            style={{ flex: pageTitle ? '1' : 'none', transition: 'flex 0.5s ease-in-out' }}
            className={
              theme === "dark" ? "heading-line-reversed" : "light-heading-line"
            }
          ></span>
          <p className="tertiary-heading-semi-bold" data-theme={theme}>
            {pageTitle ? "Project Archives" : "Back to Home"}
          </p>
          <span
            className={
              theme === "dark" ? "heading-line" : "light-heading-line-reversed"
            }
          ></span>
        </div>
        <ThemeToggler theme={theme} toggleTheme={toggleTheme} />
      </div>
      <div className="page-content-container">
        <div className="table-columns gradient-border" data-theme={theme}>
          <div className="project-column">
            <p className="copy-font" data-theme={theme}>
              Year
            </p>
          </div>
          <div className="project-column">
            <p className="copy-font" data-theme={theme}>
              Project
            </p>
          </div>
          <div className="project-column made-at-column" data-screensize="tablet-and-up">
            <p className="copy-font" data-theme={theme}>
              Made at
            </p>
          </div>
          <div className="project-column" data-screensize="laptop-and-up">
            <p className="copy-font" data-theme={theme}>
              Built with
            </p>
          </div>
          <div className="project-column" data-screensize="tablet-and-up">
            <p className="copy-font" data-theme={theme}>
              Link
            </p>
          </div>
        </div>
        <div className="table-columns-container">
          {rows.map((row, index) => {
            const isRowExpanded = expandedRow === row.id;

            return (
              <div key={row.id} className="table-row">
                <div
                  className="accordion-toggle-container"
                  onClick={() => toggleAccordion(row.id)}
                >
                  <img
                    src={theme === "dark" ? arrow : arrowLight}
                    alt="toggle accordion"
                    style={{
                      transform: isRowExpanded
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                      transition: "transform 0.5s ease",
                    }}
                  />
                </div>
                <div className="content-year-column">
                  <p className="copy-font" data-theme={theme}>
                    {row.year}
                  </p>
                </div>
                <div className="content-project-column">
                  <div className="content-project-column-top">
                    <span className="table-seperator" data-theme={theme}></span>
                  </div>
                  <div
                    className="content-project-column-bottom"
                    ref={refs.current[index]}
                    style={{
                      height: "0",
                      overflow: "hidden",
                      transition: "height 0.5s ease",
                    }}
                  >
                    {row.projects.map((project, projectIndex) => (
                      <div
                        key={projectIndex}
                        className="project-container gradient-border"
                        data-theme={theme}
                      >
                        <div className="project-inner-column">
                          <a className="desktop-hidden no-decoration"
                             style={{marginRight: '10px'}}
                             href={project.link ? `http://${project.link}` : null}
                             target="_blank"
                             rel="noopener"
                             data-theme={theme}>
                          <p
                            className="primary-heading-bold"
                            data-theme={theme}
                          >
                            {project.name}
                          </p>
                          </a>
                          <p
                            className="primary-heading-bold mobile-hidden"
                            data-theme={theme}
                          >
                            {project.name}
                          </p>
                          {project.link && (
                            <img
                              style={{margin: '0px'}}
                              className="link-arrow"
                              src={theme === "dark" ? link : lightLink}
                              alt="some alt text"
                              data-screensize="mobile-and-up"
                            />
                          )}
                        </div>
                        <div
                          className="project-inner-column made-at-column"
                          data-screensize="tablet-and-up"
                        >
                          <p className="copy-font" data-theme={theme}>
                            {project.made_at}
                          </p>
                        </div>
                        <div
                          className="project-inner-column"
                          data-screensize="laptop-and-up"
                        >
                          {project.built_with.map((tag, index) => (
                            <div key={index} className="tag" data-theme={theme}>
                              {tag}
                            </div>
                          ))}
                        </div>
                        <div
                          className="project-inner-column"
                          data-screensize="tablet-and-up"
                        >
                          <a
                            className="copy-font no-decoration"
                            href={`http://${project.link}`}
                            target="_blank"
                            rel="noopener"
                            data-theme={theme}
                          >
                            {project.link}
                          </a>
                          {project.link && (
                            <img
                              className="link-arrow"
                              src={theme === "dark" ? link : lightLink}
                              data-screensize="laptop-and-up"
                              alt="some alt text"
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
    </>
  );
}

export const Head = () => <title>NYC Mobile Apps Developer</title>;
