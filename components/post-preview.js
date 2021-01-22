
import DateFormatter from '../components/date-formatter'
import Tag from '../components/tag'
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
        {coverImage &&
          <CoverImage
            slug={slug}
            title={title}
            src={coverImage}
            height={278}
            width={556}
          />
        }
        <div>
          <h3 className="text-3xl leading-snug flex flex-row items-center justify-between px-2">
            <span>
              <Link as={`/posts/${slug}`} href="/posts/[slug]">
                <a className="hover:underline">{title}</a>
              </Link>
              <p className='text-sm mb-1'>Reading Time: {readingTime} Minutes</p>
            </span>
            {date &&
              <div className="text-lg ml-1 ">
                <DateFormatter dateString={date} />
                <p className='text-sm'>Author: {author}</p>
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