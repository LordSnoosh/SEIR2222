<img src="https://i.imgur.com/zXD7MO1.jpg" width="100%">

# MERN-Stack Shopping Cart - Part 2

## Learning Objectives

|Students Will Be Able To:|
|---|
| Change Client-Side Routes Programmatically |
| Implement "Shopping Cart" Functionality |

## Road Map

1. Setup
2. Review MERN-Stack CRUD Logic & Code Flow
3. Adding Items to the Cart
4. Changing the Quantity Ordered
5. Checking Out an Order
6. References

## 1. Setup

The starter code is the completed code from Part 1:

1. Move into the code-along repo: `cd ~/code/sei-cafe-codealong`
2. Sync with starter code: `git fetch --all` then `git reset --hard origin/main`
3. Open VS Code: `code .`
4. Open a terminal and start the Express server: `nodemon server`
5. Open another terminal and start React's dev server: `npm start`

## 2. Review MERN-Stack CRUD Logic & Code Flow

Prior to implementing adding items to the cart in the next step, let's review the typical logic and code flow when performing CRUD in the MERN-Stack...

<img src="https://i.imgur.com/7OQuhpN.png">

> Note: The code above is not meant to be complete.

### FEATURE A - Load & Display Posts Upon First Render

| STEP | DESCRIPTION |
|---|---|
| `A1` | After the `<PostListPage>` has rendered for the first time, the `useEffect` function runs calling `postsAPI.getAll()` in the **posts-api.js** API module. |
| `A2` | The `getAll()` function delegates making the AJAX request by calling the `sendRequest()` function. |
| `A3` & `A4` | The `sendRequest()` function uses the browser's `fetch` function to send the AJAX request to the server where the request flows through the Express app's middleware until it matches the route. |
| `A5` | The route calls the `postsCtrl.getAll()` controller action which uses the `Post` model to retrieve all posts for the logged in user. |
| `A6` | The controller action responds to the AJAX request using `res.json(posts)` sending back an array of the user's posts - completing the request initiated by `postsAPI.getAll()`. The connecting line is dashed because the posts actually flow back through the `fetch()`, `sendRequest()`, `postsAPI.getAll()` functions. |

### FEATURE B - Create Post When Form is Submitted in Child Component

| STEP | DESCRIPTION |
|---|---|
| `B1` | The user submits the form in `<PostForm>` which causes its `handleSubmit` event handler to execute. |
| `B2` | The event handler, after preventing the default action of the form being submitted to the server, calls the `handleAddPost()` function passed to it as a prop from `<PostListPage>` with an argument of the data for the new post (`content`). |
| `B3` | The `handleAddPost()` function calls `postsAPI.add(postData)` in the **posts-api.js** API module. |
| `B4` | The `add()` function in **posts-api.js** delegates making the AJAX request by calling the `sendRequest()` function. |
| `B5` & `B6` | The `sendRequest()` function uses the browser's `fetch` function to send the AJAX request to the server where the request flows through the Express app's middleware until it matches the route. |
| `B7` | The route calls the `postsCtrl.create()` controller action which uses the `Post` model to create the user's new post. |
| `B8` | The controller action responds to the AJAX request using `res.json(post)` sending back the user's new post - completing the request initiated by `postsAPI.add()`. The connecting line is dashed because the post actually flows back through the `fetch()`, `sendRequest()`, `postsAPI.add()` functions. |

Hungry?...

## 3. Adding Items to the Cart

If we take a look we'll see that `<OrderDetail>` is already mapping the order's line items into an array of `<LineItem>` components to be rendered in its JSX:

```jsx
const lineItems = order.lineItems.map(item =>
  <LineItem
    lineItem={item}
    isPaid={order.isPaid}
    key={item._id}
  />
);
```

<details><summary>❓ Why is the <code>isPaid</code> prop there?  In other words, why would a line item need to know if the order is paid or not? Browse to <a href="https://sei-cafe.herokuapp.com/orders/new">the deployed app</a> for a hint - be sure to have at least one item in your cart.</summary>
<p>

**`<LineItem>` should not allow the quantity to be changed if the order is already paid - so it should not render the `[-]` and `[+]` buttons.**

</p>
</details>

### Adding Items - Start with the UI

Each `<MenuListItem>` component is already rendering an **[ADD]** button that console.logs when clicked, so our work is done here...

### Stub Up a `handleAddToOrder` Function

When a menu item is added to the cart, we'll need to:

- Make an AJAX request to add the item.
- Update the order in the controller action on the server.
- Code the controller action to respond with the updated order.
- Update the `cart` state with the updated order.

Because the `cart` state is in `<NewOrderPage>`, and we need to do more than just update that state, `<NewOrderPage>` is where we should handle the click event of an **[ADD]** button:

```jsx
// NewOrderPage.jsx

...
/*--- Event Handlers --- */
async function handleAddToOrder(itemId) {
  // Baby step
  alert(`add item: ${itemId}`);
}

return (
  ...
```

#### 💪 Practice Exercise - `handleAddToOrder` (5 minutes)

1. Pass the `handleAddToOrder` function through the component hierarchy to the `<MenuListItem>` component.
2. In the `<button>` of `<MenuListItem>` invoke `handleAddToOrder` with an argument of `menuItem._id` instead of the `console.log('clicked')`.
3. Verify that the alert displays with the item's id when the **[ADD]** button is clicked.

    <img src="https://i.imgur.com/iRJbuF2.png">

### Adding Items - The Remaining Flow

Here's the remaining flow of logic when an **[ADD]** button is clicked:

- Make an AJAX request that lets the server know that we want to add a menu item to the user's cart. There's already `addItemToCart` function ready for action in **orders-api.js**.
- A route has already been defined on the server to listen for the AJAX request:
  ```js
  router.post('/cart/items/:id', ordersCtrl.addToCart);
  ```
- The `addToCart` function mapped to by the route is stubbed up - and that controller action will send back the updated cart from the server used to update the `cart` state with. We'll add some more Mongoose magic to the `Order` model too.

### Finish Coding the `handleAddToOrder` Function

Not much to do, so give it a shot...

#### 💪 Practice Exercise - Code `handleAddToOrder` (2 minutes)

- Finish the `handleAddToOrder` function in **NewOrderPage.jsx**:

  ```jsx
  async function handleAddToOrder(itemId) {
    // alert(`add item: ${itemId}`);
    // 1. Call the addItemToCart function in ordersAPI, passing to it the itemId, and assign the resolved promise to a variable named cart.
    // 2. Update the cart state with the updated cart received from the server
  }
  ```

### Add an `addItemToCart` Instance Method to the `orderSchema`

Mongoose schema instance methods are callable on documents - what a great place to add the logic for adding an item to a cart:

```js
// models/order.js

...
// Instance method for adding an item to a cart (unpaid order)
orderSchema.methods.addItemToCart = async function (itemId) {
  // this keyword is bound to the cart (order doc)
  const cart = this;
  // Check if the item already exists in the cart
  const lineItem = cart.lineItems.find(lineItem => lineItem.item._id.equals(itemId));
  if (lineItem) {
    // It already exists, so increase the qty
    lineItem.qty += 1;
  } else {
    // Get the item from the "catalog"
    const item = await mongoose.model('Item').findById(itemId);
    cart.lineItems.push({ item });
  }
  // return the save() method's promise
  return cart.save();
};
```

Good stuff in there with lots of comments.  Any questions?

### Code the `addToCart` Controller Action

All that's left is to code the `addToCart` controller action:

```js
// Add the item to the cart
async function addToCart(req, res) {
  const cart = await Order.getCart(req.user._id);
  // The promise resolves to the document, which we already have
  // in the cart variable, so no need to create another variable...
  await cart.addItemToCart(req.params.id); 
  res.json(cart);
}
```

Again, skinny controllers, fat models.

My personal fav:

<img src="https://i.imgur.com/RlkoHhf.png">

## 4. Changing the Quantity Ordered

As you can see, each `<LineItem>` is rendering `[-]` and `[+]` buttons - but we need to implement their functionality.

Implementing this functionality is very similar to what we just did, so forgive me if I enter ninja mode as we enthusiastically write the following code...

### Code the `handleChangeQty` Function

The `handleChangeQty` function belongs in `<NewOrderPage>` just like `handleAddToOrder` we just coded:

```jsx
/*--- Event Handlers --- */
async function handleAddToOrder(itemId) {
  const updatedCart = await ordersAPI.addItemToCart(itemId);
  setCart(updatedCart);
}

// Add this function
async function handleChangeQty(itemId, newQty) {
  const updatedCart = await ordersAPI.setItemQtyInCart(itemId, newQty);
  setCart(updatedCart);
}
```

The `setItemQtyInCart` function has already been coded in **orders-api.js**.

Now invoke it from the UI...

### Invoke the `handleChangeQty` Function

We need to:

1. Pass `setItemQtyInCart` down thru the hierarchy to the `<LineItem>` components - **let's do it and don't let me forget to destructure props all the way down!**
2. Invoke it in the existing `onClick` arrow functions in both the `[-]` and `[+]` buttons. Looking at the signature of `setItemQtyInCart`, we see that it expects the `itemId` and the `newQty` - let's oblige with the following refactor:

```jsx
// LineItem.jsx

...
<div className="qty" style={{ justifyContent: isPaid && 'center' }}>
  {!isPaid &&
    <button
      className="btn-xs"
      // Refactor
      onClick={() => handleChangeQty(lineItem.item._id, lineItem.qty - 1)}
      >−</button>
    }
  <span>{lineItem.qty}</span>
  {!isPaid &&
    <button
      className="btn-xs"
      // Refactor
      onClick={() => handleChangeQty(lineItem.item._id, lineItem.qty + 1)}
    >+</button>
  }
</div>
...
```

That does it on the client - the ninja is on the way to the server...

### Add the `setItemQty` Instance Method to the `orderSchema`

The `setItemQty` instance method is very similar to the `addItemToCart` we coded a bit ago:

```js
// models/order.js

// Instance method to set an item's qty in the cart (will add item if does not exist)
orderSchema.methods.setItemQty = function (itemId, newQty) {
  // this keyword is bound to the cart (order doc)
  const cart = this;
  // Find the line item in the cart for the menu item
  const lineItem = cart.lineItems.find(lineItem => lineItem.item._id.equals(itemId));
  if (lineItem && newQty <= 0) {
    // Calling remove, removes itself from the cart.lineItems array
    lineItem.remove();
  } else if (lineItem) {
    // Set the new qty - positive value is assured thanks to prev if
    lineItem.qty = newQty;
  }
  // return the save() method's promise
  return cart.save();
};

module.exports = mongoose.model('Order', orderSchema);
```

Now let's put it to use...

### Code the `setItemQtyInCart` Controller Action

Just another clean controller action coming up:

```js
// Updates an item in the cart's qty
async function setItemQtyInCart(req, res) {
  const cart = await Order.getCart(req.user._id);
  await cart.setItemQty(req.body.itemId, req.body.newQty); 
  res.json(cart);
}
```

Now we're talking!

<img src="https://i.imgur.com/maAYk5t.png">

## 5. Checking Out an Order

One last feature!

**AAU, I want to click a [CHECKOUT] button that pays the order and sends me to the Order History Page.**

Ninja chop!

### Client-Side Code

More of the same, well almost:

```jsx
// NewOrderPage.jsx

...
async function handleCheckout() {
  await ordersAPI.checkout();
  history.push('/orders');
}

return (
  ...
```

We'll discuss the `history.push('/orders')` in a bit, but let's first pass `handleCheckout` to the `<OrderDetail>` component.

Now we can invoke it:

```jsx
// OrderDetail.jsx

...
<button
  className="btn-sm"
  onClick={handleCheckout}
  disabled={!lineItems.length}
>CHECKOUT</button>
...
```

No reason to wrap it with an arrow function - you know why, right?

Onto that `history.push('/orders');` business...

### Programmatic Routing With the `history` Object

React Router provides access to the browser's `history` object that enables us to change routes **programmatically**, i.e., using code instead of in response to the user clicking a `<Link>`.

The React Router library recently added its own set of hooks and the [`useHistory`](https://reactrouter.com/web/api/Hooks/usehistory) makes it super easy to get access to the `history` object!

First we need to import it:

```jsx
// NewOrderPage.jsx

// Update this import
import { Link, useHistory } from 'react-router-dom';
```

The `useHistory` hook is a function like all hooks are - invoking it returns the `history` object:

```jsx
// NewOrderPage.jsx

...
const categoriesRef = useRef([]);

// Use history object to change routes programmatically
const history = useHistory();
...
```

To change client-side routes, we invoke the `push` method like we just did to switch to the `/orders` path above:

```jsx
history.push('/orders');
```

We're done on the client, and not far from being done on the server...

### Code the `checkout` Controller Action

Not much logic necessary - all we have to do is update the cart document's `isPaid` property to `true` - so we'll forgo adding a new method to the schema and just put the logic in the controller action:

```js
// Update the cart's isPaid property to true
async function checkout(req, res) {
  const cart = await Order.getCart(req.user._id);
  cart.isPaid = true;
  await cart.save(); 
  res.json(cart);
}
```

> Note: If your future e-commerce apps have additional logic, be sure to code that logic on the model whenever possible.

### Payments

If you need to implement payments for an e-commerce site in the future, a popular to check out is [stripe](https://stripe.com/).

#### Good work hanging in there!!!

On to the hackathon!