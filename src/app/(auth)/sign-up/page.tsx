import SignInForm from '@/components/sign-in-form.component'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import SignUpForm from '@/components/sign-up-form.component'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

export default async function page() {
    const user = await getServerSession(authOptions)

    if (user) {
        return redirect('/')
    }

    return (
        <main className="flex items-center justify-center h-full ">
            <div className="w-96  ">
                <div className="mb-6">
                    <Image
                        className="mx-auto"
                        src="/logo.svg"
                        alt="logo"
                        width={32}
                        height={32}
                    />
                </div>
                <SignUpForm />
                <div className="mt-4 text-center">
                    <Link href="/sign-in" className="text-sm">
                        Already have an account? Sign in{' '}
                    </Link>
                </div>
            </div>
        </main>
    )
}
