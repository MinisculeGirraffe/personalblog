
import DateFormatter from '../components/date-formatter'
import Tag from '../components/tag'
import Avatar from '../components/avatar'
import CoverImage from './cover-image'
import Link from 'next/link'

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
  readingTime,
  tag,
}) {
  return (
    <div className='py-1'>
      <div className=" pt-2 shadow-md -mx-5 border-b bg-color-basic-1000 rounded justify-center">
        <div>
          <h3 className="text-3xl leading-snug flex flex-row items-center justify-between px-2">
            <span className='flex-col flex'>
              <div className="flex-row inline-flex">
                <Tag tag={tag} />
              </div>
              <Link as={`/posts/${slug}`} href="/posts/[slug]">
                <a className="hover:underline">{title}</a>
              </Link>
              <p className='text-sm mb-1'>Reading Time: {readingTime} Minutes</p>
            </span>
            {date &&
              <div className=" text-right justify-items-center text-base ">
                <DateFormatter dateString={date} />
                <Avatar name={author.name} picture={author.profile_image} />
              </div>
            }

          </h3>
        </div>
      </div>
      {excerpt &&
        <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
      }
    </div>
  )
}
``