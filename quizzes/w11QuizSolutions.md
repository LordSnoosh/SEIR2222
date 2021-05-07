# `SEIR` Week 11 Quiz
## For this quiz, please slack your instructors the answers, in numbered order. Do not include the questions. For example:
    1. Swag
    2. Yolo

## Fetch and Async Await

1. What will the following async function "hello world" always return when invoked?
```js
async function helloWorld() {
    return 'hello world!';
}
```

```
solution: A promise (which will resolve to 'hello world')!
```

2. What are the two arguments that can be provided to the `fetch()` method?

```
Solution: the url path and the options object
```

3. What does `fetch()` return?

```
Solution: A promise that resolves to the response to the request
```

## useEffect and useRef

4. Will useEffect accept an async function as the first argument?

```
Solution: No. If you want to use async/await, place another async/await function inside the callback function, and invoke it
```

5. What is the second argument passed to the useEffect hook?

```
Solution: the dependency array. Any changes to the items in the dependency array will trigger useEffect to invoke the provided callback function
```

6. What happens when you pass an empty array as the second argument to the useEffect hook?

```
Solution: The callback function will be invoked only once, after the first render of the component
```

7. What does useRef allow you to do?

```
Solution: It allows you to remember non-state variables
```

8. What does useRef return?

```
Solution: an object with a current property. The current property is used to both get and set the value of the ref. The current property is initialized to the value you passed in to useRef.
```

## JWT

9. What's the difference between req.user when you use Oauth/Passport compared to the req.user you get from JWT for authentication

```
Solution: With Oauth/Passport, the req.user object is the actual Mongo/Mongoose document, while the JWT version is an object that includes the document's properties, but is not an actual document.
```

10. In our MERN app created with JWT authentication, where did we store out token client side?

```
Solution: Local storage!
```
