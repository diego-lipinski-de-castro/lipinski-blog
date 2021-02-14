import Link from 'next/link'
import Head from 'next/head'

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>Lipinski</title>
      </Head>

      {posts && posts.map((post, index) => (
        <div key={index}>
          <Link href={`/${post.slug}`}>
            <a>
              <h1>{post.title}</h1>

              <span>{post.created_at}</span>
              <small>3 min read</small> 
            </a>
          </Link>
        </div>
      ))}
    </>
  )
}

export async function getStaticProps() {
  let posts = []

  const res = await fetch(`${process.env.BLOG_API}/posts`)

  if(res.ok) {
    posts = await res.json()
  }
  
  return {
    props: { posts }
  }
}