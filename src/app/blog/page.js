import Link from 'next/link'
import { compareDesc, format, parseISO } from 'date-fns'
import { allPosts } from 'contentlayer/generated'

export async function getPosts() {
    const posts = allPosts.sort((a, b) => {
        return compareDesc(new Date(a.date), new Date(b.date))
    })
    return posts
}

export default async function BlogPage() {
    const posts = await getPosts()

    return (
        <>
            {console.log(posts)}
            <section>
                <h1 className="mb-8 text-2xl font-bold">Blog</h1>
            </section>
            <div className="flex flex-col space-y-4">
                {posts.map((post, idx) => (
                    <Link
                        key={idx}
                        href={`/blog/${post.slug}`}
                        className="link-basic"
                    >
                        {post.title}
                    </Link>
                ))}
            </div>
        </>
    )
}
