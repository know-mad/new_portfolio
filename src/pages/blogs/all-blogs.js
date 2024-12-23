import React, { useState, useEffect, useRef } from "react";
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
import Layout from "../../components/Layout";

const AllBlogs = ({ data }) => {
  const [isTop, setIsTop] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const blogsContainerRef = useRef(null);

  const blogs = data.allContentfulArticle.edges;

  useEffect(() => {
    const handleScroll = () => {
      if (!blogsContainerRef.current) return;

      const rect = blogsContainerRef.current.getBoundingClientRect();

      // Check if blogs-container is at the top of the viewport
      if (rect.top <= 0) {
        setIsTop(true);
        console.log("blogs-container is at the top of the viewport");
      } else {
        setIsTop(false);
      }
    };

    // Attach event listener
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Layout>
      <RotateWarning />
      <div className="static-page-container">
        <div ref={blogsContainerRef} className="page-content-container">
          {blogs.map(({ node }) => (
            <div
              key={node.slug}
              className={`${
                theme === "dark"
                  ? "blog-item-container"
                  : "light-blog-item-container"
              } bottom-spacing`}
            >
              <div className="mobile-info-container bottom-spacing">
                <span
                  className={
                    theme === "dark"
                      ? "heading-line"
                      : "light-heading-line-reversed"
                  }
                  style={{ marginLeft: 0, marginRight: 10 }}
                ></span>
                <Link
                  to={`/blogs/${node.slug}`}
                  className="reverse-secondary-heading-semi-bold no-decoration"
                  data-theme={theme}
                >
                  Read Article
                </Link>
                <img
                  style={{ marginLeft: 10 }}
                  src={theme === "dark" ? link : lightLink}
                  alt="link icon"
                />
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
                    style={{
                      boxShadow:
                        theme === "dark"
                          ? "none"
                          : "4px 7px 7px rgba(85, 81, 81, 0.6)",
                    }}
                  />
                </div>
                <div className="mobile-inner">
                  <p
                    className="primary-heading-bold bottom-spacing"
                    data-theme={theme}
                  >
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
          ))}
        </div>
      </div>
    </Layout>
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
