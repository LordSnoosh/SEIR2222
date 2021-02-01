function quickSort(arr){
  // YOUR CODE HERE
  if (arr.length <= 1) return arr;
  let pivot = arr.pop();
  let leftSide = arr.filter(element => element <= pivot)
  let rightSide = arr.filter(element => element > pivot)
  return [...quickSort(leftSide), pivot, ...quickSort(rightSide)];
}

module.exports = quickSort;