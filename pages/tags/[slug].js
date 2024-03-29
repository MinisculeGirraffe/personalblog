import { useRouter } from 'next/router'
import ErrorPage from 'next/error'

import { getSingleTag, getTags } from '../../lib/tags'
import { getPosts, getSinglePost, getPostsByTag } from '../../lib/posts'

import Layout from '../../components/layout'
import Container from '../../components/container'
import MoreStories from '../../components/more-stories'

export default function Tag({ posts, tag }) {
    const router = useRouter()
    const morePosts = posts
    return (
        <Layout>
            <Container>
                <p className=' text-xl'>Tag: {tag.name}</p>
            </Container>
            <Container>
                {router.isFallback ? (<PostTitle>Loading…</PostTitle>)
                    : morePosts.length > 0 && (<MoreStories posts={morePosts} />)}
            </Container>
        </Layout>

    )

}

export async function getStaticProps(context) {
    const taggedPosts = await getPostsByTag(context.params.slug)
    const tag = await getSingleTag(context.params.slug)
    if (!taggedPosts) {
        return {
            notFound: true,
        }
    }
    return {
        props: {
            posts: taggedPosts,
            tag: tag
        }
    }
}
export async function getStaticPaths() {
    const tags = await getTags()
    const paths = tags.map((tag) => ({
        params: {
            slug: tag.slug
        },
    }))

    return { paths, fallback: false }
}