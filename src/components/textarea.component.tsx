'use client'

import React, { forwardRef } from 'react'

interface TextAreaProps {
    placeholder: string
    error?: string
    onBlur?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    name: string
}
const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
    ({ error, ...inputProps }, ref) => {
        return (
            <div className="mb-4">
                <textarea
                    className="text-black w-full border-0 rounded c- py-2 px-4"
                    {...inputProps}
                    ref={ref}
                    rows={5}
                />
                {error && <p className="text-sm text-red-400"> * {error}</p>}
            </div>
        )
    }
)

TextArea.displayName = 'TextArea'

export default TextArea
