import SignInForm from '@/components/sign-in-form.component'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function page() {
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
                <SignInForm />
                <div className="mt-4 text-center">
                    <Link href="/sign-up" className="text-sm">
                        Create an account ?{' '}
                    </Link>
                </div>
            </div>
        </main>
    )
}
