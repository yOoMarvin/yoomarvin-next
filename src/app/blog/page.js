import { compareDesc } from 'date-fns'
import PostCard from 'src/components/PostCard'
import { getBlogPosts } from 'src/db/blog'

export default function BlogPage() {
    let allBlogs = getBlogPosts()

    return (
        <>
            <section>
                <h1 className="mb-2 text-2xl font-bold">Blog</h1>
                <p className="mb-8 text-onBackground-medium">
                    I write about product design, css and software development.{' '}
                    <br />
                    One day it will maybe be enough for a search bar.
                </p>
            </section>
            {/* Add a blog card here */}
            <div className="flex flex-col space-y-4">
                {allBlogs
                    .sort((a, b) => {
                        return compareDesc(
                            new Date(a.metadata.date),
                            new Date(b.metadata.date)
                        )
                    })
                    .map((post) => (
                        <PostCard
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            title={post.metadata.title}
                            date={post.metadata.date}
                            src={`/blog/${post.slug}/image.png`}
                        />
                    ))}
            </div>
        </>
    )
}
