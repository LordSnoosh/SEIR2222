class Node {
    constructor(key, value) {
        // should have a property called "data" that stores key and value in an array: [key, value]
        // should have a reference to the next node called "next", initialized to null
        this.data = [key, value];
        this.next = null;
    }
    get key() {
        // return the actual key from the data property
        return this.data[0];
    }
    get value() {
        // return the actual value from the data property
        return this.data[1];
    }
}
  
  // note: this is a simpler LinkedList class than in the Linked List lesson
class LinkedList {
    constructor(){
        // initialize a "head" property to null
        this.head = null;
    }
    add(key, value){
        // create a new Node with the given data as its data property 
        // if this list's head is null make that node the head, 
        // otherwise add it to end of the list
        let node = new Node(key, value);
        if (!this.head) return this.head = node;
        let walker = this.head;
        while (walker.next) {
            walker = walker.next;
        }
        walker.next = node;
    }
    delete(key){
        // search the list for a node whose data has a key that matches the key parameter
        // remove it from the list and return it
        // if no such node exists, return false
        if (!this.head) return false;
        let walker = this.head;
        if (walker.key === key) {
            this.head = walker.next;
            return walker;
        }
        while (walker.next) {
            if (walker.next.key === key) {
                let found = walker.next;
                walker.next = found.next;
                return found;
            }
            walker = walker.next;
        }
        return false;
    }
    search(key){
        // searches the list for a given key
        // if it is found, return it
        // if not, return false
        if (!this.head) return false;
        let walker = this.head;
        while (walker) {
            if (walker.key === key) return walker;
            walker = walker.next;
        }
        return false;
    }  
}
  
class HashTable {
    constructor(size) {
        // initialize table size - prime number size is recommended to avoid clustering
        // initialize the table to have "size" number of elements, set to null
        // the table will be an array named "table"
        this.table = new Array(size).fill(null);
    }
  
    hash(key) {
        // calculate and return an integer value based key, like in the lesson
        // remember, if you are using modulus, it is recommended to use a prime number to avoid clustering
        let values = 0;
        for (let i = 0; i < key.length; i++) {
            values += key.charCodeAt(i);
        }
        return values % this.table.length;
    }
    insert(key, value) {
        // hash the key to get an integer index
        let index = this.hash(key);
        // if there's no linked list at that index in the table 
        // create one and add it
        if (!this.table[index]) this.table[index] = new LinkedList();
        // and insert this key value pair into the new Linked list
        this.table[index].add(key, value);
        return true;
    }
    delete(key) {
      // lookup the key (i.e. hash it to get an index)
      // if the key is, in fact, in the linked list, delete that Node and return it
      // if the key wasn't found return -1
        let index = this.hash(key);
        if (!this.table[index]) return -1;
        let deleted = this.table[index].delete(key);
        return deleted ? deleted : -1;
    }
  
    search(key) {
        // hash key to get index
        let index = this.hash(key);
        if (!this.table[index]) return -1;
        // search the linked list at the index
        let searchValue = this.table[index].search(key);
        // if the key is found, return the Node
        return searchValue ? searchValue : -1;
    }
}

module.exports = {
    Node,
    LinkedList,
    HashTable
}