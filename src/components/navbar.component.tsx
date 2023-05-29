'use client'
import { signOut, useSession } from 'next-auth/react'
import Button from './button.component'
import Logo from './logo.component'

export default function NavBar() {
    const { data: session, status } = useSession()

    return (
        <nav className="px-8 py-3 bg-black/25 flex justify-between items-center">
            <Logo></Logo>
            {status === 'loading' && <div>Loading ...</div>}
            {status === 'authenticated' && (
                <div className="flex items-center gap-4">
                    <span className="center">
                        <p>{session?.user?.name}</p>
                        <p className="text-sm text-gray-400">
                            {session?.user?.email}
                        </p>
                    </span>
                    <Button onClick={() => signOut()}>Sign OUT</Button>
                </div>
            )}
        </nav>
    )
}
