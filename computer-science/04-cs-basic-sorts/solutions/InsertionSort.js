function insertionSort(array) {
    // start a loop to go through the entire array
    for (let i = 0; i < array.length; i++) {
        // we are going to "store" the value at each iteration, by taking it out of the array
        // remember, splice returns an array of deleted items => [i]
        let placeholder = array.splice(i, 1)[0];
        // now we have to find out where to put it
        let z = 0;
        // it has to go after the last place where the value in the sub-array (up to i) 
        // is less than the placeholder
        while (z < i && array[z] < placeholder) {
            z++;
        }
        // now that we know where to put it, we can insert it
        array.splice(z, 0, placeholder);
    }
    return array;
  }
  
module.exports = insertionSort;