const themeSwapper = require('tailwindcss-theme-swapper')

const light = {
    colors: {
        neutrals: {
            50: '#f2f2f7',
            100: '#e5e5ea',
            200: '#d1d1d6',
            300: '#c7c7cc',
            400: '#aeaeb2',
            500: '#8e8e93',
            default: '#ffffff',
        },
        text: {
            primary: '#000000',
            secondary: 'hsla(0, 0%, 0%, 0.7)',
            tertiary: 'hsla(0, 0%, 0%, 0.5)',
            action: '#ffffff',
        },
        action: {
            primary: '#1c1c1e',
            secondary: '#2c2c2e',
        },
    },
}

const dark = {
    colors: {
        neutrals: {
            50: '#1c1c1e',
            100: '#1c1c1e',
            200: '#3a3a3c',
            300: '#48484a',
            400: '#636366',
            500: '#8e8e93',
            default: '#000000',
        },
        text: {
            primary: '#ffffff',
            secondary: 'hsla(0, 100%, 100%, 0.7)',
            tertiary: 'hsla(0, 100%, 100%, 0.5)',
            action: '#000000',
        },
        action: {
            primary: '#ffffff',
            secondary: '#f2f2f7',
        },
    },
}

module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './src/app/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: 'class', // 'media' or 'class'
    theme: {
        extend: {},
    },
    variants: {},
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),
        themeSwapper({
            themes: [
                {
                    name: 'base',
                    selectors: ['.dark'],
                    theme: dark,
                },
                {
                    name: 'light',
                    selectors: ['.light'],
                    theme: light,
                },
            ],
        }),
    ],
}
