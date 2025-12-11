// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt(
  // Your custom configs here
  {
    rules: {
      "vue/html-self-closing": [
        "error",
        {
          html: {
            void: "always", // Disallow self-closing for void elements
            normal: "always", // Require self-closing for normal elements without content (e.g., <div/> if empty)
            component: "always", // Require self-closing for Vue components without content
          },
          svg: "always",
          math: "always",
        },
      ],
    },
  },
);
