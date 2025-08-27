import React from "react";
import "../styles/projects.css";
import { useTheme } from "../context/ThemeContext";
import Layout from "../components/Layout";

import link from "../images/link-arrow.svg";
import lightLink from "../images/light-link-arrow.svg";
import data from "../data/data.json";


export default function AllProjects() {
  const { theme } = useTheme();// Track the currently expanded row
  const rows = data[1];


  return (

      <div className="static-page-container">
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
            <div
              className="project-column made-at-column"
              data-screensize="laptop-and-up"
            >
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
            {rows.projectArchives.map((row, index) => {


              return (
                <div key={row.id} className="table-row">

                  <div className="content-year-column">
                    <p className="copy-font" data-theme={theme}>
                      {row.year}
                    </p>
                  </div>
                  <div className="content-project-column">
                    <div className="content-project-column-top">
                      <span
                        className="table-seperator"
                        data-theme={theme}
                      ></span>
                    </div>
                    <div className="content-project-column-bottom">
                      {row.projects.map((project, projectIndex) => (
                        <div
                          key={projectIndex}
                          className="project-container"
                          data-theme={theme}
                        >
                          <div className="project-inner-column" style={{ paddingLeft: "10px" }}>
                            <a
                              className="desktop-hidden no-decoration"
                              style={{ marginRight: "10px" }}
                              href={
                                project.link ? `http://${project.link}` : null
                              }
                              target="_blank"
                              rel="noopener"
                              data-theme={theme}
                            >
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
                                style={{ margin: "0px" }}
                                className="link-arrow"
                                src={theme === "dark" ? link : lightLink}
                                alt="some alt text"
                                data-screensize="mobile-and-up"
                              />
                            )}
                          </div>
                          <div
                            className="project-inner-column made-at-column"
                            data-screensize="laptop-and-up"
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
                              <div
                                key={index}
                                className="tag"
                                data-theme={theme}
                              >
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
  );
}

export const Head = () => <title>NYC Mobile Apps Developer</title>;
