/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./resources/**/*.{js,jsx,ts,tsx}",
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
        'transition',
        'delay-1000',
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
                'custom-black': '#0c0a09',
                'twitter': '#737373',
                'facebook': '#2563eb',
                'body': '#27282e',
                'btn': '#313b48',
                'btn-hover': '#20262e'
            },
        },

    },
    plugins: [],
}

