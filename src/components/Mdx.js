import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useMDXComponent } from 'next-contentlayer/hooks'

const CustomLink = (props) => {
    const href = props.href

    if (href.startsWith('/')) {
        return (
            <Link href={href} {...props}>
                {props.children}
            </Link>
        )
    }

    if (href.startsWith('#')) {
        return <a {...props} />
    }

    return <a target="_blank" rel="noopener noreferrer" {...props} />
}

function RoundedImage(props) {
    return (
        <Image
            alt={props.alt}
            className="h-auto w-full rounded-2xl"
            width="0"
            height="0"
            sizes="100vw"
            {...props}
        />
    )
}

const components = {
    Image: RoundedImage,
    a: CustomLink,
}

export function Mdx({ code }) {
    const Component = useMDXComponent(code)

    return (
        <article className="prose dark:prose-invert prose-headings:mb-2 prose-headings:mt-0 prose-headings:font-bold prose-h1:text-3xl prose-a:font-medium prose-a:text-special-link hover:prose-a:text-special-linkHover prose-pre:border prose-pre:border-ui-neutral">
            <Component components={components} />
        </article>
    )
}
