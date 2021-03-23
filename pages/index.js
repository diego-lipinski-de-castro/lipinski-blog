import Link from 'next/link'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home({ posts }) {
  return (
    <>
      <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no"/>
        <title>Lipinski</title>
      </Head>

      <nav></nav> 

      <div className={styles.container}>
        {posts && posts.map((post, index) => (
          <div className={styles.post_card} key={index}>
            <Link href={`/${post.slug}`}>
              <a className={styles.post_link}>
                <h1 className={styles.post_title}>{post.title}</h1>
                <small className={styles.post_metadata}>{post.created_at} • {post.timing}</small> 
              </a>
            </Link>
          </div>
        ))}
      </div>

      <footer></footer>
    </>
  )
}

export async function getStaticProps() {
  let posts = []

  const res = await fetch(`${process.env.BLOG_API}/posts`)

  if(res.ok) {
    posts = await res.json()

    posts.forEach(post => {
      post.created_at = new Date(post.created_at).toLocaleDateString('en-US', {
        day: 'numeric',
        weekday: 'long',
        month: 'long',
        year: 'numeric',
      })
    })
  }
  
  return {
    props: { posts }
  }
}