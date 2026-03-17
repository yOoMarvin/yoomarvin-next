import Image from 'next/image'

interface HeroProps {
  children?: React.ReactNode
  showName?: boolean
}

export function Hero({ children, showName = true }: HeroProps) {
  return (
    <div className="flex flex-col gap-4">
      <Image
        src="/marvin-profile.webp"
        alt="Marvin Messenzehl"
        width={56}
        height={56}
        className="rounded-full size-14 object-cover mb-8 ring-1 ring-black/10 dark:ring-white/10"
        priority
      />
      {showName && (
        <h1 className="text-2xl font-semibold text-[var(--text-primary)] text-balance">Marvin Messenzehl</h1>
      )}
      {children}
    </div>
  )
}
