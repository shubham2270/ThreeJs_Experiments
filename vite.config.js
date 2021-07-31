const { resolve } = require("path");

module.exports = {
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        script: resolve(__dirname, "experiments/experiment1/script.js"),
        index: resolve(__dirname, "experiments/experiment1/index.html"),
        // script: resolve(__dirname, "experiments/experiment2/script.js"),
        // index: resolve(__dirname, "experiments/experiment2/index.html"),
      },
    },
  },
};
