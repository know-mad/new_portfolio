import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { graphql, Link } from "gatsby";

export default function AiSolutionsPage({ data }) {
  const { theme } = useTheme();

  const demoLinks = data.allContentfulDemo.edges;

  return (
    <div className="static-page-container">
      <div style={{ paddingBottom: 200 }} className="page-content-container">
        <div className="ai-solutions-grid">
          {/* I'm going to have to hardcode these in because Contentful will not allw video uploads for some reason */}
          {demoLinks.map(({ node }) => (
            <Link
              key={node.slug}
              to={`/ai/${node.slug}`}
              className="grid-item no-decoration"
              data-theme={theme}
            >
              <h3 className="primary-heading-bold" data-theme={theme}>
                {node.title}
              </h3>
              <p className="copy-font" data-theme={theme}>
                {node.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export const query = graphql`
  query {
    allContentfulDemo {
      edges {
        node {
          title
          description
          slug
        }
      }
    }
  }
`;

export const Head = () => (
  <>
    <title>Washington DC AI Agents</title>
    <meta
      name="description"
      content="I create AI solutions as well as web and mobile apps for android and iOS devices to help your business get ahead in the technology race."
    />
  </>
);
