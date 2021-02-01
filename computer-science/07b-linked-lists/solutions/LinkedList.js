class Node{
    constructor(data){
        // a Node starts with a given data property
        // a Node also has a .next property initialized as null
        this.data = data;
        this.next = null; 
    }
}

class LinkedList{
    constructor(){
        // a Linked List starts with a "head" property intialized as null
        this.head = null;
    }
    appendNode(data){
        // creates a new node with the given data and adds it to back of the list

        // let's go ahead and create a node first
        let node = new Node(data);
        // if the linked list doesn't have any nodes yet, node becomes this.head
        if (!this.head) return this.head = node;
        // otherwise, we need to step into the list
        // intialze a walker to be this.head
        let walker = this.head;
        // let's keep on walking down the list until there is no walker.next
        while (walker.next) {
            walker = walker.next;
        }
        // if walker.next is null, we've reached the end of the linked list
        // so add the node to it
        return walker.next = node;
    }
    prependNode(data){
        // creates a new node with the given data and adds it to the front of the list

        // first make the node
        let node = new Node(data);
        // if there was no node, we can go ahead and add the node as the head
        if (!this.head) return this.head = node;
        // otherwise, we need to switch the heads
        let oldHead = this.head;
        node.next = oldHead;
        return this.head = node;
    }
    pop(){
        // removes the last node from the list and returns it

        // if there is no node at the front, return it
        if (!this.head) return null;

        // we have to account for a special case in which the head is the only element
        // because in that case, you will have to set this.head to null;
        if (!this.head.next) {
            let poppedNode = this.head;
            this.head = null;
            return poppedNode;
        }
        // if the special cases don't happen, we can do a traversal
        let walker = this.head;
        // but this time, we want to stop traversing when we reach the second from the end
        // this is because singularly linked lists can't look backwards
        while (walker.next.next) {
            walker = walker.next;
        }
        // now the popped node would be walker.next
        let poppedNode = walker.next;
        // delete it by setting walker.next to null
        walker.next = null;
        // and return the popped node
        return poppedNode;
    }
    removeFromFront(){
        // remove the head node from the list and return it
        // the next node in the list is the new head node

        // if there is no this.head, return null
        if (!this.head) return null;
        // if there is nothing after this.head, we have to clean up after ourselves
        if (!this.head.next) {
            let removed = this.head;
            this.head = null;
            return removed;
        }
        // now we can do the vanilla case
        let removed = this.head;
        this.head = removed.next;
        return removed;
    }
    insertAt(X, data){
        // insert a new node into the list with the given data
        // place it after X nodes in the list
        // if X exceeds the bounds of the list, put the node at the end
        // insertAt(0, 7) would add the new node as the head
        let node = new Node(data);

        // if this.head is null, make it the new node
        if (!this.head) return this.head = node;

        // if they want to insert a 0, node becomes this.head
        if (X === 0) {
            let next = this.head;
            node.next = next;
            return this.head = node
        }

        // otherwise, it's time to traverse;
        let walker = this.head;
        let iterator = 1;
        // keep traversing until you either reach the end,
        // or until you hit X
        while (walker.next && iterator < X) {
            walker = walker.next;
            iterator++;
        }
        // let's take care of the case that you've reached the end first
        if (!walker.next) return walker.next = node;
        // if we insert, first, let's keep track of what comes after walker
        let next = walker.next;
        node.next = next;
        walker.next = node;
    }
    removeAt(X){
        // remove the Xth node from the list, considering 0 to be the first node
        // return the node that has been removed

        // as usual, take care of the case where there is no head first
        if (!this.head) return null;

        // now let's see what to do if we have to remove from the front
        if (X === 0) {
            // we know this.head has to go away, so let's save a reference to it for now
            let removed = this.head;
            // this.head will become whatever this.head.next is. It's either a node or null
            this.head = removed.next
            // then let's return what we got rid of
            return removed;
        }
        // otherwise, we have to traverse
        let walker = this.head;
        let iterator = 1;
        // have we reached the end or where we want to remove from?
        while (walker.next.next && iterator < X) {
            walker = walker.next;
            iterator++;
        }
        // save a reference to what we will return
        let removed = walker.next;
        // walker.next will be walker.next.next, which will either be a node or null
        walker.next = removed.next;
        // then return what was removed
        return removed;

    }
    search(data){
        // searches the list for a node with the given data
        // if it is found, return the "index" of the node, considering 0 to be the first node
        // if not, return false

        // if there's nothing at head, return false
        if (!this.head) return false;
        // we need to return an index, so let's initialize it to 0
        let index = 0;
        // and let's set up our walker
        let walker = this.head;
        // let's keep looping while walker is truthy
        while (walker) {
            // if walker's data matches, return index and call it a day
            if (walker.data === data) return index;
            // "otherwise", let's increment
            walker = walker.next;
            index++;
        }
        // if we've reached the end of the linked list, that means it's not there
        return false;
    }
    sort(){
        // sort the Linked List in ascending order of data values
        if (!this.head) return null;
        // do you remember bubble sorts?
        // initialize our checker to say if a swap happened
        let swapped = true;
        while (swapped) {
            // if no swappeds happen, we can exit out of the while loop
            // "default" it so no swapped happens
            swapped = false;
            // let's start traversing
            let walker = this.head;
            // we need to store what came before walker, as we will need it later
            let previous;
            // now it's time to do our pretend "for loop"
            // we just keep on going until there isn't a next property to swap
            while (walker && walker.next) {
                // if we need to swap
                if (walker.data > walker.next.data) {
                    // set the swapped to true, because we are about to swap
                    // this will make the "while(swapped)" loop run again
                    swapped = true;
                    // if the head needs to swapped, we have to make separate logic because you have to mess with this.head
                    if (walker === this.head) {
                        // this.head is eventually going to become this.head.next
                        // let's call it newSecond
                        let newSecond = this.head;
                        // what was this.head.next will become the new this.head
                        // let's call it newHead
                        let newHead = this.head.next;
                        // now time to make the newSecond's next thing whatever was the "third" next
                        newSecond.next = this.head.next.next;
                        // the new head's next property should be newSecond
                        newHead.next = newSecond;
                        // and now let's offically make the newHead this.head
                        this.head = newHead;
                    } else {
                        // what if walker wasn't this.head?
                        // since walker is bigger than whatever comes after it, make it the newSecond
                        let newSecond = walker;
                        // whatever came after it is going to become the newFirst
                        let newFirst = walker.next;
                        // newSecond's next should be the second thing to come after wallker
                        // remember, newFirst is walker.next
                        newSecond.next = newFirst.next;
                        // newFist's next should be newSecond
                        newFirst.next = newSecond;
                        // what came before walker should now point to the newFirst
                        previous.next = newFirst;
                    }
                }
            // now let's do the traversing
            // previous becomes walker
            previous = walker;
            // and walker becomes walker.next
            walker = walker.next;
            }
        }
    }
}

module.exports = {
    Node,
    LinkedList
}