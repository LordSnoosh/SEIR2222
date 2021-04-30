<img src="https://i.imgur.com/IKHxRMa.png">

# MERN-Stack Infrastructure - Part 2

## Learning Objectives

|Students Will Be Able To:|
|---|
| Add `user` State to the MERN-Stack App |
| Selectively Render Components Using a Ternary Expression |
| Implement Client-Side Routing Using the React Router Library |
| Implement Basic Navigation in a MERN-Stack App |

## Road Map

- The Plan - Part 2
- Infrastructure - Part 2 of 7
- The Lab
- Further Study

## The Plan - Part 2

In Part 2 we will implement client-side routing as we continue to learn how to build a MERN-Stack app by following a realistic workflow.

**Part 2 - Client-Side Routing:**
1. Set up `user` state
2. Add skeleton page-level components
3. Conditionally render based on the `user` state 
4. Intro client-side routing using React Router
5. Implement client-side routing
6. Utilize a `<Redirect>` component
7. Implement a typical navigation bar

## 1. Set Up `user` State

Before we jump into the routing, let's set up some state that we can use to dynamically render different components depending upon two factors:

- Is there a logged in user?
- If the user is logged in, render different page-level components according to the path in the address bar.

The following diagrams the routing in SEI CAFE:

<img src="https://i.imgur.com/UwNRJYv.png">

Note that `<App>` is always rendered but only one of the other page-level components render.

### Is There a Logged In User?

A good place to start is to define the `user` state.

#### 💪 Practice Exercise - Define the `user` State in **App.jsx** (2 minutes)

1. Use the `useState` hook to define a state variable named `user`.
2. Initialize `user` to `null`. 
3. The setter function should be named according to convention.

> Hint: Don't forget to add the necessary import.

## 2. Add Skeleton Page-Level Components

Now that we have the `user` state, let's continue setting up routing by stubbing up those three page-level components above.

<details><summary>❓ In which folder will we define these new page-level components?</summary>
<p>

**src/pages**

</p>
</details> 

#### 💪 Practice Exercise - Stub up SEI CAFE's page-level components (5 minutes)

1. Create the `<AuthPage>`, `<NewOrderPage>` and `<OrderHistoryPage>` components.
2. Be sure to follow best practices (each in their own folder, etc.) and naming conventions. 
3. Each component should simply render an `<h1>` with the name of the component as its content, e.g., `<h1>AuthPage</h1>`.

> Hint: Be productive by defining one component, then copy/paste its folder and rename everything.

## 3. Conditionally Render Based On the `user` State

We've already seen how to conditionally render components by using:

- Ternary expressions: Used to render one component or another.
- Logical (`&&`) expressions: Used to render a component or nothing.

Examining our routing diagram above, we can see that we are conditionally rendering based upon whether the state of `user` is `null` (user not logged in) or not `null` (user logged in).

Since we want to render either `<AuthPage>` or one of the other two (`<NewOrderPage>` or `<OrderHistoryPage>`), we'll opt for a _______ expression.

Until we start using React Router, we'll just render `<NewOrderPage>` if there's a user logged in.

Here's the refactor in **App.jsx**:

```jsx
return (
  <main className="App">
    { user ?
      <NewOrderPage />
      :
      <AuthPage />
    }
  </main>
);
```

You'll have an error if the components were not automatically imported. Let's ensure all three components are imported while we're at it:

```jsx
import './App.css';
// Import the following components
import AuthPage from '../AuthPage/AuthPage';
import NewOrderPage from '../NewOrderPage/NewOrderPage';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';
```

> Tip: `command + D` comes in handy for using multiple cursors to edit.

After the imports we're rendering the `<AuthPage>` as expected.

<img src="https://i.imgur.com/QvEh2m6.png">

Updating the hook's State to any truthy value will result in `<NewOrderPage>` rendering instead!

Now let's learn about how we can use React Router to perform client-side routing...

## 4. Intro to Client-Side Routing Using React Router

The React library does not include routing functionality.

[React Router](https://reactrouter.com/) is the de facto client-side routing library for both React and [React Native](https://reactnative.dev/).

### Install React Router

Since it's a third-party library, React Router must be installed:

```
npm i react-router-dom
```

> `react-router-dom` is the web-based router used with React apps.  `react-router-native` is the library for React Native.

### How it Works - React Router Is Component-Based!

**React Router provides several components used to conditionally render our app's components based upon the path of the URL in the address bar**

Please read the above again because it's fundamental to understanding how React Router works.

### The `<BrowserRouter>` Component

[`<BrowserRouter>`](https://reactrouter.com/web/api/BrowserRouter) is the top-level React Router component that makes React Router work.

Only a single `<BrowserRouter>` needs to be rendered and any components that need to use routing features must be nested within it, thus, the convention is to wrap the `<App>` component.

<details><summary>❓ In which module will we need to wrap <code>&LT;App></code> with <code>&LT;BrowserRouter></code>?</summary>
<p>

**index.js**

</p>
</details> 

Check out how we can use an **alias** with the `as` keyword when importing:

```jsx
import App from './pages/App/App';
// Import the top-level BrowserRouter component
import { BrowserRouter as Router } from 'react-router-dom';
```

Now let's refactor so that `<App>` is rendered by `<Router>`:

```jsx
ReactDOM.render(
  <React.StrictMode>
    <Router><App /></Router>
  </React.StrictMode>,
  document.getElementById('root')
);
```

Using React Developer Tools we can see that the `<BrowserRouter>` component renders a few other components then our `<App>` component:

<img src="https://i.imgur.com/Je9AZYy.png">

> Note: Those components named ending with `.Provider` are using React's [Context API](https://reactjs.org/docs/context.html) to provide info to  components down in the component hierarchy without having to pass that info as props. 

## 5. Implement Client-Side Routing

Because React Router is component-based, it can be used in **any** component to conditionally render other components.

This enables us to build an elaborate hierarchy of conditionally rendered components!

However, most React apps only need to perform routing in the `<App>` component - let's see how...

### The `<Route>` Component

The [`<Route>`](https://reactrouter.com/web/api/Route) component is the main component used to conditionally render other components.

**`<Route>` works by simply rendering its children if its `path` prop matches the current URL in the address bar!**

### Rendering Components According to the Path of the URL

Once again referring to the routing diagram for SEI CAFE shows that we want to render:

- `<NewOrderPage>` when we browse to `/orders/new`, and
- `<OrderHistoryPage>` when we browse to `/orders`

So, instead of rendering `<NewOrderPage>` directly, let's wrap it with a `<Route>` component with its `path` prop set to `/orders/new`:

```jsx
return (
  <main className="App">
    { user ?
      <Route path="/orders/new">
        <NewOrderPage />
      </Route>
      :
      <AuthPage />
    }
  </main>
);
```

Yup, we've got to import the `<Route>` component:

```jsx
import { useState } from 'react';
// Add the following import
import { Route } from 'react-router-dom';
```

Then, to avoid having to continually update the `user` state using React Developer Tools, let's temporarily initialize `user` to an empty object instead of `null`:

```jsx
const [user, setUser] = useState({});
```

Now, thanks to the `<Route>` component, changing the path of the URL to `/orders/new` will render the `<NewOrderPage>` component as expected:

<img src="https://i.imgur.com/JxQVTFx.png">

You may find it interesting that a URL path of `/orders/new/something-else` will also render `<NewOrderPage>` - let's see why...

### Using the `<Switch>` Component to Render Only One `<Route>` 

By default, React Router will render all `<Route>` components with a partial match of its `path`.

To demonstrate, let's add a [React Fragment](https://reactjs.org/docs/fragments.html) and a second `<Route>` used to conditionally render `<OrderHistoryPage>`:

```jsx
return (
  <main className="App">
    { user ?
      <>
        <Route path="/orders/new">
          <NewOrderPage />
        </Route>
        <Route path="/orders">
          <OrderHistoryPage />
        </Route>
      </>
      :
      <AuthPage />
    }
  </main>
);
```

Because the additional `<Route>` component's `path="/orders"` partially matches the address bar's URL of `/orders/new`, it also is being rendered:

<img src="https://i.imgur.com/rzZLS54.png">

This "inclusive" rendering is by design, however, typically, you will want only one component to render for which there are two solutions:

- Add an [`exact`](https://reactrouter.com/web/api/Route/exact-bool) prop to the `<Route>` component
- Wrap the `<Route>` components with the [`<Switch>`](https://reactrouter.com/web/api/Switch) component and order the `<Route>` components with the "longer" (more specific) paths first.

Simply adding an `exact` prop to a `<Route>` will result in that component rendering only if its `path` matches the URL's path exactly.  For example:

```jsx
<Route exact path="/orders">
```

> In React, if we don't a assign a value to a prop, it defaults to a value of `true`, e.g., `exact={true}`

Another solution is to use React Router's `<Switch>` component which will render the first matching `<Route>` **only**.

Let's use `<Switch>` instead of `<>` to wrap the `<Route>` components:

```jsx
<Switch>
  <Route path="/orders/new">
    <NewOrderPage />
  </Route>
  <Route path="/orders">
    <OrderHistoryPage />
  </Route>
</Switch>
```

Yup, we'll need to add `Switch` to the named imports:

```jsx
import { Route, Switch } from 'react-router-dom';
```

Now only the `<NewOrderPage>` or `<OrderHistoryPage>` will render as expected!

However, the order of those `<Route>` components matter if not using the `exact` prop - flip them and you'll see that it's no longer possible to render `<NewOrderPage>` - **why?**.

## 6. Utilize a `<Redirect>` Component

React Router includes a [`<Redirect>`](https://reactrouter.com/web/api/Redirect) component, that if rendered, will result in a redirect to the specified path assigned to its `to` prop.

`<Redirect>` is great for handling the use case of when a user attempts to browse to a non-existent client-side route.

It is typically included as the last component within the `<Switch>` like this:

```jsx
<Switch>
  <Route path="/orders/new">
    <NewOrderPage />
  </Route>
  <Route path="/orders">
    <OrderHistoryPage />
  </Route>
  <Redirect to="/orders" />
</Switch>
```

Yup, another named import:

```jsx
import { Route, Switch, Redirect } from 'react-router-dom';
```

<details><summary>❓ Without the <code>&LT;Redirect></code> what will happen if a bad URL is browsed to?</summary>
<p>

**No child component of the `<Switch>` will be rendered.**

</p>
</details> 

## 7. Implement a Typical Navigation Bar

Although SEI CAFE does not utilize a typical navigation bar, we'll code one as part of the infrastructure since many MERN-Stack apps will utilize one.

#### 💪 Practice Exercise - Stub up a `<NavBar>` component (3 minutes)

1. Create a `<NavBar>` component within the `components` folder.
2. `<NavBar>` should render a `<nav>` React Element with the text "NavBar" as its only content for now.
3. Import `<NavBar>` in **App.jsx**

<hr>

<details><summary>❓ Assuming we want <code>&LT;NavBar></code> to always display when there's a logged in user and before the page-level component, where would we add it to the JSX?</summary>
<p>

**Right before the `<Switch>`, requiring a React Fragment to wrap `<NavBar>` and the `<Switch>`.**

</p>
</details>

<br>

Yup, just like this:

```jsx
return (
  <main className="App">
    { user ?
      <>
        <NavBar />
        <Switch>
          <Route path="/orders/new">
            <NewOrderPage />
          </Route>
          <Route path="/orders">
            <OrderHistoryPage />
          </Route>
          <Redirect to="/orders" />
        </Switch>
      </>
      :
      <AuthPage />
    }
  </main>
);
```

Resulting in this for now:

<img src="https://i.imgur.com/ThY0xki.png">

<details><summary>❓ Assuming we want <code>&LT;NavBar></code> to render at all times, where would we add it to the JSX?</summary>
<p>

**Right after `<main>` before the ternary expression.**

</p>
</details> 

### The `<Link>` Component

<details><summary>❓ What HTML element did we use to change the URL in our previous web apps?</summary>
<p>

**The `<a>` hyperlink element.**

</p>
</details> 

<details><summary>❓ What would happen if we used traditional HTML hyperlinks in a SPA?</summary>
<p>

**It would cause a page reload when performing the navigation.**

</p>
</details> 

Luckily, React Router provides a [`<Link>`](https://reactrouter.com/web/api/Link) component that renders hyperlinks that when clicked, change the URL client-side only without triggering an HTTP request.

Here's how we can use `<Link>` components in **NavBar.jsx** to change the route client-side:

```jsx
// Don't forget the import
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav>
      <Link to="/orders">Order History</Link>
      &nbsp; | &nbsp;
      <Link to="/orders/new">New Order</Link>
    </nav>
  );
}
```

Clicking any of the links performs client-side routing where React Router will:

- Update the path in the address bar without causing the page to reload
- Automatically trigger a render

<img src="https://i.imgur.com/R5aElPF.png">

Check out React Router's [`<NavLink>`](https://reactrouter.com/web/api/NavLink) component which behaves like `<Link>`, but makes it easier to apply dynamic styling based upon the current URL.

> IMPORTANT:  Inspecting the elements on the page will reveal that indeed an `<a>` element is being emitted to the DOM when we use a `<Link>` component.  However, although they look like ordinary `<a>` elements, React intercepts their click event thus preventing an HTTP request from being sent. However, if you accidentally use an `<a>` tag, React will not intercept the click event and a page reload will occur 😞

Although we've learned most there is to know about client-side routing, we will learn more in future lessons, including how to change client-side routes programmatically (via code).

#### Congrats on implementing client-side routing!

On to the lab!

## Further Study

### Route Params - Client-Side

- Check out React Router's [`useParams`](https://reactrouter.com/web/api/Hooks/useparams) hook that allows you to access route parameters similar to how we did in Express.

### Other Topics

- Use React Router's [`<NavLink>`](https://reactrouter.com/web/api/NavLink) component when you want to style hyperlinks dynamically based upon the current URL.

- Learn more about the [Context API](https://reactjs.org/docs/context.html) which is a way to provide info to child components without having to pass that info as props.