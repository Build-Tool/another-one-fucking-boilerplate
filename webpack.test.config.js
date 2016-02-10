'use strict';

let path = require('path');
let glob = require('glob');

const ENTRIES = glob.sync(path.resolve('test/**/*.test.js')).reduce((entries, entry) => {
  entries[path.relative(path.resolve('test'), entry)] = entry;

  return entries;
}, {});

module.exports = {
  entry: ENTRIES,

  output: {
    path: path.resolve('build', 'test'),
    filename: '[name]',
    libraryTarget: 'commonjs2'
  },

  target: 'node',

  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false
  },

  cache: true,

  resolve: {
    root: __dirname
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-2']
        }
      },
      {
        test: /\.node$/,
        loader: 'node'
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  }
};