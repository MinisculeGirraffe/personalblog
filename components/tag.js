import Link from 'next/link'
export default function ({ tag }) {
    return (
        <>
            <a className='text-color-info-600 text-sm italic'>{tag}</a>
        </>
    )
}