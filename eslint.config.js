import antfu from "@antfu/eslint-config";

export default antfu(
  {
    files: ["**/*.ts", "**/*.vue"],
    stylistic: {
      quotes: "double",
      semi: true,
    },
  },
  {
    files: ["src/resourse/prefabs/**/*.prefab.ts", "src/scenes/**/*.scene.ts"],
    rules: {
      "ts/consistent-type-definitions": "off",
    },
  },
  {
    rules: {
      "antfu/if-newline": 0,
      "ts/no-unused-vars": 2,
      "vue/html-indent": "off",
      "vue/html-closing-bracket-newline": "off",
      "vue/first-attribute-linebreak": "off",
    },
  },
);
