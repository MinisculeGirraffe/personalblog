
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
    <div>
      <div className=" pt-2 shadow-md mb-5 -mx-5 border border-color-basic-1100 border-color-basic-900 rounded justify-center">
        <div>
          <h3 className="text-3xl leading-snug flex flex-row items-center justify-between px-2">

            <span className ='flex-col flex'>
            <Tag tag={tag}/>
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