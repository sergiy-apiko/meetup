import { getEventById } from '@/actions/events'
import Container from '@/components/container.component'
import EditEventForm from '@/components/edit-event.component copy'
import { notFound } from 'next/navigation'

interface EditPageParams {
    params: { id?: string }
}

export default async function EditEventPage({ params }: EditPageParams) {
    const event = await getEventById(params?.id!)
    if (!event) {
        notFound()
    }
    console.log(event.date.toISOString().slice(0, -1), event.date.toISOString())
    return (
        <Container>
            <EditEventForm
                eventId={params?.id!}
                defaultValues={{
                    title: event.title,
                    description: event.description,
                    date: event.date.toISOString(),
                    banner: event.banner,
                    address: event.address,
                }}
            />
        </Container>
    )
}
