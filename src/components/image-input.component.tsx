'use client'

import useForwardRef from '@/hooks/use-forwarded-ref.hook'
import Image from 'next/image'
import React, { forwardRef, useState } from 'react'
import Button from './button.component'

interface ImageInputProps {
    placeholder: string
    error?: string
    onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    name: string
    disabled?: React.ComponentProps<'button'>['disabled']
    defaultImage?: string
}
const ImageInput = forwardRef<HTMLInputElement, ImageInputProps>(
    ({ error, disabled, defaultImage, ...inputProps }, ref) => {
        const inputRef = useForwardRef(ref)
        const [imageUrl, setImageUrl] = useState<string | null | undefined>(
            defaultImage
        )
        const handleUpload = () => {
            inputRef.current?.click()
        }

        const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (inputProps.onChange) inputProps.onChange(e)

            if (!e.target?.files) {
                setImageUrl(null)
                return
            }
            const file = e.target?.files[0]
            setImageUrl(URL.createObjectURL(file))
        }
        return (
            <div className="mb-4">
                {imageUrl && (
                    <div className="w-full h-80 relative">
                        <Image
                            src={imageUrl}
                            fill
                            style={{ objectFit: 'contain' }}
                            alt="event preview"
                        />
                    </div>
                )}
                <input
                    className="text-black w-full border-0 rounded c- py-2 px-4 hidden"
                    {...inputProps}
                    onChange={onChange}
                    type={'file'}
                    ref={inputRef}
                    accept={'image/*'}
                />
                <Button onClick={handleUpload} disabled={disabled}>
                    Upload Image
                </Button>
                {error && <p className="text-sm text-red-400"> * {error}</p>}
            </div>
        )
    }
)

ImageInput.displayName = 'Input'

export default ImageInput
