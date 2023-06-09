'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Input from './input.component'
import { createUser } from '@/actions/user'
import Button from './button.component'
import { toast } from 'react-toastify'
import { signIn } from 'next-auth/react'

const signInSchema = z.object({
    username: z.string().min(3).max(50),
    email: z.string().email(),
    password: z.string().min(6).max(32),
})

type SignUpFormValues = z.infer<typeof signInSchema>

export default function SignUpForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpFormValues>({
        resolver: zodResolver(signInSchema),
    })

    const onSubmit = handleSubmit(async (data) => {
        try {
            await createUser(data)
            signIn('credentials', {
                email: data.email,
                password: data.password,
                callbackUrl: '/',
            })
        } catch (error: any) {
            toast.error('User already exists')
        }
    })

    return (
        <form onSubmit={onSubmit}>
            <Input
                {...register('username')}
                placeholder="Username"
                error={errors.username?.message}
            />
            <Input
                {...register('email')}
                placeholder="Email"
                error={errors.email?.message}
            />
            <Input
                {...register('password')}
                type="password"
                placeholder="Password"
                error={errors.password?.message}
            />
            <Button type="submit">Create an account</Button>
        </form>
    )
}
