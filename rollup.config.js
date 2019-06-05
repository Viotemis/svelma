import bundleSize from 'rollup-plugin-bundle-size'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import scss from 'rollup-plugin-scss'
import svelte from 'rollup-plugin-svelte'
import { sass } from 'svelte-preprocess-sass';
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

const production = !process.env.ROLLUP_WATCH

const { name } = pkg

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
      name,
    },
    {
      file: pkg.main,
      format: 'umd',
      sourcemap: true,
      name,
    },
  ],
  plugins: [
    scss({
      output: false,
    }),
    svelte({
      // enable run-time checks when not in production
      dev: !production,
      // generate: production ? 'dom' : 'ssr',
      hydratable: true,

      preprocess: {
        style: sass(),
      },
    }),

    resolve(),
    commonjs(),

    production && terser(),

    bundleSize(),
  ],
  watch: {
    clearScreen: false,
  },
}
