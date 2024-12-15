import React from "react";
import { graphql } from "gatsby";
// import "../../styles/blog.css";

import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import { renderRichText } from "gatsby-source-contentful/rich-text"

const Bold = ({ children }) => <span className="bold">{children}</span>
const Text = ({ children }) => <p className="align-center">{children}</p>

const options = {
  renderMark: {
    [MARKS.BOLD]: text => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
    [BLOCKS.EMBEDDED_ASSET]: node => {
      return (
        <>
          <h2>Embedded Asset</h2>
          <pre>
            <code>{JSON.stringify(node, null, 2)}</code>
          </pre>
        </>
      )
    },
  },
}

const BlogTemplate = ({ data }) => {
  const { title, author, date, content } = data.contentfulArticle;
  // const rawContent = 

  return (
    <div style={{backgroundColor: 'cyan'}} className="blog-container">
      <h1>{title}</h1>
      <p>By {author}</p>
      <p>{date}</p>
      <div>
      {content && renderRichText(content, options)}
      </div>
    </div>
  );
};

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

export default BlogTemplate;
