import { ComponentType } from 'react'
import {
    DayyLogo,
    FreelanceLogo,
    MemLogo,
} from '@/components/icons/experience-logos'

export interface ExperienceItem {
    company: string
    role: string
    years: string
    logo: string | ComponentType<{ size?: number; className?: string }>
}

export interface AppearanceItem {
    title: string
    date: string
    href?: string
}

export const experience: ExperienceItem[] = [
    {
        company: 'DAYY®',
        role: 'Senior Product Designer',
        years: 'Current',
        logo: DayyLogo,
    },
    {
        company: 'Memorisely',
        role: 'UX/UI Teacher',
        years: 'Current',
        logo: MemLogo,
    },
    {
        company: 'RTL+',
        role: 'Senior Product Designer',
        years: '2023–25',
        logo: '/logos/rtl.svg',
    },
    {
        company: 'Freelance',
        role: 'Product Designer',
        years: '2021–23',
        logo: FreelanceLogo,
    },
    {
        company: 'SV Informatik',
        role: 'Innovation Lab Lead',
        years: '2016–21',
        logo: '/logos/itlab.svg',
    },
    {
        company: 'SV Informatik',
        role: 'Software Engineer',
        years: '2013–16',
        logo: '/logos/sv.svg',
    },
]

export const appearances: AppearanceItem[] = [
    {
        title: 'The Search for the Perfect Color',
        date: 'May 2024',
        href: 'https://youtu.be/HZrAGctuvyI?si=SRkQ_zugWwE2Wm-o',
    },
    {
        title: 'Figma: In The File at RTL+',
        date: 'Sep 2023',
        href: 'https://www.youtube.com/watch?v=QGWD6EhhKYE',
    },
    {
        title: 'Dev & Donuts Keynote',
        date: 'Jan 2023',
        href: 'https://www.youtube.com/watch?v=FfhjolsHIBY&t=363s&ab_channel=yasoon',
    },
    {
        title: 'Behind the Hustle Podcast',
        date: 'Nov 2022',
        href: 'https://www.youtube.com/watch?v=g77e9fYGWKI&t=2s&ab_channel=SSSDECA',
    },
    {
        title: 'IT-Lab Insurtech Podcast',
        date: 'Jul 2022',
        href: 'https://open.spotify.com/episode/6IOrTtcboauY5K6a4Ff7yb?si=59269495327a4004',
    },
    {
        title: 'Thincubator Mentor',
        date: 'Apr 2022',
        href: 'https://www.thinc.de/thincubator',
    },
    {
        title: 'Memorisely Unmute Blog',
        date: 'Mar 2022',
        href: 'https://blog.memorisely.com/article/marvin-messenzehl',
    },
    {
        title: 'Stacking Snacks Podcast',
        date: 'Nov 2021',
        href: 'https://open.spotify.com/episode/0gWOCyhUxqCIkxAeor2p6G?si=27aa62a29e104386',
    },
    {
        title: 'Symbioticon Hackathon 1st place',
        date: 'Oct 2019',
        href: 'https://www.youtube.com/watch?v=xQJQt6wnd-w',
    },
    {
        title: 'TEDx Uni Mannheim',
        date: 'Oct 2019',
    },
]
