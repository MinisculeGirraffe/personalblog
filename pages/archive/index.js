import Head from 'next/head'

import Container from '../../components/container'
import MoreStories from '../../components/more-stories'
import Layout from '../../components/layout'

import { getPosts } from '../../lib/posts'
export default function Index({ allPosts }) {
    return (
        <>
            <Layout>
                <Head>
                    <title>Daniel's Blog</title>
                </Head>
                <Container>
                </Container>
            </Layout>
        </>
    )
}

export async function getStaticProps() {
    const allPosts = await getPosts()
    return {
        props: { allPosts },
    }
}
