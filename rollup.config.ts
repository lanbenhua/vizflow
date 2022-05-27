import { nodeResolve } from '@rollup/plugin-node-resolve';
import rollupTypescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import { RollupOptions } from 'rollup';
import less from 'rollup-plugin-less';
import path from 'path';

const cwd = (pathname: string): string => path.resolve(process.cwd(), pathname);

const config: RollupOptions[] = [
  {
    input: cwd('./src/index.ts'),
    plugins: [
      nodeResolve(),
      rollupTypescript({
        tsconfig: cwd('./tsconfig.json'),
      }),
      less({
        output: './lib/index.css',
      }) as never,
      terser(),
    ],
    output: {
      dir: cwd('./lib'),
      format: 'cjs',
    },
    external: ['d3', 'd3-drag', 'd3-hierarchy', 'd3-zoom', 'd3-force', 'dagre'],
  },
];

export default config;
