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

const Toggle: FC<ToggleProps> = (props) => {
  return (
    <label className={styles.toggle}>
      <input className={styles.toggleInput} type="checkbox" {...props} />
      <span className={styles.toggleSlider}>
        {props.offContent && (
          <span className={`${styles.icon} ${styles.iconOff}`}>
            {props.offContent}
          </span>
        )}
        {props.onContent && (
          <span className={`${styles.icon} ${styles.iconOn}`}>{props.onContent}</span>
        )}
      </span>
    </label>
  )
}

export default Toggle
