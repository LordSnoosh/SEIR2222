<img src="https://i.imgur.com/VunmGEq.jpg">

# React Fundamentals - Using and Updating State

## Learning Objectives

|Students Will Be Able To:|
|---|
| Add State to a Function Component |
| Pass State to Children Components |
| Update State |
| Explain Why Not All Data Needs to be State |

## Road Map

- Setup
- Review of State
- Brief Intro to React Hooks
- Add State to a Function Component Using the `useState` Hook
- Using the Value of the State
- Updating State Using the `useState` Hook's Setter Function
- Defining State: Which Components and How Many?
- Not All Data Needs to Be State
- React Fundamentals Chart Update
- Essential Questions
- Further Study
- References

## Setup

This lesson will build upon the "React To-Do" sandbox we've been working with during the last couple of lessons in [codesandbox.io](https://codesandbox.io/):

<img src="https://i.imgur.com/BiuKtr9.png">

If you didn't have a chance to complete the challenge exercise of numbering the to-dos, make the following changes:

- Add a `<div>` to `<ToDoListItem>` before the `{todo}`:

  ```jsx
  <div className="flex-ctr-ctr">{index + 1}</div>
  {todo}
  ```

- Add that general purpose `flex-ctr-ctr` class to **styles.css**:

  ```css
  .flex-ctr-ctr {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  ```

- Update **ToDoListItem.css** to the following:

  ```css
  .ToDoListItem {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 4vmin;
    padding: 2vmin;
    border: 1vmin solid purple;
    list-style: none;
    font-size: 6vmin;
  }

  .ToDoListItem div {
    width: 8vmin;
    height: 8vmin;
    margin-right: 4vmin;
    background-color: black;
    color: white;
    border-radius: 50%;
  }
  ```

## Review of State

Just in case you haven't gotten it tattooed yet...

#### State is the data a program needs to "remember" while it's running.

State, the facts 😁:

- State is the single-source of truth of an application.
- State changes due to user interaction or when other events occur such as when a timer ticks.
- When state is updated, the user interface needs to be re-rendered to reflect the new state of the program - this fundamental concept might sound familiar from Unit 1.

<details><summary>❓ What state do we have in "React To Do"?</summary>
<p>
The <code>todos</code> array
</p>
</details>

> KEY POINT: In a React app, state is also used to drive a dynamic user interface. An example of this "UI State" would be if you wanted to hide/show a "details" component - you're going to need a piece of state to track whether or not to show the details!

## Brief Intro to React Hooks

Hooks were added to React in version 16.8.

In a nutshell, hooks allow components defined using a function to perform functionality that used to require that the component be defined as a class.

Consider what happens when React renders a Function Component:

1. React calls the function passing to it props as an argument.
2. The function runs and ultimately returns its UI (the JSX).
3. React uses the object returned by the JSX to compose the UI in the virtual DOM and update the DOM.

Now consider that when a function finishes running and returns, its scope is destroyed, thus any data held in variables is history!

So, how can a Function Component remember state?

Some of you might be thinking to yourselves - _What about using closures?_

Exactly!  Indeed, it's closures that enables hooks to remember state, as well as implement other stateful behavior!

Some facts about React hooks:

- Hooks are a way to add reusable stateful behavior to Function Components (they are unnecessary and won't work in class components).
- Hooks themselves are functions and must be named beginning with the word `use` as in `useEffect`.
- Hooks must be called at the top-level of the function and cannot be called conditionally. For example, a hook cannot be called within an `if` statement.  Basically, React must be able to depend on every hook being called in the exact same order every time the component renders (is invoked by React).
- It's possible to create custom hooks if the built-in hooks don't satisfy your cravings.

## Add State to a Function Component Using the `useState` Hook

React's [useState Hook](https://reactjs.org/docs/hooks-state.html) is used to remember and update state in a Function Component.

Let's briefly review the doc linked to above.  As you can see, the Function Component is more concise and likely easier to reason about. Not to mention having to worry about the proper binding of `this`, which definitely becomes an issue when a component needs to invoke an event handler.

### Adding the `todos` Array as State

Although the current `todos` array in **App.js** can be updated using `push`, etc., a very important thing won't happen if we do.

<details><summary>❓ What won't happen?</summary>
<p>

**A re-render will not be triggered!**

</p>
</details>

Okay, what are we waiting for?

The first thing we need to do is import the `useState` named export from the `React` library: 

```jsx
// App.js
import { useState } from "react";
```

> Note the syntax for importing **named** exports.  JS modules can have any number of **named** exports and only a single **default** export.

Next, inside of the Function Component we invoke `useState` and provide the initial value of the state as an argument.  Note that the initial value is only used to set the state's value when the component is rendered for the **first time**:

```jsx
export default function App() {
  const [todos, setTodos] = useState([
    "Have Fun",
    "Learn React",
    "Learn the MERN-Stack"
  ]);
  ...
```

The `useState` hook/function always returns an array with two elements where:

- The 1st element is the current value for the state
- The 2nd element is the setter function used to update the state's value

<details><summary>❓ So what's that going on with the <code>[todos, setTodos] = ...</code>?</summary>
<p>
That's <a href="https://javascript.info/destructuring-assignment#array-destructuring">array destructuring assignment</a>!  The call to <code>useState()</code> always returns an array with two elements and now we have two variables we can use to easily access those elements.
</p>
</details>

## Using the Value of the State

Did you notice that our To-Dos have continued to render just fine?

Using the value of the state is as simple as using the first element returned by `useState()`, which in our case, has been destructured into a variable named `todos` - and that variable (`todos`) continues to be passed to the `<ToDoList>` components as a prop.

We are free to use the variable holding the state's value any way we want, pass it as a prop, render it, etc.

However, we **do not** modify the state's value by reassigning to the state variable.  Instead, updating state is the job of the setter function...

## Updating State Using the `useState` Hook's Setter Function

When we invoked `useState()`, we destructured the returned array naming the second element `setTodos` because it is a setter function used to update the `todos` state to whatever we pass to the function.

By convention, we always name the setter function by pre-pending the name we assigned to the state value variable with the word `set` and adjusting the camelCasing.  For example, if you wanted to track the state of the board in a Tic-Tac-Toe app:

```jsx
export default function App() {
  const [board, setBoard] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  ...
}
```

<details><summary>❓ What line of code could you use to define state to track the winner in a Tic-Tac-Toe app?</summary>
<p>

```jsx
const [winner, setWinner] = useState(null); // if null represented no winner
```

</p>
</details>

We'll wait until the next lesson to update `todos`. For now, we'll practice with a different piece of state... 

#### 💪 Practice Exercise - Add a New Piece of State (1 minute)

- Add a `showTodos` state to "React To-Do" and initialize it to `true`;

### Rendering Conditionally

Now we can use the `showTodos` state to conditionally render the `<ToDoList>` component:

```jsx
export default function App() {
  ...

  return (
    <div className="App">
      <h1>React To-Do</h1>
      {/* Conditionally render ToDoList */}
      {showTodos && <ToDoList todos={todos} />}
    </div>
  );
}
```

We told you in Unit 1 how handy those logical operators like `&&` would be!  `&&` is used extensively in React to conditionally render a component or not.

<details><summary>❓ What kind of expression would we use to render one of two components?</summary>
<p>
A ternary expression!  For example:

```jsx
export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <div className="App">
      {user ? <HomePage /> : <LoginPage />}
    </div>
  );
}
```

</p>
</details>

Cool, the To-Dos are still being rendered because `showTodos` is `true`.

Let's use React Developer Tools to update the state:

<img src="https://i.imgur.com/sGHlL3A.png">

Toggling between `true`/`false` will result in `<ToDoList>` being rendered or not - very cool!

> Note how React has no way of knowing what we named our state - all it knows is the order in which the `useState` hooks were called.

### Replace, Don't Mutate State

Invoking the setter function will **replace** the value of the state.

Replacing primitive data types, e.g., numbers, strings & booleans, is gravy.  However, we should always **replace** objects (reference type), as well.

For example, in the next lesson we will be adding to-dos to the `todos` state array. When doing so, we will not use the `push` method, which mutates the array instead of replacing it with a new array.

The modern approach is to use [spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) for creating new arrays and objects from existing ones.

Here's a preview of how we might add a new to-do:

```jsx
function handleAddTodo(todo) {
  // Create a new array that includes the new todo
  const newTodos = [...todos, todo];
  // Update state and re-render
  setTodos(newTodos);
}
```

The `...` is the spread syntax and is used similarly to "spread" out the existing properties in objects.

The important thing to remember here though is to replace objects/arrays, not mutate them!

### Updating State is an Asynchronous Operation

Calling the `useState` hook's setter function is an asynchronous operation.

This means that any synchronous code following the call to the setter will be accessing the "current" value of the state variable, not the updated value.

The state's value won't actually be updated until the subsequent render.

[This sandbox](https://codesandbox.io/s/updating-state-is-asynchronous-k6jbv?file=/src/App.js) demonstrates this.

### Triggering a Re-Render

**IMPORTANT:** Updating state by invoking a setter function will cause that component to re-render!

<details><summary>❓ When a component renders its child components in its JSX, what do those child components do?</summary>
<p>

**They render their children and so on.**

</p>
</details>

## Defining State: Which Components and How Many?

### State/Information Can Only Be Passed Down

<details><summary>❓ State can only be passed DOWN the component hierarchy via _______</summary>
<p>

**Props**

</p>
</details>

<img src="https://i.imgur.com/6CT8foa.jpg">

Typically, you'll find that most state needs to be defined in the `<App>` component.

However, we can avoid unnecessary "prop drilling" by moving state to the first component in common with the other components that need to use that state.

<details><summary>❓ If a piece of state needed to be used only by the green and black components, where should the state be defined?</summary>
<p>

**In the green component**

</p>
</details>

<details><summary>❓ If a piece of state needed to be used by the dark blue and light blue components, where would the state be defined?</summary>
<p>

**In the top (yellow) component, which typically would be `<App>`**

</p>
</details>

### Categorizing State

We can think of there being two general categories of state:

- Data-related state
- UI-related state

### UI-Related State

UI-related state is state used to control the dynamic rendering of the UI. For example, you click an [EDIT] button and an `<input>` is displayed instead of a `<div>`.

<details><summary>❓ We've actually defined UI-related state already. What's the name of the variable holding the UI-related state?</summary>
<p><code>showTodos</code></p>
</details>

UI-related state is usually defined in the component that uses it and since no other component would likely need to access its value.

However, if for some reason the UI-related state needed to be accessed higher up in the hierarchy, then it would need to be defined high enough to be accessed by all components that need to access it.

### Data-Related State

Data-related state holds the data that the application is about. For example, in "React To-Do", it's the `todos` array.

It's common to define all state that represents data first in `<App>`.  This makes it possible to pass that state to any component that needs it.

Then later, the app can be refactored to move state down the hierarchy to avoid having to pass the same prop through multiple components that don't need it and are simply passing the prop down the hierarchy to its ultimate destination.  This is known in React as "Prop Drilling".

"Prop Drilling" is the way React is designed to work, however, it can be a bit tedious and has led to alternative approaches to delivering state directly to the component that needs it vs. being passed down the hierarchy via props.  Some alternative approaches are listed in the Further Study section.

### How Many State Variables Can We Use?

A Function Component can call `useState` as many times as necessary. For example:

```jsx
export default function App() {
  const [board, setBoard] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [turn, setTurn] = useState(1);
  const [winner, setWinner] = useState(null);
  ...
}
```

However, it's not always necessary to break up state into multiple `useState()` calls because a single state can be a JS object which would hold any number of values in its properties.

For example, if we needed to hold the state for a sign up form, we can do this:

```jsx
export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
}
```

Instead of this:

```jsx
export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
}
```

Grouping related state makes sense, especially when you need to send that state to the backend.

## Not All Data Needs to Be State

Not all data needs to be defined as state.

Consider the Tic-Tac-Toe app where some of you used a `WINNING_COMBOS` array that held nested arrays with winning index patterns.

<details><summary>❓ Why wouldn't <code>WINNING_COMBOS</code> need to be defined as state?</summary>
<p><code>winningCombos</code> is a constant lookup data structure that never changes. </p>
</details>

> KEY POINT:  Only data that you want to cause a re-render when it changes should be defined as state.

### How to Persist Non-State Data

How we do we persist non-state data?

It depends upon whether that component needs its own copy of that data or not...

#### Component Does **Not** Need Its Own Copy of the Non-State Data

When there only needs to be one copy of the data because its value is not accessed by other components, or all components should access the same value, then we can simply define a variable outside of the Function Component like we did initially with the `todos` array.

#### Component Needs Its Own Copy of the Non-State Data

If a Function Component needs to remember its own copy of non-state data between renders, it **can't** define a variable in or outside of the function.

An example of this situation might be a list of components that each have their own timer created with `setInterval`.  It would be necessary for each component to remember the id of its timer so that it can `clearInterval` at some point. 

There is another hook for this scenario:  [useRef](https://reactjs.org/docs/hooks-reference.html#useref).

There's no need to cover it now, but it's good to know that the `useRef` hook allows a Function Component to remember non-state data between renders. Also, data remembered using a "ref" is mutable and can be updated without triggering a re-render.

## React Fundamentals Chart Update

Yup, time to update our [React Fundamentals Chart](https://gist.github.com/jim-clark/cbc87fdf01c22f412737ca121ef70761) before wrapping up with the Essential Questions.

| React Fundamental | Summary |
|---|---|
| ... | ... |
| State | <ul><li>When a component's state is updated, the component re-renders.</li><li>Most state is data-related, i.e., related to the purpose of the application. However, a component can use UI-related state to control the dynamic rendering of its UI.</li><li>The `useState` hook is used to manage state in a Function Component.</li><li>Invoking `useState(<initial value of the state>)` returns an array whose first element is the state's current value and whose second element is a setter function used to update the state's value.</li><li>Only data that you want to cause a re-render when it changes should be defined as state.</li></ul> |

## ❓ Essential Questions

1. In general, why were hooks added to React?

2. What React hook is used to manage state in a Function Component?

3. How do we update the value of state?

4. True or False:  Only data that you want to cause a re-render when it changes should be defined as state.

## Further Study

### Learn More About Hooks

To learn more about hooks, read [Introducing Hooks](https://reactjs.org/docs/hooks-intro.html) in the docs.

### Built-in Hooks and their use cases:

| Hook | Use Case |
|---|---|
|[`useState()`](https://reactjs.org/docs/hooks-reference.html#usestate)|Used to manage state in a Function Component.|
|[`useEffect()`](https://reactjs.org/docs/hooks-reference.html#useeffect)|Used to implement "side effects", e.g., fetching data, using timers, subscriptions, etc.<br>`useEffect()` implements the functionality of class components' `componentDidMount`, `componentDidUpdate` & `componentWillUnmount` with a single hook!|
|[`useRef()`](https://reactjs.org/docs/hooks-reference.html#useref)|In addition to how refs are used to access DOM elements in class components, `useRef()` can be used more generally to "remember" any non-state data that needs to be persisted between renders similar to how we use instance properties in class components. |
|[`useReducer()`](https://reactjs.org/docs/hooks-reference.html#usereducer)|An alternative to `useState()` for when the state is more complex.  It uses a reducer function and "actions" to update state - similar to how Redux does (but not as comprehensive).|
| Other built-in hooks|[`useContext()`](https://reactjs.org/docs/hooks-reference.html#usecontext)<br>[`useMemo()`](https://reactjs.org/docs/hooks-reference.html#usememo)<br>[and other less common hooks here...](https://reactjs.org/docs/hooks-reference.html#useimperativehandle)|

### Alternative State Management Approaches

Note that although there are alternatives to using the `useState` hook, be aware that there's a learning curve with each alternative and that no alternative should be considered until you have mastered the fundamentals of React.

Some alternatives to using `useState` are:

- [Redux](https://redux.js.org/) is a popular real-world state management alternative.  However, it requires quite a bit of setup and is overkill for most apps. Although still popular, Redux has been falling out of favor lately.

- React's [Context API](https://reactjs.org/docs/context.html) can be combined with the [useReducer hook](https://reactjs.org/docs/hooks-reference.html#usereducer) to provide a lighter-weight alternative to Redux.

- [MobX](https://mobx.js.org/README.html) is another popular alternative, like Redux, it's popularity has probably peeked.

## References

- [React Docs - Introducing JSX](https://reactjs.org/docs/introducing-jsx.html)

- [React Docs - JSX In Depth](https://reactjs.org/docs/jsx-in-depth.html)