// STACK IMPLEMENTATION
class Stack {
    constructor() {
      this.items = []
    }
    push(item){
      this.items.push(item)
    }
    pop(){
      return this.items.pop()
    }
    peek(){
      return this.items[this.items.length - 1]
    }
    isEmpty(){
      return this.items.length === 0
    }
}

// this function will take in a string as input
// it will return true or false based on whether the brackets are properly matched
// the valid brackets it will scan for are {}, [], and ()
// you must use a Stack in your implementation of this function
// refer to the bracket matching readMe.md for more details

// PASS 'a{b}{c(1[2]3)}['
// STACK: { => {}
// STAck: {([ => []
// STACK: {( => ()
// STACK: { => {} 
// Return Stack.isEmpty()
// FAIL '[]])}'

// []{}(({}))
// STACK: [
// STACK: [ => []
// STACK: { => {}


function bracketMatching(input){
  // let's "sanitize" our input with regex, we will get rid of all non-brackets
  input = input.replace(/[^{}()\[\]]/g, '');
  // let's make a stack
  let stack = new Stack();
  // then let's loop over our input using a good old "for loop"
  for (let i = 0; i < input.length; i++) {
    // push to the stack if the bracket is an "opening" bracket
    if ('{[('.includes(input.charAt(i))) {
      stack.push(input.charAt(i));
    } else {
      // otherwise, it is a closing bracket
      // we are going to see if combining the last element of the stack (an opening bracket)
      // with the current input (a closing bracket)
      // will yield a balanced bracket
      // if not, GAME OVER!
      if (!'[](){}'.includes(stack.pop() + input.charAt(i))) return false;
    }
  }
  // since it's possible for the for loop to end with an opening bracket
  // we should return whether or not there is anything left in the stack!
  // might as well use the isEmpty method that comes with our Stack class!
  return stack.isEmpty();
}


class Node{
    constructor(data, priority){
        this.data = data;
        this.priority = priority;
        this.next = null;
    }
}

// This priority queue is implemented as a Linked List
// Your challenge is to implement the insert method of the priority queue
class priorityQueue{
    constructor(){
        this.head = null;
    }
    enqueue(data, priority){
      // Insert the new data into the proper place in the queue
      // the lowest priority number should be the head node
      // the priorities should remain in order
      // if two nodes have the same priority, put the new one first

      let node = new Node(data, priority);
      // if there is no head, we get to make our node the new head
      if (!this.head) return this.head = node;
      // if our head's priority is greater than or equal to our new node's priority
      if (this.head.priority >= priority) {
        // our node gets to become the new this.head
        // so node.next should become this.head
        node.next = this.head;
        // and this.head becomes our node
        return this.head = node;
      }
      // otherwise, we have to traverse the list until we find the right place
      let walker = this.head;
      // traverse as long as there is a walker.next
      // and as long as our priority is larger than the the next node's priority
      while (walker.next && priority > walker.next.priority) {
        walker = walker.next;
      }
      // then we do our regular old insert
      node.next = walker.next;   
      walker.next = node;
    }
    peek(){
        // return the highest priority node in the queue

        return this.head;
    }
    dequeue(){
        // remove and return the highest priority node in the queue
        
        if (!this.head) return null;
        let dequeued = this.head;
        this.head = dequeued.next;
        return dequeued;
    }
}

module.exports = {
    bracketMatching,
    priorityQueue
}