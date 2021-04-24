import Link from 'next/link'
import { CenteredColumn } from '../components/Layouts'
import Page, { PageHeader } from '../components/Page'

export default function Home() {
    return (
        <Page>
            <CenteredColumn>
                <div className="flex flex-col space-y-24">
                    <div className="flex flex-col space-y-8 md:items-center">
                        <PageHeader
                            title="Hey, I’m Marvin"
                            subtitle="I’m a product designer, podcaster, and writer, living in Mannheim, Germany. I’m currently helping founders and startups optimizing their digital products and design."
                        />

                        <div className="flex flex-col space-y-2 md:space-x-4 md:flex-row md:space-y-0 md:items-center md:justify-center">
                            <Link
                                href="/https://www.linkedin.com/in/marvin-messenzehl"
                                passHref
                            >
                                <a>
                                    <button className="w-full text-lg btn btn-primary btn-large">
                                        More about me
                                    </button>
                                </a>
                            </Link>
                            <a
                                href="https://twitter.com/yoomarvin"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <button className="w-full text-lg btn btn-large">
                                    Follow me on Twitter
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </CenteredColumn>
        </Page>
    )
}
