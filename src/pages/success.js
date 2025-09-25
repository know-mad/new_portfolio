import * as React from "react"
import { Link } from "gatsby"

import { useTheme } from "../context/ThemeContext";

const SuccessPage = () => {
  const {theme} = useTheme()

  return (
    <main className='page-not-found-container'>
      <p className="copy-font bottom-spacing" data-theme={theme}>Thank you for submitting your request.</p>
      <h1 className="heading-extra-bold bottom-spacing" data-theme={theme}>Talk To You Soon!</h1>
      <Link style={{marginRight: 0}} to="/" className='link-bold no-decoration' data-theme={theme}>
        <p>Back to home</p>
      </Link>
    </main>
  )
}

export default SuccessPage

export const Head = () => <title>Success</title>
