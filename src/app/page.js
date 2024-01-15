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
                    <div className="flex flex-col space-y-4 text-lg text-text-secondary">
                        <p>
                            I love working in the realm between design and code.
                            Some things that make me excited are CSS,
                            interaction design, Javascript and making interfaces
                            feel fun and human.
                        </p>
                        <p>
                            Currenly I'm designing & building interfaces for the
                            podcast app of{' '}
                            <Link
                                className="link-basic"
                                href="https://plus.rtl.de"
                                target="_blank"
                            >
                                RTL +
                            </Link>
                            . Besides that I'm teaching UX and UI design at{' '}
                            <Link
                                href="https://memorisely.com"
                                target="_blank"
                                className="link-basic"
                            >
                                Memorisely.
                            </Link>
                        </p>
                    </div>
                </div>
                <Link type="button" href="/about" className="btn btn--filled">
                    More about me
                </Link>
            </section>

            {/* Companies */}
            <section>
                <Companies />
            </section>

            {/* In the Spotlight */}
            {/* <section>
                <h1 className="mb-8 text-2xl font-bold">In the Spotlight.</h1>
            </section> */}
        </>
    )
}
