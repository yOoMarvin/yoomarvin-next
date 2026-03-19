import { ComponentType } from 'react'
import Image from 'next/image'

interface ExperienceRowProps {
    company: string
    role: string
    years: string
    logo: string | ComponentType<{ size?: number; className?: string }>
}

export function ExperienceRow({
    company,
    role,
    years,
    logo: Logo,
}: ExperienceRowProps) {
    return (
        <div className="flex flex-col items-start gap-0 leading-[1.6] sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <div className="flex items-center gap-2">
                {typeof Logo === 'string' ? (
                    <Image
                        src={Logo}
                        alt={company}
                        width={24}
                        height={24}
                        className="shrink-0"
                    />
                ) : (
                    <Logo
                        size={24}
                        className="shrink-0 text-[var(--text-primary)]"
                    />
                )}
                <span className="text-xl font-medium text-[var(--text-primary)]">
                    {company}
                </span>
                <span className="text-xl font-medium text-[var(--text-tertiary)]">
                    {role}
                </span>
            </div>
            <span className="font-mono text-xl text-[var(--text-tertiary)] shrink-0">
                {years}
            </span>
        </div>
    )
}
