export default function Job(props) {
    return (
        <div className="mb-8 flex w-full flex-row items-start justify-between">
            <div class="flex flex-row space-x-2">
                <div className="h-11 w-11 rounded-full bg-neutrals-100" />
                <div>
                    <p className="font-bold">{props.title}</p>
                    <p className="max-w-xl text-text-secondary">
                        {props.description}
                    </p>
                </div>
            </div>
            <p className=" text-text-primary">{props.time}</p>
        </div>
    )
}
