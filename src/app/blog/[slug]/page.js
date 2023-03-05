import { format, parseISO } from 'date-fns'
import { allPosts } from 'contentlayer/generated'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLongLeftIcon } from '@heroicons/react/24/solid'
import { Mdx } from 'src/components/Mdx'
import Image from 'next/image'

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

    if (!post) {
        notFound()
    }

    return (
        <div className="mx-auto max-w-screen-sm">
            <section className="mb-8">
                <Link
                    href="/blog"
                    className="transition-base mb-8 flex flex-row space-x-2 py-2 text-text-secondary hover:-translate-x-1 hover:text-text-primary"
                >
                    <ArrowLongLeftIcon className="h-6 w-6" /> <span>Back</span>
                </Link>
                <Image
                    src={post.image}
                    alt={`${post.title} post image`}
                    width={700}
                    height={350}
                    className="mb-12 w-full rounded-2xl"
                    priority
                />

                <h1 className="mb-2 text-3xl font-bold">{post.title}</h1>
                <time
                    dateTime={post.date}
                    className="text-sm text-text-tertiary"
                >
                    {format(parseISO(post.date), 'LLLL d, yyyy')}
                </time>
            </section>

            <Mdx code={post.body.code} />
        </div>
    )
}
