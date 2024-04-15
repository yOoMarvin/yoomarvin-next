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
                //new color styles below
                background: {
                    default: 'var(--color-background-default)',
                    variant: 'var(--color-background-variant)',
                    highlight: 'var(--color-background-highlight)',
                },
                onBackground: {
                    high: 'var(--color-on-background-high)',
                    medium: 'var(--color-on-background-medium)',
                    low: 'var(--color-on-background-low)',
                },
                ui: {
                    low: 'var(--color-ui-low)',
                    neutral: 'var(--color-ui-neutral)',
                    medium: 'var(--color-ui-medium)',
                    high: 'var(--color-ui-high)',
                    highlight: 'var(--color-ui-highlight)',
                    highlightHover: 'var(--color-ui-highlight-hover)',
                },
                onUi: {
                    low: 'var(--color-on-ui-low)',
                    medium: 'var(--color-on-ui-medium)',
                    high: 'var(--color-on-ui-high)',
                },
                onUiHighlight: {
                    low: 'var(--color-on-ui-highlight-low)',
                    medium: 'var(--color-on-uihighlight--medium)',
                    high: 'var(--color-on-ui-highlight-high)',
                },
                special: {
                    link: 'var(--color-special-link)',
                    linkHover: 'var(--color-special-link-hover)',
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
