<img src="https://i.imgur.com/6MQebMF.jpg">

# The `useEffect` and `useRef` Hooks

## Learning Objectives

|Students Will Be Able To:|
|---|
| Seed the Database with Lookup Data |
| Perform "Side Effects" Within a `useEffect` Hook |
| Remember Non-State Data With a `useRef` Hook |

## Road Map

1. Setup
2. Seed `categories` and `items` in the Database
3. The Use Case of the `useEffect` Hook
4. Using `useEffect` to Perform Side Effects
5. Retrieve `items` Within a `useEffect` Hook
6. Using `useEffect` with Effects That Require Cleanup
7. Computing the Categories and Persisting Them With `useRef`
8. Displaying Categories & Menu Items in `<NewOrderPage>`

## 1. Setup

The starter code has taken the final `mern-infrastructure` code, styled the `<AuthPage>` component, and includes several new components that we'll use later. However, none of the added components contain anything "new" in them that you haven't already learned about.

Here's the setup:

1. Move into your code folder: `cd ~/code`
2. Clone the `sei-cafe-codealong` repo:  `git clone https://git.generalassemb.ly/SEI-CC/sei-cafe-codealong.git`
3. Move into the newly created folder:  `cd sei-cafe-codealong`
4. Cloning a project will not include the Node modules, so install them: `npm i`
5. Open VS Code: `code .`
6. Open a terminal and build the React code to create the `build` folder, otherwise the Express server will not start up:  `npm run build`
7. Next, the `.env` file also has to be touched and updated with this goodness before starting the Express server:
    ```
    DATABASE_URL=mongodb://localhost/sei-cafe-codealong
    SECRET=SEIRocks
    ```
8. Now you can start the Express server: `nodemon server`
9. Open another terminal and start React's dev server: `npm start`

## 2. Seed the `categories` and `items` Collections

It's common for administrators to seed (initialize) an application's database with data used for:

- Configuration purposes such as who should be emailed if an error occurs within the application.
- Lookup data such as the different departments for a grocery store, e.g., 'Produce', 'Beverages', 'Spices', etc.
- Adding initial administrator account(s).
- Adding a "catalog" of items for sale - which is the case for SEI CAFE.

Rarely would data that users typically create while using the app be seeded - unless it was "demo" data 😊

The code that seeds a database is external to the application itself, i.e., it's not a part of the running application and is usually executed just once.

### SEI CAFE's Data Model

The following is a high-level ERD for SEI CAFE:

<img src="https://i.imgur.com/weiVjYB.png">

The `Category` and `Item` entities serve as the catalog of menu items to order from.

- `categories` provide the grouping of displayed menu items that can be ordered:

    <img src="https://i.imgur.com/amlRSHa.png">

- `items` are the catalog of menu items the user can add to an order. When added to an order, the item's info is copied to a line item. This allows for pricing changes without impacting previous orders:

    <img src="https://i.imgur.com/lOMevog.png">

### Add `Category` & `Item` Mongoose Models

Before we can seed the catalog, we're going to need models to create the data with.

```
touch models/category.js models/item.js
```

Here's the `Category` model:

```js
// models/category.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: { type: String, required: true },
  sortOrder: Number
}, {
  timestamps: true
});

module.exports = mongoose.model('Category', categorySchema);
```

> Note: The `sortOrder` property allows us to determine the ordering of the categories for display and/or reporting purposes instead of having to rely on some other property, e.g., `name`.

Now for the `Item` model:

```js
// models/item.js

const mongoose = require('mongoose');
// Ensure the Category model is processed by Mongoose (for populating Menu Item queries)
require('./category');
const itemSchema = require('./itemSchema');

module.exports = mongoose.model('Item', itemSchema);
```

Why the heck is the `itemSchema` not being defined in the module as usual? It's because the `itemSchema` is also used to embed Line Items in the `lineItemSchema` - so we're staying DRY by not defining the same schema twice.

Now let's create the `itemSchema.js` module that is being used now in the `itemSchema` and later in the `lineItemSchema`:

```
touch models/itemSchema.js
```

> We're appending the word `Schema` to the module so that we know it only exports a schema, not a compiled model.

Now the code for the schema:

```js
const Schema = require('mongoose').Schema;

const itemSchema = new Schema({
  name: { type: String, required: true },
  emoji: String,
  category: {type: Schema.Types.ObjectId, ref: 'Category'},
  price: { type: Number, required: true, default: 0 }
}, {
  timestamps: true
});

module.exports = itemSchema;
```

> Note: Because the data for the catalog is only created by the seeding process, we don't have to be overly concerned with validation.

### Seed the "Catalog"

A module named **seed.js** will work:

```
touch seed.js
```

Typing the following is mandatory 😁

```js
require('dotenv').config();
require('./config/database');

const Category = require('./models/category');
const Item = require('./models/item');

(async function() {

  await Category.deleteMany({});
  const categories = await Category.create([
    {name: 'Sandwiches', sortOrder: 10},
    {name: 'Seafood', sortOrder: 20},
    {name: 'Mexican', sortOrder: 30},
    {name: 'Italian', sortOrder: 40},
    {name: 'Sides', sortOrder: 50},
    {name: 'Desserts', sortOrder: 60},
    {name: 'Drinks', sortOrder: 70},
  ]);

  await Item.deleteMany({});
  const items = await Item.create([
    {name: 'Hamburger', emoji: '🍔', category: categories[0], price: 5.95},
    {name: 'Turkey Sandwich', emoji: '🥪', category: categories[0], price: 6.95},
    {name: 'Hot Dog', emoji: '🌭', category: categories[0], price: 3.95},
    {name: 'Crab Plate', emoji: '🦀', category: categories[1], price: 14.95},
    {name: 'Fried Shrimp', emoji: '🍤', category: categories[1], price: 13.95},
    {name: 'Whole Lobster', emoji: '🦞', category: categories[1], price: 25.95},
    {name: 'Taco', emoji: '🌮', category: categories[2], price: 1.95},
    {name: 'Burrito', emoji: '🌯', category: categories[2], price: 4.95},
    {name: 'Pizza Slice', emoji: '🍕', category: categories[3], price: 3.95},
    {name: 'Spaghetti', emoji: '🍝', category: categories[3], price: 7.95},
    {name: 'Garlic Bread', emoji: '🍞', category: categories[3], price: 1.95},
    {name: 'French Fries', emoji: '🍟', category: categories[4], price: 2.95},
    {name: 'Green Salad', emoji: '🥗', category: categories[4], price: 3.95},
    {name: 'Ice Cream', emoji: '🍨', category: categories[5], price: 1.95},
    {name: 'Cup Cake', emoji: '🧁', category: categories[5], price: 0.95},
    {name: 'Custard', emoji: '🍮', category: categories[5], price: 2.95},
    {name: 'Strawberry Shortcake', emoji: '🍰', category: categories[5], price: 3.95},
    {name: 'Milk', emoji: '🥛', category: categories[6], price: 0.95},
    {name: 'Coffee', emoji: '☕', category: categories[6], price: 0.95},
    {name: 'Mai Tai', emoji: '🍹', category: categories[6], price: 8.95},
    {name: 'Beer', emoji: '🍺', category: categories[6], price: 3.95},
    {name: 'Wine', emoji: '🍷', category: categories[6], price: 7.95},
  ]);

  console.log(items)

  process.exit();

})();
```

> Note: Its important to delete existing data before creating the seed data to avoid duplicates. However, once an application is in production, you'd want to be extra careful before re-seeding a database to ensure that related data is not impacted.

<details><summary>❓ What's that "wrapping" function called?</summary>
<p>

**It's an IIFE (Immediately Invoked Function Expression) that's being used to enable the handling of the promises with `await`.**

</p>
</details>

The following command will run the script and seed the database:

```
node seed
```

### Update **crud-helper.js**

Now that we have the `Category` and `Item` models, we can uncomment them from **crud-helper.js** for when we want to perform some manual CRUD with them:

```js
// Connect to the database
require('dotenv').config();
require('./config/database');

// Require the Mongoose models
const User = require('./models/user');
const Item = require('./models/item');
const Category = require('./models/category');
// const Order = require('./models/order');

// Local variables will come in handy
let u, i, c, o;
```

## 3. The Use Case of the `useEffect` Hook

The second most popular hook in React after `useState` is the [`useEffect`](https://reactjs.org/docs/hooks-effect.html) hook.

**The `useEffect` hook is used to perform "side effects" after a component has finished rendering.**

### What's a Side Effect?

In computer science, performing a side effect is when a function changes some data outside of that function; or does something outside the scope of the function like accessing the network.

The following tasks may be considered side effects in a React Function Component:

- Making AJAX requests
- Creating/destroying a `setInterval` timer
- Manually accessing/manipulating the DOM
- Subscribing/unsubscribing to services such as notification services, data services, etc.

### Why is `useEffect` Necessary?

The `useEffect` hook is necessary for Function Components to be able to perform side effects like those listed above at the **proper time**.

But wait, you may be wondering then how we were able to make AJAX requests to sign up and log in without `useEffect`.

The reason is that, in React, we are able to perform side effects in **event handlers** because the component has already been rendered (the function is done executing) and the DOM has stabilized - there are no synchronization issues.

Outside of event handlers, the `useEffect` hook enables us to perform side effects immediately after a Function Component has finished rendering.

### Example of the Timing/Synchronization Issue

In the screenshot above you can see that `<NewOrderPage>` displays a list of menu items and categories.

In SEI CAFE, the catalog of menu **items** needs to be retrieved from the server via an AJAX request and saved in a state variable when the component is rendered for the first time.

> FYI:  SEI CAFE does not retrieve **categories** via AJAX. Instead, the categories are computed by reducing the array of menu items into an array of categories. This approach is not only more efficient than an AJAX request that results in a database query, it eliminates displaying any categories that might not have any menu items!

Let's open **NewOrderPage.jsx** and consider the following pseudocode to accomplish our goal:

```jsx
import { useState } from 'react';

export default function NewOrderPage() {
  const [menuItems, setMenuItems] = useState([]);

  // - Fetch the menuItems from the server via AJAX
  // - When the data comes back, call setMenuItems to save in state

  return (
    <h1>NewOrderPage</h1>
  );
}
```

> NOTE: As discussed in the lesson about state, it's important to initialize to an empty array any state that will ultimately be an array of data - otherwise, your components will receive an error when they try to map anything other than an array.

<details><summary>❓ What's the problem with the above approach?</summary>
<p>

**Calling `setMenuItems` causes the Function Component to re-render, which will result in another request to retrieve the data & another call to `setMenuItems` - causing an infinite loop!**

</p>
</details>

The `useEffect` hook provides a solution to this timing/synchronization dilemma and more.

Go ahead and import `useState` and use it to create the state for `menuItems` - we're going to need it.

## 4. Using `useEffect` to Perform Side Effects

Like all hooks in React, the `useEffect` hook is a function we invoke within the top-level of Function Components.

Let's import it:

```jsx
// NewOrderPage.jsx

import { useState, useEffect } from 'react';
```

### Executing Code After Every Render

Using `useEffect` with its most basic syntax simply executes code after every render.

```jsx
export default function NewOrderPage() {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(function() {
    console.log('NewOrderPage rendered');
  });
  ...
```

> Note: `useEffect` always accepts a callback function as its first argument.

"NewOrderPage rendered" will be logged when the **New Order** link is clicked causing `<NewOrderPage>` to render for the first time.

Now let's add a simple button that simply invokes `setMenuItems` which will trigger a re-render:

```jsx
  // NewOrderPage.jsx

  ...
  return (
    <>
    <h1>NewOrderPage</h1>
    <button onClick={setMenuItems}>Trigger re-render</button>
    </>
  );
}
```

Clicking the button will now result in the `useEffect` hook invoking its callback after each time `<NewOrderPage>` is rendered.

Okay, it's clear that `useEffect` can be used to execute code after each render. But that doesn't solve our dilemma because we would still end up with an infinite loop.

> Note:  React at times won't cause the infinite loop to happen immediately. However, an error will appear sooner or later in the console, perhaps when the component is unmounted (removed from the DOM).

### Conditionally Executing Code After Every Render

Most of the time we don't want to perform a side effect after **every** render.

Usually, we only want to run a side effect:

- After the component renders the **first time**, to load data via AJAX for example.
- After a state variable or a prop has changed, for example, to fetch data when a client-side route parameter changes.

Both of the above scenarios can be achieved by passing a second argument to `useEffect`. This second argument is known as a **dependency array**.

Any number of `useEffect` hooks can be used in the same Function Component, so let's leave our current `useEffect` and create a new one that includes a dependency array:

```jsx
// NewOrderPage.jsx

...
useEffect(function() {
  console.log('useEffect runs after every render');
});

// Add this useEffect with a dependency array
useEffect(function() {
  console.log('useEffect runs only after first render');
}, []);
...
```

Clear the Console, refresh the page, then click the button.

<details><summary>❓ How did the empty dependency array impact <code>useEffect</code>?
</summary>
<p>

**The `useEffect` only runs its callback after the first render.**

</p>
</details>

Performing a side effect once after a component has mounted (rendered for the first time) is a very common use case.  In fact, it's exactly what we want to do, i.e., load the menu items only after the first render of `<NewOrderPage>`.

> KEY POINT:  An empty dependency array causes the effect to run only once (after the first render of the component).

Now let's see how `useEffect` works if we actually add a dependency value to the array:

```jsx
// NewOrderPage.jsx

...
useEffect(function() {
  console.log('useEffect runs when menuItems changes);
}, [menuItems]);

return (
  <>
  <h1>NewOrderPage</h1>
  <button onClick={() => setMenuItems(Date.now())}>Trigger re-render</button>
  </>
);
```

Now when the button is clicked, the value of `menuItems` is updated, and because the `useEffect` depends upon `menuItems`, it runs every time `menuItems` changes.

> Note: The dependency array can contain multiple dependencies.

## 5. Retrieve `items` Within a `useEffect` Hook

The `<NewOrderComponent>` has been waiting patiently for menu items...

### Create an API Module for Items

We're going to need a new **items-api.js** API module used to send AJAX requests to the server.

It won't be much different than **users-api.js**, so let's start by copying **users-api.js** and renaming it to **items-api.js**.

Now refactor to the following:

```js
// items-api.js

import { getToken } from './users-service';

const BASE_URL = '/api/items';

export function getAll() {
  return sendRequest(BASE_URL);
}

// This function is never actually used in SEI CAFE, it's
// only provided here to remind you to follow RESTful routing, etc.
export function getById(id) {
  return sendRequest(`${BASE_URL}/${id}`);
}

...
```

The `sendRequest` function remains unchanged, thus it would be a good candidate to be put within its own module to be more DRY - an excellent practice exercise for when you have time!

### Server Routes and Controller Actions

The server routes and controller for the **items** data resource were included in the starter code to save time.

There's no new concepts in the code, but let's give them a quick review.

Be sure to check out the `index` controller action that sorts and populates the items' `category` property, then re-sorts them based upon the `sortOrder` property of the category.

### Mount the Items Router in **server.js**

Although the router module for **items** has been defined, it's purposely not mounted in **server.js** so that we can see how the `ensureLoggedIn` middleware can be used to protect **all** routes within a router module.

Since all routes pertaining to **items** should be protected, we'll use `ensureLoggedIn` middleware as follows in **server.js**:

```js
// server.js

...
app.use('/api/users', require('./routes/api/users'));

// Protect the api routes below from anonymous users
const ensureLoggedIn = require('./config/ensureLoggedIn');
app.use('/api/items', ensureLoggedIn, require('./routes/api/items'));
...
```

As you can see, we can insert the middleware just like we did when defining individual routes.

We'll do the same with the **orders** routes when the time comes.

### Retrieve the Items From Within the `useEffect`

Now we're ready to refactor the code in **NewOrderPage.jsx** to retrieve the items.

However, React won't approve of our first crack at it using `async`/`await`:

```jsx
// NewOrderPage.jsx

...
useEffect(function() {
  console.log('useEffect runs after every render');
});

// Refactor the useEffect below - don't miss the empty []
useEffect(async function() {
  const items = await itemsAPI.getAll();
  setMenuItems(items);

}, []);
...
```

#### 💪 Practice Exercise (1 minute)

- Add the necessary import statement based upon the above code.

<hr>

The above approach results in the following error:

<img src="https://i.imgur.com/mBW9IRa.png">

But what a helpful error that is - it even gives us the pattern to solve the error - thanks React!

Let's follow React's recommended pattern:

```jsx
useEffect(function() {
  async function getItems() {
    const items = await itemsAPI.getAll();
    setMenuItems(items);
  }
  getItems();
}, []);
```

React Developer Tools confirms the menu items are in state!

<img src="https://i.imgur.com/G7KYRS7.png">

> FYI: In case you're wondering... We didn't also create an **items-service.js** module like we did for users because there isn't any other application/business logic involved like there was with persisting the tokens, extracting the user from a token, etc.

Before we go any further, let's remove the first `useEffect` from **NewOrderPage.jsx** that's just simply logging.

## 6. Using `useEffect` with Effects That Require Cleanup

Certain side effects require cleanup. Examples of cleaning up include:

- Canceling a `setInterval` timer created within a `useEffect`
- Unsubscribing from notifications subscribed to within a `useEffect`

If we fail to clean up in such cases, it will likely cause a [memory leak](https://en.wikipedia.org/wiki/Memory_leak)!

The `useEffect` hook provides for cleaning up by allowing the developer to return a "cleanup" function from the callback function as in this timer example:

```jsx
const [elapsedSeconds, setElapsedSeconds] = useState(0);
const timerRef = useRef();

useEffect(function() {
  timerRef.current = setInterval(function() {
    // Using a "functional update" is better if computing 
    // the new state value from the current state value
    // https://reactjs.org/docs/hooks-reference.html#functional-updates
    setElapsedSeconds((secs) => secs + 1);
  }, 1000);
  // Return the cleanup component
  return function() {
    clearInterval(timerRef.current);
  };
}, []);
```

Check out [these React docs](https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup) for more info.

### ❓ `useEffect` Review Questions

1. **True or False:  In general, the `useEffect` hook is used to run code after a component renders.**

2. **When will the following effect run?**

    ```js
    useEffect(async function() {
      console.log('Effect ran');
    }, []);
    ```

3. **True or False:  The `useEffect` hook can be used to run code after a certain state variable changes.**

## 7. Computing the Categories and Persisting Them With `useRef`

As previously discussed, it's more efficient and beneficial to compute the categories when the menu items are loaded.

Since the menu items don't change after being loaded, categories will only need to be computed once.

### Remembering Data Using a Ref

We could store categories in state if we wanted to, however, since we don't need to re-render after computing them. This provides an opportunity to learn how to use the [`useRef`](https://reactjs.org/docs/hooks-reference.html#useref) hook!

"Refs", as they are often referred to, provide the same functionality in Function Components that instance properties provide in Class Components.

For example, storing the timer's id returned by `setInterval` is a perfect use case for a ref.

Let's import it so that we can create a ref for categories:

```jsx
// NewOrderPage.jsx

import { useState, useEffect, useRef } from 'react';
...
```

Now let's create the ref:

```jsx
const [menuItems, setMenuItems] = useState([]);
// Create and initialize the ref to an empty array
const categoriesRef = useRef([]);
```

**The important thing about using a ref is that it's always an object with a `current` property** that we can assign to and access to get its current value.

Now we're ready to compute categories by using the `reduce` method on `items`.

<details><summary>❓ Why <code>reduce</code> instead of <code>map</code>?
</summary>
<p>

**Because the length of the categories array won't be the same as that of the items array. `map` always returns an array of the same length as the source array. `reduce` provides the flexibility to return anything from a source array.**

</p>
</details>

We'll want to compute categories right after the items have arrived:

```jsx
// NewOrderPage.jsx

...
useEffect(function() {
  async function getItems() {
    const items = await itemsAPI.getAll();
    categoriesRef.current = items.reduce((cats, item) => {
      const cat = item.category.name;
      return cats.includes(cat) ? cats : [...cats, cat];
    }, []);
    setMenuItems(items);
  }
  getItems();
}, []);
```

> Indeed, `reduce` is the most complex of the array iterator methods. However, you should use it when it's the right method for the job. It won't be long before you start to feel comfortable using `reduce` when it's called for.

React's Developer Tools confirms that we've done well:

<img src="https://i.imgur.com/zn6jN5J.png">

## 8. Displaying Categories & Menu Items in `<NewOrderPage>`

Now that we've confirmed that categories and items data exists, let's render the data using components.

Here's the component hierarchy of `<NewOrderPage>`:

<img src="https://i.imgur.com/mWQOTve.png">

Included with the starter code are versions of the following components:

- `<CategoryList>`: Completed and ready to render `categories`. It's almost ready to set the active category, we just need to add a bit of code to `<NewOrderPage>`.
- `<MenuList>`: Ready to render `<MenuListItem>` components.
- `<MenuListItem>`: Rendered within `<MenuList>` and ready to render a menu item, but does not include the logic for the [ADD] button.
- `<OrderDetail>`: Only rendering placeholder text.
- `<UserLogOut>`: Completed and ready to display the user's name, email, and enables logging out.
- `<Logo>`: Renders the logo.

### Import the Components

The components above need to be imported in **NewOrderPage.jsx**:

```jsx
// NewOrderPage.jsx

import { useState, useEffect, useRef } from 'react';
import * as itemsAPI from '../../utilities/items-api';
// Add the following imports
import './NewOrderPage.css';
import { Link } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
import MenuList from '../../components/MenuList/MenuList';
import CategoryList from '../../components/CategoryList/CategoryList';
import OrderDetail from '../../components/OrderDetail/OrderDetail';
import UserLogOut from '../../components/UserLogOut/UserLogOut';
...
```

### Delete the `NavBar`

Before we go any further, let's delete the `<NavBar>` component from within **App.jsx**.

Feel free to remove it from the **components** folder if you wish too.

### Replace the Returned UI

With the components imported, let's render them by updating the JSX in the `return` statement:

```jsx
// NewOrderPage.jsx

...
<main className="NewOrderPage">
  <aside>
    <Logo />
    <CategoryList
      categories={categoriesRef.current}
      activeCat={activeCat}
      setActiveCat={setActiveCat}
    />
    <Link to="/orders" className="button btn-sm">PREVIOUS ORDERS</Link>
    <UserLogOut user={user} setUser={setUser} />
  </aside>
  <MenuList
    menuItems={menuItems.filter(item => item.category.name === activeCat)}
  />
  <OrderDetail />
</main>
...
```

After we review the above, we'll get to work fixing the following to get the app to compile: 

<img src="https://i.imgur.com/BPEBS3y.png">

Let's do this!

### Debug!

Let's have some fun debugging the compilation errors in the `<NewOrderPage>` component...

<hr>

#### 'activeCat' is not defined
and
#### 'setActiveCat' is not defined

These two errors are due to the necessity to add ui-related state that determines the "active" category.

Let's add the new state:

```jsx
...
export default function NewOrderPage() {
  const [menuItems, setMenuItems] = useState([]);
  // Add state to track the "active" category 
  const [activeCat, setActiveCat] = useState('');
  ...
```

It makes sense to initialize `activeCat` to be the first category in the list. However, we won't have the categories until the menu items are available.

Adding a line of code within the `useEffect` will take care of it:

```jsx
// NewOrderPage.jsx

...
useEffect(function() {
  async function getItems() {
    const items = await itemsAPI.getAll();
    categoriesRef.current = items.reduce((cats, item) => {
      const cat = item.category.name;
      return cats.includes(cat) ? cats : [...cats, cat];
    }, []);
    setMenuItems(items);
    // Add this line to initialize the active category
    setActiveCat(items[0].category.name);
    ...
```

That took care of two birds!

<hr>

#### 'user' is not defined
and
#### 'setUser' is not defined

The `<UserLogOut>` component needs access to the `user` and the `setUser` setter function.

<details><summary>❓ We're already passing them as props from <code>&LT;NewOrderPage></code> to <code>&LT;UserLogOut></code>, so what's the problem?</summary>
<p>

**Currently, `<NewOrderPage>` itself is not being passed those props.**

</p>
</details>

#### 💪 Practice Exercise - Fix the Errors (1 minute)

- Take care of the above error by passing `user` & `setUser` to `<NewOrderPage>` as props.

    > Hint: The usual "reminder" should no longer be necessary 😊

<hr>

**Congrats!  We're now able to view the menu items for each category!**

<img src="https://i.imgur.com/3MSyqY7.png">
