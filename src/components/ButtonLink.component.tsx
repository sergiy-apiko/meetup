import Link from 'next/link'
import React from 'react'

interface ButtonLinkProps {
    children: React.ReactNode
    href: string
    color?: string
}
const ButtonLink = ({ children, href, color }: ButtonLinkProps) => {
    const colorClass = color ? color : `bg-[#f94d6a]`

    return (
        <Link
            href={href}
            className={`${colorClass} px-4 py-2 border-0 rounded text-white font-bold text-sm`}
        >
            {children}
        </Link>
    )
}

export default ButtonLink
