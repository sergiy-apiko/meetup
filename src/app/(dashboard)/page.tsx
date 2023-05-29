import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'

export default async function page() {
    const user = await getServerSession(authOptions)

    if (!user) {
        redirect('/sign-in')
    }

    return (
        <div>
            <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
    )
}
