
import DateFormatter from '../components/date-formatter'
import CoverImage from './cover-image'
import Link from 'next/link'

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}) {
  return (
    <div>
      <div className="mb-5">
        {coverImage &&
          <CoverImage
            slug={slug}
            title={title}
            src={coverImage}
            height={278}
            width={556}
          />
        }
      </div>
      <h3 className="text-3xl leading-snug">
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a className="hover:underline">{title}</a>
        </Link>
      </h3>
      {date &&
            <div className="text-lg mb-1">
            <DateFormatter dateString={date} />
          </div>
      }

      {excerpt  &&
        <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
      }

    </div>
  )
}
