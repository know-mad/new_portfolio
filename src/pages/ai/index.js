import React from "react";
import "../../styles/ai.css";
import { useTheme } from "../../context/ThemeContext";
import ai from "../../images/ai.jpg";
import ai2 from "../../images/ai2.jpg";
import { Link } from "gatsby";

export default function AiPage() {
  const { theme } = useTheme();

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

  return (
    <div className="static-page-container">
      <div
        style={{ paddingBottom: 200, paddingTop: 50 }}
        className="page-content-container"
      >
        <div className="content-container-row">
          <div className="content-container-column">
            <h1
              className="primary-heading-bold bottom-spacing"
              data-theme={theme}
            >
              Strategic Ai Solutions
            </h1>
            <p className="copy-font" data-theme={theme}>
              Running a business today means juggling growth, operations, and
              customer expectations, often with limited time and resources.
              Repetitive tasks, data overload, and constant communication can
              slow your team down and keep you from focusing on what really
              matters.
              <br />
              <br />
              That’s where I come in. I help businesses leverage practical Ai
              solutions that save time, cut costs, and create better experiences
              for your customers.
            </p>
            <Link
              to="/ai/ai-solutions/"
              className={`${
                theme === "dark" ? "contact-button" : "light-contact-button"
              } no-decoration bottom-spacing`}
            >
              <p className="copy-font" data-theme={theme}>
                VIEW DEMOS
              </p>
            </Link>
          </div>
          <img className="content-image" src={ai} alt="some alt text" />
        </div>
        <div className="content-container-row-reverse">
          <div className="content-container-column">
            <h1
              className="primary-heading-bold bottom-spacing"
              data-theme={theme}
            >
              Ai Agents at Your Service
            </h1>
            <p className="copy-font bottom-spacing" data-theme={theme}>
              Ai agents act like digital team members who never take a break.
              They handle the repetitive, time-consuming tasks that eat into
              your day, from responding to customers and managing schedules to
              organizing data and keeping workflows moving. Instead of juggling
              countless tools or relying on staff to do manual busywork, you can
              rely on an agent that works around the clock, integrates
              seamlessly with your existing systems, and adapts to your business
              needs. 
              <br/>
              <br/>
              The value isn’t just efficiency, it’s freedom. With Ai
              agents covering routine operations, your team can focus on the
              high-impact work that drives growth and builds stronger
              relationships. They scale instantly, deliver consistent results,
              and cost far less than adding more staff, giving your business a
              competitive edge in today’s fast-moving world.
            </p>
            {/* <ul>
              <li data-theme={theme}>Workflow Automation</li>
              <p className="copy-font bottom-spacing" data-theme={theme}>
                Eliminate repetitive tasks with AI-powered systems that run in
                the background.
              </p>
              <li data-theme={theme}>Smarter Communication</li>
              <p className="copy-font bottom-spacing" data-theme={theme}>
                Deploy AI assistants to handle scheduling, customer support, and
                FAQs.
              </p>
              <li data-theme={theme}>Data & Document Insights</li>
              <p className="copy-font bottom-spacing" data-theme={theme}>
                Turn messy data and documents into clear, actionable summaries.
              </p>
              <li data-theme={theme}>Data & Document Insights</li>
              <p className="copy-font bottom-spacing" data-theme={theme}>
                Turn messy data and documents into clear, actionable summaries.
              </p>
              <li data-theme={theme}>Customer Engagement</li>
              <p className="copy-font bottom-spacing" data-theme={theme}>
                Automate personalized follow-ups, marketing content, and
                retention campaigns.
              </p>
              <li data-theme={theme}>Custom AI Integrations</li>
              <p className="copy-font bottom-spacing" data-theme={theme}>
                Connect AI with the tools your business already uses for
                seamless operations.
              </p>
            </ul> */}
          </div>
          <img className="content-image" src={ai2} alt="some alt text" />
        </div>
        <div className="content-container-row">
          <div className="content-container-column">
            <h1
              className="primary-heading-bold bottom-spacing"
              data-theme={theme}
            >
              Schedule a demo
            </h1>
            <p className="copy-font bottom-spacing" data-theme={theme}>
              Ai isn’t just for big tech companies it’s now accessible to
              businesses of every size. The challenge is knowing which tools to
              use, how to integrate them, and how to make sure they actually
              deliver results.
              <br />
              <br />
              I work with businesses to identify high-impact opportunities for
              Ai, design solutions around real world problems, and implement
              them quickly so you see measurable improvements right away.
              Whether it’s automating routine tasks, streamlining communication,
              or unlocking insights from your data, the goal is the same: give
              you back time, save money, and help you grow.
              <br />
              <br />
              If you’re curious about how Ai could fit into your business, let’s
              start with a quick conversation. I’ll learn about your challenges,
              share examples of what’s possible, and outline the first steps
              toward a solution tailored to your needs.
            </p>
          </div>
          <div className="contact-form ai-page">
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
                <p className="copy-font" data-theme={theme}>
                  SUBMIT
                </p>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export const Head = () => (
  <>
    <title>Washington DC AI Solutions</title>
    <meta
      name="description"
      content="I create AI solutions as well as web and mobile apps for android and iOS devices to help your business get ahead in the technology race."
    />
  </>
);
