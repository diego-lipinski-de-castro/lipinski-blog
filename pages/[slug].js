import Head from 'next/head'
var md = require('markdown-it')();

export default function Post({ post }) {
    return (
        <>
            <Head>
                <title>{post.title} | Lipinski</title>
            </Head>

            <h1>{post.title}</h1>
            <span>{post.created_at}</span>

            <small>3 min read</small>

            <div dangerouslySetInnerHTML={{ __html: post.content }}/>
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

    post.content = md.render(post.content);

    return {
        props: { post }
    }
}