import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import sourcemaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript';
import { terser } from 'rollup-plugin-terser';

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
    }
];
