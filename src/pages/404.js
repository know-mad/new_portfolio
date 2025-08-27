import * as React from "react"
import { Link } from "gatsby"

import { useTheme } from "../context/ThemeContext";

const NotFoundPage = () => {
  const {theme} = useTheme()

  return (
    <main className='page-not-found-container'>
      <p className="copy-font bottom-spacing" data-theme={theme}>Ooops...the page you are trying to access doesn't exist.</p>
      <h1 className="heading-extra-bold bottom-spacing" data-theme={theme}>404 Page Not Found</h1>
      <Link style={{marginRight: 0}} to="/" className='link-bold no-decoration' data-theme={theme}>
        <p>Back to home</p>
      </Link>
    </main>
  )
}

export default NotFoundPage

export const Head = () => <title>Not found</title>
