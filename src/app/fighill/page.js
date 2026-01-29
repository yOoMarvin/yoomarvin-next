import Image from 'next/image'
import Link from 'next/link'

export default function FigHillManualPage() {
    return (
        <>
            <h1 className="section__title">
                Fighill. Design progress. Made visible
            </h1>

            <section>
                <h2 className="section__subtitle">About</h2>
                <p className="mb-8 text-onBackground-medium">
                    Fighill is a Figma widget that helps teams track progress
                    using hill charts—a more intuitive way to visualize where
                    work stands, beyond just checking off to-dos.
                    <br /> <br />
                    Inspired by{' '}
                    <Link
                        href="https://basecamp.com/hill-charts"
                        className="link-basic"
                        target="_blank"
                    >
                        Basecamp&apos;s Hill Charts
                    </Link>
                    , Fighill helps you see whether you&apos;re still figuring
                    things out or confidently making it happen.
                </p>
                <div
                    className="mb-12 rounded-2xl"
                    style={{
                        position: 'relative',
                        paddingBottom: '56.39894086496028%',
                        height: 0,
                    }}
                >
                    <iframe
                        src="https://www.loom.com/embed/c0276d9567514a1ca8083e1d47956875?sid=5253009a-4241-4959-ac45-7cba06c0685d"
                        webkitAllowFullScreen
                        mozAllowFullScreen
                        allowFullScreen
                        className="rounded-lg"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                        }}
                    ></iframe>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:flex sm:flex-row">
                    <Link
                        className="btn btn--filled"
                        href="https://www.figma.com/community/widget/1466711393588945290"
                        target="_blank"
                    >
                        Try it out
                    </Link>
                    <Link
                        href="mailto:hello@marvinmessenzehl.com"
                        className="btn btn--outlined"
                    >
                        Send feedback
                    </Link>
                </div>
            </section>

            <section>
                <h2 className="section__subtitle">Getting started</h2>
                <ol className="list-inside list-decimal space-y-6 text-onBackground-medium">
                    <li>
                        <strong>Add the Widget</strong>
                        <ul className="list-inside list-disc">
                            <li>
                                Open Figma, go to the{' '}
                                <Link
                                    href="https://www.figma.com/community/widget/1466711393588945290"
                                    target="_blank"
                                    className="link-basic"
                                >
                                    Community tab
                                </Link>
                                , and add Fighill to your file.
                            </li>
                        </ul>
                    </li>
                    <li>
                        <strong>Create Tasks</strong>
                        <ul className="list-inside list-disc">
                            <li>
                                Click &quot;Add a to-do&quot; to create your
                                first task.
                            </li>
                            <li>
                                New tasks start on the left side (Figuring
                                Things Out).
                            </li>
                        </ul>
                    </li>
                    <li>
                        <strong>Move Tasks as You Progress</strong>
                        <p className="">
                            You can update a task&apos;s position in two ways:
                        </p>
                        <ul className="list-inside list-disc">
                            <li>
                                Click the task dot on the hill and drag it to
                                the right spot.
                            </li>
                            <li>
                                Click the task name in the list, then select its
                                new position on the hill.
                            </li>
                        </ul>
                    </li>
                </ol>
            </section>

            <section>
                <h2 className="section__subtitle">Task States</h2>
                <p className="mb-4 text-onBackground-medium">
                    Fighill visually represents work at every stage:
                </p>
                <ul className=" list-inside space-y-2 text-onBackground-medium">
                    <li>🟦 Not Started → Empty checkbox</li>
                    <li>↗️ Figuring Things Out → Climbing the hill</li>
                    <li>↘️ Making It Happen → Moving downhill</li>
                    <li>✅ Completed → Green checkmark</li>
                </ul>
            </section>

            <section>
                <h2 className="section__subtitle">Tips for Teams</h2>
                <ul className="list-inside list-disc space-y-2 text-onBackground-medium">
                    <li>
                        Use Fighill for projects where discovery is just as
                        important as execution.
                    </li>
                    <li>Move tasks up the hill as you figure them out.</li>
                    <li>
                        Once the approach is clear, move tasks past the peak to
                        execution.
                    </li>
                    <li>
                        Tasks near the bottom of the downhill side are almost
                        done.
                    </li>
                    <li>
                        Mark them complete once they&apos;re fully finished.
                    </li>
                </ul>
            </section>

            <section>
                <h2 className="section__subtitle">Why Use Hill Charts?</h2>
                <ul className="list-inside space-y-2 text-onBackground-medium">
                    <li>
                        💡 <strong>Better Progress Visualization</strong> – See
                        where tasks really stand, beyond just &quot;done&quot;
                        or &quot;not done.&quot;
                    </li>
                    <li>
                        🛠 <strong>Highlight Uncertainty</strong> – Know which
                        tasks still need figuring out.
                    </li>
                    <li>
                        📈 <strong>Track Both Planning & Execution</strong> –
                        Acknowledge the full creative process.
                    </li>
                    <li>
                        ⚡ <strong>Simple Updates</strong> – Move tasks with a
                        click or drag.
                    </li>
                    <li>
                        👀 <strong>Clear Overview</strong> – See all tasks and
                        their states at a glance.
                    </li>
                </ul>
            </section>

            <section>
                <Image
                    src="/fighill-cover.png"
                    alt="FigHill Manual"
                    width={1000}
                    height={1000}
                    className="rounded-2xl"
                />
            </section>
        </>
    )
}
