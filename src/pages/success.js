import React from "react";
import { Link } from "gatsby";

export default function SuccessPage() {
  return (
    <div className="content-container" style={{ padding: 40 }}>
      <h1 className="heading-extra-bold">Thank you!</h1>
      <p className="copy-font">Your message has been sent successfully.</p>
      <Link to="/" className="no-decoration" style={{ marginTop: 24, display: "inline-block" }}>
        Go back home
      </Link>
    </div>
  );
}

export const Head = () => (
  <>
    <title>Message Sent</title>
    <meta name="robots" content="noindex" />
  </>
);


