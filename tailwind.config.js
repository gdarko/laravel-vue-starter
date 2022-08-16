const colors = require('tailwindcss/colors');

module.exports = {
    content: ["./resources/js/**/*.html", "./resources/js/**/*.vue"],
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
