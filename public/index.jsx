import React from 'react';
import ReactDom from 'react-dom';
import { hot } from 'react-hot-loader/root';
import App from './app';


if (!global._babelPolyfill) {
    require('babel-polyfill');
}

const Hot = hot(App);

ReactDom.render(<App />, document.querySelector('#root'));
