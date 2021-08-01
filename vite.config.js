// vite.config.js
const { resolve } = require("path");

module.exports = {
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "./index.html"),
        experiment3: resolve(__dirname, "./experiments/experiment3/index.html"),
        experiment2: resolve(__dirname, "./experiments/experiment2/index.html"),
        experiment1: resolve(__dirname, "./experiments/experiment1/index.html"),
      },
    },
  },
};
