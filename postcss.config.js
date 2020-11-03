module.exports = {
  plugins: [
    "tailwindcss",
    "autoprefixer",
    process.env.NODE_ENV === "production"
      ? [
          "@fullhuman/postcss-purgecss",
          {
            content: [
              "./pages/**/*.{js,jsx,ts,tsx}",
              "./components/**/*.{js,jsx,ts,tsx}",
            ],
            defaultExtractor: (content) =>
              content.match(/[\w-/.:]+(?<!:)/g) || [],
            safelist: {
              standard: ["html", "body", "__next"],
              deep: [/^ql-/],
              greedy: [/^ql-/],
            },
          },
        ]
      : undefined,
    "postcss-preset-env",
  ],
}
