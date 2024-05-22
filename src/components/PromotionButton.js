import { ArrowUpRightIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import Link from 'next/link'

export default function PromotionButton(props) {
    return (
        <Link
            href={`${props.href}`}
            target="_blank"
            className="group flex flex-row justify-between space-x-4 rounded-xl border border-ui-neutral bg-ui-low p-4 transition-all duration-300 ease-in-out hover:bg-ui-neutral"
        >
            <div className="flex flex-row items-center space-x-2">
                <Image
                    src={props.src}
                    alt={props.alt}
                    height={64}
                    width={64}
                    className="h-16 w-16 rounded-full border border-ui-medium"
                />
                <div className="text-left">
                    <p className="text-onUi-medium">{props.title}</p>
                    <p className="text-onUi-low">{props.detail}</p>
                </div>
            </div>
            <ArrowUpRightIcon className="h-5 w-5 text-ui-high transition-all duration-300 ease-in-out group-hover:rotate-12" />
        </Link>
    )
}
