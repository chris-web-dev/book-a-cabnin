export default {
  lint: {
    include: ["src/**/*.ts", "src/**/*.tsx"],
    ignoreFiles: [
      "./client/src/style/global.css",
      "./client/src/components/ui/**.tsx",
      "./client/src/components/ui/**.ts",
    ],
  },
};
