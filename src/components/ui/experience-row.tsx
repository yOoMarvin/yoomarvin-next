import Image from 'next/image'

interface ExperienceRowProps {
  company: string
  role: string
  years: string
  logo: string
}

export function ExperienceRow({ company, role, years, logo }: ExperienceRowProps) {
  return (
    <div className="group flex items-center justify-between gap-4 py-1">
      <div className="flex items-center gap-2">
        <Image
          src={logo}
          alt={company}
          width={24}
          height={24}
          className="shrink-0"
        />
        <span className="text-xl font-medium text-[var(--text-primary)]">{company}</span>
        <span className="text-xl font-medium text-[var(--text-tertiary)]">{role}</span>
      </div>
      <span className="font-mono text-xl text-[var(--text-tertiary)] shrink-0">{years}</span>
    </div>
  )
}
