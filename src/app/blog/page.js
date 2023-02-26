import Link from 'next/link'
import { getDatabase } from '../../lib/notion'

export const databaseId = process.env.NOTION_DATABASE_ID

async function getBlogPosts() {
    const database = await getDatabase(databaseId)

    return database
}
export default async function BlogPage() {
    const posts = await getBlogPosts()
    return (
        <>
            <section>
                <h1 className="mb-8 text-2xl font-bold">Blog</h1>
            </section>
            <ol>
                {posts.map((post) => (
                    <li key={post.id}>
                        <Link href={`/blog/${post.id}`} className="link-basic">
                            {post.properties.Name.title[0].plain_text}
                        </Link>
                    </li>
                ))}
            </ol>
        </>
    )
}
