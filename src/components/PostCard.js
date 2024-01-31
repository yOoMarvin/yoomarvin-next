import Link from 'next/link'
import { format, parseISO } from 'date-fns'
import Image from 'next/image'

export default function PostCard(props) {
    return (
        <Link
            href={props.href}
            className="transition-base mb-2 grid w-full grid-cols-3 gap-12 sm:gap-16"
            {...props}
        >
            <p className="col-auto text-text-secondary">
                {format(parseISO(props.date), 'LLLL d, yyyy')}
            </p>
            <h3 className="link-basic transition-base col-span-2 text-text-primary">
                {props.title}
            </h3>
        </Link>
    )
}
