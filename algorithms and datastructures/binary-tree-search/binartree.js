class BinaryTree {
  constructor() {
    this.root = null;
  }

  add(value) {
    let node = new Node(value);
    if (this.root == null) {
      this.root = node;
    } else {
      this.root.add_node(node);
    }
  }

  traverse() {
    this.root.visit();
  }

  search(value) {
    return this.root.search(value);
  }
}
