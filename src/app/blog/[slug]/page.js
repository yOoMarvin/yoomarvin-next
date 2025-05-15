import { format, parseISO } from 'date-fns'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLongLeftIcon } from '@heroicons/react/24/solid'
import { Mdx } from 'src/components/Mdx'
import Image from 'next/image'
import ViewCounter from 'src/components/ViewCounter'
import { getBlogPosts } from 'src/db/blog'

// export async function generateStaticParams() {
//     let posts = getBlogPosts()
//     return posts.map((post) => ({
//         slug: post.slug,
//     }))
// }

export default function PostPage({ params }) {
    let post = getBlogPosts().find((post) => post.slug === params.slug)

    if (!post) {
        notFound()
    }

    return (
        <div className="mx-auto max-w-screen-sm">
            <section className="mb-8">
                <Link
                    href="/blog"
                    className="transition-base mb-8 flex flex-row space-x-2 py-2 text-onBackground-medium hover:-translate-x-1 hover:text-onBackground-high"
                >
                    <ArrowLongLeftIcon className="h-6 w-6" /> <span>Back</span>
                </Link>
                <Image
                    src={`/blog/${post.slug}/image.png`}
                    alt={`${post.metadata.title} post image`}
                    width={700}
                    height={350}
                    className="mb-12 w-full rounded-2xl"
                    priority
                />

                <h1 className="mb-2 text-3xl font-bold">
                    {post.metadata.title}
                </h1>
                <div className="flex items-center space-x-2 text-sm text-onBackground-low">
                    <time dateTime={post.metadata.date}>
                        {format(parseISO(post.metadata.date), 'LLLL d, yyyy')}
                    </time>
                    <span>•</span>
                    <ViewCounter slug={post.slug} />
                </div>
            </section>

            <article className="prose dark:prose-invert prose-headings:mb-2 prose-headings:mt-0 prose-headings:font-bold prose-h1:text-3xl prose-a:font-medium prose-a:text-special-link hover:prose-a:text-special-linkHover prose-pre:border prose-pre:border-ui-neutral">
                <Mdx source={post.content} />
            </article>
        </div>
    )
}
