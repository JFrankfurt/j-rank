import React, { ChangeEvent, FC, useState } from 'react'
import styles from './Toggle.module.scss'

interface ToggleProps {
  checked: boolean
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  name?: string
  id?: string
  offContent?: string
  onContent?: string
}

const Toggle: FC<ToggleProps> = ({offContent, onContent, ...rest}) => {
  return (
    <label className={styles.toggle}>
      <input className={styles.toggleInput} type="checkbox" {...rest} />
      <span className={styles.toggleSlider}>
        {offContent && (
          <span className={`${styles.icon} ${styles.iconOff}`}>
            {offContent}
          </span>
        )}
        {onContent && (
          <span className={`${styles.icon} ${styles.iconOn}`}>{onContent}</span>
        )}
      </span>
    </label>
  )
}

export default Toggle
