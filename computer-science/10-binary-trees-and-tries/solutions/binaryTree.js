// https://www.cs.usfca.edu/~galles/visualization/BST.html

class BinaryNode {
    constructor(data) {
        // a node has data, left, and right pointers
        this.data = data;
        // left and right are initialized as null
        this.left = null;
        this.right = null;
    }
}
class BinaryTree {
    constructor(){
        // when a new Tree is made, it has a root property
        this.root = null;
    }
    insert(data) {
        // might as well create the node if we are going to add it anyways
        let node = new BinaryNode(data);
        // if we don't have a node at this.root, we can assign it and call it a day
        if (!this.root) return this.root = node;
        // otherwise, it's time to traverse
        let walker = this.root;
        // we need to somehow keep on iterating, we could use a while loop or recursion
        // we chose while this time
        while (true) {
            // if the node with the data already exists, return out from the function
            if (walker.data === data) return;
            // remember how you can access object properties with expressions?
            let direction = data <= walker.data ? 'left' : 'right';
            // if the place we are looking for is empty, mission accomplished
            if (!walker[direction]) return walker[direction] = node;
            // otherwise, shift down walker in the right direction
            walker = walker[direction];
        }
    }
    search(val){
        // search the Tree for a node with the given value
        // if the node exists, return it
        // if the node doesn't exist, return false

        // if there is no this.root, you should auto return false;
        if (!this.root) return false;

        // otherwise, we have to traverse the list until we get to the value, or we get to the end;

        // as usual, start walker at the top
        let walker = this.root;
        // this time, we are going to go until either walker gets to the value, or reaches null 
        while (walker) {
            // if walker hits the value, that means we found it!
            if (walker.data === val) return true;
            // let's use that handy ternary operator again to say which way to go
            walker = walker[val <= walker.data ? 'left' : 'right'];
        }
        // if walker didn't hit the value before it got to the end, then the value is not there
        return false;
    }
    size(node){
        // calculate the number of nodes in the tree, starting from the given node

        // notice, you are not guaranteed to start at the root of the tree

        // we need to count the size, so initialize a counter to zero
        let count = 0;
        // set up a recursive function that adds the values by looking left and right
        const counter = node => {
            // only count if the value is not null
            if (node) {
                // add
                count++;
                // check to the left to the left (lol Beyonce)
                counter(node.left);
                // check to the right
                counter(node.right);
            }
        }
        
        // we need to actually invoke our little function
        counter(node);
        // then return count when it's all over
        return count;
    }
    getMax(){
        // return the maximum value stored in the tree

        // if there is nothing there, return null
        if (!this.root) return null;
        // otherwise, all we have to do is go to the furthermost right place, and return the value
        let walker = this.root;
        // since you only have access to the current walker
        // you only want to shift down to the right if there is a node to the right
        while (walker.right) {
            walker = walker.right;
        }
        // we've reached the end, return the data
        return walker.data;
    }
    // set up a default parameter to start at the root
    height(node = this.root){
        // calculate the maximum amount of nodes in any one path from the given node

        // if there is nothing there, return 0
        if (!node) return 0;
        // let's keep track of the max height, initialized to zero
        let maxHeight = 0;

        // now we can use recursion to update the maximum height;
        const checker = (node, height) => {
            // if we are currently on a valid node
            if (node) {
                // update maxHeight to be the highest between the current height and maxHeight;
                maxHeight = Math.max(maxHeight, height);
                // then run the same function to the left side
                checker(node.left, height + 1);
                // and to the right
                checker(node.right, height + 1);
            }
        }
        // invoke the checker function, passing in 1 as the height, as we have already validated that this.root exists
        checker(node, 1);
        // and return the maxHeight;
        return maxHeight;
    }
    isBalanced(node = this.root){
        // return true or false based on whether the sub-tree starting at the given node is balanced
        // A tree is imbalanced if the height of one branch exceeds the other side by more than one level
        // A tree is balanced if all branches end within one level of each other.

        // let's initialize a Boolean to be true
        let balanced = true;

        // let's define a function that checks the heights of the left and right sides of a node
        // and returns whether or not it is "imbalanced"
        const checkBalance = node => {
            let leftHeight = this.height(node.left);
            let rightHeight = this.height(node.right);
            // A tree is imbalanced if the height of one branch exceeds the other side by more than one level
            return Math.abs(leftHeight - rightHeight) <= 1;
        }
        // now why don't we make a function that accepts a node to start at
        // and traverses it, while checking if each node under it is balanced
        // the basic idea is to keep on going down paths until we get a false outcome
        // if we exhaust all of the paths, we can say it is balanced
        const traverseAndCheck = walker => {
            if (walker) {
                // if checkBalance returns false, then we can update balance and stop traversing
                if (!checkBalance(walker)) return balanced = false;
                // otherwise, we gotta run this function on the left side and the right side
                traverseAndCheck(walker.left);
                traverseAndCheck(walker.right);
            }
        }
        // now we can invoke our actual function
        traverseAndCheck(node);
        // and return whether or not it is balanced
        return balanced;
    }
}

module.exports = {
    BinaryNode,
    BinaryTree
}