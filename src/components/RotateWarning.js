import React from 'react'
import '../styles/RotateWarning.css'
import { useTheme } from '../utils/ThemeContext';

import rotateDevice from '../images/rotate-device.svg'
import lightRotateDevice from '../images/light-rotate-device.svg'

export default function RotateWarnin() {
  const { theme } = useTheme()
  return (
    <div className={theme === 'dark' ? 'rotate-warning-container' : 'light-rotate-warning-container'}>
      <div className='rotate-warning'>
        <p className="copy-font" data-theme={theme}>Please rotate your device to portrait orientation for best experience.</p>
        <img className="rotate-icon" src={theme === 'dark' ? rotateDevice : lightRotateDevice} alt="some alt text" />
      </div>
    </div>
  )
}