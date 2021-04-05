import Container from '../components/container'
import MoreStories from '../components/more-stories'

import Layout from '../components/layout'
import {getPosts} from '../lib/posts'
import Head from 'next/head'


export default function Index({ allPosts }) {

  const morePosts = allPosts
  return (
    <>
      <Layout>
        <Head>
          <title>Daniel's Blog</title>
        </Head>
        <Container >
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
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
