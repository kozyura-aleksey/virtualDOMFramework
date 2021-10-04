import FrameworkDOM from './framework/FrameworkDOM.js';

const root = document.getElementById('root');

const frameworkDOM = new FrameworkDOM();

const tree1 = {
  type: 'div',
  props: {},
  children: [{
    type: 'h1',
    props: {},
    children: ['Hello']
  }],
};

const tree2 = {
  type: 'div',
  props: {},
  children: [{
    type: 'h1',
    props: {},
    children: ['Goodbuy']
  }],
};


frameworkDOM.renderDOM(tree1, root);

setInterval(() => {
  frameworkDOM.replaceVirtualDOM(root, tree1, tree2);
}, 3000);
