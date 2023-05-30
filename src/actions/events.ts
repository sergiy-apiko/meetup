'use server'

import { prisma } from '@/core/prisma'
import { getUserByEmail } from './user'
import { getUserFromSession } from './auth'
interface CreateEventOptions {
    title: string
    description: string
    date: Date
    banner: string
    address: string
}

export const createEvent = async (options: CreateEventOptions) => {
    const user = await getUserFromSession()
    if (!user) {
        throw new Error('Not found')
    }

    const event = await prisma.event.create({
        data: {
            title: options.title,
            description: options.description,
            date: options.date,
            banner: options.banner,
            address: options.address,
            user_id: user.id,
        },
    })
    return event
}