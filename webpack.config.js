/* eslint-disable no-undef */

module.exports = {
  mode: 'production',
  entry: {
    index: `${__dirname}/src/index.ts`,
  },
  output: {
    path: `${__dirname}/lib`,
    filename: '[name].js',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  externals: {
    d3: 'd3',
    'd3-drag': 'd3-drag',
    'd3-hierarchy': 'd3-hierarchy',
    'd3-zoom': 'd3-zoom',
    'd3-force': 'd3-force',
    dagre: 'dagre',
  },
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              attributes: { belongstosvg: true },
            },
          },
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
      },
    ],
  },
};
