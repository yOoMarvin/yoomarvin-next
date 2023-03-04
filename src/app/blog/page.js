import Link from 'next/link'
import { compareDesc } from 'date-fns'
import { allPosts } from 'contentlayer/generated'
import PostCard from 'src/components/PostCard'

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
            <section>
                <h1 className="mb-2 text-2xl font-bold">Blog</h1>
                <p className="mb-8 text-text-secondary">
                    I write about product design, css and software development.{' '}
                    <br />
                    One day it will maybe be enough for a search bar.
                </p>
            </section>
            {/* Add a blog card here */}
            <div className="flex flex-col space-y-4">
                {posts.map((post, idx) => (
                    <PostCard
                        key={idx}
                        href={`/blog/${post.slug}`}
                        title={post.title}
                        date={post.date}
                        src={post.image}
                    />
                ))}
            </div>
        </>
    )
}
