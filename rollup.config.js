import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import terser from '@rollup/plugin-terser'; // Default import for Terser

export default {
  input: 'src/index.js', // Change input to index.js
  output: {
    file: 'dist/tagselector.js', // Desired output JavaScript file path
    format: 'iife', // Universal Module Definition
    name: 'TagSelector', // Global variable name for UMD
    sourcemap: true, // Generate sourcemaps for JS
  },
  plugins: [
    postcss({
      extract: 'dist/tagselector.css', // Output CSS file path
      minimize: true, // Minify the CSS
      sourceMap: true, // Generate sourcemaps for CSS
    }),
    babel({
      babelHelpers: 'bundled', // Required for the new Babel plugin
      exclude: 'node_modules/**', // Only transpile our source code
      presets: ['@babel/preset-env'], // Use preset-env for transpiling
    }),
    terser(), // Minify the output JS using @rollup/plugin-terser
  ],
};
