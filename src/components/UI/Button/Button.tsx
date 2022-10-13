import React, { FC, HTMLAttributes } from 'react'

interface IButton extends HTMLAttributes<HTMLButtonElement> {
  value: string
}

const Button: FC<IButton> = ({ value, ...props }) => {
  return (
    <button
      type='button'
      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      {...props}
    >{value}</button>
  )
}

export default Button