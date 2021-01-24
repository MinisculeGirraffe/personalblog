import Link from 'next/link'
export default function ({ tag }) {
    return (
        <Link as={`/tags/${tag.slug}`} href='/tags/[slug]'>
            <a className=' hover:underline mx-1 text-color-success-600 text-sm italic'>{tag.name}</a>
        </Link>


    )
}