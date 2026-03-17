import { Hero } from '@/components/ui/hero'
import { PhotoFan } from '@/components/ui/photo-fan'
import { SectionHeader } from '@/components/ui/section-header'
import { ExperienceRow } from '@/components/ui/experience-row'
import { AppearanceRow } from '@/components/ui/appearance-row'
import { experience, appearances } from '@/lib/about-data'

export default function AboutPage() {
  return (
    <>
      <section>
        <Hero showName={false}>
          <p className="text-2xl font-medium text-[var(--text-secondary)] leading-relaxed text-pretty">
            I&apos;m a design engineer at DAYY&reg;, Germany&apos;s best design agency. We work with some
            of the world&apos;s most recognized brands. For example Red Bull, Allianz, Volvo, and Isar
            Aerospace. I care about the full picture: from the first sketch to the shipped thing.
          </p>
          <p className="text-2xl font-medium text-[var(--text-secondary)] leading-relaxed text-pretty">
            Before DAYY&reg;, I led design on the RTL+ iOS and tvOS apps. I started with podcast and
            music features, but over time took on the full scope of their mobile and TV platforms,
            shaping the experience for millions of users.
          </p>
          <p className="text-2xl font-medium text-[var(--text-secondary)] leading-relaxed text-pretty">
            I got into this field through an unusual door. My master&apos;s in business informatics
            at the University of Mannheim led me to building and running the Innovation Lab at SV
            Informatik. It was a small team exploring new technology trends in insurtech. That&apos;s
            where I fell in love with building digital products.
          </p>
          <p className="text-2xl font-medium text-[var(--text-secondary)] leading-relaxed text-pretty">
            After that I went freelance, working with companies ranging from early-stage startups
            to large corporates: LBS Group, Notch.so, enduco, ONVY, Hello Design, SAS, and
            Instaffo. Alongside that, I teach UX/UI design with Memorisely, helping the next
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
        <div className="space-y-1">
          {experience.map((item) => (
            <ExperienceRow key={`${item.company}-${item.role}`} {...item} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeader label="Appearances" />
        <div className="space-y-1">
          {appearances.map((item) => (
            <AppearanceRow key={item.title} {...item} />
          ))}
        </div>
      </section>
    </>
  )
}
