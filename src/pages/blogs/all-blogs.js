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
import Layout from "../../components/Layout"

const AllBlogs = ({ data }) => {
  const [isTop, setIsTop] = useState(false)
  const { theme, toggleTheme } = useTheme();
  const blogsContainerRef = useRef(null);

  const blogs = data.allContentfulArticle.edges;

  useEffect(() => {
    const handleScroll = () => {
      if (!blogsContainerRef.current) return;

      const rect = blogsContainerRef.current.getBoundingClientRect();
      
      // Check if blogs-container is at the top of the viewport
      if (rect.top <= 0) {
        setIsTop(true)
        console.log("blogs-container is at the top of the viewport");
      } else {
        setIsTop(false)
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
              className="blog-item-container bottom-spacing"
              data-theme={theme}
            >
              <div className="mobile-info-container bottom-spacing">
                <span
                  className={
                    theme === "dark"
                      ? "heading-line"
                      : "light-heading-line-reversed"
                  }
                  style={{marginLeft: 0, marginRight: 10}}
                ></span>
                <Link
                  to={`/blogs/${node.slug}`}
                  className="reverse-secondary-heading-semi-bold no-decoration"
                  data-theme={theme}
                >
                  Read Article
                </Link>
                <img style={{marginLeft: 10}} src={ theme === 'dark' ? link : lightLink} alt="link icon" />
                {/* <svg
                  style={{ marginLeft: "10px" }}
                  width="27"
                  height="28"
                  viewBox="0 0 27 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.5 4.99878L13.5 13.9988M22.5 4.99878V10.0613M22.5 4.99878H17.4375M21.375 14.5613V19.3988C21.375 20.6589 21.375 21.289 21.1297 21.7703C20.9141 22.1936 20.5698 22.5379 20.1465 22.7535C19.6652 22.9988 19.0351 22.9988 17.775 22.9988H8.1C6.83989 22.9988 6.20982 22.9988 5.72852 22.7535C5.30515 22.5379 4.96095 22.1936 4.74524 21.7703C4.5 21.289 4.5 20.6589 4.5 19.3988V9.72378C4.5 8.46367 4.5 7.8336 4.74524 7.3523C4.96095 6.92893 5.30515 6.58473 5.72852 6.36902C6.20982 6.12378 6.83988 6.12378 8.1 6.12378H12.9375"
                    stroke="#EA8D00"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg> */}
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
                <div className="desktop-inner">
                  <p
                    className="primary-heading-bold bottom-spacing"
                    data-theme={theme}
                  >
                    {node.title}
                  </p>
                  <p className="copy-font bottom-spacing" data-theme={theme}>
                    published: {node.date}
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
