import clsx from 'clsx'
import React from 'react'

interface ButtonProps {
    fullWidth?: Boolean
    type?: React.ComponentProps<'button'>['type']
    children?: React.ReactNode
    onClick?: React.ComponentProps<'button'>['onClick']
    disabled?: React.ComponentProps<'button'>['disabled']
    color?: String
}

export default function Button(props: ButtonProps) {
    const {
        fullWidth,
        type = 'button',
        color,
        disabled,
        children,
        onClick,
    } = props
    const colorClass = color ? color : `bg-[#f94d6a]`
    const buttonClasses = clsx(
        `${colorClass} px-4 py-2 border-0 rounded text-white font-bold text-sm disabled:opacity-70`,
        {
            'w-full': fullWidth,
        },
        {
            [`bg-${color}`]: !!color,
        }
    )
    return (
        <button
            className={buttonClasses}
            type={type}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}
