// webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.js',  // Entry point
  mode: 'development',
  output: {
    filename: 'bundle.js',  // Output bundle file
    path: path.resolve(__dirname, 'dist'),  // Output directory
  },
};