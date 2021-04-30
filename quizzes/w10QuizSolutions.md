# `SEIR` Week 10 Quiz
## For this quiz, please slack your instructors the answers, in numbered order. Do not include the questions. For example:
    1. Swag
    2. Yolo

## React JSX and Props

1. How do you render a "Person" component, and provide "Fred" as a name prop?

solution: 
```js
    <Person name="Fred" />
 ```

 2. Given an object: 
 ```js
    const person = {
        first: "Michael",
        last: "Scott"
        company: "Dunder Mifflin"
    };

 ```
 How would you use object destructuring to create variables for "first" and "last" of person?
 
 solution:
 ``` js
    const {first, last} = person;
 ```

 3. In order to make a component available for other components to render, what must you do on that component?

```
solution: Export it using "export default"
```

4. What is the best array iterator method for converting an array of data into an array of components to be rendered?

```
solution: the array.map method
```

 ## React State and Hooks

 5. Given the following code: 
 ```js 
    const [todo, setTodo] = useState(null);
 ```
 what does ``setTodo`` do?

```
solution: It replaces "todo" with whatever you pass in as the argument when invoking "setTodo"
```

 6. Given the following function, and where todos is last set to ``['eat lunch', 'ace GA', 'learn react'] `` via useState:
 ```js
    function removeLastTodo() {
        const todosCopy = [...todos];
        todosCopy.pop();
        setTodos(todosCopy);
        console.log(todos);
    }

 ```
 what would get logged when the function is invoked?
 
```
 solution: ['eat lunch', 'ace GA', 'learn react']
```
 7. In general, why were hooks added to React?

``` 
solution: It allowed function components to perform behavior that was previously limited to class components
```

 ## Spas and the MERN stack

 8. If you want to send a AJAX request from your React app that lives on localhost:3000 to your express backend that lives on localhost:3001, what must you add to your package.json?

```
 solution: "proxy": "http://localhost:3001"
```

 9. Is it possible to send ``put`` and ``delete`` requests using AJAX?

 ```
 solution: heck yeah
 ```

 10. When you have a MERN app, as far as Express is concerned, what file does the entire React app live on?

 ```
 solution: index.html
 ```