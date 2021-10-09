// vite.config.js
const { resolve } = require("path");
import vitePluginString from "vite-plugin-string";

module.exports = {
  plugins: [vitePluginString()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "./index.html"),
        experiment4: resolve(__dirname, "./experiments/experiment4/index.html"),
        experiment3: resolve(__dirname, "./experiments/experiment3/index.html"),
        experiment2: resolve(__dirname, "./experiments/experiment2/index.html"),
        experiment1: resolve(__dirname, "./experiments/experiment1/index.html"),
      },
    },
  },
};
