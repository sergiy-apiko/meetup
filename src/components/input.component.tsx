'use client'

import React, { forwardRef } from 'react'

interface InputProps {
    placeholder: string
    type?: React.ComponentProps<'input'>['type']
    error?: string
    onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    name: string
}
const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ error, type = 'text', ...inputProps }, ref) => {
        return (
            <div className="mb-4">
                <input
                    className="text-black w-full border-0 rounded c- py-2 px-4"
                    {...inputProps}
                    type={type}
                    ref={ref}
                />
                {error && <p className="text-sm"> * {error}</p>}
            </div>
        )
    }
)

Input.displayName = 'Input'

export default Input
