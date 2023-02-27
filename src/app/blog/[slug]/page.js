import { format, parseISO } from 'date-fns'
import { allPosts } from 'contentlayer/generated'
import Link from 'next/link'
import { ArrowLongLeftIcon } from '@heroicons/react/24/solid'

export async function generateStaticParams() {
    return allPosts.map((post) => ({
        slug: post.slug,
    }))
}

export async function getPost(slug) {
    return allPosts.find((post) => post.slug == slug)
}

export default async function PostPage({ params }) {
    const post = await getPost(params.slug)

    return (
        <article className="mx-auto max-w-screen-sm">
            <Link
                href="/blog"
                className="transition-base mb-8 flex flex-row space-x-2 py-2 text-text-secondary hover:-translate-x-1 hover:text-text-primary"
            >
                <ArrowLongLeftIcon className="h-6 w-6" /> <span>Back</span>
            </Link>
            <h1 className="mb-4 text-3xl font-bold">{post.title}</h1>
            <time dateTime={post.date} className="text-sm text-text-tertiary">
                {format(parseISO(post.date), 'LLLL d, yyyy')}
            </time>
            <section
                className=" cl-post-body mt-8"
                dangerouslySetInnerHTML={{ __html: post.body.html }}
            />
        </article>
    )
}
