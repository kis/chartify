module.exports = {
    "moduleNameMapper": {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/assetsTransformer.js",
        "\\.(css|less)$": "<rootDir>/assetsTransformer.js"
    },
    "collectCoverageFrom": [
        "src/**/*.{js,jsx,ts,tsx}",
        "!**/node_modules/**",
        "!**/vendor/**"
    ]
}