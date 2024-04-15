import Link from 'next/link'

export default function Appearance(props) {
    return (
        <div className="flex w-full flex-row items-center space-x-8">
            {props.href ? (
                <Link
                    href={props.href}
                    className="link-basic w-auto"
                    target="_blank"
                >
                    {props.title}
                </Link>
            ) : (
                <p className="text-onBackground-high">{props.title}</p>
            )}

            <div className="h-1 w-auto grow border-b border-dashed border-ui-medium" />
            <div>
                <p className="text-left text-onBackground-medium">
                    {props.date}
                </p>
            </div>
        </div>
    )
}
