'use client'
import { createEvent } from '@/actions/events'
import useRendered from '@/hooks/use-rendered.hook'
import { toBase64 } from '@/utils/files'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Button from './button.component'
import ImageInput from './image-input.component'
import Input from './input.component'
import TextArea from './textarea.component'

const editEventSchema = z.object({
    title: z.string().min(3).max(255),
    description: z.string().min(3).max(255),
    date: z.string(),
    banner: z.any(),
    address: z.string().min(3).max(255),
})
type EditEventFormValues = z.infer<typeof editEventSchema>

interface CreateEventFormProps {
    defaultValues?: EditEventFormValues
    eventId: String
}
export default function EditEventForm({
    defaultValues,
    eventId,
}: CreateEventFormProps) {
    const router = useRouter()
    const isRendered = useRendered()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<EditEventFormValues>({
        defaultValues: defaultValues
            ? { ...defaultValues, date: defaultValues.date.slice(0, -1) }
            : {},
        resolver: zodResolver(editEventSchema),
    })
    const onSubmit = handleSubmit(async (data) => {
        const fileBase64 =
            typeof data.banner === 'string'
                ? data.banner
                : await toBase64(data.banner[0])
        console.log(data)
        await createEvent({
            ...data,
            banner: fileBase64,
            date: new Date(data.date),
        })
        router.replace(`/events/${eventId}`)
    })

    return (
        <form onSubmit={onSubmit}>
            <ImageInput
                placeholder="Event Banner"
                {...register('banner')}
                disabled={!isRendered}
                defaultImage={defaultValues?.banner}
            />
            <Input
                placeholder="Event Title"
                {...register('title')}
                error={errors.title?.message}
            />
            {/* Mak */}
            <TextArea
                placeholder="Event Description"
                {...register('description')}
                error={errors.description?.message}
            />

            <Input
                placeholder="Event Date"
                {...register('date')}
                type="datetime-local"
                error={errors.date?.message}
            />

            <Input
                placeholder="Location"
                {...register('address')}
                error={errors.address?.message}
            />

            <Button type="submit" disabled={!isRendered || isSubmitting}>
                Edit Event
            </Button>
        </form>
    )
}
