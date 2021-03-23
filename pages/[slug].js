import Head from 'next/head'
var md = require('markdown-it')();
import styles from '../styles/Post.module.css'

export default function Post({ post }) {
    return (
        <>
            <Head>
                <title>{post ? `${post.title} | Lipinski` : 'Not found | Lipinski'}</title>
            </Head>

            {post ? <div className={styles.post_container}>
                <h1 className={styles.post_title}>{post.title}</h1>
                
                <small className={styles.post_metadata}>{post.created_at} • {post.timing}</small> 

                <div className={styles.post_content} dangerouslySetInnerHTML={{ __html: post.content }}/>
            </div> : null}
        </>
    )
}

export async function getStaticPaths() {
    const res = await fetch(`${process.env.BLOG_API}/posts`)
    const data = await res.json()

    const paths = data.map(post => ({
        params: {
            slug: post.slug
        }
    }))

    return {
        paths,
        fallback: true
    }
}

export async function getStaticProps({ params }) {
    const { slug } = params

    const res = await fetch(`${process.env.BLOG_API}/posts?slug=${slug}`)
    const data = await res.json()

    const post = data[0]

    post.created_at = new Date(post.created_at).toLocaleDateString('en-US', {
        day: 'numeric',
        weekday: 'long',
        month: 'long',
        year: 'numeric',
    })

    post.content = md.render(post.content)

    return {
        props: { post }
    }
}