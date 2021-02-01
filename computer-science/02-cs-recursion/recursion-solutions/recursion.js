// Write code inside the functions
// You will have to figure out what parameters to include
// All functions must use recursion

function findMax(arr, max = arr[0], n = arr.length - 1){
    // This function returns the largest number in a given array.
    // the key to this function is to set the proper default parameters
    

    // if we have an empty array, we have issues, so let's return null
    if (!arr.length) return null;
    // update "max" to be the greatest number
    max = Math.max(arr[n], max);

    // the base case is when we reach the beginning of the array 
    // could also be the end of the array;
    if (n <= 0) return max;
    
    // run the recursive function!
    return findMax(arr, max, n - 1);
}



function factorial(n){
    // This function returns the factorial of a given number.

    // if our number is less than 0, we have issues, so return null
    if (n < 0) return null;
    // if the number is one or 0, the factorial is just one, and the function can finally return
    if (n <= 1) return 1;

    // the function will keep invoking itself, multiplying the current number
    // with the factorial invoked with the next number down
    return n * factorial(n - 1);
}



function fibonacci(n){
    // This function returns the Nth number in the fibonacci sequence.
    // https://en.wikipedia.org/wiki/Fibonacci_number
    // For this function, the first two fibonacci numbers are 1 and 1

    // there's not such thing as negative fibonacci numbers, so return null for negative n
    if (n < 0) return null;
    // well, fibonacci(0) is 0 and fibonacci(1) is 1, so we can set those as our base cases
    if (n <= 1) return n;
    // the next fibonacci number is the sum of the last two fibonacci numbers
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// factorial(0) = 0
// factorial(1) = 1 * factorial(0)
// factorial(2) = 2 * factorial(1)
// factorial(3) = 3 * factorial(2)

// flip 1 == ['T', 'H'] BASE CASE
// flip 2 == ['TT', 'TH', 'HT' 'HH']
// flip 3 == ['TTT', 'TTH' 'THT' 'THH', 'HTT', 'HTH', 'HHT', 'HHH']

// flip 3 == coinFlips(n - 1).forEach(flip => {

// })
    
function coinFlips(n) {
    // This function returns an array of all possible outcomes from flipping a coin n times.
    // Input type: Integer
    // For example, coinFlips(2) would return the following:
    // ["HH", "HT", "TH", "TT"]
    // H stands for Heads and T stands for tails
    // Represent the two outcomes of each flip as "H" or "T"


    // if we flip less than once, we should return null
    if (n < 1) return null;
    // the base case is if we only flip once, we should only get heads or tails
    if (n === 1) return ['T', 'H'];
    // we should always return a new set of outcomes
    let newOutcomes = [];
    // the idea is to look at the last set of outcomes, and push T and H to each of them
    coinFlips(n - 1).forEach(flip => {
        newOutcomes.push(flip + 'T');
        newOutcomes.push(flip + 'H');
    });
    // when you have finished adding, you can return the new outcomes!
    return newOutcomes;
}

function letterCombinations(characters){
    // This function returns an array of all combinations of the given letters
    // Input type: Array of single characters
    // For example, letterCombinations(["a","b","c"]) would return the following:
    // ["a","b","c","ab","ac","ba","bc","ca","cb","abc","acb","bac","bca","cab","cba"]

    // we know that the combinations will include the original characters
    // so set the results to our initial array of characters
    let results = characters;
    // we will use a recursive function to add to the results
    // it will keep track of the "number of letter combinations"
    function appendResults(n) {
        // if we only want the single letter combinations, we can return the original characters
        if (n <= 1) return characters;
        // let's initialize the array where we will store the next set of combinations
        let newResults = [];
        // the x letter combinations are created by adding to the x - 1 letter combinations, just like coinflips
        appendResults(n - 1).forEach(combination => {
            // we want to add each of the characters to the previous combination
            characters.forEach(character => {
                // but only add them if we don't already have that letter in the combination
                if (!combination.includes(character)) newResults.push(combination + character);
            })
        })
        // then update our results to also have the next set
        results = [...results, ...newResults];
        // but only return the new combinations, 
        // because letter combinations only care about the last set of combinations
        return newResults;
    }
    // then we just invoke our method
    appendResults(characters.length);
    // and return the results
    return results;
}

module.exports = {
    findMax,
    factorial,
    fibonacci,
    coinFlips,
    letterCombinations
}