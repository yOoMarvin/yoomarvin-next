import { Hero } from '@/components/ui/hero'
import { PhotoFan } from '@/components/ui/photo-fan'
import { SectionHeader } from '@/components/ui/section-header'
import { ExperienceRow } from '@/components/ui/experience-row'
import { AppearanceRow } from '@/components/ui/appearance-row'
import { experience, appearances } from '@/lib/about-data'
import { inlineLinkClass } from '@/lib/utils'

export default function AboutPage() {
  return (
    <>
      <section>
        <Hero showName={false}>
          <p className="text-2xl font-medium text-[var(--text-secondary)] leading-relaxed text-pretty">
            I&apos;m a design engineer at <a href="https://www.dayy.com/en" target="_blank" rel="noopener noreferrer" className={inlineLinkClass}>DAYY&reg;</a>, <a href="https://www.linkedin.com/posts/germanwebawards_awards-awards-germanwebawards-activity-7368641621921280000-eEUa" target="_blank" rel="noopener noreferrer" className={inlineLinkClass}>Germany&apos;s best design agency</a>. We work with some
            of the world&apos;s most recognized brands. For example Red Bull, Allianz, Volvo, and Isar
            Aerospace. I care about the full picture: from the first sketch to the shipped thing.
          </p>
          <p className="text-2xl font-medium text-[var(--text-secondary)] leading-relaxed text-pretty">
            Before DAYY&reg;, I led design on the <a href="https://plus.rtl.de/" target="_blank" rel="noopener noreferrer" className={inlineLinkClass}>RTL+</a> iOS and tvOS apps. I started with podcast and
            music features, but over time took on the full scope of their mobile and TV platforms,
            shaping the experience for millions of users.
          </p>
          <p className="text-2xl font-medium text-[var(--text-secondary)] leading-relaxed text-pretty">
            I got into this field through an unusual door. My master&apos;s in business informatics
            at the University of Mannheim led me to building and running the <a href="https://www.sv-informatik.de/unternehmen/it-lab.html" target="_blank" rel="noopener noreferrer" className={inlineLinkClass}>Innovation Lab</a> at SV
            Informatik. It was a small team exploring new technology trends in insurtech. That&apos;s
            where I fell in love with building digital products.
          </p>
          <p className="text-2xl font-medium text-[var(--text-secondary)] leading-relaxed text-pretty">
            After that I went freelance, working with companies ranging from early-stage startups
            to large corporates: LBS Group, Notch.so, enduco, ONVY, Hello Design, SAS, and
            Instaffo. Alongside that, I teach UX/UI design with <a href="https://www.memorisely.com/" target="_blank" rel="noopener noreferrer" className={inlineLinkClass}>Memorisely</a>, helping the next
            generation of designers find their footing.
          </p>
          <p className="text-2xl font-medium text-[var(--text-secondary)] leading-relaxed text-pretty">
            Outside of work I&apos;m obsessed with endurance sports, reading, and spending time
            with my family and friends. I live in the German countryside.
          </p>
        </Hero>
      </section>

      <section className="w-screen relative left-1/2 -translate-x-1/2">
        <PhotoFan />
      </section>

      <section className="space-y-4">
        <SectionHeader label="Experience" />
        <div className="flex flex-col gap-4 sm:gap-1.5">
          {experience.map((item) => (
            <ExperienceRow key={`${item.company}-${item.role}`} {...item} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeader label="Appearances" />
        <div className="flex flex-col gap-4 sm:gap-1.5">
          {appearances.map((item) => (
            <AppearanceRow key={item.title} {...item} />
          ))}
        </div>
      </section>
    </>
  )
}
