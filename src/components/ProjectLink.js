import React from "react";
import "../styles/ProjectLink.css";
import { Link } from "gatsby";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";

import linkArrow from "../images/link-arrow.svg";
import lightLinkArrow from "../images/light-link-arrow.svg";

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

export default function ProjectLink({
  title,
  theme,
  route,
  tags,
  description,
}) {
  const extractPlainText = (richText) => {
    try {
      // Parse the JSON content
      const parsed = JSON.parse(richText.raw);
      // Extract text from the nested content structure
      const extractTextFromContent = (content) => {
        if (!content || !Array.isArray(content)) return "";

        return content.reduce((text, item) => {
          if (item.value) {
            return text + item.value;
          } else if (item.content) {
            return text + extractTextFromContent(item.content);
          }
          return text;
        }, "");
      };

      const plainText = extractTextFromContent(parsed.content);

      // Truncate to 140 characters
      return plainText.length > 140
        ? plainText.substring(0, 140) + "..."
        : plainText;
    } catch (error) {
      console.error("Error parsing rich text:", error);
      return "Description unavailable";
    }
  };

  return (
    <Link to={route} className="link-container">
      <div className="project-link" data-theme={theme}>
        <div className="title-container" data-theme={theme}>
          <p className="primary-heading-bold" data-theme={theme}>
            {title}
          </p>
          <img
            className="link-arrow desktop-hidden"
            src={theme === "dark" ? linkArrow : lightLinkArrow}
            alt="some alt text"
          />
        </div>
        <div className="tags-container" data-theme={theme}>
          {tags.map((item) => (
            <div className="tag no-margin-bottom" data-theme={theme}>
              {item.tag}
            </div>
          ))}
        </div>
        <div className="description-container">
          <p className="copy-font" data-theme={theme}>
            {extractPlainText(description)}
          </p>
        </div>
      </div>
    </Link>
  );
}
