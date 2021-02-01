function quickSort(arr){
    // let's use recursion to do this!
    // the base case will be when the arr.length is less than or equal to 1
    // because single element arrays are always sorted
    if (arr.length <= 1) return arr;
    // let's use the last element of the array to be partition
    // notice how it gets taken out of the array, this is because it will become the middle
    let partition = arr.pop();
    // everything less (or equal to) than our partition gets to go to a left array
    let left = arr.filter(element => element <= partition);
    // everything more gets to go to a right array
    let right = arr.filter(element => element > partition);
    // the spread operator let's us write this stuff out like English
    // return an array, that starts with the sorted left side
    // then has our partition in the middle
    // and our sorted right side at the end
    return [...quickSort(left), partition, ...quickSort(right)];
  }
  
// let's sort [4, 6, 3, 7, 1, 5]
// first, partition would be 5
  // the left array would be [4, 3, 1]
  // the right array would be [6, 7]
  // and we would return [...qs([4, 3, 1]), 5, ...qs([6, 7])]
// well, what's qs([4, 3, 1])?
  // okay, so partition for qs([4, 3, 1]) would be 1
  // and the left array would be []
  // and the right array would be [4, 3]
  // So qs([4, 3, 1]) is [...qs([]), 1, ...qs([4, 3]);
    // well, what's qs([])? it is []!
    // and what's qs[4, 3]?
      // partition would be 3
      // left would be [];
      // and right would be [4]
      // So qs([4, 3]) is [...qs[], 3, ...qs[4]]
        // isn't qs([]) []?
        // and qs[4] is [4]!
  // So now we know what qs[4, 3] is [3, 4]!
  // so qs([4, 3, 1]) is [1, 3, 4]!
// so now what is qs([6, 7])?
  // well, partion would be 7
  // and left would be [6]
  // and right would be []
  // so qs([6, 7]) is [...qs([6]), 7, ...qs([]);
  // we know that qs([6, 7]) is [6, 7]!
// So finally, what is [...qs([4, 3, 1]), 5, ...qs([6, 7])]?
// It is [1, 3, 4, 5, 6, 7] <-- our quick sorted array!

module.exports = quickSort;