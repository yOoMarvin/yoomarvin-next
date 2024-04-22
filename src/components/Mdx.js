import Link from 'next/link'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'

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

export function Mdx(props) {
    return (
        <MDXRemote
            {...props}
            components={{ ...components, ...(props.components || {}) }}
        />
    )
}
