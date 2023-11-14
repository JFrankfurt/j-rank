import React, { ButtonHTMLAttributes, FC } from 'react'
import styles from './Button.module.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

const Button: FC<ButtonProps> = (props) => {
  return <button className={`${props.className} ${styles.button}`} {...props} />
}

export default Button
