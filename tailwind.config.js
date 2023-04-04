module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './src/app/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: 'class', // 'media' or 'class'
    theme: {
        extend: {
            colors: {
                neutrals: {
                    50: 'var(--color-neutrals-50)',
                    100: 'var(--color-neutrals-100)',
                    200: 'var(--color-neutrals-200)',
                    300: 'var(--color-neutrals-300)',
                    400: 'var(--color-neutrals-400)',
                    500: 'var(--color-neutrals-500)',
                    default: 'var(--color-neutrals-default)',
                },
                text: {
                    primary: 'var(--color-text-primary)',
                    secondary: 'var(--color-text-secondary)',
                    tertiary: 'var(--color-text-tertiary)',
                    action: 'var(--color-text-action)',
                },
                action: {
                    primary: 'var(--color-action-primary)',
                    secondary: 'var(--color-action-primary)',
                },
            },
        },
    },
    variants: {},
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),
    ],
}
