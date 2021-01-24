
import DateFormatter from '../components/date-formatter'
import CoverImage from '../components/cover-image'
import PostTitle from '../components/post-title'
import Avatar from '../components/avatar'
import Tag from '../components/tag'

export default function PostHeader({ title, coverImage, date, author, tags }) {
  return (
    <>
      <div className=" mb-1 border-b-4  rounded justify-between">

        {coverImage &&
          <div className="mb-8 md:mb-16 sm:mx-0 ">
            <CoverImage title={title} src={coverImage} height={620} width={1240} />
          </div>
        }
        <div className=" items-center">
          <PostTitle>{title}</PostTitle>
          <div className="text-lg">
            <DateFormatter dateString={date} />
          </div>
          <div className="flex flex-row items-center justify-between ">
            <Avatar name={author.name} picture={author.profile_image} />
            <span >
              <Tag tag={tags}/>
            </span>

          </div>

        </div>
      </div>
    </>
  )
}
