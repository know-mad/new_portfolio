const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const articleResults = await graphql(`
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

  const projectResults = await graphql(`
    query {
      allContentfulProject {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);

  if (articleResults.errors || projectResults.errors) {
    throw new Error("Error fetching data for dynamic pages");
  }

  const blogTemplate = path.resolve("src/templates/blog-template.js");
  const projectTemplate = path.resolve("src/templates/project-template.js");

  articleResults.data.allContentfulArticle.edges.forEach(({ node }) => {
    createPage({
      path: `/blogs/${node.slug}`, // URL for the blog
      component: blogTemplate, // Template file
      context: {
        slug: node.slug, // Pass slug as context to the query
      },
    });
  });

  projectResults.data.allContentfulProject.edges.forEach(({ node }) => {
    createPage({
      path: `/projects/${node.slug}`,
      component: projectTemplate,
      context: {
        slug: node.slug,
      },
    });
  });
};
