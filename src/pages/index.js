import React, { useRef, useEffect } from "react";
import "../styles/index.css";
import { Link, graphql } from "gatsby";
import { useTheme } from "../context/ThemeContext";
import { useDrawer } from "../context/DrawerContext";
import ScrollBar from "../components/ScrollBar";
import { GatsbyImage } from "gatsby-plugin-image";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";

// Icons and images
import git from "../images/github.svg";
import gitDark from "../images/github-dark.svg";
import linkedIn from "../images/linkedin.svg";
import linkedInDark from "../images/linkedin-dark.svg";
import js from "../images/javascript.svg";
import jsDark from "../images/javascript-dark.svg";
import node from "../images/nodejs.svg";
import nodeDark from "../images/node-dark.svg";
import react from "../images/react.svg";
import reactDark from "../images/react-dark.svg";
import mongo from "../images/mongodb.svg";
import mongoDark from "../images/mongo-dark.svg";
import html from "../images/html5.svg";
import htmlDark from "../images/html-dark.svg";
import css from "../images/css3.svg";
import cssDark from "../images/css-dark.svg";
import figma from "../images/figma.svg";
import figmaDark from "../images/figma-dark.svg";
import ps from "../images/photoshop.svg";
import psDark from "../images/photoshop-dark.svg";
import postgres from "../images/postgresql.svg";
import postgresDark from "../images/postgres-dark.svg";
import netlify from "../images/netlify.svg";
import netlifyDark from "../images/netlify-dark.svg";
import shopify from "../images/shopify.svg";
import shopifyDark from "../images/shopify-dark.svg";
import heroku from "../images/heroku.svg";
import herokuDark from "../images/heroku-dark.svg";
import link from "../images/link-arrow.svg";
import lightLink from "../images/light-link-arrow.svg";
import xd from "../images/xd.svg";
import xdDark from "../images/xd-dark.svg";
import amazon from "../images/amazon.svg";
import amazonDark from "../images/amazon-dark.svg";
import nextjs from "../images/nextjs.svg";
import nextjsDark from "../images/nextjs-dark.svg";
import socketio from "../images/socket.svg";
import socketioDark from "../images/socket-dark.svg";
import vercel from "../images/vercel.svg";
import vercelDark from "../images/vercel-dark.svg";
import openai from "../images/openai.svg";
import openaiDark from "../images/openai-dark.svg";

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

export default function HomePage({ data }) {
  const { theme } = useTheme();
  const {
    activeLink,
    scrollingProgrammatically,
    scrollToSection,
    setActiveLink,
    isScrolling,
  } = useDrawer();

  const aboutRef = useRef(null);
  const workExperienceRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  const handleFormatTelephone = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 10);
    const area = digitsOnly.slice(0, 3);
    const first = digitsOnly.slice(3, 6);
    const last = digitsOnly.slice(6, 10);
    let formatted = "";
    if (area) {
      formatted = `(${area}`;
    }
    if (area && area.length === 3) {
      formatted += ")";
    }
    if (first) {
      formatted += area.length === 3 ? ` ${first}` : first;
    }
    if (last) {
      formatted += `-${last}`;
    }
    e.target.value = formatted;
  };

  const sectionRefs = [
    { id: 1, ref: aboutRef },
    { id: 2, ref: workExperienceRef },
    { id: 3, ref: projectsRef },
    { id: 4, ref: contactRef },
  ];

  useEffect(() => {
    const getThreshold = (ref) => {
      const width = window.innerWidth;

      // Specific adjustment for projectsContainerRef
      if (ref === projectsRef) {
        if (width <= 375) return 0.3; // Smallest screens
        if (width <= 768) return 0.35; // Tablet
        if (width <= 1024) return 0.4; // Small desktop
        if (width <= 1440) return 0.425; // Large desktop
        return 0.5; // Ultra-wide screens
      }

      // Default thresholds for other sections
      if (width <= 375) return 0.25;
      if (width <= 768) return 0.3;
      if (width <= 1024) return 0.35;
      if (width <= 1440) return 0.4;
      return 0.76;
    };

    const observerOptions = (ref) => ({
      root: null,
      rootMargin: "0px",
      threshold: getThreshold(ref),
    });

    const observerCallback = (entries) => {
      if (scrollingProgrammatically) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const activeSection = sectionRefs.find(
            (section) => section.ref.current === entry.target
          );
          if (activeSection) {
            setActiveLink(activeSection.id);
          }
        }
      });
    };

    const observers = sectionRefs.map(({ ref }) => {
      if (ref.current) {
        const observer = new IntersectionObserver(
          observerCallback,
          observerOptions(ref)
        );
        observer.observe(ref.current);
        return { ref, observer };
      }
      return null;
    });

    const handleResize = () => {
      observers.forEach(({ ref, observer }) => {
        if (observer && ref.current) {
          observer.disconnect();
          const newObserver = new IntersectionObserver(
            observerCallback,
            observerOptions(ref)
          );
          newObserver.observe(ref.current);
        }
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      observers.forEach(({ ref, observer }) => {
        if (observer && ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [sectionRefs, scrollingProgrammatically]);

  return (
    <div className="home-container">
      <div className="home-container-left">
        <h1 className="heading-extra-bold bottom-spacing" data-theme={theme}>
          HI! I'M DAVID
        </h1>
        <p
          className="secondary-heading-semi-bold bottom-spacing"
          data-theme={theme}
        >
          Full Stack Software Engineer
        </p>
        <p className="copy-font" data-theme={theme}>
          I'm a creative software engineer that loves to build beautifully
          designed technology solutions so you or your business can win online.
        </p>
        <div className="navigation-items">
          <div
            onClick={() => {
              scrollToSection("about", 1);
            }}
            className="mobile-link-container bottom-spacing"
          >
            <span
              style={{
                width: activeLink === 1 && !isScrolling ? `75px` : `0px`,
              }}
              className={
                theme === "dark"
                  ? "mobile-link-line-reversed"
                  : "light-mobile-link-line"
              }
            ></span>
            {theme === "dark" ? (
              <p
                className="drawer-link"
                style={{
                  color: activeLink === 1 && !isScrolling ? `#CEFF00` : `#FFF`,
                }}
              >
                ABOUT ME
              </p>
            ) : (
              <p
                className="drawer-link"
                style={{
                  color:
                    activeLink === 1 && !isScrolling ? `#EA8D00` : `#555151`,
                }}
              >
                ABOUT ME
              </p>
            )}
          </div>
          <div
            onClick={() => {
              scrollToSection("work", 2);
            }}
            className="mobile-link-container bottom-spacing"
          >
            <span
              style={{
                width: activeLink === 2 && !isScrolling ? `75px` : `0px`,
              }}
              className={
                theme === "dark"
                  ? "mobile-link-line"
                  : "light-mobile-link-line-reversed"
              }
            ></span>
            {theme === "dark" ? (
              <p
                className="drawer-link"
                style={{
                  color: activeLink === 2 && !isScrolling ? `#00A3FF` : `#FFF`,
                }}
              >
                WORK EXPERIENCE
              </p>
            ) : (
              <p
                className="drawer-link"
                style={{
                  color:
                    activeLink === 2 && !isScrolling ? `#9F00EA` : `#555151`,
                }}
              >
                WORK EXPERIENCE
              </p>
            )}
          </div>
          <div
            onClick={() => {
              scrollToSection("projects", 3);
            }}
            className="mobile-link-container bottom-spacing"
          >
            <span
              style={{
                width: activeLink === 3 && !isScrolling ? `75px` : `0px`,
              }}
              className={
                theme === "dark"
                  ? "mobile-link-line-reversed"
                  : "light-mobile-link-line"
              }
            ></span>
            {theme === "dark" ? (
              <div className="container-row">
                <div className="container-row-left">
                  <p
                    className="drawer-link"
                    style={{
                      color:
                        activeLink === 3 && !isScrolling ? `#CEFF00` : `#FFF`,
                    }}
                  >
                    RECENT PROJECTS
                  </p>
                </div>
                <div
                  style={{
                    display: activeLink === 3 ? "flex" : "none",
                    borderLeft: "2px solid #00a3ff",
                  }}
                  className="container-row-right"
                >
                  <Link
                    className="drawer-link no-decoration"
                    style={{
                      color:
                        activeLink === 3 && !isScrolling ? `#CEFF00` : `#FFF`,
                    }}
                    to="/projects/all-projects/"
                  >
                    ARCHIVES
                  </Link>
                </div>
              </div>
            ) : (
              <div className="container-row">
                <div className="container-row-left">
                  <p
                    className="drawer-link"
                    style={{
                      color:
                        activeLink === 3 && !isScrolling
                          ? `#EA8D00`
                          : `#555151`,
                    }}
                  >
                    RECENT PROJECTS
                  </p>
                </div>
                <div
                  style={{
                    display: activeLink === 3 && !isScrolling ? "flex" : "none",
                    borderLeft: "2px solid #9F00EA",
                  }}
                  className="container-row-right"
                >
                  <Link
                    className="drawer-link no-decoration"
                    style={{
                      color:
                        activeLink === 3 && !isScrolling
                          ? `#EA8D00`
                          : `#555151`,
                    }}
                    to="/projects/all-projects/"
                  >
                    ARCHIVES
                  </Link>
                </div>
              </div>
            )}
          </div>
          <div
            onClick={() => {
              scrollToSection("contact", 4);
            }}
            className="mobile-link-container bottom-spacing"
          >
            <span
              style={{
                width: activeLink === 4 && !isScrolling ? `75px` : `0px`,
              }}
              className={
                theme === "dark"
                  ? "mobile-link-line"
                  : "light-mobile-link-line-reversed"
              }
            ></span>
            {theme === "dark" ? (
              <p
                className="drawer-link"
                style={{
                  color: activeLink === 4 && !isScrolling ? `#00A3FF` : `#FFF`,
                }}
              >
                CONTACT ME
              </p>
            ) : (
              <p
                className="drawer-link"
                style={{
                  color:
                    activeLink === 4 && !isScrolling ? `#9F00EA` : `#555151`,
                }}
              >
                CONTACT ME
              </p>
            )}
          </div>
          <div className="mobile-link-container bottom-spacing">
            <span style={{ width: `0px` }} className="mobile-link-line"></span>
            <Link
              to="/blogs/all-blogs"
              className="static-link"
              data-theme={theme}
            >
              BLOG
            </Link>
          </div>
        </div>
        <div className="desktop-socials-container">
          <a href="https://github.com/know-mad" target="_blank" rel="noopener">
            <img
              className="social-link"
              src={theme === "dark" ? git : gitDark}
              alt="some alt text"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/david-velez-5b29a833b"
            target="_blank"
            rel="noopener"
          >
            <img
              className="social-link"
              src={theme === "dark" ? linkedIn : linkedInDark}
              alt="some alt text"
            />
          </a>
        </div>
      </div>
      <div style={{ paddingBottom: 100 }} className="home-container-right">
        <ScrollBar
          handleClick1={() => scrollToSection("about", 1)}
          handleClick2={() => scrollToSection("work", 2)}
          handleClick3={() => scrollToSection("projects", 3)}
          handleClick4={() => scrollToSection("contact", 4)}
          activeLink={activeLink}
        />
        <section
          id="about"
          className="content-container bottom-spacing"
          ref={aboutRef}
        >
          <div className="mobile-intro">
            <h1
              className="heading-extra-bold bottom-spacing"
              data-theme={theme}
            >
              HI! I'M DAVID
            </h1>
            <h4
              className="secondary-heading-semi-bold bottom-spacing"
              data-theme={theme}
            >
              Full Stack Software Engineer
            </h4>
            <p className="copy-font" data-theme={theme}>
              I'm a creative software engineer that loves to build beautifully
              designed technology solutions so you or your business can win
              online.
            </p>
          </div>
          <div className="heading-container bottom-spacing">
            <div className="section-title desktop-spacing">
              <span
                className={`${
                  theme === "dark"
                    ? "heading-line-reversed"
                    : "light-heading-line"
                } desktop-hidden`}
              ></span>
              <h2 className="secondary-heading-semi-bold" data-theme={theme}>
                ABOUT ME
              </h2>
              <span
                className={
                  theme === "dark"
                    ? "heading-line"
                    : "light-heading-line-reversed"
                }
              ></span>
            </div>
          </div>
          <p className="copy-font bottom-spacing" data-theme={theme}>
            With over 10 years as a developer and a background in software
            engineering, I specialize in building mobile and web applications,
            as well as blazing fast websites by using the latest technologies to
            prioritize site/app performance ultimately resulting in faster page
            load speeds and better SEO all delivered with beautifully and
            functionally designed user interfaces.
          </p>
          <h3
            className="secondary-heading-semi-bold bottom-spacing"
            data-theme={theme}
          >
            Technologies
          </h3>
          <p className="copy-font bottom-spacing" data-theme={theme}>
            Proficient in the MERN (MongoDB, Express, React, Node) stack, my
            favorite technologies to use when building digital solutions are
            HTML, CSS, Javascript, React (along with various React frameworks
            such as NEXT.js and Gatsby.js), React Native, Node, Mongo DB and
            Socket.io for applications that require real-time communication
            between the client and server.
          </p>
          <div className="logo-container bottom-spacing">
            <img
              className="logo-icon"
              src={theme === "dark" ? html : htmlDark}
              alt="some alt text"
            />
            <img
              className="logo-icon"
              src={theme === "dark" ? css : cssDark}
              alt="some alt text"
            />
            <img
              className="logo-icon"
              src={theme === "dark" ? js : jsDark}
              alt="some alt text"
            />
            <img
              className="logo-icon"
              src={theme === "dark" ? react : reactDark}
              alt="some alt text"
            />
            <img
              className="logo-icon"
              src={theme === "dark" ? node : nodeDark}
              alt="some alt text"
            />
            <img
              className="logo-icon"
              src={theme === "dark" ? mongo : mongoDark}
              alt="some alt text"
            />
            <img
              className="logo-icon"
              src={theme === "dark" ? nextjs : nextjsDark}
              alt="some alt text"
            />
            <img
              className="logo-icon"
              src={theme === "dark" ? socketio : socketioDark}
              alt="some alt text"
            />
          </div>
          <h3
            className="secondary-heading-semi-bold bottom-spacing"
            data-theme={theme}
          >
            Design
          </h3>
          <p className="copy-font bottom-spacing" data-theme={theme}>
            I truly love the design process and conceptualizing from the
            imagination a beautiful digital experience. My "go-to" design tools
            are Figma, Photoshop, and Adobe XD for building mockups, wireframes,
            and customizing the visual assets necessary for an aesthetically and
            visually pleasing user experience.
          </p>
          <div className="logo-container bottom-spacing">
            <img
              className="logo-icon"
              src={theme === "dark" ? figma : figmaDark}
              alt="some alt text"
            />
            <img
              className="logo-icon"
              src={theme === "dark" ? ps : psDark}
              alt="some alt text"
            />
            <img
              className="logo-icon"
              src={theme === "dark" ? xd : xdDark}
              alt="some alt text"
            />
          </div>
          <h3
            className="secondary-heading-semi-bold bottom-spacing"
            data-theme={theme}
          >
            Miscellaneous
          </h3>
          <p className="copy-font bottom-spacing" data-theme={theme}>
            Technology is always changing and I’m always learning in order to
            adapt to the changing market. As such, other notable technologies
            that I have experience and knowledge in include, PostgreSQL for
            building relational databases, Netlify for front-end deployments.
            Heroku and Vercel for back-end deployments, Shopify Liquid
            templating language for building custom Shopify storefronts, AWS for
            cloud infrastructure services and OpenAI for building AI solutions.
          </p>
          <div className="logo-container bottom-spacing">
            <img
              className="logo-icon"
              src={theme === "dark" ? postgres : postgresDark}
              alt="some alt text"
            />
            <img
              className="logo-icon"
              src={theme === "dark" ? netlify : netlifyDark}
              alt="some alt text"
            />
            <img
              className="logo-icon"
              src={theme === "dark" ? heroku : herokuDark}
              alt="some alt text"
            />
            <img
              className="logo-icon"
              src={theme === "dark" ? shopify : shopifyDark}
              alt="some alt text"
            />
            <img
              className="logo-icon"
              src={theme === "dark" ? amazon : amazonDark}
              alt="some alt text"
            />
            <img
              className="logo-icon"
              src={theme === "dark" ? vercel : vercelDark}
              alt="some alt text"
            />
            <img
              className="logo-icon"
              src={theme === "dark" ? openai : openaiDark}
              alt="some alt text"
            />
          </div>
          <div
            onClick={() => scrollToSection("contact", 4)}
            className={
              theme === "dark" ? "contact-button" : "light-contact-button"
            }
          >
            <p className="copy-font" data-theme={theme}>
              CONTACT ME
            </p>
          </div>
        </section>
        <section
          id="work"
          className="content-container bottom-spacing"
          ref={workExperienceRef}
        >
          <div className="heading-container bottom-spacing">
            <div className="section-title">
              <span
                style={{ transform: "rotate(180deg)" }}
                className={`${
                  theme === "dark"
                    ? "heading-line-reversed"
                    : "light-heading-line"
                } desktop-hidden`}
              ></span>
              <h2
                className="reverse-secondary-heading-semi-bold"
                data-theme={theme}
              >
                WORK EXPERIENCE
              </h2>
              <span
                style={{ transform: "rotate(180deg)" }}
                className={
                  theme === "dark"
                    ? "heading-line"
                    : "light-heading-line-reversed"
                }
              ></span>
            </div>
          </div>
          <div className="heading-container bottom-spacing">
            <div className="heading-title">
              <p className="tertiary-heading-semi-bold" data-theme={theme}>
                2021 - Present
              </p>
            </div>
          </div>
          <p className="primary-heading-bold bottom-spacing" data-theme={theme}>
            Senior Frontend Engineer{" "}
            <span style={{ color: theme === "dark" ? "#00A3FF" : "#EA8D00" }}>
              |
            </span>{" "}
            Blueswitch{" "}
            <span style={{ color: theme === "dark" ? "#00A3FF" : "#EA8D00" }}>
              |
            </span>{" "}
            New York City
          </p>
          <p className="copy-font bottom-spacing" data-theme={theme}>
            Built custom Shopify and Shopify+ solutions for higher tier clients
            such as Panasonic, Polo Ralph Lauren, European Wax Centers,
            Publishers Clearing House, and The Salvation Army. During my time
            with the agency I worked in an agile development environment while
            building custom e-commerce solutions via the Shopify platform.
            <br />
            <br />
            My daily tasks included adhering to HTML, CSS and Javascript best
            practices to create beautiful, functional and performant user
            interfaces. I also spent my time building responsive user interfaces
            using modern javascript frameworks such as Next.js, or the Shopify
            templating engine Liquid that looked and performed great on all
            devices from desktop to mobile. Lastly, I performed accessibility
            work ensuring client web pages adhered to W3 accessibility
            compliance.
          </p>
          <div className="heading-container bottom-spacing">
            <div className="heading-title">
              <p className="tertiary-heading-semi-bold" data-theme={theme}>
                2020 - 2021
              </p>
            </div>
          </div>
          <p className="primary-heading-bold bottom-spacing" data-theme={theme}>
            Freelance Web Developer{" "}
            <span style={{ color: theme === "dark" ? "#00A3FF" : "#EA8D00" }}>
              |
            </span>{" "}
            Self Employed{" "}
            <span style={{ color: theme === "dark" ? "#00A3FF" : "#EA8D00" }}>
              |
            </span>{" "}
            New York City
          </p>
          <p className="copy-font bottom-spacing" data-theme={theme}>
            Created full scale branded websites for clients. Starting with
            design using Figma and Adobe XD and including responsive front-end
            development using javascript frameworks such as React.js, Gatsby.js,
            or Next.js that boasted fast page load speeds served via CDN and
            microservices for small and medium sized businesses in my local
            area.
            <br />
            <br />
            Performed implementation of on page search engine optimization (SEO)
            including properly structured page titles, metadata and image alt
            tags ensuring clients were getting the best results on the web.
          </p>
          <div className="heading-container bottom-spacing">
            <div className="heading-title">
              <p className="tertiary-heading-semi-bold" data-theme={theme}>
                2015 - 2020
              </p>
            </div>
          </div>
          <p className="primary-heading-bold bottom-spacing" data-theme={theme}>
            Web Developer{" "}
            <span style={{ color: theme === "dark" ? "#00A3FF" : "#EA8D00" }}>
              |
            </span>{" "}
            CallisonRTKL{" "}
            <span style={{ color: theme === "dark" ? "#00A3FF" : "#EA8D00" }}>
              |
            </span>{" "}
            Washington, DC
          </p>
          <p className="copy-font" data-theme={theme}>
            At a world renowned and global architecture firm with multiple
            locations world wide, I was responsible for maintaining and updating
            the company website. I was entrusted to work with graphic designers
            and other web developers to ensure that the company website was
            always up to date and represented clearly the company mission.
            <br />
            <br />
            My job at CallisonRTKL consisted of working with HTML, CSS, and
            Javascript daily, to build an aesthetically pleasing and functional
            user experience for our customers and users. I also performed Search
            Engine Optimization (SEO) and web accessibility for users with
            disabilities who wanted to use our digital assets.
          </p>
        </section>
        <section
          id="projects"
          className="content-container bottom-spacing"
          ref={projectsRef}
        >
          <div className="section-title bottom-spacing">
            <span
              className={`${
                theme === "dark"
                  ? "heading-line-reversed"
                  : "light-heading-line"
              } desktop-hidden`}
            ></span>
            <h2 className="secondary-heading-semi-bold" data-theme={theme}>
              RECENT PROJECTS
            </h2>
            <span
              className={
                theme === "dark"
                  ? "heading-line"
                  : "light-heading-line-reversed"
              }
            ></span>
          </div>
          {data?.featuredOne && (
            <div className="featured-project-container bottom-spacing">
              <div className="heading-container bottom-spacing">
                <div className="heading-title">
                  <a
                    href={data?.featuredOne?.projectLink}
                    target="_blank"
                    rel="noopener"
                    className="reverse-secondary-heading-semi-bold link"
                    data-theme={theme}
                  >
                    {data?.featuredOne?.title}
                  </a>
                </div>
                <img
                  className="link-arrow"
                  src={theme === "dark" ? link : lightLink}
                  alt="some alt text"
                />
              </div>
              <p className="copy-font bottom-spacing" data-theme={theme}>
                {renderRichText(
                  data?.featuredOne?.featuredProjectDescription,
                  options(theme)
                )}
              </p>
              <div
                className={`${
                  theme === "dark"
                    ? "project-image-container"
                    : "light-project-image-container"
                } bottom-spacing`}
              >
                <GatsbyImage
                  image={data?.featuredOne?.projectImage?.gatsbyImageData}
                  alt={data?.featuredOne?.title || "Project Image"} // Add alt text
                  className="project-image"
                  style={{
                    boxShadow:
                      theme === "dark"
                        ? "none"
                        : "4px 7px 7px rgba(85, 81, 81, 0.6)",
                  }}
                />
              </div>
              <div className="tags-container bottom-spacing">
                {data?.featuredOne?.builtWith?.map((tagObj) => (
                  <div key={tagObj.tag} className="tag" data-theme={theme}>
                    {tagObj.tag}
                  </div>
                ))}
              </div>
            </div>
          )}
          {data?.featuredTwo && (
            <div className="featured-project-container bottom-spacing">
              <div className="heading-container bottom-spacing">
                <div className="heading-title">
                  <a
                    href={data?.featuredTwo?.projectLink}
                    target="_blank"
                    rel="noopener"
                    className="reverse-secondary-heading-semi-bold link"
                    data-theme={theme}
                  >
                    {data?.featuredTwo?.title}
                  </a>
                </div>
                <img
                  className="link-arrow"
                  src={theme === "dark" ? link : lightLink}
                  alt="some alt text"
                />
              </div>
              <p className="copy-font bottom-spacing" data-theme={theme}>
                {renderRichText(
                  data?.featuredTwo?.featuredProjectDescription,
                  options(theme)
                )}
              </p>
              <div
                className={`${
                  theme === "dark"
                    ? "project-image-container"
                    : "light-project-image-container"
                } bottom-spacing`}
              >
                <GatsbyImage
                  image={data?.featuredTwo?.projectImage?.gatsbyImageData}
                  alt={data?.featuredTwo?.title || "Project Image"} // Add alt text
                  className="project-image"
                  style={{
                    boxShadow:
                      theme === "dark"
                        ? "none"
                        : "4px 7px 7px rgba(85, 81, 81, 0.6)",
                  }}
                />
              </div>
              <div className="tags-container bottom-spacing">
                {data?.featuredTwo?.builtWith?.map((tagObj) => (
                  <div key={tagObj.tag} className="tag" data-theme={theme}>
                    {tagObj.tag}
                  </div>
                ))}
              </div>
            </div>
          )}
          <Link
            to="/projects/all-projects/"
            className={`${
              theme === "dark" ? "contact-button" : "light-contact-button"
            } no-decoration`}
          >
            <p className="copy-font" data-theme={theme}>
              VIEW ARCHIVES
            </p>
          </Link>
        </section>
        <section
          id="contact"
          className="content-container bottom-spacing"
          ref={contactRef}
        >
          <div className="section-title bottom-spacing">
            <span
              style={{ transform: "rotate(180deg)" }}
              className={`${
                theme === "dark"
                  ? "heading-line-reversed"
                  : "light-heading-line"
              } desktop-hidden`}
            ></span>
            <h2
              className="reverse-secondary-heading-semi-bold"
              data-theme={theme}
            >
              CONTACT ME
            </h2>
            <span
              style={{ transform: "rotate(180deg)" }}
              className={
                theme === "dark"
                  ? "heading-line"
                  : "light-heading-line-reversed"
              }
            ></span>
          </div>
          <div className="contact-form">
            <form
              name="contact"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              action="/success"
            >
              <input type="hidden" name="form-name" value="contact" />
              <input name="bot-field" style={{ display: "none" }} />
              <input
                type="text"
                name="FullName"
                placeholder="Full Name"
                maxLength="25"
                required
                data-theme={theme}
              />
              <input
                type="email"
                name="email"
                placeholder="E-Mail"
                maxLength="50"
                required
                data-theme={theme}
              />

              <input
                type="tel"
                name="tel"
                placeholder="Telephone"
                maxLength="14"
                required
                data-theme={theme}
                onChange={handleFormatTelephone}
              />
              <textarea
                name="message"
                placeholder="Brief project or inquiry description"
                data-theme={theme}
              />
              <button
                type="submit"
                className={
                  theme === "dark" ? "submit-button" : "light-submit-button"
                }
              >
                <p className="copy-font" data-theme={theme}>SUBMIT</p>
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

export const Head = () => (
  <>
    <title>Best New York City App Developers</title>
    <meta
      name="description"
      content="I create web and mobile apps for android and iOS devices to help your business get ahead in the technology race."
    />
  </>
);

export const query = graphql`
  query FeaturedProjectsByTitle {
    featuredOne: contentfulProject(title: { eq: "Clips Dating" }) {
      title
      slug
      createdOn
      builtWith {
        tag
      }
      featuredProjectDescription {
        raw
      }
      projectImage {
        gatsbyImageData
      }
      projectLink
    }
    featuredTwo: contentfulProject(title: { eq: "Panasonic" }) {
      title
      slug
      createdOn
      builtWith {
        tag
      }
      featuredProjectDescription {
        raw
      }
      projectImage {
        gatsbyImageData
      }
      projectLink
    }
  }
`;
