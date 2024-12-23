import * as React from "react"
import { Link } from "gatsby"

import { useTheme } from "../utils/ThemeContext";

const NotFoundPage = () => {
  const {theme} = useTheme()
  return (
    <main className='page-not-found-container'>
      <p className="copy-font bottom-spacing" data-theme={theme}>Ooops...the page you are trying to access doesn't exist.</p>
      <h1 className="heading-extra-bold bottom-spacing" data-theme={theme}>404 Page Not Found</h1>
      <Link to="/" className='link-bold no-decoration' data-theme={theme}>
        <p>Back to home</p>
      </Link>
      {/* <h1 style={headingStyles}>Page not found</h1>
      <p style={paragraphStyles}>
        Sorry 😔, we couldn’t find what you were looking for.
        <br />
        {process.env.NODE_ENV === "development" ? (
          <>
            <br />
            Try creating a page in <code style={codeStyles}>src/pages/</code>.
            <br />
          </>
        ) : null}
        <br />
        <Link to="/">Go home</Link>.
      </p> */}
    </main>
  )
}

export default NotFoundPage

export const Head = () => <title>Not found</title>
