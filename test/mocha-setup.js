import { JSDOM } from 'jsdom';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';

// REACT
configure({ adapter: new Adapter() });

// JSDOM
const { window } = new JSDOM('<!doctype html><html><body></body></html>');
const { document } = window;

global.document = document;
global.window = window;

Object.keys(global.window).forEach((k) => {
    const secureKeys = ['localStorage', 'sessionStorage'];

    if (!{}.hasOwnProperty.call(global.window, k)) return;
    if (k in global) return;
    if (!secureKeys.includes(k)) global[k] = window[k];
});

global.navigator = {
    userAgent: 'node.js'
};

// IGNORE STYLES
require.extensions['.scss'] = () => null;
