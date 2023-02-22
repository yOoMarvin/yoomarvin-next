export default function Homepage() {
    return (
        <section>
            <h1 className="mb-2 text-2xl">Hi, I'm Marvin.</h1>
            <h2 className="mb-4 text-2xl font-bold">
                I help companies define, design and launch world-class digital
                products.
            </h2>
            <div className="mb-8 text-text-secondary">
                <p className="mb-4">
                    Before I left for the world of freelancers & designers, I
                    did my master's degree in business informatics at the{' '}
                    <a
                        className="link-basic"
                        href="https://www.uni-mannheim.de/"
                        target="_blank"
                    >
                        University of Mannheim
                    </a>{' '}
                    and wrote my thesis on digital behavioral psychology in the
                    insurance environment.
                </p>
                <p className="mb-4">
                    Besides that, I also built up the{' '}
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
                <p>
                    Since I'm currently in the process of building this place,
                    feel free to reach out to me on LinkedIn or via Mail. You
                    can also check out some of my past work at my{' '}
                    <a
                        href="https://marvinmessenzehl.super.site/"
                        target="_blank"
                        className="link-basic"
                    >
                        Portfolio
                    </a>{' '}
                    site
                </p>
            </div>
            <div className="flex flex-row space-x-4">
                <a
                    href="https://www.linkedin.com/in/marvin-messenzehl/"
                    target="_blank"
                    className="transition-base rounded-2xl bg-action-primary px-5 py-4 font-bold text-text-action hover:bg-action-secondary"
                >
                    LinkedIn
                </a>
                <a
                    href="mailto:hello@marvinmessenzehl.com"
                    className="transition-base bg-neutrals-defualt rounded-2xl border border-action-primary px-5 py-4 font-bold text-text-primary hover:border-action-secondary hover:bg-neutrals-100"
                >
                    Slide in my inbox
                </a>
            </div>
        </section>
    )
}
