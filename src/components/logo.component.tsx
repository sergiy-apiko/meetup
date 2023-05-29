import Image from 'next/image'

export default function logo() {
    return (
        <span>
            <Image
                className="mx-auto"
                src="/logo.svg"
                alt="logo"
                width={25}
                height={25}
            />
        </span>
    )
}
