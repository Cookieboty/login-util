
/*
 * @Author: Cookie
 * @Date: 2020-05-12 15:47:47
 * @LastEditors: Cookie
 * @LastEditTime: 2020-12-27 18:49:16
 * @Description: 
 */
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';
const htmlTemplate = require('rollup-plugin-generate-html-template');


export default {
  input: 'src/index.js',
  output: {
    file: 'dist/js/login.js',
    format: 'umd',
    name: 'login'
  },
  watch: {
    include: 'src/**/*'
  },
  plugins: [
    commonjs({
      exclude: 'src/**',
    }),
    htmlTemplate({
      template: 'src/page/index.html',
      target: 'dist/index.html',
    }),
    babel({
      runtimeHelpers: true,
      babelrc: false,
      presets: [
        ['@babel/preset-env']
      ],
      plugins: [
        ["@babel/plugin-transform-runtime"],
        ["@babel/plugin-proposal-decorators", { "legacy": true }],
      ]
    }),
    resolve({
      extensions: ['.js']
    }),
    uglify({
      compress: {
        drop_console: true,  // 过滤 console
        drop_debugger: false  // 过滤 debugger
      }
    })
  ]
};