/**
 * @type {import('gatsby').GatsbyConfig}
 */

require("dotenv").config();

module.exports = {
  siteMetadata: {
    title: `portfolio_v2`,
    siteUrl: `https://www.davidvelez.io`,
  },
  plugins: [
    {
      resolve: `gatsby-omni-font-loader`,
      options: {
        enableListener: true,
        preconnect: [`https://fonts.googleapis.com`],
        web: [
          {
            name: `Montserrat`,
            file: `https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800;900&display=swap`,
          },
          {
            name: `Inter`,
            file: `https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        icon: "src/images/favicon.png",
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: "https://davidvelez.io",
        sitemap: "https://davidvelez.io/sitemap.xml",
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        // Learn about environment variables: https://gatsby.dev/env-vars
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          process.env.GOOGLE_GTAG
        ]
      }
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-offline`,
  ],
};
