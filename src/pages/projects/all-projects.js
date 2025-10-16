import React, { useState, useEffect } from "react";
import "../../styles/projects.css";
import { graphql } from "gatsby";
import { useTheme } from "../../context/ThemeContext";
import ProjectLink from "../../components/ProjectLink";

export default function AllProjects({ data }) {
  const { theme } = useTheme();
  const [activeYear, setActiveYear] = useState(0);
  const [uniqueYears, setUniqueYears] = useState([]);
  const projects = data.allContentfulProject.edges;

  useEffect(() => {
    const years = [
      ...new Set(projects.map((project) => project.node.createdOn)),
    ];
    setUniqueYears(years);
  }, [projects]);

  const renderProjectLinks = (year) => {
    const filteredProjects = projects.filter(
      (item) => item.node.createdOn === year
    );
    return filteredProjects.map((project) => (
      <ProjectLink
        key={project.node.title}
        route={`/projects/${project.node.slug}`}
        theme={theme}
        title={project.node.title}
        tags={project.node.builtWith}
        description={project.node.description}
      />
    ));
  };

  return (
    <div style={{ paddingLeft: 0 }} className="static-page-container">
      <div className="page-content-container">
        <div className="selectors-container" data-theme={theme}>
          <div className="year-column-container" data-theme={theme}>
            <div className="year-column" data-theme={theme}>
              <p className="copy-font" data-theme={theme}>
                Year
              </p>
            </div>
          </div>
          {uniqueYears.map((year, index) => (
            <div
              key={year}
              onClick={() => setActiveYear(index)}
              className="selector"
              tabIndex={0}
              role="button"
            >
              <p
                className="copy-font"
                data-theme={theme}
              >
                {year}
              </p>
              {activeYear === index && (
                <span className="selector-indicator" data-theme={theme} />
              )}
            </div>
          ))}
        </div>

        {uniqueYears.map((year, index) => (
          <div
            key={year}
            style={{
              marginLeft: activeYear === index ? 0 : "-100vw",
              zIndex: index,
            }}
            className="projects-slider"
            data-theme={theme}
          >
            <div className="columns-container" data-theme={theme}>
              <div className="columns-container-inner" data-theme={theme}>
                <div className="project-name-column">
                  <p className="copy-font" data-theme={theme}>
                    Project name
                  </p>
                </div>
                <div className="built-with-column">
                  <p className="copy-font" data-theme={theme}>
                    Built with
                  </p>
                </div>
                <div className="description-column">
                  <p className="copy-font" data-theme={theme}>
                    Description
                  </p>
                </div>
              </div>
            </div>
            {renderProjectLinks(year)}
          </div>
        ))}
      </div>
    </div>
  );
}

export const query = graphql`
  query MyQuery {
    allContentfulProject(sort: { createdOn: DESC }) {
      edges {
        node {
          title
          createdOn(formatString: "YYYY")
          madeAt
          projectImage {
            gatsbyImageData
          }
          description {
            raw
          }
          builtWith {
            tag
          }
          slug
        }
      }
    }
  }
`;

export const Head = () => (
  <>
    <title>Best Mobile App Developer in Washington DC</title>
    <meta
      name="description"
      content="I create AI solutions as well as web and mobile apps for android and iOS devices to help your business get ahead in the technology race."
    />
  </>
)
