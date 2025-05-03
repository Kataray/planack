const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    theme: {
        extend: {
            fontFamily: {
                madimi: ['"Madimi One"', ...defaultTheme.fontFamily.sans],
                marmelad: ['"Marmelad"', ...defaultTheme.fontFamily.serif],
                magra: ['"Magra"', ...defaultTheme.fontFamily.serif],
            }
        }
    },
}