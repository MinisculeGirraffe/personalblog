import { getAllPosts } from '../../lib/api'
import Intro from '../../components/intro'
import Layout from '../../components/layout'
import Container from '../../components/container'
import PostArchive from '../../components/post-archive'
export default function Index({ allPosts }) {
    const morePosts = allPosts
    return (
        <>
            <Layout>
                <Intro />
                <Container>
                    <PostArchive posts={morePosts}/>
                </Container>
            </Layout>
        </>
    )
}

export async function getStaticProps() {
    const allPosts = getAllPosts([
        'title',
        'date',
        'slug',
    ])

    return {
        props: { allPosts },
    }
}
