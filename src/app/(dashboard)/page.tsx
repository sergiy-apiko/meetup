import ButtonLink from '@/components/ButtonLink.component'
import Container from '@/components/container.component'
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
        <Container>
            <div className="flex justify-between">
                <h1 className="text-white text-2xl font-bold">My Events</h1>
                <ButtonLink href="/events/create">+ Create Event</ButtonLink>
            </div>
        </Container>
    )
}
