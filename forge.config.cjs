module.exports = {
  packagerConfig: {
    icon: "resources/icon",
    ignore: [
      /^\/src/,
      /(.eslintrc.json)|(.gitignore)|(electron.vite.config.ts)|(forge.config.cjs)|(tsconfig.*)/,
    ],
  },
  rebuildConfig: {},
  publishers: [
    {
      name: "@electron-forge/publisher-github",
      config: {
        repository: {
          owner: "terrence-ou",
          name: "MAI-Translator",
        },
        prerelease: true,
      },
    },
  ],
  makers: [
    // {
    //   name: "@electron-forge/maker-squirrel",
    //   config: {},
    // },
    {
      name: "@electron-forge/maker-zip",
      config: {
        icon: "resources/icon",
      },
      platforms: ["darwin"],
    },
    // {
    //   name: "@electron-forge/maker-deb",
    //   config: {},
    // },
    // {
    //   name: "@electron-forge/maker-rpm",
    //   config: {},
    // },
  ],
};