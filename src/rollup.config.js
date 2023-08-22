import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import packageJson from './package.json';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/lib.ts',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve({ browser: true }),
    commonjs(),
    typescript({ useTsconfigDeclarationDir: true }),
    json(),
    terser(),
  ],
  external: [
    'react',
    'react-proptypes'
  ],
};
