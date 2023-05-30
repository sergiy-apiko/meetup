import Image from 'next/image'
import Link from 'next/link'

export default function logo() {
    return (
        <Link href="/">
            <Image
                className="mx-auto"
                src="/logo.svg"
                alt="logo"
                width={25}
                height={25}
            />
        </Link>
    )
}
