import commonjs from '@rollup/plugin-commonjs'; // Convert CommonJS modules to ES6
import vue from 'rollup-plugin-vue'; // Handle .vue SFC files
import buble from '@rollup/plugin-buble'; // Transpile/polyfill with reasonable browser support
import css from 'rollup-plugin-css-only'; // css 
export default {
  input: 'src/components/index.js', // Path relative to package.json
  output: {
    name: 'VueChatEmoji',
    exports: 'named',
  },
  plugins: [
    commonjs(),
    css(),
    vue({
      css: false, // Dynamically inject css as a <style> tag
      //compileTemplate: true, // Explicitly convert template to render function
    }),
    buble({
      transforms: { forOf: false }
    }), // Transpile to ES5
  ],
};