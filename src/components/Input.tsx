import { FC, InputHTMLAttributes } from 'react'

const Input: FC<InputHTMLAttributes<HTMLInputElement>> = ({
  placeholder,
  ...rest
}) => {
  return (
    <input
      className="w-72 p-2 rounded text-center"
      aria-label={placeholder}
      placeholder={placeholder}
      {...rest}
    />
  )
}

export default Input
