import Link from 'next/link'
import React from 'react'

interface ButtonLinkProps {
    children: React.ReactNode
    href: string
}
const ButtonLink = ({ children, href }: ButtonLinkProps) => {
    return (
        <Link
            href={href}
            className="bg-[#f94d6a] px-4 py-2 border-0 rounded text-white font-bold text-sm"
        >
            {children}
        </Link>
    )
}

export default ButtonLink
