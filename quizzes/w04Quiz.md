# `SEIR` Week 4 Assessment
## For this quiz, please slack your instructors the answers, in numbered order. Do not include the questions. For example:
    1. Swag
    2. Yolo


## Routing
1. Assume the router was mounted in server.js as `app.use('/puppies', puppiesRouter);` and your controller was required as puppiesCtrl for the puppies data resource.  Finish defining the route for the show page/functionality!

```js
    router.get();
```

<br>



2. What's the problem with the following routes?

```js
    router.get('/puppies/:id', puppiesCtrl.getOne);
    router.get('/puppies/new', puppiesCtrl.new);
```

<br>


## Middleware
3. If a form has been submitted in a POST request, how do we access the submitted form's data in a controller function?

4. What is method-override middleware used for in an Express app?


## EJS
5. What is the difference between ```<%= %>``` and  ```<% %>```?


6. Assume that you are rendering an index.ejs, which has access to an array of puppy objects. Each puppy object has an id property. You have created an unordered list, and have started looping through your puppies:
```js 
puppies.forEach(puppy) => {
    <li>
        <a href="????"><%=puppy.name%></a>
    </li>
})
```
What would you replace the ```????``` with to link to the show page for each puppy using its id?
<br><br>


## Controller Methods
7. What are the two parameters you will almost always set when you define a controller method?
8. What are two arguments that res.render accepts?



## Big O and Recursion

<br>

9. What is the time complexity of this function?
```js
function factorial(n){
  if (n === 0) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}
```
<br>


10. Is the following a recursive function?
```js
function generateNextSet(arr) {
    let newResults = [];
    arr.forEach(outcome => {
      newResults.push(outcome + 'T');
      newResults.push(outcome + 'H');
    })
    return newResults;
  }
```
<br>
