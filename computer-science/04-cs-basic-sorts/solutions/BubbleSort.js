function bubbleSort(array) {
    // let's define a variable that will keep track of whether or not a swap happened
    // initialize it to true so that we can enter our while loop
    let swapped = true;
    while (swapped) {
        // set swapped to false so that we exit the loop
        // innocent untiil proven guilty!
        swapped = false;
        // now it's time to go down the list to see if we have to swap
        // notice, we are looping until array.length - 1
        // this is because we are always comparing an element to the element after it
        for (let i = 0; i < array.length - 1; i++) {
            // if we need to swap
            if (array[i] > array[i + 1]) {
                // GUILTY!
                swapped = true;
                // since we are swapping elements, we need to hold a reference to one of them
                let placeholder = array[i];
                // overwrite the first element with the second
                array[i] = array[i + 1];
                // then overwrite the second slot with our reference
                array[i + 1] = placeholder;
            }
        }
    }
    // when we are done, return the sorted array;
    return array;
}

module.exports = bubbleSort;