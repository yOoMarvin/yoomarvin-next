import Image from 'next/image'
import Link from 'next/link'
import Companies from '../components/Companies'

export default function Homepage() {
    return (
        <>
            <section>
                {/* <Image
                src={'/avatar.png'}
                width={96}
                height={96}
                className="mb-8"
            /> */}
                <div className="mb-8">
                    <h1 className="mb-2 text-2xl">Hi, I'm Marvin.</h1>
                    <h2 className="mb-8 text-2xl font-bold">
                        I help companies design, build and launch world-class
                        digital products.
                    </h2>
                    <p className="text-lg text-text-secondary">
                        I should write a bit more stuff about myself here
                    </p>
                </div>
                <Link type="button" href="/about" className="btn btn--filled">
                    More about me
                </Link>
            </section>
            <section>
                <Companies />
            </section>
        </>
    )
}
