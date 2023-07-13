/** @type {import("prettier").Config} */
const config = {
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  singleQuote: true,
  tabWidth: 4,
  useTabs: true,
  arrowParens: "avoid",
};

module.exports = config;
