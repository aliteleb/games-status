/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    safelist: [
        'bg-gray-800',
        'bg-[#27282e]',
        'text-red-600',
        'text-green-500',
        'border-gray-600',
        'text-cracked',
        'bg-cracked',
        'border-cracked',
        'text-uncracked',
        'bg-uncracked',
        'border-uncracked',
        'text-unreleased',
        'bg-unreleased',
        'border-unreleased',
    ],
    theme: {
        fontFamily: {
            sans: ['Readex Pro', 'sans-serif'],
        },
        extend: {
            colors: {
                'cracked': '#00e304',
                'uncracked': '#d81106',
                'unreleased': '#990efd',
                'custom-black': '#161618',
                'twitter': '#737373',
                'facebook': '#2563eb',
            },
        },

    },
    plugins: [],
}

