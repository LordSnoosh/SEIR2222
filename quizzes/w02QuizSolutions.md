# `SEIR` Week 2 Assessment
## For this quiz, please slack your instructors the answers, in numbered order. Do not include the questions. For example:
    1. Swag
    2. Yolo


## Callback Functions
1. What do we call functions that accept other functions as arguments?

<br>

**Solution:**
```
    higher-order functions
```

2. Can methods be higher-order functions?

<br>

**Solution:**
```
    heck yes
```

3. Is ``document.getElementById()``  considered a higher-order function?

<br>

**Solution:**
```
Nope, as it does not accept a callback function. Instead, 'document.addEventListener' is an excellent example of a higher-order function
```


## Classes
4. What do we use classes for?
<br>

**Solution:**
``` 
to create shiny new objects 
```

5. What is the purpose of the constructor for a class?
<br>

**Solution:** 
``` 
The constructor is used to assign properties to the shiny new object that the class creates 
```

6. what is the difference between a static method and a prototype method?

<br>

**Solution:**
```
Static methods are called on the class itself (ex. Array.isArray('yoloswag')), while prototype methods are called on instances of that class (ex. [1, 2, 4].forEach(x => console.log(x));)
```

7. What does the following code do?
```js
    const tolliver = new Dog('tolliver');
```
<br>

**Solution:**
```
It creates an instance of the 'Dog' class and assigns it to a variable called 'tolliver'
```

## The 'this' Keyword

8. Can the value of 'this' always be determined by examining the definition of a function?

<br>

**Solution:**
```
Nope. The value of this (for non-arrow functions) is assigned based on what it is being call on!
```

## Array Iterator Methods

9. What is the use-case of the array.some() method

<br>

**Solution:**
```
To check if at least one element within an array passes a condition
```

10. If you use the array.map method on an array with 50 elements, how many elements will be in the returned array?

<br>

**Solution:**
```
50
```

11. Bonus - Using the array.reduce method, find the largest number in the following 'numbers' array and assign it the variable 'max'. Bonus means that if you get it correct, you will receive a point, but you will not lose a point if you get it wrong

```js
const numbers = [-90, -400, -234, -40000, -22, -50000000, -2];
```

<br>

**Solution:**
```js
const max = numbers.reduce((acc, val) => Math.max(acc, val));
```