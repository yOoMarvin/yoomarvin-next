import Link from 'next/link'

export default function HomeButton() {
    return (
        <a href="/">
            <span className="sr-only">Home</span>
            <div className="flex h-10 w-10 flex-row items-center justify-center rounded-xl bg-ui-neutral text-lg font-bold text-onUi-high transition hover:bg-ui-medium">
                M
            </div>
        </a>
    )
}
