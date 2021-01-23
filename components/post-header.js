
import DateFormatter from '../components/date-formatter'
import CoverImage from '../components/cover-image'
import PostTitle from '../components/post-title'
import Avatar from '../components/avatar'

export default function PostHeader({ title, coverImage, date, author }) {
  return (
    <>
      <div className="mb-1 -mx-5 border-b-4  border-color-basic-900 rounded justify-center items-center">

        {coverImage &&
          <div className="mb-8 md:mb-16 sm:mx-0 ">
            <CoverImage title={title} src={coverImage} height={620} width={1240} />
          </div>
        }

        <div className="max-w-2xl mx-auto items-center">
          <PostTitle>{title}</PostTitle>       
          <div className="mb-6 text-lg">
            <DateFormatter dateString={date} />
          </div>
          <Avatar name={author.name} picture={author.profile_image}/>
        </div>
      </div>
    </>
  )
}
