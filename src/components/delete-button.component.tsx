'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import Button from './button.component'
import { deleteEvent } from '../actions/events'

interface DeleteButtonProps {
    id: string
}
const DeleteButton = ({ id }: DeleteButtonProps) => {
    const router = useRouter()
    const [deleting, setDeleting] = useState(false)
    const onDelete = async () => {
        const response = await confirm(
            'Are you sure you want to delete this event?'
        )
        if (response) {
            setDeleting(true)
            try {
                await deleteEvent(id)
                setDeleting(false)
            } catch (err: any) {
                setDeleting(false)
                toast.error(err.message)
            }

            router.replace('/')
        }
    }
    return (
        <Button onClick={onDelete} disabled={deleting}>
            Delete
        </Button>
    )
}

export default DeleteButton
