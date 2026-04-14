/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                brand: {
                    50: "#edf7f2",
                    100: "#d3ecdf",
                    600: "#295a48",
                    700: "#234a3b",
                    800: "#1f3f32",
                },
            },
        },
    },
    plugins: [],
};
