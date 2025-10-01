import React, { useRef } from "react";
import { Link, graphql } from "gatsby";
import "../../styles/blogs.css";
import { GatsbyImage } from "gatsby-plugin-image";
import { useTheme } from "../../context/ThemeContext";

export default function AllBlogs({ data }) {
  const { theme } = useTheme();
  const blogsContainerRef = useRef(null);

  const blogs = data.allContentfulArticle.edges;

  return (
    <div className="static-page-container">
      <div ref={blogsContainerRef} className="page-content-container">
        {/* Add filtering logic here */}
        {blogs.map(({ node }) => (
          <Link
            key={node.slug}
            to={`/blogs/${node.slug}`}
            className={`${
              theme === "dark"
                ? "blog-item-container"
                : "light-blog-item-container"
            } bottom-spacing no-decoration`}
          >
            <div className="blog-item-container-inner" data-theme={theme}>
              <div className="article-type-container">
                <div className="blog-descriptor" data-theme={theme}>
                  Article
                </div>
              </div>
              <div className="mobile-info-container bottom-spacing">
                <span
                  className={
                    theme === "dark"
                      ? "heading-line"
                      : "light-heading-line"
                  }
                  style={{ marginLeft: 0, marginRight: 10 }}
                ></span>
              </div>
              <div className="blog-title-container bottom-spacing">
                <div
                  className={
                    theme === "dark"
                      ? "preview-image-container"
                      : "light-preview-image-container"
                  }
                >
                  <GatsbyImage
                    image={node.headerImage.gatsbyImageData}
                    alt={node.title || "Blog Image"} // Add alt text
                    className="preview-image"
                  />
                </div>
                <div className="mobile-inner">
                  <p className="primary-heading-bold" data-theme={theme}>
                    {node.title}
                  </p>
                </div>
                <div className="desktop-inner">
                  <p
                    className="primary-heading-bold bottom-spacing"
                    data-theme={theme}
                  >
                    {node.title}
                  </p>
                  <p className="copy-font bottom-spacing" data-theme={theme}>
                    published: {node.date ? node.date : "n/a."}
                  </p>
                  <div className="desktop-blog-tags-container">
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
                  </div>
                </div>
              </div>
              <div className="mobile-inner">
                <p className="copy-font bottom-spacing" data-theme={theme}>
                  published: {node.date}
                </p>
                <div className="mobile-blog-tags-container">
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
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export const query = graphql`
  query {
    allContentfulArticle(sort: { date: DESC }) {
      edges {
        node {
          headerImage {
            gatsbyImageData
          }
          slug
          title
          author
          date(formatString: "MMM DD, YYYY")
          tags {
            tag
          }
        }
      }
    }
  }
`;

export const Head = ({ data }) => <title>Tech Entrepreneur</title>;
