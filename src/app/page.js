import Image from 'next/image'
import Link from 'next/link'
import Companies from '../components/Companies'

export default function Homepage() {
    return (
        <>
            <section className="mb-4">
                <h1 className="mb-2 text-2xl">Hi, I'm Marvin.</h1>
                <h2 className="mb-8 text-2xl font-bold">
                    I help companies design, build and launch world-class
                    digital products.
                </h2>
                <div className="flex flex-col space-y-4 text-lg text-onBackground-medium"></div>
                {/* Bento Grid */}
                <div className="my-8 grid grid-cols-2 grid-rows-4 gap-4 sm:grid-cols-3 sm:grid-rows-3">
                    <div className="relative h-40">
                        <Image
                            src="/bento/profile.png"
                            fill
                            sizes="(max-width: 768px) 213px, 33vw"
                            priority
                            className="rounded-lg object-cover"
                        />
                    </div>
                    <div className="relative row-span-1 sm:row-span-2">
                        <Image
                            src="/about-me-min.png"
                            fill
                            sizes="(max-width: 768px) 213px, 33vw"
                            priority
                            className="rounded-lg object-cover object-top sm:object-center"
                        />
                    </div>
                    <div className="relative">
                        <Image
                            src="/about-me-min.png"
                            fill
                            sizes="(max-width: 768px) 213px, 33vw"
                            priority
                            className="rounded-lg object-cover"
                        />
                    </div>
                    <div className="relative row-span-2">
                        <Image
                            src="/about-me-min.png"
                            fill
                            sizes="(max-width: 768px) 213px, 33vw"
                            priority
                            className="rounded-lg object-cover sm:object-center"
                        />
                    </div>
                    <div className="relative row-span-2">
                        <Image
                            src="/about-me-min.png"
                            fill
                            sizes="(max-width: 768px) 213px, 33vw"
                            priority
                            className="rounded-lg object-cover"
                        />
                    </div>
                    <div className="relative h-40">
                        <Image
                            src="/about-me-min.png"
                            fill
                            sizes="(max-width: 768px) 213px, 33vw"
                            priority
                            className="rounded-lg object-cover"
                        />
                    </div>
                </div>
            </section>

            <section className="flex flex-col space-y-4">
                <p>
                    I love working in the realm between design and code. Some
                    things that make me excited are CSS, interaction design,
                    Javascript and making interfaces feel fun and human.
                </p>

                <Link href="/about" className="btn btn--filled w-fit">
                    More about me
                </Link>
                <p>
                    Currenly I'm designing & building interfaces for the podcast
                    app of{' '}
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
            </section>

            {/* Social Buttons */}

            {/* In the Spotlight */}
            {/* <section>
                <h1 className="mb-8 text-2xl font-bold">In the Spotlight.</h1>
            </section> */}
        </>
    )
}
