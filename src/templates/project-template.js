import React from "react";
import { graphql } from "gatsby";
import { useTheme } from "../context/ThemeContext";
import { GatsbyImage } from "gatsby-plugin-image";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";

import darkBackArrow from "../images/arrow-icon.svg";
import lightBackArrow from "../images/arrow-icon-light.svg";

const Text = ({ children, theme }) => (
  <p className="copy-font bottom-spacing" data-theme={theme}>
    {children}
  </p>
);

const HyperLink = ({ children, uri, theme }) => (
  <a
    className="content-link"
    data-theme={theme}
    href={uri}
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
  </a>
);

const Heading = ({ children, theme }) => (
  <h2 className="primary-heading-bold" data-theme={theme}>
    {children}
  </h2>
);

const OrderedList = ({ children, theme }) => (
  <ol data-theme={theme}>{children}</ol>
);

const options = (theme) => ({
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => (
      <Text theme={theme}>{children}</Text>
    ),
    [INLINES.HYPERLINK]: (node, children) => {
      return (
        <HyperLink theme={theme} uri={node.data.uri}>
          {children}
        </HyperLink>
      );
    },
    [BLOCKS.HEADING_2]: (node, children) => {
      return <Heading theme={theme}>{children}</Heading>;
    },
    [BLOCKS.OL_LIST]: (node, children) => {
      return <OrderedList theme={theme}>{children}</OrderedList>;
    },
  },
});

export default function ProjectTemplate({ data }) {
  const {
    title,
    caseStudy,
    description,
    projectImage,
    builtWith,
    projectLink,
  } = data.contentfulProject;
  const { theme } = useTheme();

  return (
    <div className="static-page-container">
      <div style={{ paddingBottom: 150 }} className="page-content-container">
        <div
          className="project-page-image-container"
        >
          <GatsbyImage
            image={projectImage.gatsbyImageData}
            alt={title || "Blog Image"} // Add alt text
            className="project-image"
          />
        </div>
        <div className="project-title-container">
          <h3 className="primary-heading-bold" data-theme={theme}>
            {title}
          </h3>
        </div>
        {description && (
          <div className="project-description-container">
            <h3
              className="secondary-heading-semi-bold bottom-spacing"
              data-theme={theme}
            >
              Description
            </h3>
            <p className="copy-font" data-theme={theme}>
              {renderRichText(description, options(theme))}
            </p>
          </div>
        )}
        <div className="project-description-container">
          <h3
            className="secondary-heading-semi-bold bottom-spacing"
            data-theme={theme}
          >
            Built with
          </h3>
          <div className="all-tags-container">
            {builtWith.map((item) => (
              <div className="tag" data-theme={theme}>
                {item.tag}
              </div>
            ))}
          </div>
        </div>
        {caseStudy && (
          <div className="project-description-container">
            <h3
              className="secondary-heading-semi-bold bottom-spacing"
              data-theme={theme}
            >
              Case study
            </h3>
            <p className="copy-font" data-theme={theme}>
              {renderRichText(caseStudy, options(theme))}
            </p>
          </div>
        )}
        {projectLink && (
          <div className="project-description-container">
            <h3
              className="secondary-heading-semi-bold bottom-spacing"
              data-theme={theme}
            >
              Project link
            </h3>
            <a href={projectLink} target="_blank" rel="noopener noreferrer">
              <p className="copy-font" data-theme={theme}>
                {projectLink}
              </p>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export const Head = ({ data }) => (
  <>
    <title>{`${data?.contentfulProject?.title} | Project Built by David Velez` || "David Velez Technology Project"}</title>
    <meta
      name="description"
      content="David Velez is a mobile and web developer that builds apps for the web, android, and iOS devices."
      
    />
  </>
);

export const query = graphql`
  query ProjectBySlug($slug: String!) {
    contentfulProject(slug: { eq: $slug }) {
      title
      description {
        raw
      }
      caseStudy {
        raw
      }
      builtWith {
        tag
      }
      projectLink
      projectImage {
        gatsbyImageData
      }
      slug
    }
  }
`;
