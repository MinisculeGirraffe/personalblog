import Link from 'next/link'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
export default function HeaderIcon({ link, icon, text }) {
    return (
        <span className='flex-row flex items-center space-x-4 '>
            <Link href={link}>
                <a className='flex-row flex items-center space-x-1 hover:underline '>
                <FontAwesomeIcon icon={icon} className='space-x-5' />
                    {text && <p className=' right-5 hidden lg:inline'>{text}</p>}
                </a>
            </Link>
        </span>
    )
}