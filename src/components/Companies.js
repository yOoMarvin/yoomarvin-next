'use client'

import { useTheme } from 'next-themes'
import Image from 'next/image'

export default function Companies() {
    const { resolvedTheme } = useTheme()

    return (
        <div className="opacity-40">
            <div className="alignt-start grid grid-cols-3 items-center justify-center gap-4 sm:grid-cols-3">
                <Image
                    className="max-h-6 w-full object-contain brightness-0 grayscale filter"
                    style={{
                        filter:
                            resolvedTheme == 'dark'
                                ? 'invert(100%)'
                                : 'invert(0)',
                    }}
                    src="/companies/enduco.png"
                    alt="Enduco"
                    height={20}
                    width={80}
                />

                <Image
                    className="max-h-6 w-full object-contain brightness-0 grayscale filter"
                    style={{
                        filter:
                            resolvedTheme == 'dark'
                                ? 'invert(100%)'
                                : 'invert(0)',
                    }}
                    src="/companies/memorisely.png"
                    alt="Memorisely"
                    height={20}
                    width={80}
                />
                <Image
                    className="max-h-4 w-full object-contain brightness-0 grayscale filter"
                    style={{
                        filter:
                            resolvedTheme == 'dark'
                                ? 'invert(100%)'
                                : 'invert(0)',
                    }}
                    src="/companies/notch.png"
                    alt="Notch"
                    height={16}
                    width={80}
                />

                <Image
                    className="max-h-4 w-full object-contain contrast-200 grayscale filter"
                    style={{
                        filter:
                            resolvedTheme == 'dark'
                                ? 'grayscale(100%) invert(100%)'
                                : 'grayscale(100%) invert(0)',
                    }}
                    src="/companies/rtl.png"
                    alt="RTL Entertainment"
                    height={16}
                    width={80}
                />

                <Image
                    className="max-h-6 w-full object-contain brightness-0 grayscale filter"
                    style={{
                        filter:
                            resolvedTheme == 'dark'
                                ? 'grayscale(100%) invert(100%)'
                                : 'grayscale(100%) invert(0)',
                    }}
                    src="/companies/sas.png"
                    alt="SAS Analytics"
                    height={20}
                    width={80}
                />
                <Image
                    className="max-h-6 w-full object-contain brightness-0 grayscale filter"
                    style={{
                        filter:
                            resolvedTheme == 'dark'
                                ? 'grayscale(100%) invert(100%)'
                                : 'grayscale(100%) invert(0)',
                    }}
                    src="/companies/tedx.png"
                    alt="TEDx"
                    height={20}
                    width={80}
                />
            </div>
        </div>
    )
}
