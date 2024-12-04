import Image from 'next/image'
import Link from 'next/link'
import Companies from '../components/Companies'
import PromotionButton from 'src/components/PromotionButton'
import { ArrowUpRightIcon } from '@heroicons/react/24/solid'

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
                            src="/bento/work-min.JPG"
                            fill
                            sizes="(max-width: 768px) 213px, 33vw"
                            priority
                            className="rounded-lg object-cover"
                        />
                    </div>
                    <div className="relative row-span-1 sm:row-span-2">
                        <Image
                            src="/bento/profile-min.jpg"
                            fill
                            sizes="(max-width: 768px) 213px, 33vw"
                            priority
                            className="rounded-lg object-cover object-top sm:object-center"
                        />
                    </div>
                    <div className="relative">
                        <Image
                            src="/bento/desk-min.jpg"
                            fill
                            sizes="(max-width: 768px) 213px, 33vw"
                            priority
                            className="rounded-lg object-cover"
                        />
                    </div>
                    <div className="relative row-span-2">
                        <Image
                            src="/bento/laptop-min.jpg"
                            fill
                            sizes="(max-width: 768px) 213px, 33vw"
                            priority
                            className="rounded-lg object-cover sm:object-center"
                        />
                    </div>
                    <div className="relative row-span-2">
                        <Image
                            src="/bento/lbs-min.jpg"
                            fill
                            sizes="(max-width: 768px) 213px, 33vw"
                            priority
                            className="rounded-lg object-cover"
                        />
                    </div>
                    <div className="relative h-40">
                        <Image
                            src="/bento/memfam-min.jpeg"
                            fill
                            sizes="(max-width: 768px) 213px, 33vw"
                            priority
                            className="rounded-lg object-cover object-bottom"
                        />
                    </div>
                </div>
            </section>

            <section className="flex flex-col space-y-8">
                <p>
                    I love working in the realm between design and code. Some
                    things that make me excited are CSS, interaction design,
                    Javascript and making interfaces feel fun and human.
                </p>

                <Link href="/about" className="btn btn--filled w-fit">
                    More about me
                </Link>
                <p>
                    Currenly I'm designing & building interfaces for the iOS app
                    of{' '}
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

            {/* Promotion Buttons */}
            <section>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <PromotionButton
                        title="@yoomarvin"
                        src="/linkedin.png"
                        alt="Marvin Messenzehl's Profilbild"
                        detail="7.000 subscribers"
                        href="https://www.linkedin.com/in/marvin-messenzehl/"
                    />
                    <PromotionButton
                        title="@memorisely"
                        src="memorisely-logo.svg"
                        alt="Memorisely Logo"
                        detail="Learn UX • UI Design"
                        href="https://memorisely.com"
                    />
                </div>
            </section>

            <section>
                <p className="mb-8">
                    In the past years, I've written content on my blog and
                    newsletter. I try to keep things simple. You'll find writing
                    about design and technologies I'm interested in at the time,
                    or how I'm learning and growing in my career, sharing
                    knowledge along the way.
                </p>
                <div className="grid grid-cols-1 gap-4">
                    <PromotionButton
                        title="Your intelligence becomes artificial"
                        detail="December 2024"
                        href="/blog/intelligence"
                    />
                    <PromotionButton
                        title="My first experiences on twitch"
                        detail="June 2024"
                        href="/blog/twitch"
                    />
                    <PromotionButton
                        title="Book Bites November 2024"
                        detail="November 2024"
                        href="/blog/books-nov-2024"
                    />
                    <PromotionButton
                        Button
                        title="2023 My year in review"
                        detail="December 2023"
                        href="/blog/2023-review"
                    />
                </div>
            </section>

            <section>
                <p className="mb-8">
                    I’m also sharing a weekly newsletter & share bitesized
                    design knowledge on Instagram and LinkedIn
                </p>
                <div className="flex flex-row space-x-4">
                    <Link
                        className="flex flex-row items-center space-x-2 text-onBackground-low transition-all duration-300 ease-in-out hover:text-onBackground-high"
                        href="https://world.hey.com/mrvn"
                        target="_blank"
                    >
                        <ArrowUpRightIcon className="h-4 w-4" />
                        <span>Get email updates</span>
                    </Link>
                    <Link
                        className="flex flex-row items-center space-x-2 text-onBackground-low transition-all duration-300 ease-in-out hover:text-onBackground-high"
                        href="https://www.linkedin.com/in/marvin-messenzehl/"
                        target="_blank"
                    >
                        <ArrowUpRightIcon className="h-4 w-4" />
                        <span>Follow me</span>
                    </Link>
                </div>
            </section>
        </>
    )
}
