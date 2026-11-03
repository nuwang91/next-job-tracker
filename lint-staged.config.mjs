const config = {
  "*.{js,mjs,cjs,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.css": ["stylelint --fix", "prettier --write"],
  "*.{json,md,yml,yaml}": "prettier --write",
};

export default config;
