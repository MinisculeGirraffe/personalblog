import PostPreview from '../components/post-preview'

export default function PostArchive({ posts }) {
    return (
        <div>
            {posts.map((data) => (
                <PostPreview
                    title={data.title}
                    slug={data.slug}
                    date={data.date}
                    key={data.slug}
                />
            )
            )}
        </div>
    )
}