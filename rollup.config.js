import minifyHtml from 'rollup-plugin-minify-html-literals';
import nodeResolve from 'rollup-plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import replace from 'rollup-plugin-replace';
import sourcemaps from 'rollup-plugin-sourcemaps';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript';
import pkg from './package.json';

const plugins = [
    sourcemaps(),
    nodeResolve({
        browser: true,
        mainFields: ['module'],
    }),
    replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    typescript(),
    minifyHtml(),
    terser(),
    postcss({
        minify: true,
        namedExports(name) {
            return name.replace(/-\w/g, val => val.slice(1).toUpperCase());
        },
    }),
];

export default [
    {
        input: 'src/ui/index.ts',
        output: {
            file: `dist/ui-${pkg.version}.js`,
            format: 'iife',
            sourcemap: true,
        },
        plugins,
    },
    {
        input: 'src/worker/index.ts',
        output: {
            file: `dist/worker-${pkg.version}.js`,
            format: 'iife',
            sourcemap: true,
        },
        plugins,
    },
];
