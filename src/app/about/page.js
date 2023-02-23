import Image from 'next/image'
import Link from 'next/link'
import Placeholder from '../../components/Placeholder'

export default function AboutPage() {
    return (
        <>
            <section className="mb-12">
                <h1 className="mb-4 text-2xl font-bold">About me</h1>

                <div class="text-text-secondary">
                    <p className="mb-4">
                        Before I left for the world of design and development, I
                        did my master's degree in business informatics at the{' '}
                        <a
                            className="link-basic"
                            href="https://www.uni-mannheim.de/"
                            target="_blank"
                        >
                            University of Mannheim
                        </a>{' '}
                    </p>
                    <p className="mb-4">
                        In parallel, I also built up the{' '}
                        <a
                            href="https://www.sv-informatik.de/content/unternehmen/it-lab/"
                            target="_blank"
                            className="link-basic"
                        >
                            Innovation Lab of SV Informatik
                        </a>{' '}
                        and managed it for several years. Here we worked with a
                        small team on new technology trends in the insurtech
                        industry and developed a variety of digital products.
                    </p>
                    <p className="mb-4">
                        Afterwards, I focused on designing and developing
                        interfaces and have been supporting great companies and
                        projects for some time now as a freelancer.
                    </p>
                    <p className="mb-4">
                        I love working in the realm between design and code.
                        Some things that make me excited are CSS, Interaction
                        design, Javascript and making interfaces feel fun and
                        human.
                    </p>
                    <p className="mb-4">
                        Besides working on products, I teach the next generation
                        of designers in the form of online UX / UI bootcamps
                        together with{' '}
                        <Link
                            href="https://memorisely.com"
                            target="_blank"
                            className="link-basic"
                        >
                            Memorisely
                        </Link>
                        . We also create{' '}
                        <Link
                            href="https://www.instagram.com/memorisely/"
                            target="_blank"
                            className="link-basic"
                        >
                            bitesizes design knowledge
                        </Link>{' '}
                        in the form of short videos.
                    </p>
                    <p className="mb-4">
                        Outside of work I’m obsessed with endurance sports and
                        spending time outside with my family and friends.
                    </p>
                </div>
                <div class="h-64 w-full sm:h-96">
                    <Image
                        src={'/about-me-min.png'}
                        width={800}
                        height={585}
                        alt="Author of the website standing in front of a whiteboard and thinking"
                        className="h-full w-full rounded-2xl object-cover object-top grayscale-0 filter"
                    />
                </div>
            </section>
            <section className="mb-12">
                <h2 className="mb-4 text-2xl  font-bold">Connect</h2>
                <div className="grid grid-cols-1 gap-4 sm:flex sm:flex-row">
                    <Link
                        type="button"
                        href="mailto:hello@marvinmessenzehl.com"
                        className="btn btn--filled"
                    >
                        Slide in my inbox
                    </Link>
                    <Link
                        type="button"
                        href="https://www.linkedin.com/in/marvin-messenzehl/"
                        className="btn btn--outlined"
                        target="_blank"
                    >
                        LinkedIn
                    </Link>
                    <Link
                        type="button"
                        href="https://instagram.com/yoomarvin"
                        className="btn btn--outlined"
                        target="blank"
                    >
                        Instagram
                    </Link>
                    <Link
                        type="button"
                        href="https://twitter.com/yoomarvin"
                        className="btn btn--outlined"
                        target="blank"
                    >
                        Twitter
                    </Link>
                </div>
            </section>
            <section className="mb-12">
                <h2 className="mb-4 text-2xl  font-bold">Experience</h2>
            </section>
        </>
    )
}
