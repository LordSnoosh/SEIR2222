function mergeSort(arr) {
    // we are going to use recursion, let's set up a base case

    // notice that an empty or single element array is already sorted
    // so return it if it is one
    if (arr.length <= 1) return arr;
    // let's grab the middle index
    let middle = Math.floor(arr.length / 2);

    // let's do something wild
    // arr.splice delete elements from an array (in place), and return what was deleted
    // so left can be what we return by deleting the first half of the elements
    let left = arr.splice(0, middle)
    // and we can pass it right back to our mergeSort method
    let sortedLeft = mergeSort(left);
    // and we can toss what's left of arr to determine the right side
    let sortedRight = mergeSort(arr);

    // then we can use our helper function to glue everything back together
    return merge(sortedLeft, sortedRight)
  }
  
  
  // HELPER FUNCTION: merge two sorted arrays
//   merge([3, 6, 12], [7, 8, 13])
// result will be [3] arr1 will be [6, 12] and arr2 will be [7, 8, 13]
// result will be [3, 6] arr1 will be [12] and arr2 will be [7, 8, 13]
// result will be [3, 6, 7] arr1 will be [12] and arr2 will be [8, 13]
function merge(arr1, arr2) {
    var result = []; 
    while (arr1.length && arr2.length) {
        if(arr1[0] <= arr2[0]) {
            result.push(arr1.shift());
        } else {
            result.push(arr2.shift());
        }
    }
    return result.concat(arr1, arr2);
}

// let's sort [12,6,3,7,13,8]
// first, middle is 3
// left is [12, 6, 3]
// sortedLeft is ms([12, 6, 3]);
// sortedRight is ms([7, 13, 8])
// and ms[12, 6, 3, 7, 13, 8] is merge(ms([12, 6, 3]), ms([7, 13, 8]))
    // well, what's ms([12, 6, 3])?
        // middle is 1
        // left is [12]
        // sortedLeft is ms([12])
        // sortedRight is ms([6, 3])
        // so ms([12, 6, 3]) is merge(ms([12]), ms([6, 3]))
            // so now what's ms([12])?
                // it's [12]
            // what's ms([6, 3])?
                // middle is 1
                // left is [6]
                // sortedLeft is ms([6]) which is just [6]
                // and sortedRight is ms([3]), which is just [3]
                // so ms([6, 3]) is merge([6], [3]), which is [3, 6]
        // so ms([12, 6, 3]) is merge([12], [3, 6]) => [3, 6, 12]
    // now let's find out what ms([7, 13, 8]) is
        // middle is 1
        // left is [7]
        // sortedLeft is ms([7])
        // sortedRight is ms([13, 8])
        // so ms([7, 13, 8]) is merge(ms([7]), ms([13, 8]))
            // so what's ms([7])?
                // it's [7]
            // what's ms([13, 8])?
                // middle is 1
                // left is [13]
                // sortedLeft is ms([13]), which is just [13]
                // and sortedRight is ms([8]), which is just [8]
                // so ms([13, 8]) is merge([13], [8]), which is [8, 13]
            // so ms([7, 13, 8]) is merge([7], [8, 13]) => [7, 8, 13]
        // finally, we can answer merge(ms([12, 6, 3]), ms([7, 13, 8]))
        // it is merge([3, 6, 12], [7, 8, 13]) => [3, 6, 7, 8, 12, 13]
  
module.exports = mergeSort;
