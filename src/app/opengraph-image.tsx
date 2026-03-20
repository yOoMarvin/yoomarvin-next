import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
    return new ImageResponse(
        <div
            style={{
                background: '#fafafa',
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                padding: '80px',
            }}
        >
            <svg width="120" height="120" viewBox="0 0 196 200" fill="none">
                <path
                    d="M98 166C142.183 166 178 130.183 178 86C178 41.8172 142.183 6 98 6"
                    stroke="#09090B"
                    stroke-width="12"
                />
                <path
                    d="M98 166C53.8172 166 18 130.183 18 86C18 41.8172 53.8172 6 98 6"
                    stroke="#09090B"
                    stroke-width="12"
                    stroke-dasharray="8 24"
                />
            </svg>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginTop: '48px',
                }}
            >
                <p
                    style={{
                        color: '#09090B',
                        fontSize: 64,
                        fontWeight: 900,
                        margin: 0,
                        lineHeight: 1.15,
                    }}
                >
                    Marvin Messenzehl
                </p>
                <p
                    style={{
                        color: '#a1a1aa',
                        fontSize: 64,
                        fontWeight: 900,
                        margin: 0,
                        lineHeight: 1.15,
                    }}
                >
                    I build products with DAYY® and spend the rest of my time
                    making things I wished existed.
                </p>
            </div>
        </div>,
        size
    )
}
