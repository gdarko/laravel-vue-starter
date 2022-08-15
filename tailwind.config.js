const colors = require('tailwindcss/colors');

module.exports = {
    purge: ["./resources/js/**/*.html", "./resources/js/**/*.vue"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                sans: ["'Open Sans'", "sans-serif"],
            },
            colors: {
                theme: colors.teal
            }
        }
    },
    variants: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
        require('@tailwindcss/aspect-ratio')
    ],
};
