import Image from 'next/image'
import Link from 'next/link'
import Appearance from '../../components/Appearance'
import Job from '../../components/Job'

export default function AboutPage() {
    return (
        <>
            <section className="mb-16">
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
                            bitesized design knowledge
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
            <section className="mb-16">
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
            <section className="mb-16">
                <h2 className="mb-4 text-2xl  font-bold">Experience</h2>
                <div>
                    <Job
                        title="UX / UI Teacher at Memorisely"
                        time="2022-today"
                        description="Teaching the next generation of designers in interactive and remote live classes."
                        src="/memorisely-logo.svg"
                    />
                    <Job
                        title="Freelance Product Designer"
                        time="2021-today"
                        description="Helping companies to design, build and launch world-class products. Such as ONVY, Enduco, Notch, RTL+ and many more."
                        src="/freelance-logo.svg"
                    />
                    <Job
                        title="Innovation Lab Lead at SV Informatik"
                        time="2016-2021"
                        description="After building the first concept, I've took over as a lead of the inhouse innovation lab in 2019 to design and build several apps in the realm of insurtech."
                        src="/itlab-logo.svg"
                    />
                    <Job
                        title="Software Engineer at SV Informatik"
                        time="2013-2016"
                        description="Development of a series of webapps with smaller utility purposes."
                        src="/sv-logo.svg"
                    />
                </div>
            </section>
            <section className="mb-16">
                <h2 className="mb-4 text-2xl  font-bold">Appearances</h2>
                <div className="flex flex-col space-y-4">
                    <Appearance
                        href="https://www.youtube.com/watch?v=FfhjolsHIBY&t=363s&ab_channel=yasoon"
                        title="Dev & Donuts Keynote"
                        date="Jan '23"
                    />
                    <Appearance
                        href="https://www.youtube.com/watch?v=g77e9fYGWKI&t=2s&ab_channel=SSSDECA"
                        title="Behind the Hustle Podcast"
                        date="Nov '22"
                    />
                    <Appearance
                        href="https://open.spotify.com/episode/6IOrTtcboauY5K6a4Ff7yb?si=59269495327a4004"
                        title="IT-Lab Insurtech Podcast"
                        date="Jul '22"
                    />
                    <Appearance
                        href="https://www.thinc.de/thincubator"
                        title="Thincubator Mentor"
                        date="Apr '22"
                    />
                    <Appearance
                        href="https://blog.memorisely.com/article/marvin-messenzehl"
                        title="Memorisely Unmute Blog"
                        date="Mar '22"
                    />
                    <Appearance
                        href="https://open.spotify.com/episode/0gWOCyhUxqCIkxAeor2p6G?si=27aa62a29e104386"
                        title="Stacking Snacks Podcast"
                        date="Nov '21"
                    />
                    <Appearance
                        href="https://www.youtube.com/watch?v=xQJQt6wnd-w"
                        title="Symbioticon Hackathon 1st place"
                        date="Oct '19"
                    />
                    <Appearance title="TEDx Uni Mannheim" date="Oct ' 19" />
                </div>
            </section>
        </>
    )
}
