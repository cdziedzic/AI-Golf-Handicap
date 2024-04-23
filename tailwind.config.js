/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",

        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    100: '#E6F6FF',
                    300: '#90CAF9',
                    500: '#2196F3', // Standard blue for primary actions
                    700: '#1976D2',
                    900: '#0D47A1',
                },
                secondary: {
                    100: '#FDE7EC',
                    300: '#F48FB1',
                    500: '#EC407A', // Pinkish hue for secondary actions
                    700: '#C2185B',
                    900: '#880E4F',
                },
                accent: {
                    100: '#FFF8E1',
                    300: '#FFD54F',
                    500: '#FFC107', // Bright yellow for accents
                    700: '#FFA000',
                    900: '#FF6F00',
                },
                neutral: {
                    100: '#F5F5F5',
                    300: '#E0E0E0',
                    500: '#9E9E9E', // Medium gray for neutral text and backgrounds
                    700: '#616161',
                    900: '#212121',
                },
            },
        },
    },
    plugins: [],
}