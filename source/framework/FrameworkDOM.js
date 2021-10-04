/* eslint-disable no-plusplus */
export default class FrameworkDOM {
  // создание виртуального DOM-дерева
  createVirtualDOM(VirtualNode) {
    if (typeof VirtualNode === 'undefined') {
      VirtualNode.remove();
    }
    if (typeof VirtualNode === 'string') {
      return document.createTextNode(VirtualNode);
    }
    const domElement = document.createElement(VirtualNode.type);
    if (VirtualNode.props != null) {
      Object.entries(VirtualNode.props).forEach(([key, value]) => {
        domElement.setAttribute(key, value);
        if (key.startsWith('on')) {
          const eventName = key.slice(2);
          if (typeof value === 'function') {
            domElement.addEventListener(eventName, value);
          }
        }
      });
    }
    if (VirtualNode.children !== null && VirtualNode.children !== undefined) {
      /* eslint-disable-next-line */
      for (const value of (VirtualNode.children)) {
        if (typeof value !== 'string') {
          domElement.appendChild(this.createVirtualDOM(value));
        } else {
          const textNode = document.createTextNode(value);
          domElement.appendChild(textNode);
        }
      }
    }
    return domElement;
  }

  replaceVirtualDOM(container, oldVirtualNode, newVirtualNode, index = 0) {
    if (!oldVirtualNode) {
      container.appendChild(this.createVirtualDOM(newVirtualNode));
    }
    if (!newVirtualNode) {
      container.removeChild(container.childNodes[index]);
    }
    if (this.checkChanges(newVirtualNode, oldVirtualNode)) {
      container.replaceChild(this.createVirtualDOM(newVirtualNode), container.childNodes[index]);
    }
    if (newVirtualNode.type) {
      const mergedProps = { ...oldVirtualNode.props, ...newVirtualNode.props };
      Object.keys(mergedProps).forEach(key => {
        if (oldVirtualNode.props[key] !== newVirtualNode.props[key]) {
          if (newVirtualNode.props[key] == null || newVirtualNode.props[key] === false) {
            container.childNodes[index].removeAttribute(key);
            return;
          }
          container.childNodes[index].setAttribute(key, newVirtualNode.props[key]);
        }
      });
    }
    if (newVirtualNode.type) {
      const newLength = newVirtualNode.children.length;
      const oldLength = oldVirtualNode.children.length;
      for (let i = 0; i < newLength || i < oldLength; i++) {
        this.replaceVirtualDOM(container.childNodes[index], oldVirtualNode.children[i],
          newVirtualNode.children[i], i);
      }
    }
  }

  checkChanges(VirtualNode1, VirtualNode2) {
    return (typeof VirtualNode1 !== typeof VirtualNode2)
      || (typeof VirtualNode1 === 'string' && VirtualNode1 !== VirtualNode2)
      || (VirtualNode1.type !== VirtualNode2.type);
  }

  // рендеринг виртуального DOM-элемента в настоящее дерево
  renderDOM(VirtualDOM, container) {
    container.appendChild(this.createVirtualDOM(VirtualDOM));
    return container;
  }
}
