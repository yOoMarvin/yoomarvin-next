import { ArrowUpRightIcon } from '@heroicons/react/24/outline'
import { BoltIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import Service from 'src/components/Testimonial'
import Testimonial from 'src/components/Testimonial'

const selectedProjects = [
    {
        title: 'Basecamp Mobile To-dos',
        href: '/work',
        img: 'https://play-lh.googleusercontent.com/Kzl0tRihUiiaX2H3a_zb8iQMTKfEuG-MZr3yx4E90-vTRBKfgUQM8bVmd6r7oAHAIQ',
        description: 'A conceptual case studies to redesign mobile to-dos.',
    },
    {
        title: 'UOK Wellbeing',
        href: '/work',
        img: 'https://play-lh.googleusercontent.com/Kzl0tRihUiiaX2H3a_zb8iQMTKfEuG-MZr3yx4E90-vTRBKfgUQM8bVmd6r7oAHAIQ',
        description: 'Designing a mobile wellbeing app for students.',
    },
    {
        title: 'Enduco Design System',
        href: '/work',
        img: 'https://play-lh.googleusercontent.com/Kzl0tRihUiiaX2H3a_zb8iQMTKfEuG-MZr3yx4E90-vTRBKfgUQM8bVmd6r7oAHAIQ',
        description: 'Relaunching a scalable design system for a startup.',
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
                        href="/work"
                        target={'_blank'}
                        className="transition-base flex flex-row items-center space-x-1 text-sm font-medium text-text-secondary hover:text-text-primary"
                    >
                        <span>Visit Portfolio</span>
                        <ArrowUpRightIcon className="h-4 w-4" />
                    </Link>
                </div>
                <p className="mb-8 text-text-secondary">
                    I should add some text here to explain a bit what these case
                    studies are
                </p>

                <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                    {selectedProjects.map((el) => (
                        <Link
                            key={el.title}
                            className="transition-base rounded-2xl bg-neutrals-50 p-4 hover:bg-neutrals-100"
                            href={el.href}
                        >
                            <div className="mb-8 h-12 w-12 rounded-full border border-neutrals-100 p-2">
                                <img
                                    src={el.img}
                                    className="h-full w-full rounded-full object-cover"
                                />
                            </div>
                            <h4 className="mb-4 font-bold">{el.title}</h4>
                            <p className="text-sm text-text-secondary">
                                {el.description}
                            </p>
                        </Link>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="section__subtitle">Services</h2>
                <p className="mb-8 text-text-secondary">
                    I should add some text here to explain a bit what these case
                    studies are.
                </p>
                {/* SERVICES */}
                <div className="mb-8 flex w-full flex-col space-y-8">
                    <div>
                        <div className="mb-1 flex flex-row items-center space-x-2">
                            <BoltIcon className="h-5 w-5 text-text-primary" />
                            <h4 className="text-lg font-bold">Title</h4>
                        </div>
                        <p className="text-sm text-text-secondary">
                            I'll add a short description about the service here.
                            It won't get too long, just a few lines of text.
                        </p>
                    </div>
                    <div>
                        <div className="mb-1 flex flex-row items-center space-x-2">
                            <BoltIcon className="h-5 w-5 text-text-primary" />
                            <h4 className="text-lg font-bold">Title</h4>
                        </div>
                        <p className="text-sm text-text-secondary">
                            I'll add a short description about the service here.
                            It won't get too long, just a few lines of text.
                        </p>
                    </div>
                    <div>
                        <div className="mb-1 flex flex-row items-center space-x-2">
                            <BoltIcon className="h-5 w-5 text-text-primary" />
                            <h4 className="text-lg font-bold">Title</h4>
                        </div>
                        <p className="text-sm text-text-secondary">
                            I'll add a short description about the service here.
                            It won't get too long, just a few lines of text.
                        </p>
                    </div>
                </div>
                <Link
                    type="button"
                    href="mailto:hello@marvinmessenzehl.com"
                    className="btn btn--filled"
                >
                    Contact me
                </Link>
            </section>

            <section>
                <Testimonial />
            </section>
        </>
    )
}
