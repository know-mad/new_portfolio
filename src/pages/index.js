import React, { useState, useRef, useEffect } from "react";
import { Link } from "gatsby";
import "../styles/index.css";

import ScrollBar from "../components/ScrollBar";
import Drawer from "../components/Drawer";
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
import onewsq from "../images/1wsq.jpg";
import ewc from "../images/ewc.jpg";
import panasonic from "../images/panasonic.jpg";
import xd from "../images/xd.svg";
import xdDark from "../images/xd-dark.svg";
import git from "../images/github.svg";
import gitDark from "../images/github-dark.svg";
import linkedIn from "../images/linkedin.svg";
import linkedInDark from "../images/linkedin-dark.svg";

import { NavigationContext } from "../utils/context";
import { useTheme } from "../utils/ThemeContext";
import RotateWarning from "../components/RotateWarning";

export default function HomePage() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [activeLink, setActiveLink] = useState(1);
  const [scrollingProgrammatically, setScrollingProgrammatically] =
    useState(false);
  const aboutContainerRef = useRef(null);
  const experienceContainerRef = useRef(null);
  const projectsContainerRef = useRef(null);
  const contactContainerRef = useRef(null);
  const { theme } = useTheme();

  const sectionRefs = [
    { id: 1, ref: aboutContainerRef },
    { id: 2, ref: experienceContainerRef },
    { id: 3, ref: projectsContainerRef },
    { id: 4, ref: contactContainerRef },
  ];

  // useEffect(() => {
  //   const getThreshold = () => {
  //     const width = window.innerWidth;

  //     // Map screen sizes to thresholds
  //     if (width <= 375) return 0.25; // Smallest screens
  //     if (width <= 768) return 0.3; // Tablet
  //     if (width <= 1024) return 0.35; // Small desktop
  //     if (width <= 1440) return 0.4; // Large desktop
  //     return 0.76; // Ultra-wide screens
  //   };

  //   const observerOptions = {
  //     root: null,
  //     rootMargin: "0px",
  //     threshold: getThreshold(), // Dynamically set threshold based on screen size
  //   };

  //   const observerCallback = (entries) => {
  //     if (scrollingProgrammatically) return; // Ignore observer updates if scrolling programmatically

  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting) {
  //         const activeSection = sectionRefs.find(
  //           (section) => section.ref.current === entry.target
  //         );
  //         if (activeSection) {
  //           setActiveLink(activeSection.id);
  //         }
  //       }
  //     });
  //   };

  //   const observer = new IntersectionObserver(
  //     observerCallback,
  //     observerOptions
  //   );

  //   sectionRefs.forEach((section) => {
  //     if (section.ref.current) {
  //       observer.observe(section.ref.current);
  //     }
  //   });

  //   // Reinitialize observer on resize
  //   const handleResize = () => {
  //     observer.disconnect(); // Clear existing observers
  //     observerOptions.threshold = getThreshold(); // Update threshold
  //     sectionRefs.forEach((section) => {
  //       if (section.ref.current) {
  //         observer.observe(section.ref.current);
  //       }
  //     });
  //   };

  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //     sectionRefs.forEach((section) => {
  //       if (section.ref.current) {
  //         observer.unobserve(section.ref.current);
  //       }
  //     });
  //   };
  // }, [sectionRefs, scrollingProgrammatically]);

  useEffect(() => {
    const getThreshold = (ref) => {
      const width = window.innerWidth;

      // Specific adjustment for projectsContainerRef
      if (ref === projectsContainerRef) {
        if (width <= 375) return 0.3; // Smallest screens
        if (width <= 768) return 0.35; // Tablet
        if (width <= 1024) return 0.4; // Small desktop
        if (width <= 1440) return 0.425; // Large desktop
        return 0.6; // Ultra-wide screens
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

  const handleScrollToTop = (containerRef) => {
    // Scroll the specified container to the top with an offset
    if (containerRef.current) {
      const navbarHeight = document.querySelector(".navbar").offsetHeight;
      const topOffset = containerRef.current.offsetTop - navbarHeight;

      // Indicate programmatic scrolling
      setScrollingProgrammatically(true);

      window.scrollTo({
        top: topOffset,
        behavior: "smooth",
      });

      // Reset the state after a delay (matches the scroll duration)
      setTimeout(() => setScrollingProgrammatically(false), 500); // Adjust timeout to match animation speed
    }
  };

  const handleClick = (id, containerRef) => {
    setActiveLink(id);
    handleScrollToTop(containerRef);
  };

  return (
    <NavigationContext.Provider value={activeLink}>
      <RotateWarning />
      <div className="home-container">
        <div className="home-container-left">
          <h1 className="heading-extra-bold bottom-spacing" data-theme={theme}>
            HI! I'M DAVID
          </h1>
          <h4
            className="secondary-heading-semi-bold bottom-spacing"
            data-theme={theme}
          >
            Full Stack Software Engineer
          </h4>
          <p className="copy-font" data-theme={theme}>
            Creative software engineer that loves to build beautifully designed
            technology solutions so you or your business can win online.
          </p>
          <div className="navigation-items">
            <div
              onClick={() => handleClick(1, aboutContainerRef)}
              className="mobile-link-container bottom-spacing"
            >
              <span
                style={{ width: activeLink === 1 ? `75px` : `0px` }}
                className={
                  theme === "dark"
                    ? "mobile-link-line-reversed"
                    : "light-mobile-link-line"
                }
              ></span>
              {theme === "dark" ? (
                <p
                  className="drawer-link"
                  style={{ color: activeLink === 1 ? `#CEFF00` : `#FFF` }}
                >
                  ABOUT ME
                </p>
              ) : (
                <p
                  className="drawer-link"
                  style={{ color: activeLink === 1 ? `#EA8D00` : `#555151` }}
                >
                  ABOUT ME
                </p>
              )}
            </div>
            <div
              onClick={() => handleClick(2, experienceContainerRef)}
              className="mobile-link-container bottom-spacing"
            >
              <span
                style={{ width: activeLink === 2 ? `75px` : `0px` }}
                className={
                  theme === "dark"
                    ? "mobile-link-line"
                    : "light-mobile-link-line-reversed"
                }
              ></span>
              {theme === "dark" ? (
                <p
                  className="drawer-link"
                  style={{ color: activeLink === 2 ? `#00A3FF` : `#FFF` }}
                >
                  WORK EXPERIENCE
                </p>
              ) : (
                <p
                  className="drawer-link"
                  style={{ color: activeLink === 2 ? `#9F00EA` : `#555151` }}
                >
                  WORK EXPERIENCE
                </p>
              )}
            </div>
            <div
              onClick={() => handleClick(3, projectsContainerRef)}
              className="mobile-link-container bottom-spacing"
            >
              <span
                style={{ width: activeLink === 3 ? `75px` : `0px` }}
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
                      style={{ color: activeLink === 3 ? `#CEFF00` : `#FFF` }}
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
                      style={{ color: activeLink === 3 ? `#CEFF00` : `#FFF` }}
                      to="/projects"
                    >
                      ALL PROJECTS
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="container-row">
                  <div className="container-row-left">
                    <p
                      className="drawer-link"
                      style={{
                        color: activeLink === 3 ? `#EA8D00` : `#555151`,
                      }}
                    >
                      RECENT PROJECTS
                    </p>
                  </div>
                  <div
                    style={{
                      display: activeLink === 3 ? "flex" : "none",
                      borderLeft: "2px solid #9F00EA",
                    }}
                    className="container-row-right"
                  >
                    <Link
                      className="drawer-link no-decoration"
                      style={{
                        color: activeLink === 3 ? `#EA8D00` : `#555151`,
                      }}
                      to="/projects"
                    >
                      ALL PROJECTS
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <div
              onClick={() => handleClick(4, contactContainerRef)}
              className="mobile-link-container bottom-spacing"
            >
              <span
                style={{ width: activeLink === 4 ? `75px` : `0px` }}
                className={
                  theme === "dark"
                    ? "mobile-link-line"
                    : "light-mobile-link-line-reversed"
                }
              ></span>
              {theme === "dark" ? (
                <p
                  className="drawer-link"
                  style={{ color: activeLink === 4 ? `#00A3FF` : `#FFF` }}
                >
                  CONTACT ME
                </p>
              ) : (
                <p
                  className="drawer-link"
                  style={{ color: activeLink === 4 ? `#9F00EA` : `#555151` }}
                >
                  CONTACT ME
                </p>
              )}
            </div>
            {/* Add the blog later */}
            {/* <div className="mobile-link-container">
              <span
                style={{ width: `0px` }}
                className="mobile-link-line"
              ></span>
              <p className="drawer-link">BLOG</p>
            </div> */}
          </div>
          <div className="socials-container">
            <a
              href="https://github.com/know-mad"
              target="_blank"
              rel="noopener"
            >
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
        <div className="home-container-right">
          {/* For mobile navigation only */}
          <Drawer
            isOpen={openDrawer ? `0` : `-400px`}
            delayCloseIcon={openDrawer ? `1.5s` : `0s`}
            delayAnimation={openDrawer ? `1s` : `0.5s`}
            iconBar1={openDrawer ? `rotate(45deg)` : `rotate(0deg)`}
            iconBar2={openDrawer ? `rotate(-45deg)` : `rotate(0deg)`}
            closeDrawer={() => setOpenDrawer(false)}
            handleClick1={() => handleClick(1, aboutContainerRef)}
            handleClick2={() => handleClick(2, experienceContainerRef)}
            handleClick3={() => handleClick(3, projectsContainerRef)}
            handleClick4={() => handleClick(4, contactContainerRef)}
          />
          <ScrollBar
            handleClick1={() => handleClick(1, aboutContainerRef)}
            handleClick2={() => handleClick(2, experienceContainerRef)}
            handleClick3={() => handleClick(3, projectsContainerRef)}
            handleClick4={() => handleClick(4, contactContainerRef)}
          />
          <div className="navbar" data-theme={theme}>
            <div
              onClick={() => setOpenDrawer(true)}
              style={{
                marginLeft: openDrawer ? `-200px` : `0`,
                transitionDelay: openDrawer ? `0.5s` : `1s`,
              }}
              className="toggle-open"
            >
              <span
                className={
                  theme === "dark" ? "toggle-bar-1" : "light-toggle-bar-1"
                }
                style={{
                  top: openDrawer ? `50%` : `0`,
                  transitionDelay: openDrawer ? `0s` : `1.5s`,
                }}
              ></span>
              <span
                className={
                  theme === "dark" ? "toggle-bar-2" : "light-toggle-bar-2"
                }
              ></span>
              <span
                className={
                  theme === "dark" ? "toggle-bar-3" : "light-toggle-bar-3"
                }
                style={{
                  bottom: openDrawer ? `50%` : `0`,
                  transitionDelay: openDrawer ? `0s` : `1.5s`,
                }}
              ></span>
            </div>
          </div>
          <div className="content-section">
            <div className="about-container" ref={aboutContainerRef}>
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
                  Creative software engineer that loves to build beautifully
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
                  <p className="secondary-heading-semi-bold" data-theme={theme}>
                    ABOUT ME
                  </p>
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
                Based in New York City, and having a background in software
                engineering, I specialize in building mobile and web
                applications, as well as blazing fast websites by using the
                latest technologies to prioritize site/app performance
                ultimately resulting in faster page load speeds and better SEO
                all delivered with beautifully and functionally designed user
                interfaces.
              </p>
              <p className="copy-font bottom-spacing" data-theme={theme}>
                Proficient in the MERN stack, my favorite technologies to use
                when building digital solutions are HTML, CSS, Javascript, React
                (along with various React frameworks such as NEXT.js and
                Gatsby.js), React Native, Node, and Mongo DB.
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
              </div>
              <p className="copy-font bottom-spacing" data-theme={theme}>
                I truly love the design process and conceptualizing from the
                imagination a beautiful digital experience. My "go-to" design
                tools are Figma, Photoshop, and Adobe XD for building mockups,
                wireframes, and customizing the visual assets necessary for an
                aesthetically and visually pleasing user experience.
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
              <p className="copy-font bottom-spacing" data-theme={theme}>
                Technology is always changing and I’m always learning in order
                to adapt to the changing market. As such, other notable
                technologies that I have had experience with in the past
                include, PostgreSQL for building relational databases, Netlify
                for front-end deployments. Heroku for back-end deployments, and
                Shopify’s Liquid templating language for building immersive
                Shopify storefronts and applications.
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
              </div>
              <div
                onClick={() => handleClick(4, contactContainerRef)}
                className={
                  theme === "dark" ? "contact-button" : "light-contact-button"
                }
              >
                <p className="copy-font" data-theme={theme}>
                  CONTACT ME
                </p>
              </div>
            </div>
            <div className="experience-container" ref={experienceContainerRef}>
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
                  <p
                    className="reverse-secondary-heading-semi-bold"
                    data-theme={theme}
                  >
                    WORK EXPERIENCE
                  </p>
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
              <p
                className="primary-heading-bold bottom-spacing"
                data-theme={theme}
              >
                Senior Frontend Engineer{" "}
                <span
                  style={{ color: theme === "dark" ? "#00A3FF" : "#EA8D00" }}
                >
                  |
                </span>{" "}
                Blueswitch{" "}
                <span
                  style={{ color: theme === "dark" ? "#00A3FF" : "#EA8D00" }}
                >
                  |
                </span>{" "}
                New York City
              </p>
              <p className="copy-font bottom-spacing" data-theme={theme}>
                Built custom Shopify and Shopify+ solutions for higher tier
                clients such as Panasonic, Polo Ralph Lauren, European Wax
                Centers, Publishers Clearing House, and The Salvation Army.
                During my time with the agency I worked in an agile development
                environment while building custom e-commerce solutions via the
                Shopify platform.
                <br />
                <br />
                My daily tasks included adhering to HTML, CSS and Javascript
                best practices to create beautiful, functional and performant
                user interfaces. I also spent my time building responsive user
                interfaces using modern javascript frameworks such as Next.js,
                or the Shopify templating engine Liquid that looked and
                performed great on all devices from desktop to mobile. Lastly, I
                performed accessibility work ensuring client web pages adhered
                to W3 accessibility compliance.
              </p>
              <div className="heading-container bottom-spacing">
                <div className="heading-title">
                  <p className="tertiary-heading-semi-bold" data-theme={theme}>
                    2020 - 2021
                  </p>
                </div>
              </div>
              <p
                className="primary-heading-bold bottom-spacing"
                data-theme={theme}
              >
                Freelance Web Developer{" "}
                <span
                  style={{ color: theme === "dark" ? "#00A3FF" : "#EA8D00" }}
                >
                  |
                </span>{" "}
                Self Employed{" "}
                <span
                  style={{ color: theme === "dark" ? "#00A3FF" : "#EA8D00" }}
                >
                  |
                </span>{" "}
                New York City
              </p>
              <p className="copy-font bottom-spacing" data-theme={theme}>
                Created full scale branded websites for clients. Starting with
                design using Figma and Adobe XD and including responsive
                front-end development using javascript frameworks such as
                React.js, Gatsby.js, or Next.js that boasted fast page load
                speeds served via CDN and microservices for small and medium
                sized businesses in my local area.
                <br />
                <br />
                Performed implementation of on page search engine optimization
                (SEO) including properly structured page titles, metadata and
                image alt tags ensuring clients were getting the best results on
                the web.
              </p>
              <div className="heading-container bottom-spacing">
                <div className="heading-title">
                  <p className="tertiary-heading-semi-bold" data-theme={theme}>
                    2015 - 2020
                  </p>
                </div>
              </div>
              <p
                className="primary-heading-bold bottom-spacing"
                data-theme={theme}
              >
                Web Developer{" "}
                <span
                  style={{ color: theme === "dark" ? "#00A3FF" : "#EA8D00" }}
                >
                  |
                </span>{" "}
                CallisonRTKL{" "}
                <span
                  style={{ color: theme === "dark" ? "#00A3FF" : "#EA8D00" }}
                >
                  |
                </span>{" "}
                Washington, DC
              </p>
              <p className="copy-font" data-theme={theme}>
                At a world renowned and global architecture firm with multiple
                locations world wide, I was responsible for maintaining and
                updating the company website. I was entrusted to work with
                graphic designers and other web developers to ensure that the
                company website was always up to date and represented clearly
                the company mission.
                <br />
                <br />
                My job at CallisonRTKL consisted of working with HTML, CSS, and
                Javascript daily, to build an aesthetically pleasing and
                functional user experience for our customers and users. I also
                performed Search Engine Optimization (SEO) and web accessibility
                for users with disabilities who wanted to use our digital
                assets.
              </p>
            </div>
            <div className="projects-container" ref={projectsContainerRef}>
              <div className="section-title bottom-spacing">
                <span
                  className={`${
                    theme === "dark"
                      ? "heading-line-reversed"
                      : "light-heading-line"
                  } desktop-hidden`}
                ></span>
                <p className="secondary-heading-semi-bold" data-theme={theme}>
                  RECENT PROJECTS
                </p>
                <span
                  className={
                    theme === "dark"
                      ? "heading-line"
                      : "light-heading-line-reversed"
                  }
                ></span>
              </div>
              <div className="heading-container bottom-spacing">
                <div className="heading-title">
                  <a
                    href="https://shop.panasonic.com/pages/build-your-own-multishape"
                    target="_blank"
                    rel="noopener"
                    className="reverse-secondary-heading-semi-bold link"
                    data-theme={theme}
                  >
                    Panasonic
                  </a>
                </div>
                <img
                  className="link-arrow"
                  src={theme === "dark" ? link : lightLink}
                  alt="some alt text"
                />
              </div>
              <p className="copy-font bottom-spacing" data-theme={theme}>
                As a global brand known for its innovative products and
                commitment to quality, Panasonic offers a wide range of consumer
                electronics, home appliances, and business solutions.
                <br />
                <br />
                When Panasonic needed a custom solution to their Multishape line
                of men's personal care products, I was entrusted to
                conceptualize and build out their ideas for the world to use.
                Using html, css, and javascript, I was able to build out a
                custom user interface boasting a streamlined user experience
                that allows customers to fully customize their Multishape
                product prior to adding it to their cart.
              </p>
              <div
                className={`${
                  theme === "dark"
                    ? "project-image-container"
                    : "light-project-image-container"
                } bottom-spacing`}
              >
                <img
                  style={{
                    boxShadow:
                      theme === "dark" ? "none" : "8px 5px 15px #555151",
                  }}
                  className="project-image"
                  src={panasonic}
                  alt="some alt text"
                />
              </div>
              <div className="tags-container bottom-spacing">
                <div className="tag" data-theme={theme}>
                  ELECTRONICS
                </div>
                <div className="tag" data-theme={theme}>
                  E-COMMERCE
                </div>
                <div className="tag" data-theme={theme}>
                  CUSTOM
                </div>
                <div className="tag" data-theme={theme}>
                  SHOPIFY
                </div>
                <div className="tag" data-theme={theme}>
                  UX/UI
                </div>
                <div className="tag" data-theme={theme}>
                  ACCESSIBILITY
                </div>
                <div className="tag" data-theme={theme}>
                  SEO
                </div>
              </div>
              <div className="heading-container bottom-spacing">
                <div className="heading-title">
                  <a
                    href="https://waxcenter.com/"
                    target="_blank"
                    rel="noopener"
                    className="reverse-secondary-heading-semi-bold link"
                    data-theme={theme}
                  >
                    European Wax Center
                  </a>
                </div>
                <img
                  className="link-arrow"
                  src={theme === "dark" ? link : lightLink}
                  alt="some alt text"
                />
              </div>
              <p className="copy-font bottom-spacing" data-theme={theme}>
                European Wax Center began as a family-owned business and is now
                the largest provider of waxing services in the United States
                with more than 1,000 locations nationwide.
                <br />
                <br />
                When European Wax Center needed their e-commerce solution
                updated and upgraded I was entrusted to build out their new and
                improved Shopify storefront using modern HTML, CSS and
                Javascript practices to not only deliver a beautiful user
                interface but also all of the the features they needed to be
                able to cater to their clients via the web. From appointment
                setting to a custom shopping cart, this website offers a
                splendid user experience with tons of tech under the hood.
              </p>
              <div
                className={`${
                  theme === "dark"
                    ? "project-image-container"
                    : "light-project-image-container"
                } bottom-spacing`}
              >
                <img
                  style={{
                    boxShadow:
                      theme === "dark" ? "none" : "8px 5px 15px #555151",
                  }}
                  className="project-image"
                  src={ewc}
                  alt="some alt text"
                />
              </div>
              <div className="tags-container">
                <div className="tag" data-theme={theme}>
                  BUSINESS
                </div>
                <div className="tag" data-theme={theme}>
                  E-COMMERCE
                </div>
                <div className="tag" data-theme={theme}>
                  SHOPIFY
                </div>
                <div className="tag" data-theme={theme}>
                  CUSTOM
                </div>
                <div className="tag" data-theme={theme}>
                  UX/UI
                </div>
                <div className="tag" data-theme={theme}>
                  ACCESSIBILITY
                </div>
              </div>
            </div>
            <div className="heading-container bottom-spacing">
              <div className="heading-title">
                <a
                  href="https://www.1wsq.com/"
                  target="_blank"
                  rel="noopener"
                  className="reverse-secondary-heading-semi-bold link"
                  data-theme={theme}
                >
                  1wsq
                </a>
              </div>
              <img
                className="link-arrow"
                src={theme === "dark" ? link : lightLink}
                alt="some alt text"
              />
            </div>
            <p className="copy-font bottom-spacing" data-theme={theme}>
              1 Willoughby Square, is Brooklyn’s first ground-up office tower in
              a generation. 1WSQ opens directly to the 1-acre Willoughby Square
              Park and climbs 34 stories above Brooklyn to offer unobstructed
              views of New York’s skylines and waterways.
              <br />
              <br />
              As a single page react app this website boasts a decoupled
              architecture using a wordpress back end for their content. The
              front end is fully custom and beautifully designed and fetches
              data via their custom API, all served to the user via the React
              framework.
            </p>
            <div
              className={`${
                theme === "dark"
                  ? "project-image-container"
                  : "light-project-image-container"
              } bottom-spacing`}
            >
              <img
                style={{
                  boxShadow: theme === "dark" ? "none" : "8px 5px 15px #555151",
                }}
                className="project-image"
                src={onewsq}
                alt="some alt text"
              />
            </div>
            <div className="tags-container bottom-spacing">
              <div className="tag" data-theme={theme}>
                HTML5
              </div>
              <div className="tag" data-theme={theme}>
                CSS3
              </div>
              <div className="tag" data-theme={theme}>
                REACT
              </div>
              <div className="tag" data-theme={theme}>
                BUSINESS
              </div>
              <div className="tag" data-theme={theme}>
                REAL ESTATE
              </div>
              <div className="tag" data-theme={theme}>
                CUSTOM
              </div>
              <div className="tag" data-theme={theme}>
                FULL STACK
              </div>
            </div>
            <div className="link-container bottom-spacing">
              <Link
                style={{ margin: "0" }}
                className={`${
                  theme === "dark" ? "contact-button" : "light-contact-button"
                } no-decoration`}
                to="/projects"
              >
                <p className="copy-font" data-theme={theme}>
                  ALL PROJECTS
                </p>
              </Link>
            </div>
            <div className="contact-container" ref={contactContainerRef}>
              <div className="section-title bottom-spacing">
                <span
                  style={{ transform: "rotate(180deg)" }}
                  className={`${
                    theme === "dark"
                      ? "heading-line-reversed"
                      : "light-heading-line"
                  } desktop-hidden`}
                ></span>
                <p
                  className="reverse-secondary-heading-semi-bold"
                  data-theme={theme}
                >
                  CONTACT ME
                </p>
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
                <form name="contact" method="post" netlify>
                  <input
                    name="FullName"
                    placeholder="Full Name"
                    maxLength="25"
                    required
                    data-theme={theme}
                  />
                  <input
                    name="mail"
                    placeholder="E-Mail"
                    maxLength="50"
                    required
                    data-theme={theme}
                  />

                  <input
                    name="tel"
                    placeholder="Telephone"
                    maxLength="15"
                    required
                    data-theme={theme}
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
                    <p>SUBMIT</p>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NavigationContext.Provider>
  );
}

export const Head = () => <title>Best NYC Web Developers</title>;
