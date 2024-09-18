import StyleDictionary, { type Config } from "style-dictionary";

const BRANDS = ["brand-1", "brand-2"] as const;

const getCoreTokensConfig = (): Config => {
  return {
    source: ["tokens/core/*.json"],
    platforms: {
      css: {
        transformGroup: "css",
        buildPath: `build/css/core/`,
        files: [
          {
            destination: "_variables.css",
            format: "css/variables",
          },
        ],
        options: {
          outputReferences: true,
        },
      },
      scss: {
        transformGroup: "scss",
        buildPath: `build/scss/core/`,
        files: [
          {
            destination: "_variables.scss",
            format: "scss/variables",
          },
        ],
        options: {
          outputReferences: true,
        },
      },
      ts: {
        transformGroup: "js",
        buildPath: `build/js/core/`,
        files: [
          {
            destination: "index.js",
            format: "javascript/es6",
          },
          {
            destination: "index.d.ts",
            format: "typescript/es6-declarations",
          },
        ],
        options: {
          outputStringLiterals: true,
        },
      },
    },
  };
};

const getStyleDictionaryConfig = (brand: (typeof BRANDS)[number]): Config => {
  return {
    source: ["tokens/core/*.json", `tokens/${brand}/*.json`],
    platforms: {
      css: {
        transformGroup: "css",
        buildPath: `build/css/${brand}/`,
        files: [
          {
            destination: "_variables.css",
            format: "css/variables",
            filter: (token) => !token.filePath.includes("tokens/core"),
          },
        ],
        options: {
          outputReferences: true,
        },
      },
      scss: {
        transformGroup: "scss",
        buildPath: `build/scss/${brand}/`,
        files: [
          {
            destination: "_variables.scss",
            format: "scss/variables",
            filter: (token) => !token.filePath.includes("tokens/core"),
          },
        ],
        options: {
          outputReferences: true,
        },
      },
      ts: {
        transformGroup: "js",
        buildPath: `build/js/${brand}/`,
        files: [
          {
            destination: "index.js",
            format: "javascript/es6",
            filter: (token) => !token.filePath.includes("tokens/core"),
          },
          {
            destination: "index.d.ts",
            format: "typescript/es6-declarations",
            filter: (token) => !token.filePath.includes("tokens/core"),
          },
        ],
        options: {
          outputStringLiterals: true,
        },
      },
    },
  };
};

const sd = new StyleDictionary(getCoreTokensConfig());
sd.buildAllPlatforms();

BRANDS.map((brand) => {
  const sd = new StyleDictionary(getStyleDictionaryConfig(brand));
  sd.buildAllPlatforms();
});
