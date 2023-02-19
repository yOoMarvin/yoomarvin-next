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
            secondary: '#3c3c4399',
            tertiary: '#3c3c434d',
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
            secondary: '#ebebf599',
            tertiary: '#ebebf54d',
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
                    selectors: ['.light'],
                    theme: light,
                },
                {
                    name: 'dark',
                    selectors: ['.dark'],
                    theme: dark,
                },
            ],
        }),
    ],
}
