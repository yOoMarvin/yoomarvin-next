import Link from 'next/link'

export default function HomeButton() {
    return (
        <a href="/">
            <span className="sr-only">Home</span>
            <div className="flex h-10 w-10 flex-row items-center justify-center rounded-xl bg-neutrals-100 bg-opacity-80 text-lg font-bold text-text-primary transition">
                M
            </div>
        </a>
    )
}
