const fs = require('fs/promises');
const path = require('path');

class EmitDependenciesPlugin {
  constructor(options = {}) {
    this.outputPath = options.outputPath || 'output';
  }

  apply(compiler) {
    compiler.hooks.emit.tapPromise(
      'EmitDependenciesPlugin',
      async (compilation) => {
        const { fileDependencies, compiler } = compilation;
        const rootDir = compiler.context;
        const outputPath = path.resolve(rootDir, this.outputPath);

        const nodeModulesPath = path.resolve(rootDir, 'node_modules');
        const mainDependencies = Array.from(fileDependencies).filter((fileAbsPath) => !fileAbsPath.startsWith(nodeModulesPath));

        await Promise.all(mainDependencies.map((filepath) => copyFile(rootDir, outputPath, filepath)));
      },
    );
  }
}

const copyFile = async (rootDir, outputPath, filepath) => {
  const relativePath = path.relative(rootDir, filepath);
  const outputFolder = path.dirname(path.resolve(outputPath, relativePath));
  await fs.access(outputFolder).catch(() => fs.mkdir(outputFolder, { recursive: true }));
  await fs.copyFile(filepath, path.resolve(outputFolder, path.basename(filepath)));
};

module.exports = { EmitDependenciesPlugin };
