import { FC, InputHTMLAttributes } from 'react'

const Input: FC<InputHTMLAttributes<HTMLInputElement>> = ({
  placeholder,
  ...rest
}) => {
  return <input aria-label={placeholder} placeholder={placeholder} {...rest} />
}

export default Input
