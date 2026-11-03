/** @type {import("stylelint").Config} */
const config = {
  extends: ["stylelint-config-standard"],
  rules: {
    // Tailwind CSS v4 directives
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "theme",
          "custom-variant",
          "variant",
          "utility",
          "apply",
          "source",
          "plugin",
          "reference",
          "config",
        ],
      },
    ],
    "at-rule-no-deprecated": [true, { ignoreAtRules: ["apply"] }],
    "at-rule-prelude-no-invalid": [true, { ignoreAtRules: ["apply"] }],
    "import-notation": "string",
    // shadcn theme tokens use unitless oklch() values
    "lightness-notation": null,
    "hue-degree-notation": null,
  },
};

export default config;
