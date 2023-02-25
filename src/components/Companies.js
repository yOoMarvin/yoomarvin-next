'use client'

import { useTheme } from 'next-themes'
import Image from 'next/image'

export default function Companies() {
    const { resolvedTheme } = useTheme()

    return (
        <div className="w-full rounded-2xl bg-neutrals-50 p-8">
            <div className="alignt-start grid grid-cols-3 items-center justify-center gap-4 sm:grid-cols-3">
                <Image
                    className="max-h-6 w-full object-contain opacity-60 brightness-0 grayscale filter"
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
                    className="max-h-6 w-full object-contain opacity-60 brightness-0 grayscale filter"
                    style={{
                        filter:
                            resolvedTheme == 'dark'
                                ? 'invert(100%)'
                                : 'invert(0)',
                    }}
                    src="/companies/hello.png"
                    alt="Hello Design"
                    height={20}
                    width={80}
                />

                <Image
                    className="max-h-8 w-full object-contain opacity-50 brightness-0 grayscale filter"
                    style={{
                        filter:
                            resolvedTheme == 'dark'
                                ? 'invert(100%)'
                                : 'invert(0)',
                    }}
                    src="/companies/lbs.png"
                    alt="Landes Bausparkasse"
                    height={24}
                    width={80}
                />
                <Image
                    className="max-h-6 w-full object-contain opacity-60 brightness-0 grayscale filter"
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
                    className="max-h-4 w-full object-contain opacity-60 brightness-0 grayscale filter"
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
                    className="max-h-4 w-full object-contain opacity-60 brightness-0 grayscale filter"
                    style={{
                        filter:
                            resolvedTheme == 'dark'
                                ? 'invert(100%)'
                                : 'invert(0)',
                    }}
                    src="/companies/onvy.png"
                    alt="ONVY Health"
                    height={16}
                    width={80}
                />
                <Image
                    className="max-h-4 w-full object-contain opacity-60 contrast-200 grayscale filter"
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
                    className="max-h-8 w-full object-contain opacity-60 brightness-0 grayscale filter"
                    style={{
                        filter:
                            resolvedTheme == 'dark'
                                ? 'grayscale(100%) invert(100%)'
                                : 'grayscale(100%) invert(0)',
                    }}
                    src="/companies/stuttgart.png"
                    alt="Börse Stuttgart"
                    height={24}
                    width={80}
                />
                <Image
                    className="max-h-8 w-full object-contain opacity-60 brightness-0 grayscale filter"
                    style={{
                        filter:
                            resolvedTheme == 'dark'
                                ? 'grayscale(100%) invert(100%)'
                                : 'grayscale(100%) invert(0)',
                    }}
                    src="/companies/sas.png"
                    alt="SAS Analytics"
                    height={24}
                    width={80}
                />
            </div>
        </div>
    )
}
