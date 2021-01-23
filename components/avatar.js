import Image from 'next/image'

export default function Avatar({ name, picture }) {
    return (
        <div className="flex items-center">
            {picture &&
                <Image
                    loading="lazy"
                    src={picture}
                    className="w-10 h-10 rounded-full mr-1 z-0"
                    width="64"
                    height="64"
                    alt={name} />
            }
            <div className="font-bold">{name}</div>
        </div>
    )
}