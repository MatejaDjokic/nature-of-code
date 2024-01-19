class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  add_node(node) {
    if (node.value < this.value) {
      if (this.left == null) {
        this.left = node;
      } else {
        this.left.add_node(node);
      }
    } else if (node.value > this.value) {
      if (this.right == null) {
        this.right = node;
      } else {
        this.right.add_node(node);
      }
    }
  }

  visit() {
    if (this.left != null) {
      this.left.visit();
    }
    console.log(this.value);
    if (this.right != null) {
      this.right.visit();
    }
  }

  search(value) {
    if (this.value == value) {
      return this;
    } else if (value < this.value && this.left != null) {
      return this.left.search(value);
    } else if (value > this.value && this.right != null) {
      return this.right.search(value);
    }
  }
}
