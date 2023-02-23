export default function Job(props) {
    return (
        <div className="mb-4 flex w-full flex-row justify-between">
            <div class="flex flex-row space-x-2">
                <div className="h-11 w-11 rounded-full bg-neutrals-100" />
                <div>
                    <p>{props.title}</p>
                    <p className="text-sm text-text-secondary">
                        {props.description}
                    </p>
                </div>
            </div>
            <p className=" text-text-secondary">{props.time}</p>
        </div>
    )
}
