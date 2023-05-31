import { getUserEvents } from '@/actions/events'
import ButtonLink from '@/components/ButtonLink.component'
import Container from '@/components/container.component'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'
import Link from 'next/link'

export default async function page() {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        redirect('/sign-in')
    }
    const events = await getUserEvents(session.user.email!)
    return (
        <Container>
            <div className="flex justify-between mb-8">
                <h1 className="text-white text-2xl font-bold">My Events</h1>
                <ButtonLink href="/events/create">+ Create Event</ButtonLink>
            </div>
            <div className="flex flex-col gap-5">
                {events.map((event) => {
                    return (
                        <Link href={`/events/${event.id}`} key={event.id}>
                            <div className="flex justify-between bg-black/30 hover:bg-black/40 hover:cursor-pointer p-4 border-0 rounded">
                                <h2 className="text-white text-2xl">
                                    {event.title}
                                </h2>
                                <p className="text-white">
                                    {event.date.toLocaleString()}
                                    <span className="ml-5 font-bold text-[25px]">
                                        {'>'}
                                    </span>
                                </p>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </Container>
    )
}
