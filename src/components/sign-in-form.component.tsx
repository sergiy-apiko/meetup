'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Input from './input.component'
import { signIn } from 'next-auth/react'

const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(32),
})

type SignInFormValues = z.infer<typeof signInSchema>

export default function SignInForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInFormValues>({
        resolver: zodResolver(signInSchema),
    })

    const onSubmit = handleSubmit((data) => {
        signIn('credentials', {
            email: data.email,
            password: data.password,
            callbackUrl: '/',
        })
    })

    return (
        <form onSubmit={onSubmit}>
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
            <button className="bg-[#f94d6a] w-full p-2 rounded text-sm">
                Get Access
            </button>
        </form>
    )
}
