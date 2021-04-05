
import DateFormatter from '../components/date-formatter'

import PostTitle from '../components/post-title'
import Avatar from '../components/avatar'
import Tag from '../components/tag'

export default function PostHeader({ title, coverImage, date, author, tags }) {
  return (
    <>
      <div className=" mb-1 border-b-4  rounded justify-between">
        <div className=" items-center">
          <PostTitle>{title}</PostTitle>
          <div className="text-lg">
            <DateFormatter dateString={date} />
          </div>
          <div className="flex flex-row items-center justify-between ">
            <Avatar name={author.name} picture={author.profile_image} />
            <span className=''>
              <Tag tag={tags}/>
            </span>

          </div>

        </div>
      </div>
    </>
  )
}
