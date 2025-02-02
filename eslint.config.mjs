
import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Extending recommended Next.js configs
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "@typescript-eslint/no-unused-vars": ["warn", { "args": "none", "vars": "local" }],
      // "@typescript-eslint/no-unused-vars": "warn",
      "camelcase": "error", // Fixed the name
      "quotes": ["error", "single", { "avoidEscape": true }], // Enforce single quotes
      "semi": ["error", "always"], // Enforce semicolons
      "no-console": "off", // Disallow console logs
      // "indent": ["error", 4], // Enforce 2-space indentation
      "eqeqeq": "error", // Require strict equality
      "no-undef": "off", // Disallow undefined variables
      "react/jsx-no-undef": "error", // Disallow undefined JSX elements
      "react/jsx-uses-react": "off", // Not needed with React 17+ (if using JSX transform)
      "react/jsx-uses-vars": "warn", // Prevent unused variables in JSX
      "react/prop-types": "off", // Disable if using TypeScript
      "react/no-unescaped-entities": "error", // Disallow unescaped characters
      // "react/jsx-closing-bracket-location": ["error", "line-aligned"], // Enforce JSX closing bracket alignment
    },
  },
];

export default eslintConfig;