# `SEIR` Week 1 Assessment
## For this quiz, please slack your instructors the answers, in numbered order. Do not include the questions. For example:
    1. Swag
    2. Yolo


### Bash/Zsh (Terminal)

#### For EACH and EVERY question in this section, assume you are in the `~/fridge` directory, and send the correct commands:

1. Make two directories inside `~/fridge`: `vegetables` and `cakes`:
<br><br>
```mkdir vegetables cakes```
<br><br>

2. Create files in `vegetables` named `apple.txt` and `lettuce.txt`:
<br><br>
 ```touch ./vegetables/apple.txt ./vegetables/lettuce.txt```
<br><br>


3. Delete the `vegetables` directory and everything inside it:
<br><br>
```rm -rf ./vegetables```
<br><br>

### JS Variables

4. Assign the string "JD" to a variable named `doctor`:
<br><br>
```js
let doctor = 'JD';
```

<br><br>

### JS Conditionals
```js
let milesPerGallon = 29;
let gallonsLeft = 3;
```

5. Assuming your car runs with the above variables, write an `if` statement that console.logs "SOS!" if your car cannot reach the closest gas station that is `100` miles away (no need to write a function, just the `if` statement please):
<br><br>
```js
if (milesPerGallon * gallonsLeft < 100) console.log('SOS!');
```
<br><br>


### Data Structures - JS Arrays

6. Create an array named `weekend` with just the string 'Saturday' in it:
<br><br>
```js
let weekend = ['Saturday'];
```
<br><br>

7. Add the string 'Sunday' to the end of the `weekend` array:
<br><br>
```js
weekend.push('Sunday');
```
<br><br>


8. Using square bracket notation, access 'Saturday' in the `weekend` array and assign to a variable named `day`:
<br><br>
```js
let day = weekend[0];
```
<br><br>


### Data Structures - JS Objects

#### Don't forget to use a `const` or `let` when defining new variables...

9. Write an object literal named `brain` having a property with a key of `energyLevel` and a numeric value of `10`:
<br><br>
```js
let brain = {energyLevel: 10};
```
<br><br>


### JS Functions

10. Write a function declaration named `computeArea` that has two parameters, `length` & `width`, and **returns** the area of a rectangle (the product of `length` and `width`):
<br><br>
```js
function computeArea(length, width) {
  return length * width;
}
```
<br><br>
