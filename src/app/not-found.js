import Link from 'next/link'

export default function NotFound() {
    return (
        <div>
            <h1 className="section__title">Page not found</h1>
            <p>
                Either you made a typo or Marvin forgot to set up the link (more
                likely).
            </p>
            <p>
                Go{' '}
                <Link className="link-basic" href="/">
                    back home
                </Link>
            </p>
        </div>
    )
}
