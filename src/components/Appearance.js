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
                <p className="text-text-primary">{props.title}</p>
            )}

            <div className="h-1 w-auto grow border-b border-dashed border-neutrals-200" />
            <div>
                <p className="text-left text-text-secondary">{props.date}</p>
            </div>
        </div>
    )
}
