const HtmlWebpackPlugin = require("html-webpack-plugin");
const Terser = require("terser");
const postcss = require("postcss");
const cssnano = require("cssnano");

class InlineAssetsPlugin {
  constructor(options = {}) {
    this.options = {
      jsPlaceholder: "@INLINE-JS",
      cssPlaceholder: "@INLINE-CSS",
      includeEntries: [], // e.g. ["main", "styles"]
      removeInlinedFiles: true,
      minify: true,
      ...options,
    };
  }

  apply(compiler) {
    compiler.hooks.compilation.tap("InlineAssetsPlugin", (compilation) => {
      const hooks = HtmlWebpackPlugin.getHooks(compilation);

      hooks.beforeEmit.tapAsync("InlineAssetsPlugin", async (data, callback) => {
        const jsAssets = [];
        const cssAssets = [];
        const assetsToRemove = new Set();

        // Collect assets for specified entries
        for (const chunk of compilation.chunks) {
          if (
            this.options.includeEntries.length === 0 ||
            this.options.includeEntries.includes(chunk.name)
          ) {
            for (const file of chunk.files) {
              if (file.endsWith(".js")) {
                jsAssets.push({ file, content: compilation.assets[file].source() });
                if (this.options.removeInlinedFiles) assetsToRemove.add(file);
              }
              if (file.endsWith(".css")) {
                cssAssets.push({ file, content: compilation.assets[file].source() });
                if (this.options.removeInlinedFiles) assetsToRemove.add(file);
              }
            }
          }
        }

        // Minify CSS
        const inlineCSS = cssAssets.length
          ? `<style>${await this.minifyCSS(cssAssets.map(a => a.content).join("\n"))}</style>`
          : "";

        // Minify JS
        const inlineJS = jsAssets.length
          ? `<script>${await this.minifyJS(jsAssets.map(a => a.content).join("\n"))}</script>`
          : "";

        // Inject into HTML
        data.html = data.html
          .replace(`<!-- ${this.options.cssPlaceholder} -->`, inlineCSS)
          .replace(`<!-- ${this.options.jsPlaceholder} -->`, inlineJS);

        // Remove inlined files from build output
        for (const file of assetsToRemove) {
          delete compilation.assets[file];
        }

        callback(null, data);
      });
    });
  }

  async minifyJS(jsCode) {
    if (!this.options.minify) return jsCode;
    const result = await Terser.minify(jsCode);
    return result.code || jsCode;
  }

  async minifyCSS(cssCode) {
    if (!this.options.minify) return cssCode;
    const result = await postcss([cssnano]).process(cssCode, { from: undefined });
    return result.css;
  }
}

module.exports = InlineAssetsPlugin;
