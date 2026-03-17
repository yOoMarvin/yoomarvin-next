import Image from 'next/image'

export function Hero() {
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
      <h1 className="text-2xl font-bold text-[var(--text-primary)] text-balance">Marvin Messenzehl</h1>
      <p className="text-2xl font-bold text-[var(--text-secondary)] leading-snug text-pretty">
        I&apos;m a design engineer living in Germany. I build products with DAYY and spend the
        rest of my time making things I wished existed.
      </p>
    </div>
  )
}
