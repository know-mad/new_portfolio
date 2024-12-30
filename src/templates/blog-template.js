import React from "react";
import { graphql } from "gatsby";
import "../styles/blogs.css";
import Layout from "../components/Layout";
import { useTheme } from "../utils/ThemeContext";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { renderRichText } from "gatsby-source-contentful/rich-text";

import me from "../images/me.png";
import fb from "../images/fb.svg";
import twitter from "../images/twitter.svg";
import lightFb from "../images/light-fb.svg";
import lightTwitter from "../images/light-twitter.svg";
import linkedIn from "../images/linkedin.svg";
import linkedInDark from "../images/linkedin-dark.svg";

import RotateWarning from "../components/RotateWarning";

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
  },
});

export default function BlogTemplate({ data }) {
  const { title, author, content } = data.contentfulArticle;
  const { theme } = useTheme();
  return (
    <Layout>
      <RotateWarning />
      <div className="static-page-container">
        <div className="page-content-container">
          <div className="blog-intro bottom-spacing">
            <div className="author-container">
              <img className="author-icon" src={me} alt="some alt here" />
              <p className="copy-font" data-theme={theme}>
                by: {author}
              </p>
            </div>
            <div className="share-links-container mobile-hidden">
              <p className="copy-font" data-theme={theme}>
                share:
              </p>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=https://davidvelez.io/blogs/${encodeURIComponent(
                  data.contentfulArticle.slug
                )}`}
                rel="noopener noreferrer"
                target="_blank"
                className="share-link-trigger no-decoration"
              >
                <img
                  className="share-link"
                  src={theme === "dark" ? fb : lightFb}
                  alt="some alt text"
                />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  data.contentfulArticle.slug
                )}&url=https://davidvelez.io/blogs/${encodeURIComponent(
                  data.contentfulArticle.author
                )}%2F&via=_devdave`}
                rel="noopener noreferrer"
                target="_blank"
                className="share-link-trigger no-decoration"
              >
                <img
                  className="share-link"
                  src={theme === "dark" ? twitter : lightTwitter}
                  alt="some alt text"
                />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=https://davidvelez.io/blogs/${encodeURIComponent(
                  data.contentfulArticle.slug
                )}`}
                rel="noopener noreferrer"
                target="_blank"
                className="share-link-trigger no-decoration"
              >
                <img
                  className="share-link"
                  src={theme === "dark" ? linkedIn : linkedInDark}
                  alt="Share on LinkedIn"
                />
              </a>
            </div>
          </div>
          <div className="blog-title-container bottom-spacing">
            <h1 className="blog-heading-extra-bold" data-theme={theme}>
              {title}
            </h1>
          </div>
          <div className="blog-content-container">
            {content && renderRichText(content, options(theme))}
          </div>
          <div className="share-links-container desktop-hidden bottom-spacing">
            <p className="copy-font" data-theme={theme}>
              share:
            </p>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=https://davidvelez.io/blogs/${encodeURIComponent(
                data.contentfulArticle.slug
              )}`}
              rel="noopener noreferrer"
              target="_blank"
              className="share-link-trigger no-decoration"
            >
              <img
                className="share-link"
                src={theme === "dark" ? fb : lightFb}
                alt="some alt text"
              />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                data.contentfulArticle.slug
              )}&url=https://davidvelez.io/blogs/${encodeURIComponent(
                data.contentfulArticle.author
              )}%2F&via=_devdave`}
              rel="noopener noreferrer"
              target="_blank"
              className="share-link-trigger no-decoration"
            >
              <img
                className="share-link"
                src={theme === "dark" ? twitter : lightTwitter}
                alt="some alt text"
              />
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=https://davidvelez.io/blogs/${encodeURIComponent(
                data.contentfulArticle.slug
              )}`}
              rel="noopener noreferrer"
              target="_blank"
              className="share-link-trigger no-decoration"
            >
              <img
                className="share-link"
                src={theme === "dark" ? linkedIn : linkedInDark}
                alt="Share on LinkedIn"
              />
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const Head = ({ data }) => (
  <title>{data?.contentfulArticle?.title || "Blog"}</title>
);

export const query = graphql`
  query BlogBySlug($slug: String!) {
    contentfulArticle(slug: { eq: $slug }) {
      title
      author
      slug
      date(formatString: "MMMM DD, YYYY")
      content {
        raw
      }
    }
  }
`;
