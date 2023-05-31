import { getAllEvents, getEventById } from '@/actions/events'
import Button from '@/components/button.component'
import ButtonLink from '@/components/ButtonLink.component'
import Container from '@/components/container.component'
import CreateEventForm from '@/components/create-event.component'
import Image from 'next/image'
import { notFound } from 'next/navigation'

interface PageParams {
    params: { id?: string }
}
export default async function EventPage({ params }: PageParams) {
    const event = await getEventById(params?.id!)
    if (!event) {
        notFound()
    }
    return (
        <Container>
            <div className="flex justify-between mb-5">
                <h1 className="text-3xl"> {event.title}</h1>
                <div className="flex gap-3">
                    <ButtonLink
                        color="bg-blue-500"
                        href={`/events/${params.id}/edit`}
                    >
                        Edit
                    </ButtonLink>
                    <Button>Delete</Button>
                </div>
            </div>
            {event.banner && (
                <div className="w-full h-80 relative">
                    <Image
                        src={event.banner}
                        fill
                        style={{ objectFit: 'contain' }}
                        alt="event preview"
                    />
                </div>
            )}
            <div>
                <h2 className="text-2xl">Details</h2>
                <p>{event.description}</p>
            </div>
            <hr className="my-4" />
            <div>
                <h2 className="text-xl">Location</h2>
                <p>{event.address}</p>
                <p>
                    {event.date.toLocaleDateString()}{' '}
                    {event.date.toLocaleTimeString()}
                </p>
            </div>
        </Container>
    )
}
