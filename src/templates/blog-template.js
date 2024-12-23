import React from "react";
import { graphql } from "gatsby";
import "../styles/blogs.css";
import Layout from "../components/Layout";
import { useTheme } from "../utils/ThemeContext";
import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types";
import { renderRichText } from "gatsby-source-contentful/rich-text";

import me from "../images/me.png";
import fb from "../images/fb.svg";
import twitter from "../images/twitter.svg";
import lightFb from "../images/light-fb.svg";
import lightTwitter from "../images/light-twitter.svg";

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
  const { title, author, date, content } = data.contentfulArticle;
  const { theme } = useTheme();
  return (
    <Layout>
      <div className="static-page-container">
        <div className="page-content-container">
          <div className="blog-intro bottom-spacing">
            <img className="author-icon" src={me} alt="some alt here" />
            <p className="copy-font" data-theme={theme}>
              by: {author}
            </p>
          </div>
          <div className="blog-title-container bottom-spacing">
            <h1 className="blog-heading-extra-bold" data-theme={theme}>
              {title}
            </h1>
          </div>
          <div className="blog-content-container">
            {content && renderRichText(content, options(theme))}
          </div>
          {/*  Add these share links later when I create social media accounts */}
          {/* <div className="share-links-container bottom-spacing">
            <p className="copy-font" data-theme={theme}>
              share:
            </p>
            <img
              className="share-link"
              src={theme === "dark" ? twitter : lightTwitter}
              alt="some alt text"
            />
            <img
              className="share-link"
              src={theme === "dark" ? fb : lightFb}
              alt="some alt text"
            />

            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=https://blog.davidvelez.io/article/${data.contentfulArticle.slug}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <img src={facebookIcon} alt="facebook icon" />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${data.contentfulArticle.title}&url=https://blog.davidvelez.io/article/${data.contentfulArticle.slug}%2F&via=_devdave`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <img src={twitterIcon} alt="facebook icon" />
            </a>
            <a
              href="https://www.instagram.com/1davidvee/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img src={instagramIcon} alt="facebook icon" />
            </a>
          </div> */}
        </div>
      </div>
    </Layout>
  );
}

export const Head = ({ data }) => <title>{data.contentfulArticle.title}</title>;

export const query = graphql`
  query BlogBySlug($slug: String!) {
    contentfulArticle(slug: { eq: $slug }) {
      title
      author
      date(formatString: "MMMM DD, YYYY")
      content {
        raw
      }
    }
  }
`;
