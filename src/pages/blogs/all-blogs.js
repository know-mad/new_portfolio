import React, { useState } from "react";
import { Link, graphql } from "gatsby";
import "../../styles/blogs.css";
import { useTheme } from "../../utils/ThemeContext";
import RotateWarning from "../../components/RotateWarning";
import ThemeToggler from "../../components/ThemeToggler";
import arrow from "../../images/arrow-icon.svg";
import arrowLight from "../../images/arrow-icon-light.svg";

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
          <ul>
            {blogs.map(({ node }) => (
              <li key={node.slug}>
                <Link to={`/blogs/${node.slug}`}>{node.title}</Link>
              </li>
            ))}
          </ul>
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
          slug
          title
          date(formatString: "MMMM DD, YYYY")
        }
      }
    }
  }
`;

export default AllBlogs;
