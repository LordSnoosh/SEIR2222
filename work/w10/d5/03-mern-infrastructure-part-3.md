<img src="https://i.imgur.com/IKHxRMa.png">

# MERN-Stack Infrastructure - Part 3

## Learning Objectives

|Students Will Be Able To:|
|---|
| Follow a Process for Adding Functionality to a MERN-Stack App |
| Define a Component as a Class |
| Organize Non-React Code Into Service & API Modules |

## Road Map

- The Plan - Part 3
- Infrastructure - Part 3 of 7
- Further Study

## The Plan - Part 3

In Part 3 we will begin to implement the ever so important user authentication.

Along the way we'll also learn how to define a component as a class instead of a function and preview how we're going to organize non-React code into service & API modules.

**Part 3 - Begin Implementing Token-Based Auth:**
1. The process of adding a feature to a MERN-Stack app
2. Code the `<SignUpForm>` component as a class component
3. Add service & API modules for the client

## 1. The process of adding a feature to a MERN-Stack app

The **process** of adding a feature to a MERN-Stack SPA is similar to what we followed when adding a feature to our traditional web apps in Units 2 & 3 in that we typically:

1. Start with the UI/frontend... Render a component with an event prop designed to handle interaction from the user, e.g., `onClick`.
2. Stub up and assign an event handler function to the event prop.
3. In the event handler function, write code to accomplish the task at hand which could include any of the following:
    - Perform program logic, calculations, etc.
    - Update local state.
    - Invoke service methods to make AJAX requests to the server.
    - Invoke a method passed to it as a prop so that the component up the hierarchy can respond to the event by updating state, etc.
    - Etc.<br><br>Then, in the case that an AJAX request was made...

4. Define a route on the server that maps the AJAX request to a controller action.
5. Code the controller action to perform any necessary CRUD and send a JSON response back to the client.
6. Back in the event handler of the component, if necessary, update state using the JSON received from the server and optionally programmatically change routes.

Basically, adding functionality starts with code on the client, then the server, and coming back full-circle to the client.

### Update `user` Initialization

If we're going to start implementing auth, we'll need to change back the initialization of the `user` state to `null` because we need to see `<AuthPage>`:

```jsx
// App.jsx

export default function App() {
  // Initialize user to null
  const [user, setUser] = useState(null);
```

### As a visitor (AAV), I want to sign up as a user so that I can place new orders and view my previous orders.

To implement the functionality of signing-up, we'll begin client-side as described above by defining a component that will contain a form with an `onSubmit` event prop...

## 2. Code the `<SignUpForm>` Component as a Class Component

We'll be adding a `<SignUpForm>` component that will be rendered by `<AuthPage>`.

In the new `<SignUpForm>` component, as you saw in the _React Fundamentals - Handling Input and Events_ lesson, we'll need to manage state for the controlled inputs used to gather information from the user that wants to sign up.

However, instead of using a function component, we'll define `<SignUpForm>` as a class component which used to be the go to for defining components that needed to manage state prior to hooks being added to the React library.

#### 💪 Practice Exercise - Stub Up the Module for the `<SignUpForm>` Component (1 minute)

The naming conventions of the folders and files for class components is no different than that of function components.

- Create the folder and module for `<SignUpForm>` following the same conventions and best practices as always.

> Hint:  Be careful of typos (`SignUpForm` vs. `SignupForm`).

### Set Up `<SignUpForm>` as a Class Component

Class components in React typically inherit from the [`Component`](https://reactjs.org/docs/react-component.html) class defined in the React library, let's import it:

```jsx
// SignUpForm.jsx

import { Component } from 'react';
```

> Check out the Further Study section to learn more about the `PureComponent` class available to inherit from as well.

This is how we stub up a class component:

```jsx
export default class SignUpForm extends Component {

  render() {
    return (
      <div>
        SignUpForm
      </div>
    );
  }
}
```

A class component **must** implement a `render` method responsible for returning the component's JSX - making the `render` method itself very much like a function component.

### Importing and Rendering a Class Component

There's no difference in how we import and render function and class components.

Let's import and render `<SignUpForm>` within **AuthPage.jsx** and do a minor refactor while we're at it:

```jsx
// AuthPage.jsx

import SignUpForm from '../../components/SignUpForm/SignUpForm';

export default function AuthPage() {
  return (
    <main>
      <h1>AuthPage</h1>
      <SignUpForm />
    </main>
  );
}
```

So, as you can see, we can't even tell if a component is defined as a function or class when we import and render it:

<img src="https://i.imgur.com/eklFYbq.png">

### Initializing a Class Component's State

Our `<SignUpForm>` is going to need the following state:

- `name`: Name of the user
- `email`: The email address of the user
- `password`: The user's password
- `confirm`: Used to confirm the password is entered correctly
- `error`: Used to display an error message if the sign up fails

Unlike with a function component that can define multiple pieces of state by using the `useState` hook multiple times, **a class component's state is always a single object assigned to a `state` property on the instance of the component**.

There are two ways to initialize the `state` property:

- Using the `constructor` method (the original approach).
- Using the newer [class fields](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Public_class_fields) approach.

Of course, we'll use the **class fields** approach that all the cool kids are using, but here's how it would look if we initialized the state using the `constructor` method:

```jsx
export default class SignUpForm extends Component {
  // state is always an object with a property for each "piece" of state
  constructor() {
    this.state = {
      name: '',
      email: '',
      password: '',
      confirm: '',
      error: ''
    };
  }
```

The following is the **class field** approach we're going with:

```jsx
export default class SignUpForm extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    error: ''
  };
```

> FYI:  Internally, the class field syntax is converted into the constructor method approach.

### `this` Keyword in a Class Component

When we use class components, it's important to realize that the components themselves are instances of the class instantiated by React the first time they are rendered.

<details><summary>❓ An instance of a class is an _______.</summary>
<p>

**object**

</p>
</details>

<details><summary>❓ An object's methods accesses other properties/methods of the object via the _______ keyword.</summary>
<p>

**`this`**

</p>
</details>

Unlike with function components, a class component accesses its props and methods using `this`, for example:

- `this.props`: Accesses the class component's `props` object, e.g., `this.props.someProp`.
- `this.state`: Accesses the class component's `state` object, e.g., `this.state.email`.
- `this.someMethod()`: Invokes a method defined in the class component or inherited by the superclass (`Component`) such as `this.setState()` used to update state.

### The Complete `render` Method of `<SignUpForm>`

Here's the completed code of the `render()` method that we'll copy/paste and discuss:

```jsx
render() {
  const disable = this.state.password !== this.state.confirm;
  return (
    <div>
      <div className="form-container">
        <form autoComplete="off" onSubmit={this.handleSubmit}>
          <label>Name</label>
          <input type="text" name="name" value={this.state.name} onChange={this.handleChange} required />
          <label>Email</label>
          <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
          <label>Password</label>
          <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
          <label>Confirm</label>
          <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />
          <button type="submit" disabled={disable}>SIGN UP</button>
        </form>
      </div>
      <p className="error-message">&nbsp;{this.state.error}</p>
    </div>
  );
}
```

The form is rendering but it's ugly and we can't type in the inputs yet because the `this.handleChange` method assigned to the `onChange` prop is not defined yet...

### Defining Event Handler Methods in a Class Component

The `handleChange()` method **can't** be defined using the usual syntax for defining an instance method of a class like that of the `render()` method.

The reason the usual syntax won't work is because the method will be invoked as a callback and thus will not have `this` bound to the component instance as necessary if we want to be able to access `this.props`, `this.setState()`, etc.

There are two solutions to ensure that a method has `this` correctly set to the component instance:

- Define the method as usual and use JavaScript's [`bind`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind) method in the `constructor` method to explicitly set the value of `this`.
- Use the **class field** syntax along with an arrow function when defining the method which by its very nature fixes the issue due to the way **class fields** are actually initialized in the `constructor` method.

> FYI:  The trouble with the binding of `this` in class components is definitely one of the main inspirations for React hooks!

So, here's how we use class field syntax to properly define methods used to handle events in class components:

```jsx
// The object passed to setState is merged with the current state object
handleChange = (evt) => {
  this.setState({
    [evt.target.name]: evt.target.value,
    error: ''
  });
};

render() {
  ...
}
```

The controlled inputs should now update their appropriate state!

Even the cool little line of code<br>`const disable = this.state.password !== this.state.confirm;`<br>combined with the `disabled` prop on the submit button should be working!

That code is pretty much what we learned in the _React Fundamentals - Handling Input and Events_ lesson except...

### Updating State in a Class Component

There's two key differences in how state is updated in class vs. function components:

- Class components always update state by invoking the inherited `setState()` method vs. invoking the setter function(s) returned by the `useState` hook in function components.
- [`setState()`](https://reactjs.org/docs/react-component.html#setstate) accepts an object as an arg and this object is **merged** into the existing state object. This differs with how a function component's setter function **replaces** that state with the value provided.

    > Note: `setState` also has a couple of other signatures - refer to the [docs](https://reactjs.org/docs/react-component.html#setstate) for more info.

### Handling the `onSubmit` Event

The `<form>` React Element in `<SignUpForm>` already has an event handler method assigned to its `onSubmit` prop.

#### 💪 Practice Exercise - Stub Up the `handleSubmit()` Method (2 minutes)

- Using the same class field syntax used when defining `handleChange()`, define a method named `handleSubmit()` above the `render()` method.
- As we learned during the _React Fundamentals - Handling Input and Events_ lesson, we need to prevent the form from being submitted to the server by including `evt.preventDefault();` as the first line of code.
- Baby step by adding this additional line of code `alert(JSON.stringify(this.state));`.

Check it out by typing in some info and submitting the form:

<img src="https://i.imgur.com/W0mWxOp.png">

### Add the CSS

Yeah, `<SignUpForm>` is pretty ugly, however, the JSX we added was thinking ahead in terms of styling because the `<form>` React Element has a `className="form-container"` prop.

**❓ The `form-container` CSS class is intended to be reused by multiple forms in the app, therefore it should be defined in the ________ module?**

The CSS for the SEI CAFE app is not trivial, so instead of adding CSS to **index.css** in bits and pieces, let's go ahead and add all the general purpose CSS up front:

```css
/* CSS Custom Properties */
:root {
  --white: #FFFFFF;
  --tan-1: #FBF9F6;
  --tan-2: #E7E2DD;
  --tan-3: #E2D9D1;
  --tan-4: #D3C1AE;
  --orange: #F67F00;
  --text-light: #968c84;
  --text-dark: #615954;
}

*, *:before, *:after {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
  'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
  sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--tan-4);
  padding: 2vmin;
  height: 100vh;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

#root {
  height: 100%;
}

.align-ctr {
  text-align: center;
}

.align-rt {
  text-align: right;
}

.smaller {
  font-size: smaller;
}

.flex-ctr-ctr {
  display: flex;
  justify-content: center;
  align-items: center;
}

.flex-col {
  flex-direction: column;
}

.flex-j-end {
  justify-content: flex-end;
}

.scroll-y {
  overflow-y: scroll;
}

.section-heading {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: var(--tan-1);
  color: var(--text-dark);
  border: .1vmin solid var(--tan-3);
  border-radius: 1vmin;
  padding: .6vmin;
  text-align: center;
  font-size: 2vmin;
}

.form-container {
  padding: 3vmin;
  background-color: var(--tan-1);
  border: .1vmin solid var(--tan-3);
  border-radius: 1vmin;
}

p.error-message {
  color: var(--orange);
  text-align: center;
}

form {
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 1.25vmin;
  color: var(--text-light);
}

label {
  font-size: 2vmin;
  display: flex;
  align-items: center;
}

input {
  padding: 1vmin;
  font-size: 2vmin;
  border: .1vmin solid var(--tan-3);
  border-radius: .5vmin;
  color: var(--text-dark);
  background-image: none !important; /* prevent lastpass */
  outline: none;
}

input:focus {
  border-color: var(--orange);
}

button, a.button {
  margin: 1vmin;
  padding: 1vmin;
  color: var(--white);
  background-color: var(--orange);
  font-size: 2vmin;
  font-weight: bold;
  text-decoration: none;
  text-align: center;
  border: .1vmin solid var(--tan-2);
  border-radius: .5vmin;
  outline: none;
  cursor: pointer;
}

button.btn-sm {
  font-size: 1.5vmin;
  padding: .6vmin .8vmin;
}

button.btn-xs {
  font-size: 1vmin;
  padding: .4vmin .5vmin;
}

button:disabled, form:invalid button[type="submit"] {
  cursor: not-allowed;
  background-color: var(--tan-4);
}

button[type="submit"] {
  grid-column: span 2;
  margin: 1vmin 0 0;
}
```

That's better!  But rest assured we'll continue to improve the layout and styling as we continue coding out `mern-infrastructure`/SEI CAFE.

<img src="https://i.imgur.com/CHNtKss.png">

Next lesson we'll continue writing the code in `handleSubmit()` method to send the user's sign-up info to the server using an AJAX request.  

However, doing so in a way that's more likely to get you hired requires organizing such code within **service** & **API** modules...

## 3. Add Service & API Modules for the Client

In a MERN-Stack app there's bound to be application/business logic, AJAX/API requests, etc.

Although it would be possible to code this logic directly within components, there are downsides of doing so:

- Poor code organization. As you know, it's better to modularize related code into separate modules, e.g., the `config/database.js` module.  Organizing code into modules makes it easier to build an application because you'll more or less know where new code will go.  It's also easier to refactor and debug when code is organized into focused modules.
- Smaller, more readable components. Reading a line of code like `const user = await signUp(formData);` in a component is far better than having read through all of the code included in the `signUp()` "service" function.
- Not DRY and violates the "separation of concerns" principle.  For example, if we wanted to fetch the same data from more than one component, we'd be repeating ourselves. Often service and API modules can often be used by multiple projects.

### Utilities, Services, APIs, oh my...

Some common ways to organize code into modules are:

- **Utility modules**: Modules that hold general purpose functions, for example, a `formatTime(seconds)` function.  These modules are reusable in multiple projects.
- **Service modules**: Service modules are where we can organize application specific logic such as functions for signing-up or logging in a user. Service modules often use and depend upon API modules...
- **API modules**: API modules are for abstracting logic that make network requests such as AJAX calls to the backend or third-party APIs. This abstraction makes it easier to refactor code to use different techniques, libraries, etc.  For example, we are going to be using `fetch` for our AJAX communications, however, refactoring to use a library such as Axios would be made easy thanks to the use of API modules.

### Create a **utilities** Folder

Let's create a **src/utilities** folder used to hold any utility, service or API modules that we need in the future:

```
mkdir src/utilities
```

### Create a **users-service.js** Module

We will use a **src/utilities/users-service.js** module to organize functions used to sign-up, log in, log out, etc.

```
touch src/utilities/users-service.js
```

Any component can import the functions exported from **user-service.js** as needed.

### Create a **users-api.js** Module

The **users-service.js** module will definitely need to make AJAX requests to the Express server.

As discussed earlier, network related code is better abstracted into its own modules.

Let's create an API module that will handle user-related communications with the server:

```
touch src/utilities/users-api.js
```

#### Congrats on getting started with implementing user authentication!

On to the lab!

## Further Study

- Class components can also inherit from [PureComponent](https://reactjs.org/docs/react-api.html#reactpurecomponent) that can provide a performance boost in some cases.