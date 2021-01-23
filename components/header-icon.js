import Link from 'next/link'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
export default function HeaderIcon({ link, icon, text }) {
    return (
        <span className='flex-row flex items-center space-x-4 '>
            <FontAwesomeIcon icon={icon} className='space-x-5' />
            {link &&
                <Link href={link}>
                    <a className='flex-row flex items-center space-x-1 hover:underline '>
                        {text && <p className=' right-5 hidden lg:inline'>{text}</p>}
                    </a>
                </Link>}

        </span>
    )
}