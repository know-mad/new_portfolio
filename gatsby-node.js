const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      allContentfulArticle {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);

  if (result.errors) {
    throw new Error("Error fetching data for dynamic pages");
  }

  const blogTemplate = path.resolve("src/templates/blog-template.js");

  result.data.allContentfulArticle.edges.forEach(({ node }) => {
    createPage({
      path: `/blogs/${node.slug}`, // URL for the blog
      component: blogTemplate, // Template file
      context: {
        slug: node.slug, // Pass slug as context to the query
      },
    });
  });
};
