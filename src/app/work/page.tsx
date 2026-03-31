import type { Metadata } from 'next'
import { getWorkItems, groupWorkSections } from '@/lib/notion/work'
import { ProjectGridSection } from '@/components/work/project-grid-section'
import { PersonalProjectItem } from '@/components/work/personal-project-item'
import { WorkRow } from '@/components/ui/work-row'
import { SectionHeader } from '@/components/ui/section-header'
import { getWorkItemHref } from '@/lib/utils'

export const metadata: Metadata = {
    title: 'Work',
}

export default async function WorkPage() {
    const items = await getWorkItems()
    const sections = groupWorkSections(items)

    return (
        <>
            <h1 className="text-3xl leading-[1.2] font-bold -tracking-[0.64px] md:text-4xl lg:text-[2.5rem] text-[var(--text-primary)]">
                Work
            </h1>

            <div className="space-y-16 sm:space-y-24">
                {sections.Personal.length > 0 && (
                    <section className="space-y-4">
                        <SectionHeader label="Personal Projects" />
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            {sections.Personal.map((item) => (
                                <PersonalProjectItem
                                    key={item.id}
                                    item={item}
                                />
                            ))}
                        </div>
                    </section>
                )}

                <ProjectGridSection
                    label="In House Projects"
                    items={sections.Inhouse}
                />
                <ProjectGridSection
                    label="Freelance Work"
                    items={sections.Freelance}
                />

                {sections.Others.length > 0 && (
                    <section className="space-y-4">
                        <SectionHeader label="Utilities & Everything Else" />
                        <div className="flex flex-col gap-4 sm:gap-1.5">
                            {sections.Others.map((item) => (
                                <WorkRow
                                    key={item.id}
                                    title={item.title}
                                    description={item.excerpt}
                                    href={getWorkItemHref(item)}
                                    icon={item.icon || undefined}
                                    showExternalIndicator={false}
                                />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </>
    )
}
