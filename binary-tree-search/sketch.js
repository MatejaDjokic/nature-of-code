let btree;

function setup() {
  noCanvas();
  btree = new BinaryTree();
  for (let i = 0; i < 10; i++) {
    btree.add(floor(random(0, 100)));
  }
  console.log(btree);
  btree.traverse();

  let res = btree.search(10);
  if (res == null) {
    console.log("Not found.");
  } else {
    console.log(res);
  }
}
