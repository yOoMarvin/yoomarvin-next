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
    ],
}
