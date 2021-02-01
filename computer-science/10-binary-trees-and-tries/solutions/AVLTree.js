class Node {
    constructor(data){
    // a node has data, left, and right pointers
    // a node also has a height property that starts at 1
    // left and right are initialized as null
    this.data = data;
    this.height = 1;
    this.left = null;
    this.right = null;
    }
}

// The difference in height between left and right must always be <= 1
class AVLTree {
    constructor(){
        this.root = null;
        // when a new Tree is made, it has a root property
    }
    insert(data){
        // add a new Node to the tree, with data as the Node's data
        // insertion starts the same way as in a regular Binary Tree
        // once the node is inserted, however, check the heights for imbalance
        // if the new node causes imbalance, perform rotations to rebalance

        // after we shift nodes around, we have to clean up the heights
        // might as well make it reusable code
        const updateHeights = node => {
            this.setHeight(node.left);
            this.setHeight(node.right);
            this.setHeight(node);
        }

        const checkForImbalance = (node, parent) => {
            // since it's possible for children nodes to be undefined, we have to "manually" set their heights
            const leftHeight = node.left ? node.left.height : 0;
            const rightHeight = node.right ? node.right.height : 0;
            if (rightHeight - leftHeight > 1) {
                // if we already know we have a right imbalance, we only need to check to see if there is a right left imbalance
                // we need to also check for cases of sub-node imbalances, so we have to "manually" check heights again
                let subRightHeight = node.right.right ? node.right.right.height : 0; 
                let subLeftHeight = node.right.left ? node.right.left.height : 0; 
                // if there is, just update the nodes to create a right right imbalance
                if (subLeftHeight > subRightHeight) {
                    // remember, we are trying to create a right right imbalance, so update node.right to be the result of rotating
                    node.right = this.rotateRight(node.right);
                }
                // by this point, we should have a right right imbalance, so we need to do a left rotate
                    // since the rotate functions return a node that should be connected to the parent node
                    // there are cases for the parent node, either it is the root or just another node
                if (this.root === node) {
                    // if the node is the root
                    // update this.root
                    this.root = this.rotateLeft(node);
                    updateHeights(this.root);
                } else {
                    // if the node is not the root, you have to use the parent!
                    parent.right = this.rotateLeft(node);
                    updateHeights(parent.right);
                }
            // all of this is the reverse case of the previous imbalances!
            } else if (leftHeight - rightHeight > 1) {
                let subLeftHeight = node.left.left ? node.left.left.height : 0; 
                let subRightHeight = node.left.right ? node.left.right.height : 0; 
                if (subRightHeight > subLeftHeight) {
                    node.left = this.rotateLeft(node.left);
                }
                if (this.root === node) {
                    this.root = this.rotateRight(node);
                    updateHeights(this.root);
                } else {
                    parent.left = this.rotateRight(node);
                    updateHeights(parent.left);
                }
            }
        }

        // it would be inefficient to check for imbalances starting from the root
        // so instead, we "unwind" from where we inserted!
        const unwind = paths => {
            // we need to work from the bottom of the tree up, so set up a nice while loop to get us down
            while (paths.length) {
                // the walker will be the node that we use to check for imbalances
                let walker = this.root;
                // the parent will be what we connect the updated node to
                let parent;
                paths.forEach(path => {
                    // the parent gets updated first to match what the walker used to be
                    parent = walker;
                    // then the walker gets updated to the next slot
                    // this makes sure the parent never reaches the final node, but ends at the one before it!
                    walker = walker[path];
                });
                // we should update the height of the walker before we check for imbalances
                this.setHeight(walker);
                // now check (and fix) imbalances
                checkForImbalance(walker, parent);
                // then pop from the paths so we don't have to check that node again!
                paths.pop();
            }
            checkForImbalance(this.root);
            this.setHeight(this.root);
        }

        // let's copy the insertion from BST, but also keep track of where we went
        const vanillaInsert = data => {
            // we'll hold the directions that we traveled to in a paths array
            // we need this so that we can update the heights and check for imbalances via the unwind!
            let paths = [];
            // here is the vanilla insert from BST
            let node = new Node(data);
            if (!this.root) return this.root = node;
            let walker = this.root;
            while (true) {
                let direction = data < walker.data ? 'left' : 'right';
                // after I figure out the direction to go, I also add it to the paths
                paths.push(direction);
                if (!walker[direction]) {
                    walker[direction] = node;
                    // after I add the node, it is time to unwind from that position!
                    return unwind(paths);
                }
                walker = walker[direction];
            }
        }
        // run the vanilla insert
        vanillaInsert(data);
    }

    setHeight(node){
        // calculate and set the height property of the given node
        // the height of a node without any further nodes is 1
        if (!node.left && !node.right) return node.height = 1;
        let leftHeight = node.left ? node.left.height : 0;
        let rightHeight = node.right ? node.right.height : 0;
        // the height is the maximum between the left and right children heights plus 1
        return node.height = Math.max(leftHeight, rightHeight) + 1;
    }
    rotateRight(node){
        // rotate the given node to the right

        // let's make node.left the new "parent"
        let newParent = node.left;
        // since node.left was less than the node, anything on node.left.right should still be less than node
        // so node.left would be the new "parent's" right
        node.left = newParent.right;
        // since node was greater than node.left, it only makes since to make "node" the newParent's right
        newParent.right = node;
        // once you have done the shifting, you need to return the new parent
        // because you need separate code to actually connect it to the AVL Tree
        return newParent;
    }
    rotateLeft(node){
        // rotate the given node to the left

        // this is the rotateRight code in almost exact reverse
        let newParent = node.right;
        node.right = newParent.left;
        newParent.left = node;
        return newParent;
    }
}


module.exports = {
    Node,
    AVLTree
}