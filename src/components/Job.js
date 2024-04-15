import Image from 'next/image'

export default function Job(props) {
    return (
        <div className="mb-8 flex w-full flex-row items-start justify-between">
            <div class="flex flex-row items-start space-x-4">
                <Image
                    src={props.src}
                    width={48}
                    height={48}
                    className="rounded-full border border-ui-neutral"
                />
                <div>
                    <p className="font-bold">{props.title}</p>
                    <p className="text-onBackground-highj sm:hidden">
                        {props.time}
                    </p>
                    <p className="max-w-xl text-onBackground-medium">
                        {props.description}
                    </p>
                </div>
            </div>
            <p className="hidden text-onBackground-high sm:block">
                {props.time}
            </p>
        </div>
    )
}
