import { ProjectCard } from './project-card'
import { SectionHeader } from '@/components/ui/section-header'
import type { WorkMeta } from '@/lib/notion/types'

interface ProjectGridSectionProps {
    label: string
    items: WorkMeta[]
}

export function ProjectGridSection({ label, items }: ProjectGridSectionProps) {
    if (!items.length) return null

    return (
        <section className="space-y-4">
            <SectionHeader label={label} />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {items.map((item) => (
                    <ProjectCard key={item.id} item={item} />
                ))}
            </div>
        </section>
    )
}
