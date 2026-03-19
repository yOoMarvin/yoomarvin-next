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
                justifyContent: 'flex-end',
                padding: '80px',
            }}
        >
            <p
                style={{
                    color: '#a1a1aa',
                    fontSize: 24,
                    margin: '0 0 16px',
                    fontFamily: 'ui-monospace, monospace',
                }}
            >
                marvinmessenzehl.com
            </p>
            <p
                style={{
                    color: '#18181b',
                    fontSize: 56,
                    fontWeight: 600,
                    margin: 0,
                    lineHeight: 1.1,
                }}
            >
                Design engineer based in Germany.
            </p>
        </div>,
        size
    )
}
