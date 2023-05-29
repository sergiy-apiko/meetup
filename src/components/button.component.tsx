import clsx from 'clsx'
import React from 'react'

interface ButtonProps {
    fullWidth?: Boolean
    type?: React.ComponentProps<'button'>['type']
    children?: React.ReactNode
    onClick?: React.ComponentProps<'button'>['onClick']
}

export default function Button(props: ButtonProps) {
    const { fullWidth, type = 'button', children, onClick } = props
    const buttonClasses = clsx(
        `bg-[#f94d6a] px-4 py-2 border-0 rounded text-white font-bold`,
        {
            'w-full': fullWidth,
        }
    )
    return (
        <button className={buttonClasses} type={type} onClick={onClick}>
            {children}
        </button>
    )
}
