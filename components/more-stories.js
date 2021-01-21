import PostPreview from '../components/post-preview'

export default function MoreStories({ posts }) {
  return (
    <section>
      <div className="grid grid-flow-col`">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            date={post.published_at}
            slug={post.slug}
            excerpt={post.excerpt}
            readingTime={post.reading_time}
          />
        ))}
      </div>
    </section>
  )
}
