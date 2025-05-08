export default function NowPage() {
    return (
        <>
            <h1 className="section__title">Now</h1>
            
            <section>
                <p className="mb-8 text-onBackground-medium">
                    What I'm focused on right now:
                </p>
                
                <ul className="list-inside space-y-2 text-onBackground-medium">
                    <li>
                        💻 <strong>Building new features and a technical base for RTL+ iOS apps</strong>
                    </li>
                    <li>
                        📚 <strong>Building Design Engineering Courses for Memorisely</strong>
                    </li>
                    <li>
                        🤖 <strong>Working on my AI prototyping skills</strong>
                    </li>
                </ul>
                
                {/* Update this timestamp when the content changes */}
                <p className="mt-12 text-sm text-onBackground-low">
                    Last updated: May 8, 2025
                </p>
            </section>
        </>
    )
}
