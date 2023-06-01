import Image from 'next/image'

export default function Service(props) {
    return (
        <div className="flex flex-col space-y-2 rounded-2xl border border-neutrals-50 p-4">
            <p className="text-lg text-text-secondary">{props.quote}</p>
            <div className="flex flex-row space-x-2">
                <Image
                    src={props.src}
                    alt={props.alt}
                    className="rounded-full"
                    width={48}
                    height={48}
                />
                <div>
                    <p>{props.name}</p>
                    <p>{props.role}</p>
                </div>
            </div>
        </div>
    )
}
