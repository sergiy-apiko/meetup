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

const createEventSchema = z.object({
    title: z.string().min(3).max(255),
    description: z.string().min(3).max(255),
    date: z.string(),
    banner: z.any(),
    address: z.string().min(3).max(255),
})
type CreateEventFormValues = z.infer<typeof createEventSchema>

export default function CreateEventForm() {
    const router = useRouter()
    const isRendered = useRendered()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<CreateEventFormValues>({
        resolver: zodResolver(createEventSchema),
    })
    const onSubmit = handleSubmit(async (data) => {
        const fileBase64 = await toBase64(data.banner[0])
        console.log(data, fileBase64)
        await createEvent({
            ...data,
            banner: fileBase64,
            date: new Date(data.date),
        })
        router.replace('/')
    })

    return (
        <form onSubmit={onSubmit}>
            <ImageInput
                placeholder="Event Banner"
                {...register('banner')}
                disabled={!isRendered}
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
                Create Event
            </Button>
        </form>
    )
}
