<img src="https://i.imgur.com/VunmGEq.jpg">

# Intro to React & Components

## Learning Objectives

|Students Will Be Able To:|
|---|
| Explain the Use Case of React |
| Explain What Components Are |
| Explain How React Renders a User Interface |
| Compose a UI Using Components |
| Use React DevTools |

## Road Map

- What is React?
- Why Use React?
- Creating a React App
- Components
- How a React App is Loaded and Renders
- Designing User Interfaces Using Components
- Let's Define a Component
- Practice Exercise: Define Another Component
- Install and Open React Developer Tools 
- References

## What is React?

- An open-source JavaScript library used to **build and render user interfaces** in the browser.
- It was open-sourced in May of 2013.
- Created by Jordan Walke, a Facebook engineer.
- Now being used by companies such as Netflix, Imgur, Airbnb, Walmart, and many more.
- React Native, a separate library, can be used to develop native iOS and Android mobile apps.

## Why Use React?

[React](https://reactjs.org/) is the most popular (by far) front-end library for building highly dynamic user interfaces used in today's modern single-page applications.

> A single-page application (SPA) updates its UI "in-place" vs. the traditional web apps we've built thus far where the browser replaces the entire web page each time the user interacts with it.

Most importantly, you want to learn to use React because...

<figure>
  <img src="https://i.imgur.com/suRluSZ.png">
  <figcaption><i>Source: Indeed</i></figcaption>
</figure>

## Creating a React App

### `npx create-react-app <app name>`

The React team has developed a wonderful script for generating React apps.

The following command will create a skeleton React app within a new directory:

```
npx create-react-app <app name>
```

> Note that `npx` is a "package runner" and comes with `npm` versions 5.2.0 and later and is now the recommended approach to running `create-react-app`.  Be aware that you will find many React tutorials that show installing and running `create-react-app` without using `npx`. 

However, before you start creating React app after React app, note that each one consumes approximately 270MB of disk space!  This is due to the sheer number of Node modules a React project requires thanks to its build tools, development server, etc.

Although using `npx create-react-app <app name>` (CRA) is the best way to start an actual React project, we can save our disk space when learning and experimenting by using the most excellent code playground, [CodeSandbox](https://codesandbox.io/)...

### CodeSandbox Starting React App

You'll want to set up a new account and create a new React sandbox...

<img src="https://i.imgur.com/04j3S4k.png">

CodeSandbox itself is a React app and uses the underlying editor of VS Code.

We can manage the project's files in the left-pane, edit code another pane, and see the live output in a pane or in its own browser tab (which is excellent for debugging).

Let's rename our sandbox to something like "React To-Do" by editing the temporary name:

<img src="https://i.imgur.com/iiu7JXl.png">

#### React Apps Are 100% JavaScript

Despite its purpose being to render UIs, React applications are written entirely using 100% JavaScript.

Sure, a React app uses CSS for styling rendered elements, but there is no HTML anywhere in a React app.

But what about that HTML-looking code you ask...

```js
<div className="App">
  <h1>Hello CodeSandbox</h1>
  <h2>Start editing to see some magic happen!</h2>
</div>
```

Well, that's not HTML, it's JSX! JSX is fundamental to React and we'll cover it in detail in the next lesson.

Let's start a list of React Fundamentals that we can add to as the lessons unfold...

| React Fundamental | Summary |
|---|---|
| [React](https://reactjs.org/) | <ul><li>A JS library for building dynamic UIs</li></ul> |
| [JSX](https://reactjs.org/docs/introducing-jsx.html) | <ul><li>A syntax extension to JS that looks like HTML and makes defining UIs more intuitive vs. pure JS</li></ul> |

Let's make some changes by editing the JSX as follows:

```js
<div className="App">
  <h1>React To-Do</h1>
  <ul>
    <li>Learn React</li>
    <li>Learn the MERN-Stack</li>
  </ul>
</div>
```

#### Modern JavaScript

CodeSandbox's starting React app uses modern JavaScript.

For example, note the use of `import` at the top of **index.js**.  Similar to how we used `require` in Node, `import` allows us to access the functionality that is exported by other JavaScript files (modules).

[JavaScript Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) were introduced with ES2015 and they're really cool. However, you're probably wondering if they're so cool, why haven't we used them yet. The answer is that their use requires tooling known as a "module bundler", the most popular being [webpack](https://webpack.github.io/), used by React projects created using CRA.

As React developers, we frequently use the latest features of JavaScript such as the **spread operator**, **destructuring assignment**, etc.

### ❓ Review Questions - React

1. **What is the purpose of the React library?**

2. **True or False: React uses HTML to define user interface.**

## Components

### What Are Components?

Components are the building block of UIs and are fundamental to today's front-end libraries/frameworks, including [React](https://reactjs.org/), [Angular](https://angular.io/) & [Vue](https://vuejs.org/).

Let's contrast two different kinds of components:

- User-defined components that we as developers define
- Built-in components that are part of the React library

### User-Defined Components

We code user-defined components and use them to compose the application's user interfaces.

In the "React To-Do" sandbox, there is a single user-defined component, `<App>`, that's defined and exported in the **App.js** module:

```js
export default function App() {
  return (
    <div className="App">
      <h1>React To-Do</h1>
      <ul>
        <li>Learn React</li>
        <li>Learn the MERN-Stack</li>
      </ul>
    </div>
  );
}
```

> IMPORTANT: User-defined components must be named using UpperCamelCasing.

A component may be defined using a JS function or class.  Since the introduction of "React hooks" a couple of years ago, the trend has been to code components exclusively with functions.

Our user-defined components commonly render other user-defined components and/or React's built-in components...

### React Elements

**React Elements** are components built into React.

A React Element exists for each HTML element we're familiar with and thus, are easily recognizable in the JSX.

> Note: React Elements will always be in lowercase.

**❓ What React Elements do you see in the JSX of the "React To-Do" sandbox?**

When a React Element is rendered, its corresponding HTML element will be created in the HTML document (DOM).

Using Chrome DevTools, open the output of the sandbox in its own tab and observe the HTML elements created by the `<App>` component's JSX:

<img src="https://i.imgur.com/bTGpR8b.png">

Note that the HTML elements map directly to the React Elements in the JSX.

### HTML/Component Hierarchy

In a React app, the tree-like hierarchy of the HTML elements in the browser document in a result of a hierarchy of components being rendered.

At the top of that component hierarchy is, by convention, a user-defined component named `<App>`.

Let's see how the `<App>` component is rendered for the first time when the React app loads...

## How a React App is Loaded and Renders

Here's what happens when a user browses to a web app that uses React for its front-end UI:

<img src="https://i.imgur.com/VF9wBLL.png">

When React renders a Function Component, it simply runs that function and renders what the function returns.

Similarly, a Class Component's `render` method is invoked, and like a Function Component, React renders what the `render` method returns.

### High-Performance Rendering of Components

Rendering happens frequently in a React app (whenever state changes), but thanks to React's ingenious design, it's very fast and efficient because React does not render components directly into the browser DOM because manipulating the DOM is time consuming (in terms of compute time).

Instead, React:

1. Renders all React Element components into a [Virtual DOM](https://reactjs.org/docs/faq-internals.html#gatsby-focus-wrapper).
2. After all components have been rendered, React compares the current Virtual DOM to the previous Virtual DOM and computes what is called the "diff".
3. React uses the "diff" to make only the necessary changes to the actual DOM in the browser.
  <img src="https://i.imgur.com/LC7wclE.jpg">

Time to add to our React Fundamentals chart...

| React Fundamental | Summary |
|---|---|
| ... | ... |
| Components  | <ul><li>A user interface is defined by a hierarchy of components</li></ul>|
| User-Defined Component | <ul><li>May be defined as a function or class but must be named using UpperCamelCasing</li><li>May hold and manage application state</li><li>May contain or utilize application logic such as fetching data, implementing the win/loss logic of a game, etc.</li></ul> |
| React Elements | <ul><li>React's built-in components, such as `<div>`, that render their corresponding HTML element into the DOM</li><li>Are always named using lowercase</li></ul> |
| [`ReactDOM.render()`](https://reactjs.org/docs/react-dom.html#render) method | <ul><li>Renders the React app's top-level component for the first time when the app's JS is loaded in the browser</li></ul> |
| When a Component's State is Updated | <ul><li>The component is re-rendered</li><li>All children components are also rendered, and so on until there are no more components to render</li></ul> |

### ❓ Review Questions - Components

1. **True or False:  User-defined components must be named in lowercase.**

2. **True or False:  A Function Component is a component that is written as a JS function and returns its user interface as JSX.**

3. **True or False:  When a component is rendered, all of its children are also rendered.**

4. **After a React app is rendered for the first time by the `ReactDOM.render()` method, components re-render when ________ is updated.**

5. **True or False:  If a React app consisted of only user-defined components, no HTML elements would be emitted to the browser's DOM.**

## Designing User Interfaces Using Components

To develop a React application, we compose the UI using a hierarchy of components.

For example, take the following wireframe/app:

<img src="https://i.imgur.com/hL1T2tH.png">

The above could be broken into the following components:

<img src="https://i.imgur.com/TqerRDf.png">

We must get used to thinking about our UI in terms of components. This "Component Thought" requires us to:

- Build several small components to make the code more manageable.
- Compose (combine) these components into other components.
- Compose page-level components that render according to which client-side route is active.

## Let's Define a Component

Let's refactor "React To-Do" so that the `<App>` component renders a `<ToDoList>` component instead of the `<ul>` and its contents...

### Define a `ToDoList.jsx` Module

Click on the **src** folder in the sandbox and use its GUI to create a new file named **ToDoList.jsx**.

Modules should be named the same as the component, i.e., using UpperCamelCasing.

> By using `.jsx` as the module's extension, we'll get better code completion and a cool React icon by the filename.

### `import` the React Library

At the top of the module, let's import React:

```js
import React from 'react';
```

Those of you with a keen eye might be wondering why `React` is imported but never referenced anywhere in **App.js**.  The reason is that JSX transpiles into JS that uses the `React` class to create components, etc.  We'll see this in the next lesson.

> News Flash:  Importing `React` is no longer necessary with version 17+, however, in CodeSandbox it's still required.<br>Double-News Flash:  As of 2021, CodeSandbox is now golden too!

### Stub up and export the Function Component

Let's stub up `<ToDoList>` as follows:

```jsx
export default function ToDoList() {

}
```

Note that you may also see components exported using another line of code like this:

```jsx
function ToDoList() {

}

export default ToDoList;
```

Cool.  So ultimately, a Function Component must return its UI (JSX).

As planned, let's move the `<ul>` and its contents from **App.js** to our new component and `return` it:

```jsx
export default function ToDoList() {
  // Application logic, etc. goes here
  return (
    <ul>
      <li>Learn React</li>
      <li>Learn the MERN-Stack</li>
    </ul>
  );
}
```

> Tip:  Saving the file (`command + s`) in the sandbox will auto-format the code.

### Update `<App>` to Render the `<ToDoList>` Component

Now let's import and render the `<ToDoList>` component in **App.js**:

```jsx
// Default imports can be named anything
import ToDoList from "./ToDoList";

export default function App() {
  return (
    <div className="App">
      <h1>React To-Do</h1>
      <ToDoList />
    </div>
  );
}
```

> If a component is empty (does not have any content), it must be self closed using `/>` or less commonly like `<ToDoList></ToDoList>`.

The app should now be rendering the same as before the `<ToDoList>` refactor:

<img src="https://i.imgur.com/6oktFlu.png">

## 💪 Practice Exercise: Define and Render Another Component (5 mins)

Your turn to create and render another component:

- Refactor "React To-Do" so that the `<ToDoList>` component renders two `<ToDoListItem>` components instead of the two `<li>` components.
- Define the `<ToDoListItem>` component in its own JS module using the proper naming convention.
- Simply have the `<ToDoListItem>` component render `<li>To Do Item</li>`. In the next lesson you will learn how to render data passed to the component.

This is what you will see when finished:

<img src="https://i.imgur.com/2WIctBO.png">

## Install and Open React Developer Tools 

You may have noticed that CodeSandbox has a **React DevTools** tab used to troubleshoot components.

We definitely want to be able to do the same in Chrome!

Browse to the [React Developer Tools extension](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) and install it.

Now when DevTools are open, you'll find a **Components** option available on the far right (you may have to click the `>>` to see it):

<img src="https://i.imgur.com/4bt00fX.png">

Clicking it reveals an amazing tool for browsing the component hierarchy and inspecting the details of a component's state and props (yet to be discussed).

<img src="https://i.imgur.com/m0OtmYn.png">

## References

[Our Fundamentals of React Chart](https://gist.github.com/jim-clark/cbc87fdf01c22f412737ca121ef70761)

[React Docs](https://facebook.github.io/react/)
