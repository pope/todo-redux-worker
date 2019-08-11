import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import sourcemaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';

const plugins = [
    sourcemaps(),
    nodeResolve({
        browser: true,
    }),
    commonjs(),
    replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    terser(),
    typescript(),
    postcss({
        minify: true,
        namedExports(name) {
            return name.replace(/-\w/g, val => val.slice(1).toUpperCase());
        },
    }),
];

export default [
    {
        input: 'src/app/index.ts',
        output: {
            file: 'dist/app.bundle.js',
            format: 'iife',
            sourcemap: true,
        },
        plugins,
    },
    {
        input: 'src/worker/index.ts',
        output: {
            file: 'dist/worker.bundle.js',
            format: 'iife',
            sourcemap: true,
        },
        plugins,
    },
];
