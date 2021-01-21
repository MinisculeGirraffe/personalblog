import Container from '../components/container'
import MoreStories from '../components/more-stories'
import Intro from '../components/intro'
import Layout from '../components/layout'
import {getPosts} from '../lib/posts'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'

export default function Index({ allPosts }) {

  const morePosts = allPosts
  return (
    <>
      <Layout>
        <Head>
          <title>Daniel's Blog</title>
        </Head>
        <Intro />
        <Container>
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
