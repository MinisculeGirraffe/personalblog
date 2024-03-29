import Image from 'next/image'
import HeaderIcon from "./header-icon"
export default function Avatar({ name, picture }) {
    return (
        <div className="flex items-center">
            <div className='mr-1'>
            {picture ?
                <Image
                    loading="lazy"
                    src={picture}
                    className="w-10 h-10 rounded-sm mr-1 z-1"
                    width="32"
                    height="32"
                    alt={name} />
                    :
                <HeaderIcon icon={['fas','user']}/>

            }
            </div>

            <div className="font-bold">{name}</div>
        </div>
    )
}