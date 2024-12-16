import React, { useState } from "react";
import { Link, graphql } from "gatsby";
import "../../styles/blogs.css";
import { GatsbyImage } from "gatsby-plugin-image"; // Import GatsbyImage
import { useTheme } from "../../utils/ThemeContext";
import RotateWarning from "../../components/RotateWarning";
import ThemeToggler from "../../components/ThemeToggler";
import arrow from "../../images/arrow-icon.svg";
import arrowLight from "../../images/arrow-icon-light.svg";
import link from "../../images/link-arrow.svg";
import lightLink from "../../images/light-link-arrow.svg";

const AllBlogs = ({ data }) => {
  const { theme, toggleTheme } = useTheme();
  const [pageTitle, setPageTitle] = useState(true);
  const blogs = data.allContentfulArticle.edges;

  return (
    <>
      <RotateWarning />
      <div className="static-page-container">
        <div className="page-navigation-container">
          <Link to="/" className="back-navigation" data-theme={theme}>
            <img
              className="back-arrow"
              src={theme === "dark" ? arrow : arrowLight}
              alt="some alt text here"
            />
          </Link>
          <Link
            onMouseEnter={() => setPageTitle(false)}
            onMouseLeave={() => setPageTitle(true)}
            to="/"
            className="desktop-back-navigation"
            data-theme={theme}
          >
            <img
              className="back-arrow"
              src={theme === "dark" ? arrow : arrowLight}
              alt="some alt text here"
            />
          </Link>
          <div className="page-title">
            <span
              style={{
                flex: pageTitle ? "1" : "none",
                transition: "flex 0.5s ease-in-out",
              }}
              className={
                theme === "dark"
                  ? "heading-line-reversed"
                  : "light-heading-line"
              }
            ></span>
            <p className="tertiary-heading-semi-bold" data-theme={theme}>
              {pageTitle ? "All Blogs" : "Back to Home"}
            </p>
            <span
              className={
                theme === "dark"
                  ? "heading-line"
                  : "light-heading-line-reversed"
              }
            ></span>
          </div>
          <ThemeToggler theme={theme} toggleTheme={toggleTheme} />
        </div>
        <div className="blogs-container">
          {blogs.map(({ node }) => (
            // <li key={node.slug}>
            //   <Link to={`/blogs/${node.slug}`}>{node.title}</Link>
            // </li>
            <div
              key={node.slug}
              className="blog-item-container bottom-spacing"
              data-theme={theme}
            >
              <div className="mobile-info-container bottom-spacing">
                <span
                  style={{
                    flex: pageTitle ? "1" : "none",
                    transition: "flex 0.5s ease-in-out",
                  }}
                  className={
                    theme === "dark"
                      ? "heading-line-reversed"
                      : "light-heading-line"
                  }
                ></span>
                <Link
                  to={`/blogs/${node.slug}`}
                  className="secondary-heading-semi-bold no-decoration"
                  data-theme={theme}
                >
                  Read Article
                </Link>
                {/* <img
                  className="link-arrow"
                  src={theme === "dark" ? link : lightLink}
                  alt="some alt text"
                /> */}
              </div>
              {/* <div className="preview-image-container bottom-spacing">
                <GatsbyImage
                  image={node.headerImage.gatsbyImageData}
                  alt={node.title || "Blog Image"} // Add alt text
                  className="preview-image"
                />
              </div> */}
              {/* <div className="mobile-info-container bottom-spacing">
                <p className="copy-font" data-theme={theme}>
                  {node.date}
                </p>
                <p className="copy-font" data-theme={theme}>
                  by: {node.author}
                </p>
              </div> */}
              <div className="blog-title-container bottom-spacing">
                {/* <div className="preview-image-container">
                  <GatsbyImage
                    image={node.headerImage.gatsbyImageData}
                    alt={node.title || "Blog Image"} // Add alt text
                    className="preview-image"
                  />
                </div> */}
                <div
                  className={
                    theme === "dark"
                      ? "preview-image-container"
                      : "light-preview-image-container"
                  }
                >
                  {/* <img
                    style={{
                      boxShadow:
                        theme === "dark" ? "none" : "8px 5px 15px #555151",
                    }}
                    className="project-image"
                    src={panasonic}
                    alt="some alt text"
                  /> */}
                  <GatsbyImage
                    image={node.headerImage.gatsbyImageData}
                    alt={node.title || "Blog Image"} // Add alt text
                    className="preview-image"
                    style={{
                      boxShadow:
                        theme === "dark" ? "none" : "4px 7px 7px rgba(85, 81, 81, 0.6)",
                    }}
                  />
                </div>
                <p className="primary-heading-bold" data-theme={theme}>
                  {node.title}
                </p>
                {/* <Link to={`/blogs/${node.slug}`}>{node.title}</Link> */}
              </div>
              <div className="mobile-info-container bottom-spacing">
                <p className="copy-font" data-theme={theme}>
                  published: {node.date}
                </p>
              </div>
              <div className="blog-tags-container">
                {node.tags && node.tags.length > 0 ? (
                  node.tags.map((item, index) => (
                    <div key={index} className="tag" data-theme={theme}>
                      {item.tag}
                    </div>
                  ))
                ) : (
                  <div className="blog-tags-container">
                    <p className="copy-font" data-theme={theme}>
                      No tags available
                    </p>
                  </div>
                )}
                {/* <div className="tag" data-theme={theme}>
                  ELECTRONICS
                </div>
                <div className="tag" data-theme={theme}>
                  E-COMMERCE
                </div>
                <div className="tag" data-theme={theme}>
                  CUSTOM
                </div>
                <div className="tag" data-theme={theme}>
                  SHOPIFY
                </div>
                <div className="tag" data-theme={theme}>
                  UX/UI
                </div>
                <div className="tag" data-theme={theme}>
                  ACCESSIBILITY
                </div> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export const query = graphql`
  query {
    allContentfulArticle(sort: { fields: [date], order: DESC }) {
      edges {
        node {
          headerImage {
            gatsbyImageData
          }
          slug
          title
          author
          date(formatString: "MMM DD, 'YY")
          tags {
            tag
          }
        }
      }
    }
  }
`;

export default AllBlogs;
