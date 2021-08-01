// vite.config.js
const { resolve } = require("path");

module.exports = {
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "./index.html"),
        experiment3: resolve(__dirname, "./experiments/experiment3/index.html"),
        // exp3: resolve(__dirname, "./experiments/experiment3/exp3.js"),
      },
    },
  },
};
