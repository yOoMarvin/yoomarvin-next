import Link from 'next/link'
import { format, parseISO } from 'date-fns'
import Image from 'next/image'

export default function PostCard(props) {
    return (
        <Link
            href={props.href}
            className="transition-base mb-4 flex w-full flex-row space-x-16"
            {...props}
        >
            <p className="text-text-secondary">
                {format(parseISO(props.date), 'LLLL d, yyyy')}
            </p>
            <h3 className="link-basic transition-base text-text-primary">
                {props.title}
            </h3>
        </Link>
    )
}
