<img src="https://i.imgur.com/VunmGEq.jpg">

# React Fundamentals - JSX & Props

## Learning Objectives

|Students Will Be Able To:|
|---|
| Explain the Use Case of JSX |
| Explain the Benefits that JSX Provides |
| Use JSX to Define a Component's UI |
| Render JS Expressions Into the DOM Using JSX |
| Include Props in JSX |
| Render an Array of Components |
| Style Components Using the `className` & `style` Prop |

## Road Map

- Setup
- JSX - What & Why?
- Review: JS Expressions
- Writing JS Expressions Into the DOM Using JSX
- JSX Itself is a JS Expression!
- What Are Props?
- Properly Rendering Arrays of Components
- Props for React Elements
- Intro to Styling React Elements
- Essential Questions
- Challenge Practice Exercise
- References

## Setup

This lesson will build upon the "React To-Do" sandbox we created last lesson in [codesandbox.io](https://codesandbox.io/):

<img src="https://i.imgur.com/KgHpiqD.png">

## JSX - What & Why?

### What?

- **JSX** is an XML-like syntax extension to JavaScript. [XML](https://en.wikipedia.org/wiki/XML) is short for _extensible markup language_ and JSX is one of those extensions - just like HTML is.
- Created by Facebook for use in React.
- It provides a way to concisely define tree structures with attributes - perfect for defining a DOM tree!
- It is transpiled into pure JavaScript.

  <details>
  <summary>❓ What is transpiling</summary>
  <p>Transpiling converts source code of one language into source code of another language.  They are often referred to as source-to-source compilers. Compilers on the the other hand, convert source code into a form of executable code.</p>
  </details>

### Why?

- Why JSX? It's simple. Compared to pure JavaScript, JSX provides a more concise and clearer (better) way to define a UI.

- JSX resembles HTML, which allows us to more easily visualize the UI its JavaScript will create.

- 99.99% (a guess) of React apps are developed today using JSX to define the UI, not vanilla JS.

## Review: JS Expressions

Let's review what JS expressions are...

JavaScript expressions evaluate to a single value/reference and can be used wherever a value can be used:

- Assigned to a variable
- Provided as an argument to a function call
- Returned from a function

Statements on the other hand, perform actions. A program consists primarily of statements that include expressions. For example, `if` statements, assignment statements, `for` and `while` loops are not expressions.

## Writing JS Expressions Into the DOM Using JSX

To write the result of a JS expression into the DOM within the JSX, we simply need to enclose the expression within curly braces.

Let's experiment by typing the the following within `<ToDoList>` in our sandbox and observe the output:

```jsx
// ToDoList.jsx

export default function ToDoList() {
  const str = "Hello";
  const score = 94;
  return (
    <ul>
      <ToDoListItem />
      <ToDoListItem />
      <li>Number: {123}</li>
      <li>String: {str}</li>
      <li>Math.random(): {Math.random() * 100}</li>
      <li>Template Literal: {`${str} & Goodbye`}</li>
      <li>Ternary: {score > 90 ? "A" : "B or less"}</li>
      <li>Booleans, null & undefined: {true}{false}{null}{undefined}</li>
      <li>Logical &&: {score > 90 && <div>Got an 'A'!</div>}</li>
    </ul>
  );
}
```

The fact that React does not output the value of booleans, `null` or `undefined` can really come in handy, e.g., when using the logical `&&` scenario for writing out an expression or not.

Objects and most of the [built-in Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects) (Date, Functions, RegExp, etc.) cannot be rendered as is - just their properties can be rendered.  The practical exception are Arrays which we'll look at shortly.

## JSX Itself is a JS Expression!

Developing real-world React apps requires tooling to:

- Transpile the JSX into pure JS
- Import CSS
- Bundle the JS modules

The most popular transpiler for JSX is [Babel](https://babeljs.io/). The following shows what a JSX expression transpiles into:

<img src="https://i.imgur.com/8vLLr1Y.gif">

As you can see, JSX transpiles into a function call: `React.createElement(...)`, which returns an object used by the React library.

Because JSX results in a function call that returns an object, JSX is a JavaScript expression!  Thus, JSX can be assigned to variables, used in ternary expressions, etc.!

### A Component Must Return a Single Root JSX Node

Because a function can only return a single expression, we must be sure to return a single root JSX node using the `return` statement.

For example, the following will fail to compile:

```jsx
function Whoops() {
  return (
    <h1>Whoops</h1>
    <h2>No Dice!</h2>
  );
}
```

The function above is attempting to return two things, i.e., two objects which just isn't possible in JavaScript (or any other popular programming language).

The only solution used to be to wrap the sibling components with a single React Element such as a `<div>`:

```jsx
function GoodToGo() {
  return (
    <div>
      <h1>Good To Go</h1>
      <h2>Dice Please!</h2>
    </div>
  );
}
```

The downside of the above approach is that this results in an extra, and perhaps unwanted `<div>` rendered to the DOM which could impact layout/styling.

A better alternative if you don't want or need an extra wrapping React Element is [React Fragments](https://reactjs.org/docs/fragments.html) added in version 16.2 of React:

```jsx
function GoodToGo() {
  return (
    <>
      <h1>Good To Go</h1>
      <h2>Dice Please!</h2>
    </>
  );
}
```

> Note that the `<> </>` syntax is shorthand for `<React.Fragment> </React.Fragment>`

### 💪 Practice Exercise - Render an Array (3 minutes)

1. Define an array named `misc` before the `return` statement that has the following elements:

  - A string of your choosing
  - A number of your choosing
  - A boolean of `true` or `false`
  - A React Element, e.g., a `<div>` with some content

2. In **ToDoList.jsx** Add an `<li>` React Element with the array as its content.

As you can see, React can render arrays.  In fact, it's very common to render arrays of components, which we'll do in a bit.

## What Are Props?

Very simply, **props** are used to pass information to component.

> "Information" can be any JS expression such as variables, functions, etc.

### Basic Syntax

The syntax of passing props to a child component is much like defining attributes in an HTML element, for example, we can pass a simple string to a component like this:

```jsx
<Person firstName="Fred" />
```

In the above example, the name of the prop is `firstName`.

Because JSX is transpiled into pure JS, we use lowerCamelCasing to name props.  This is contrary to the convention of kebob-casing used to name attributes in HTML.

Like HTML attributes, there should be no spaces before or after the `=` sign.

There is no limit to the number of props that can be passed:

```jsx
<Person
  firstName="Fred"
  age={21}
/>
```

Each prop becomes a property on a "props" object.

**Any** JS expression can be passed, however, expressions other than simple strings (excludes template literals), are passed within curly braces. Thus, the `age` prop will have the value set to the **number** `21`.

The next example shows how you can pass an object literal and even a function:

```jsx
function handleRaise(name, amount) {
  // Give the person a raise!
}

<Person
  name={{first: "Fred", last: "Arroyo"}}
  age={21}
  handleRaise={handleRaise}
/>
```

Don't let those double-curly braces (`{{ ... }}`) confuse you.  The outer curly braces simply say, "here comes a JS expression"; and the inner curly braces represent an object literal. 

### How the Child Components Access Props

A props object is passed to Function Components as an argument:

```jsx
function Person(props) {
  return (
    <div>
      <p>First: {props.name.first}</p>
      <p>Last: {props.name.last}</p>
      <p>Age: {props.age}</p>
      <button onClick={() => props.handleRaise(props.name, 9999)}>Give Raise!</button>
    </div>
  );
}
```

By convention, we name the parameter `props` instead of `tuna`, `mamaMia`, etc.

As you can see, each passed prop becomes a property on the `props` object that's passed to the Function Component as an argument.

If no props are passed to a component, `props` will be an empty object.

> IMPORTANT: A prop's value should never be changed.  Instead, a different value should be assigned to the prop at the source (the component that "owns" the info being passed).

### Destructuring the `props` Object

In modern JavaScript, it is common to create variables from properties on objects or elements in an array using [Destructuring Assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment).

The syntax is similar to "unpacking" in Python.

Here's a simple example of using destructuring assignment to create variables for an object's properties:

```js
const car = {
  make: 'Tesla',
  model: 'Model S',
  year: 2020
};

let {make, year} = car;

console.log(make, year);  //=>  "Tesla"  2020
```

We can also use destructuring assignment to destructure parameters. Accordingly, it's common to destructure the `props` object passed to a Function Component.

Using destructuring, the `Person` component refactors to:

```jsx
function Person({ name, age, handleRaise }) {
  return (
    <div>
      <p>First: {name.first}</p>
      <p>Last: {name.last}</p>
      <p>Age: {age}</p>
      <button onClick={() => handleRaise(name, 9999)}>Give Raise!</button>
    </div>
  );
}
```

As you can see, the advantage is more concise code in the component's function.

Be sure to check [the docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) to learn more about destructuring objects and arrays!

### Using Props in "React To-Do"

Currently in "React To-Do", the `<ToDoList>` component is rendering two hard-coded `<ToDoListItem>` components - this isn't very useful. Instead, we typically would be passing actual data down via props...

Let's refactor "React To-Do" so that:

1. **App.js** defines a `todos` array of strings representing the to-dos.
2. Pass the `todos` array to the `<ToDoList>` component as a prop.
3. Refactor **ToDoList.jsx** to accept props.
4. Use React Developer Tools to verify the prop in `<ToDoList>`.
5. Create and render a `<ToDoListItem>` component for each element (to-do) in the `todos` array.
6. Pass each "todo" string as a prop to the `<ToDoListItem>`.
7. Refactor the `<ToDoListItem>` component to destructure the `todo` prop and render it instead of the "To Do Item" placeholder text.

#### 1. Define a `todos` array in **App.js**:

We can define the array outside of or within the function...

```jsx
// App.js
import ToDoList from "./ToDoList";

// Add the todos array
const todos = [
  'Have Fun',
  'Learn React',
  'Learn the MERN-Stack'
];

export default function App() {
```

> Note: If we defined the `todos` array within the Function Component, it would be "reset" (reassigned) every time the component is rendered, which  probably isn't what you want.

#### 2. Pass the `todos` array to the `<ToDoList>` component as a prop:

```jsx
export default function App() {
  return (
    <div className="App">
      <h1>React To-Do</h1>
      {/* Pass todos as a prop */}
      <ToDoList todos={todos} />
    </div>
  );
}
```

The name of the prop, `todos`, can be anything you want (it does not have to match the value being assigned).

> Note how we can include comments within JSX by using the inline/multi-line syntax (`/* comment */`) wrapped with curly braces. 

#### 3. Refactor **ToDoList.jsx** to accept props:

Now that `<ToDoList>` is being passed a prop, it will need to be able to access it.

As previously discussed, Function Components need to define a parameter that by convention is named `props`:

```jsx
export default function ToDoList(props) {
  return (
    <ul>
      <ToDoListItem />
      <ToDoListItem />
    </ul>
  );
}
```

#### 4. Use React Developer Tools to verify the prop in `<ToDoList>`

Open React Developer Tools and verify that the array has been passed!

<img src="https://i.imgur.com/FXzMPfe.png">

##### 💪 Practice Exercise (1 minute)

- Destructure the `props` object in the parameter list of **ToDoList.jsx**.

  > Hint: The name of the prop to destructure is `todos`.

#### 5. Create and render a `<ToDoListItem>` component for each element (to-do string) in the `todos` array

Our goal is to create and render a `<ToDoListItem>` component for each string in the `todos` array.

<details>
<summary>❓ What's the best array iterator method for <strong>transforming</strong> the elements of a source array into a new array?</summary>
<code>Array.prototype.map</code>
</details>

Here's one approach:

```jsx
export default function ToDoList({ todos }) {
  // Create an array of <ToDoListItem> components
  const toDoListItems = todos.map(t => <ToDoListItem />);
  return (
    <ul>
      {toDoListItems}
    </ul>
  );
}
```

The above approach is clean and it works.  However, since calling the `map()` method is a JS expression that results in an array, it's possible to perform the mapping within the JSX like this:

```jsx
export default function ToDoList({ todos }) {
  return (
    <ul>
      {todos.map(t => <ToDoListItem />)}
    </ul>
  );
}
```

Which approach to use is up to you.

#### 6. Pass each "todo" string as a prop to the `<ToDoListItem>`

##### 💪 Practice Exercise (1 minute)

- From `<ToDoList>`, pass each "todo" string as a prop named `todo` to each `<ToDoListItem>`.

  > Hint: In the mapping, the `t` parameter is the "todo" string

- Use React Developer Tools to verify:

  <img src="https://i.imgur.com/Zqf0Mpb.png">

#### 7. Refactor the `<ToDoListItem>` component to destructure the `todo` prop and render it instead of the "To Do Item" placeholder text

##### 💪 Practice Exercise (1 minute)

- You got this!

Nice!

<img src="https://i.imgur.com/gcD27dk.png">

## Properly Rendering Arrays of Components

Even though the array of `<ToDoListItem>` components is rendering fine, the Console shows the following warning:

<img src="https://i.imgur.com/HrUWSAD.png">

Whenever an array of components is rendered, React wants a special `key` prop added to each component so that it can more efficiently track changes when re-rendering.

The value assigned to the `key` prop must be unique among the array of components being rendered.

Since the user might enter the same To Do string, we can resort to using the index of the iteration:

```jsx
export default function ToDoList({ todos }) {
  return (
    <ul>
      {todos.map((t, idx) => (
        <ToDoListItem todo={t} key={idx} />
      ))}
    </ul>
  );
}
```

In this case, we are using the index of iteration as the `key`'s value because we can't guarantee that the to-do strings would be unique.  However, if the data, for example, had an `id`, or another unique property, you should assign that value to the `key` instead.

> Note:  The `key` prop is internal to React and cannot be accessed by the component it's being passed to.

## Props for React Elements

<details>
<summary>❓ What are React Elements?</summary>
<p>React's built-in components that emit DOM elements into the page.</p>
</details>

It's possible to add props to React Elements similar to how we add attributes to HTML tags.  For example, if you wanted to assign an `id` to a `<div>`:

```jsx
<div id="board">
  {/* contents of the board */}
</div>
```

However, some props have [differences as compared to their HTML equivalents](https://reactjs.org/docs/dom-elements.html#differences-in-attributes).

For example, we can style React Elements using two props similar to their HTML counterparts:

- **`className`**: Works like the HTML `class` attribute, simply named differently.
- **`style`**: Performs styling using the HTML `style` attribute, but must be passed an object.

## Intro to Styling React Elements

<details>
<summary>❓ Only React Elements can be styled, not user-defined components - why?</summary>
<p>

User-defined components do not actually find their way into the DOM, only React Elements do.  For example, you would never see a <code>&LT;ToDoList></code> tag in the DOM 🙂

</p>
</details>

Let's take a look at the basics of styling in React...

### Including CSS Stylesheets in a React App

CSS stylesheets can be included in a React app by simply importing them as shown in **App.js**:

```jsx
import React from "react";
import "./styles.css";
```

This is only made possible by the tooling, in this case, [Webpack](https://webpack.js.org/), has been configured.

When imported as shown above, all defined CSS rules will be included "globally".

For example, let's create a **ToDoListItem.css** stylesheet in the "React To-Do" project:

<img src="https://i.imgur.com/1SeQ8k7.png">

Next, using the same syntax as used in **App.js**, let's import **ToDoListItem.css** in **ToDoListItem.jsx**:

```jsx
import React from "react";
// Import the styles - making them available globally 
import "./ToDoListItem.css";
``` 

Again, importing a stylesheet includes its styles **globally** - it does not matter which component module the stylesheet is imported in. Also, it does not how many times the same stylesheet is imported, its styles will only be bundled in the resulting global CSS once.

<details>
<summary>❓ Why bother creating stylesheets for components since we can just put all of the styles in a single stylesheet like styles.css?</summary>
<p>It's a great way to organize CSS rules that apply only to a given component! Whereas <code>styles.css</code> is a great place for general, application-wide CSS.</p>
</details>

### Styling With the `className` Prop

Note the outer `<div>` in the `<App>` component:

```jsx
export default function App() {
  return (
    <div className="App">
      <h1>React To-Do</h1>
      <ToDoList todos={todos} />
    </div>
  );
}
```

The `className` prop is used to assign a CSS class or classes to a React Element.  However, since `class` is a reserved word in the JS language, React uses  `className` instead, which just happens to be the same name used by DOM elements. 

> Note: When you accidentally use a prop of `class` instead of `className`, the component will still render as expected, however, a warning will appear in the Console.

Let's add some CSS rules within **ToDoListItem.css**:

```css
.ToDoListItem {
  margin: 4vmin;
  padding: 2vmin;
  border: 1vmin solid purple;
  list-style: none;
  font-size: 6vmin;
}
```

<details>
<summary>❓ Why are we defining a class named <code>ToDoListItem</code> instead of using a simpler name such as <code>list</code>?</summary>
<p>To prevent name collisions between classes defined elsewhere.</p>
</details>

Finally, let's add the `ToDoListItem` CSS class to the `<li>` React Element in **ToDoListItem.jsx**:

```jsx
export default function ToDoListItem({ todo }) {
  return (
    <li className="ToDoListItem">{todo}</li>
```

That's better!

<img src="https://i.imgur.com/PMm3UpT.png">

> Power Tip:  We don't have to assign a simple string to `className`.  We can compute and assign CSS class name(s) dynamically because this is JS allowing us to assign any JS expression within curly braces - ternary expressions, template literals, etc.!

#### 💪 Practice Exercise - Use Another Stylesheet (5 minutes)

Although the list is looking better, notice that the it's slightly shifted to the right.  This is because HTML `<ul>` elements have some left padding by default.

1. Create a new stylesheet for the `<ToDoList>` component following the same conventions used above.

2. Import the new stylesheet into **ToDoList.jsx**.

3. In the stylesheet, define a CSS class that sets `padding-left` to `0`.

4. Apply that class to the `<ul>` React Element.

### Styling Using the `style` Prop

Although using inline styling via the `style` attribute in HTML is generally discouraged, in React, it's a common way to provide highly dynamic styling!

> Note: "highly dynamic styling" refers to styling that needs to be computed with each render. For efficiency reasons, use `className` as the primary styling prop.

The `style` prop in React differs from its HTML counterpart in that it must be assigned a **JS object** instead of a string value.

To demo its use, let's say we want to alternate the background color of each To Do based on whether its index it odd or even.

So the next thing we need to ask ourselves is:<br>**_How will each `<ToDoListItem>` component know if its odd or even?_**<br>Well, we're certainly going to have to pass an additional prop from its parent, `<ToDoList>`.

Further, we have two options, we can pass the actual index of the iteration or pass a computed prop like `isOdd`.

The first option, passing the index, provides a bit more flexibility because maybe we'll want to use it for other purposes, like displaying the number of the To Do.

##### 💪 Practice Exercise - Pass the Index of the Iteration (2 minutes)

1. Pass the index of the map iteration (`idx` parameter) to the `<ToDoListItem>` component using a prop named `index`.

2. In **ToDoListItem.jsx**, destructure the `index` prop being passed to it.

<hr>

Now let's use the `style` prop, assigning it an object literal to style the background color of the `<ul>`:

```jsx
export default function ToDoListItem({ todo, index }) {
  return (
    <li
      className="ToDoListItem"
      style={{
        backgroundColor: index % 2 ? "lavender" : "plum"
      }}
    >
      {todo}
    </li>
  );
}
```

Of course, you can use any named color, hex code, or `rgba()` value you wish - just be sure to quote it. Also, any numeric value assigned to a CSS property uses `px` as its unit by default.

<img src="https://i.imgur.com/CqKVnzc.png">

Use Chrome DevTools to confirm that the `style` prop results in a `style` attribute being added to the DOM element.

### Styling Using **CSS Modules**

**CSS Modules** provide an alternative to importing stylesheets the way we have done thus far.

Classes defined in CSS Modules are dedicated to the component they are imported within, thus they have the advantage of avoiding name collisions.

However, they are not as flexible because they only work with class selectors.

Read [this article](https://create-react-app.dev/docs/adding-a-css-modules-stylesheet/) to learn more.

## Update the **Fundamentals of React** Chart

Before wrapping up with the Essential Questions, let's review the following updates to the [Fundamentals of React Chart](https://gist.github.com/jim-clark/cbc87fdf01c22f412737ca121ef70761)...

| React Fundamental | Summary |
|---|---|
| ... | ... |
| [JSX](https://reactjs.org/docs/introducing-jsx.html) | <ul><li>A syntax extension to JS that looks like HTML and makes defining UIs more intuitive vs. pure JS.</li><li>JSX emits text in the page when a JS expression is surrounded with curly braces<br><code>&LT;div>{/* JS Expression */}&LT;/div></code>.</li><li>JSX transpiles into a function call that returns a JS object, thus, JSX can be assigned to variables, passed as arguments to functions, etc.</li><li>JSX can render an array of components, however, each component needs a `key` prop with a unique value.<br><code>const catList = cats.map(c => &LT;div key={cat.id}>{cat.name}&LT;/div>);</code>.</li></ul> |
| ... | ... |
| Props | <ul><li>Props are used to pass information (any JS expression) to a child component.</li><li>Function Components are passed a `props` object as an argument.</li><li>Props should never be updated - consider them immutable.</li><li>React Elements can be passed props that correspond to HTML attributes, e.g., `id`, `placeholder`, `pattern`, etc.  However, some are named or used slightly differently.</ul> |
| Styling | <ul><li>Only React Elements such as <code>&LT;div></code>, <code>&LT;form></code>, etc. can be styled because user-defined components aren't rendered to the DOM.</li><li>The `className` prop is used to assign classes and may be a JS expression resulting in a string of class name(s).</li><li>The `style` prop is used when styling needs to be computed each time the component renders and must be assigned a JS object with keys representing the camelCased names of CSS properties.</li></ul> |

## ❓ Essential Questions

1. True or False: JSX provides a clear, declarative approach to defining user interfaces.

2. True or False: React Elements are built-in components that become actual elements in the page's DOM.

3. Information is passed down through the component hierarchy using _______.

4. What is wrong with the following code:

    ```jsx
    function ListItem({ item, index }) {
      index = index + 1;
      return (
        <div>{index}: {item}</div>
      );
    }
    ```

5. The following `<ColorList>` component will render as expected, however, a warning will appear in the Console - why?

    ```jsx
    const colors = ['red', 'green', 'blue'];

    function ColorList() {
      return colors.map(c => <div>{c}</div>);
    }
    ```

6. The following `<BookItem>` component will render as expected, however, a warning will appear in the Console - why?

    ```jsx
    function BookItem({ book }) {
      return (
        <article class="BookItem">
          <div>Title - {book.title}</div>
          <div>Author - {book.author}</div>
        </article>
      );
    }
    ```

7. The following component will not work, why?

    ```jsx
    function PersonItem({ name, age }) {
      return (
        <section class="PersonItem">
          <div>{name}</div>
          <div style={`color: ${age < 21: 'red' : 'green'>}`}>
            {age}
          </div>
        </section>
      );
    }
    ```

## 💪 Challenge Practice Exercise - Display the To Do Number

1. Number each To Do sequentially - make it one-based 🙂

2. Style each To Do so that they look something like this:

    <img src="https://i.imgur.com/xlpHy55.png">

    > Hint: One word - flexbox!

## References

- [React Docs - Introducing JSX](https://reactjs.org/docs/introducing-jsx.html)

- [React Docs - JSX In Depth](https://reactjs.org/docs/jsx-in-depth.html)

- [Destructuring Assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
