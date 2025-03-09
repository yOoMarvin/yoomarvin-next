import {
    ArrowTrendingUpIcon,
    ArrowUpRightIcon,
    MagnifyingGlassIcon,
    RocketLaunchIcon,
} from '@heroicons/react/24/outline'
import { BoltIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import Service from 'src/components/Testimonial'
import Testimonial from 'src/components/Testimonial'

const selectedProjects = [
    {
        title: 'RTL+ tvOS Relaunch 2025',
        href: 'https://marvinmessenzehl.super.site/other-projects/rtl-tvos-relaunch',
        img: '/app-icons/rtl-icon.png',
        description: 'Leading the design of a new tvOS app for RTL+.',
    },
    {
        title: 'Fighill',
        href: 'https://marvinmessenzehl.super.site/case-studies/fighill',
        img: '/app-icons/fighill.png',
        description:
            'Making design progress visible with my first Figma widget.',
    },
    {
        title: 'Basecamp Mobile To-dos',
        href: 'https://marvinmessenzehl.super.site/case-studies/basecamp-mobile',
        img: '/app-icons/basecamp-icon.png',
        description: 'A conceptual case study to redesign mobile to-dos.',
    },
]

export default function WorkPage() {
    return (
        <>
            <h1 className="section__title">Work</h1>
            <section>
                <div className="flex flex-row items-baseline justify-between">
                    <h2 className="section__subtitle">Selected Projects</h2>

                    <Link
                        href="https://marvinmessenzehl.super.site/"
                        target="_blank"
                        className="transition-base flex flex-row items-center space-x-1 text-sm font-medium text-ui-highlight hover:text-ui-high"
                    >
                        <span>Visit Portfolio</span>
                        <ArrowUpRightIcon className="h-4 w-4" />
                    </Link>
                </div>
                <p className="mb-8 text-onBackground-medium">
                    Here, you'll find my favorite projects and in-depth case
                    studies.
                </p>

                <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                    {selectedProjects.map((el) => (
                        <Link
                            key={el.title}
                            className="transition-base rounded-2xl bg-ui-low p-4 hover:bg-ui-neutral"
                            href={el.href}
                            target="_blank"
                        >
                            <div className="mb-8 h-12 w-12 rounded-full border border-ui-neutral p-1.5">
                                <img
                                    src={el.img}
                                    className="h-full w-full rounded-full object-cover"
                                />
                            </div>
                            <h4 className="mb-4 font-bold">{el.title}</h4>
                            <p className="text-sm text-onBackground-medium">
                                {el.description}
                            </p>
                        </Link>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="section__title">Services</h2>
                <p className="mb-8 text-onBackground-medium">
                    Reimagine the norm. As a one-man band (dogs aside!), no
                    agency overhead - just direct, personal service. All your
                    pennies go straight to work, no surprises. Now, let's dive
                    into how I can serve you.
                </p>
                {/* SERVICES */}
                <div className="mb-8 flex w-full flex-col space-y-8">
                    <div>
                        <div className="mb-1 flex flex-row items-center space-x-2">
                            <MagnifyingGlassIcon className="text-text-primary h-5 w-5" />
                            <h4 className="text-lg font-bold">Crits</h4>
                        </div>
                        <p className="text-sm text-onBackground-medium">
                            Let's pinpoint your product's strengths and
                            weaknesses together and uncover the steps to take
                            your user experience from good to outstanding.
                        </p>
                    </div>
                    <div>
                        <div className="mb-1 flex flex-row items-center space-x-2">
                            <RocketLaunchIcon className="text-text-primary h-5 w-5" />
                            <h4 className="text-lg font-bold">
                                Hands-on Product Design
                            </h4>
                        </div>
                        <p className="text-sm text-onBackground-medium">
                            ogether, we can shape your vision into a
                            user-friendly, captivating product that not only
                            looks great but also feels natural and intuitive to
                            your users.
                        </p>
                    </div>
                    <div>
                        <div className="mb-1 flex flex-row items-center space-x-2">
                            <ArrowTrendingUpIcon className="text-text-primary h-5 w-5" />
                            <h4 className="text-lg font-bold">
                                Product Advisory
                            </h4>
                        </div>
                        <p className="text-sm text-onBackground-medium">
                            I'm here to offer tailored, strategic advice that
                            will help steer your product design journey towards
                            success, making the most out of industry insights
                            and best practices.
                        </p>
                    </div>
                </div>
                <Link
                    type="button"
                    href="mailto:hello@marvinmessenzehl.com"
                    className="btn btn--filled"
                >
                    Slide in my inbox
                </Link>
            </section>

            <section>
                <Testimonial
                    src="/daniel.jpeg"
                    alt="Daniel Szymkowiak"
                    quote={[
                        'Marvin combines different fields of expertise including development, design, and leadership which makes him a valuable team member for any project. His great and positive mindset boosts productivity and makes goals reachable that I thought would have never been.',
                        'I am glad to have been working with Marvin and I am looking forward to any further collaborations!',
                    ]}
                    name="Daniel Szymkowiak"
                    role="Co-Founder Future Next"
                />
                <Link
                    type="button"
                    href="/work/working-with-marvin"
                    className="btn btn--outlined mt-8"
                >
                    Working with Marvin
                </Link>
            </section>
        </>
    )
}
