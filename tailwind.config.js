const colors = require('tailwindcss/colors');

module.exports = {
    purge: ["./resources/js/**/*.html", "./resources/js/**/*.vue"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
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
