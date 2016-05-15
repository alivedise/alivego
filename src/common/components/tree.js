export class Node {
  constructor(id, leafs) {
    this.id = id;
    this.leafs = leafs || [];
  }
  getNeighbors() {
    if (!this.manager) {
      return [];
    }
    return this.leafs.map(function(id) {
      return this.manager.getNode(id);
    }, this);
  };
  setHeight(l, r) {
    this.lHeight = l;
    this.rHeight = r;
  };
  isBalanced() {
    return Math.abs(this.lHeight - this.rHeight) <= 1;
  };
  getLeftChild() {
    return this.leafRefs[0];
  };
  getRightChild() {
    return this.leafRefs[1];
  };
  setManager(manager) {
    this.manager = manager;
    this.leafRefs = this.getNeighbors();
  };
  traverse(order) {
    switch (order) {
      case 'in':
        this.leafRefs[0] && this.leafRefs[0].traverse(order);
        //
        this.leafRefs[1] && this.leafRefs[1].traverse(order);
        break;
      case 'pre':
        // 
        this.leafRefs[0] && this.leafRefs[0].traverse(order);
        this.leafRefs[1] && this.leafRefs[1].traverse(order);
        break;
      case 'post':
        this.leafRefs[0] && this.leafRefs[0].traverse(order);
        this.leafRefs[1] && this.leafRefs[1].traverse(order);
        //
        break;
    }
  }
};

export class BinaryTree {
  constructor(nodes) {
    this.nodes = nodes;
    if (this.nodes.length) {
      this.root = this.nodes[0];
    }
    this.idMap = new Map();
    this.nodes.forEach(function(n) {
      this.idMap.set(n.id, n);
    }, this);
    this.nodes.forEach(function(n) {
      n.setManager(this);
    }, this);
  };
  getNode(id) {
    return this.idMap.get(id);
  };
  preOrder() {
    if (!this.nodes || !this.nodes.length) {
      return [];
    }
    this.root.traverse('pre');
  };
  inOrder() {
    if (!this.nodes.length) {
      return [];
    }
    this.root.traverse('in');
  };
  postOrder() {
    if (!this.nodes.length) {
      return [];
    }
    this.root.traverse('post');
  };
  getHeight(node) {
    if (!this.nodes.length && !node) {
      return true;
    }
    node = node || this.root;
    var left = node.getLeftChild();
    var right = node.getRightChild();
    var lHeight = left ? 1 + this.getHeight(left) : 0;
    var rHeight = right ? 1 + this.getHeight(right) : 0;
    node.setHeight(lHeight, rHeight);
    return Math.max(lHeight, rHeight);
  };

  isBalanced(node) {
    if (!this.nodes.length && !node) {
      return true;
    }
    node = node || this.root;
    this.getHeight();
    var left = node.getLeftChild();
    var right = node.getRightChild();
    return left.isBalanced() && right.isBalanced();
  };
};
