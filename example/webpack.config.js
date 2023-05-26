const path = require('path');
const { EmitDependenciesPlugin } = require('../index')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: { symlinks: false },
  
  plugins: [new EmitDependenciesPlugin()],
};