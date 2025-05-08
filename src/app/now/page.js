export default function NowPage() {
    return (
        <>
            <h1 className="section__title">Now</h1>
            
            <section>
                {/* Update this timestamp when the content changes */}
                <p className="mb-8 text-sm text-onBackground-low">
                    Last updated: May 8, 2025
                </p>
                
                <h2 className="section__subtitle mb-8">What I'm focused on right now</h2>
                
                <div className="space-y-8 text-onBackground-medium">
                    <div>
                        <p className="mb-2">
                            <span className="mr-2">💻</span>
                            <strong>Building RTL+ iOS Apps</strong>
                        </p>
                        <p>
                            Developing new features and establishing a technical foundation for RTL+ iOS applications, focusing on creating seamless user experiences for millions of users.
                        </p>
                    </div>
                    
                    <div>
                        <p className="mb-2">
                            <span className="mr-2">📚</span>
                            <strong>Design Engineering Courses</strong>
                        </p>
                        <p>
                            Creating comprehensive Design Engineering courses for Memorisely, bridging the gap between design and development for the next generation of designers.
                        </p>
                    </div>
                    
                    <div>
                        <p className="mb-2">
                            <span className="mr-2">🤖</span>
                            <strong>AI Prototyping</strong>
                        </p>
                        <p>
                            Enhancing my AI prototyping skills to explore new possibilities at the intersection of design, development, and artificial intelligence.
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
}
