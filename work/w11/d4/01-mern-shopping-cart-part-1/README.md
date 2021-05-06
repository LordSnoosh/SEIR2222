<img src="https://i.imgur.com/zXD7MO1.jpg" width="100%">

# MERN-Stack Shopping Cart - Part 1

## Learning Objectives

|Students Will Be Able To:|
|---|
| Use Virtual Properties on Mongoose Documents |
| Use Instance Methods on Mongoose Documents |
| Use Static Methods on Mongoose Models |

## Road Map

1. Setup
2. Review the Starter Code
3. Define the `Order` Model
4. Define the `lineItemSchema`
5. Define the Virtual Properties for `orderSchema` and `lineItemSchema`
6. Get the User's Cart - Client-Side
7. Define the `getCart` Static Model Method
8. Get the User's Cart - Server-Side
9. Render the `<OrderDetail>` Component
10. References

## 1. Setup

The starter code has several time savers added, so please be sure to complete the following setup:

1. Move into the code-along repo: `cd ~/code/sei-cafe-codealong`
2. Sync with starter code: `git fetch --all` then `git reset --hard origin/main`
3. Open VS Code: `code .`
4. Open a terminal and start the Express server: `nodemon server`
5. Open another terminal and start React's dev server: `npm start`

## 2. Review the Starter Code

So that we can spend more time during the lesson on new topics, the following has been added to avoid wasting time on tasks you're already familiar with:

- To DRY up the ***-api.js** modules, the `sendRequest` function has been put into it's own **send-request.js** module. Wow, look how clean/concise those API modules are!
- The `<OrderDetail>` component's JSX is now ready and waiting for an order to render!  However, we will have to refactor to accept some event handlers as props later when we code them. Conveniently, `<OrderDetail>` is used to render BOTH the "cart" (a user's unpaid order) as well as previously placed orders - allowing it to be reused in the `<OrderHistoryPage>`!
- A `<LineItem>` component used to render an order's line items has been included.
- An **orders-api.js** API module is ready to rock!  No new concepts, but we'll review each endpoint when we implement each feature.
- A route module for the orders resource has been coded and mounted in server.js with a _starts with_ path of `/api/orders`.
- A controller module for the orders resource has been stubbed up but there's no code in the controller actions.

## 3. Define the `Order` Model

Once again, here's the high-level ERD for SEI CAFE:

<img src="https://i.imgur.com/weiVjYB.png">

As you can see, we'll need an `Order` model.

However, we won't need a model for `LineItem` because line items will be embedded within the order it belongs to.

<details><summary>❓ But we still need to create something for <code>LineItem</code> - what is it?</summary>
<p>

**A `lineItemSchema`**

</p>
</details>

#### 💪 Practice Exercise - Stub Up the `Order` Model (3 minutes)

1. Create the module for the model.
2. Stub up the `Order` model all the way up to exporting the compiled model, however, don't define any properties.
3. Include the `timestamps: true` option.

    > Hint: If you get stuck, take a look at another model.

Now we can add the properties for an order:

```js
const orderSchema = new Schema({
  // An order belongs to a user
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  // Embed an order's line items is logical
  lineItems: [lineItemSchema],
  // A user's unpaid order is their "cart"
  isPaid: { type: Boolean, default: false },
}, {
  timestamps: true
});
```

You may be surprised not to find a `total` property, etc. However, a `total` property is calculated by its line items - and we'll see how we do that later in the lesson.

However, if this were a real e-commerce application, there certainly would be additional properties like shipping and payments.

Now let's define the `lineItemSchema` being used to embed line items in an order...

## 4. Define the `lineItemSchema`

The `Order --< LineItem` relationship is a perfect use case for embedding because every time we access an order, we need it's line items to compute the total, etc.

As always, the schema used for embedding must be defined before the schema that references it:

```js
// models/order.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Add schema below
const lineItemSchema = new Schema({
  // Set qty to 1 when new item pushed into lineItems
  qty: { type: Number, default: 1 },
  item: itemSchema
}, {
  timestamps: true
});
...
```

Remember that `itemSchema` was defined in it's own module to be DRY? It was previously used in the `Item` model and now its being re-used here:

```js
// models/order.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Require the itemSchema below
const itemSchema = require('./itemSchema');
...
```

Looking at `lineItemSchema`, again, there appears to be some "missing" properties such as the  "extended price" for a line item computed by multiplying the quantity times the price of the item.

These "computed" properties can best be implemented using **virtual properties**...

## 5. Define the Virtual Properties for `orderSchema` and `lineItemSchema`

When Mongoose was introduced, we briefly discussed one of its most useful features - **virtual properties**, or **virtuals** for short.

### What are Virtuals?

Simply put, [Virtuals](https://mongoosejs.com/docs/tutorials/virtuals.html) are computed properties that are not persisted in the document/database.

Let's look at an example of using a virtual property...

### Defining are Virtuals

Consider this simple schema for a `Person` model:

```js
const personSchema = new Schema({
  firstName: String,
  lastName: String
}, {
  timestamps: true
});
```

It's likely that any application using this model would want to regularly use the "full name" of a person.

Without virtuals, the following code snippet would be commonplace:

```js
const fullName = `${person.firstName} ${person.lastName}`;
```

There are downsides to computing values like the above:

- It's dull and boring code.
- It's not DRY, it's likely we would have to repeat the calculation multiple times throughout the app. 
- It's inconvenient because the computed value is not attached to the document itself - it would be more convenient to encapsulate such logic within the document itself, and that's what virtuals do!

Virtuals to the rescue!

```js
const personSchema = new Schema({
  firstName: String,
  lastName: String
}, {
  timestamps: true
});

// Define a getter function for the fullName virtual
personSchema.virtual('fullName').get(function() {
  // The this keyword is the document
  return `${this.firstName} ${this.lastName}`;
});
```

<details><summary>❓ Could we have used an arrow function above?</summary>
<p>

**No, because Mongoose could not have bound the document to `this`.**

</p>
</details>

With the `fullName` virtual now defined, any person document can access it as `personDoc.fullName`!

> Note: It's also possible to define [setter functions for virtuals](https://mongoosejs.com/docs/tutorials/virtuals.html#virtual-setters). 

### Serializing Virtuals

By default, a document's virtual properties are not included when the document is serialized, e.g., sent to the client using Express' `res.json(personDoc)`.

However, in most cases we indeed want the virtuals to be included, and all that takes is another schema option:

```js
const personSchema = new Schema({
  firstName: String,
  lastName: String
}, {
  timestamps: true,
  // Include virtuals when doc is serialized to JSON
  toJSON: { virtuals: true }
});
```

### Adding a `extPrice` Virtual to `lineItemSchema`

Now that we know what virtuals are, let's put them to work in SEI CAFE by adding an `extPrice` virtual that computes the "extended price" for a line item:

```js
// models/order.js

...
const lineItemSchema = new Schema({
  // Set qty to 1 when new item pushed into lineItems
  qty: { type: Number, default: 1 },
  item: itemSchema
}, {
  timestamps: true,
  toJSON: { virtuals: true }
});

// Add an extPrice to the line item
lineItemSchema.virtual('extPrice').get(function () {
  // 'this' is bound to the lineItem subdocument
  return this.qty * this.item.price;
});
...
```

Yes, we can dot into an embedded subdocument and access its properties as is being done with `this.item.price`.

### Adding Virtuals to `orderSchema`

Here's a few virtuals that will prove helpful when working with order documents:

- `orderTotal`: Used to compute the total of the order.
- `totalQty`: Used to compute the total number of items in the order, taking quantity into consideration.
- `orderId`: Used to compute a user friendly order id from the lengthy `_id` of the order document.

Here they are!

```js
// models/order.js

...
const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  lineItems: [lineItemSchema],
  isPaid: { type: Boolean, default: false },
}, {
  timestamps: true,
  toJSON: { virtuals: true }
});

// Add the following helpful virtuals to order documents
orderSchema.virtual('orderTotal').get(function () {
  return this.lineItems.reduce((total, item) => total + item.extPrice, 0);
});

orderSchema.virtual('totalQty').get(function () {
  return this.lineItems.reduce((total, item) => total + item.qty, 0);
});

orderSchema.virtual('orderId').get(function () {
  return this.id.slice(-6).toUpperCase();
});
...
```

> Note: The `reduce` method strikes again!

Before moving on to implementing code in the React app, now would be a good time to uncomment the `Order` model in **crud-helper.js**.

## 6. Get the User's Cart - Client-Side

**AAU, when viewing the new order page, I want to see my current cart**

### What is a "Cart"

One of the biggest mistakes made by developers when implementing an e-commerce app is thinking a user's shopping cart requires a separate `Cart` model.

Actually, the cart is nothing more than the **user's current unpaid order**! 

As usual, we'll start with the client when implementing "viewing the cart".

### Add the `cart` State

Where definitely going to need state to hold the user's cart within `<NewOrderPage>`.

#### 💪 Practice Exercise - Add `cart` State to `<NewOrderPage>` (1 minute)

- Initialize the `cart` state to `null`

  <details><summary>Just in case...</summary>
  <p>

  ```jsx
  const [cart, setCart] = useState(null);
  ```

  </p>
  </details>

### Fetching the User's Cart 

After the `<NewOrderPage>` component is rendered for the first time, that's the time to get the cart and set state.

<details><summary>❓ The above scenario requires that the code needs to be within a ________?</summary>
<p>

**`useEffect`**<br>**hook with a `[]` dependency array.**

</p>
</details>

We already have the hook we need that includes code that fetches the menu items.

We simply need to add similar code to the existing `useEffect` to get the cart:

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
    setActiveCat(items[0].category.name);
  }
  getItems();

  // Load cart (a cart is the unpaid order for the logged in user)
  async function getCart() {
    const cart = await ordersAPI.getCart();
    setCart(cart);
  }
  getCart();
  ...
```

> There's no need to add a separate `useEffect` because the existing `useEffect` has the necessary empty array dependency (`[]`).

The React app isn't compiling because we need an additional `import`.

#### 💪 Practice Exercise - Add the Missing `import` (1 minute)

- Another slam dunk!

  <details><summary>Resist...</summary>
  <p>

  ```jsx
  /// NewOrderPage.jsx
  import * as itemsAPI from '../../utilities/items-api';
  // Add the following import
  import * as ordersAPI from '../../utilities/orders-api';
  ```

  </p>
  </details>

<hr>

The servers are happy, and check this out:

<img src="https://i.imgur.com/FTup22f.png">

Yes, `ordersAPI.getCart()` is already sending the AJAX request to server.

However, the server code is not quite finished...

## 7. Define the `getCart` Static Model Method

The business logic to retrieve the user's cart provides another opportunity to leverage an additional advanced feature of Mongoose - [static methods](https://mongoosejs.com/docs/guide.html#statics).

### What are Mongoose Static Methods?

Mongoose **static methods**, or **statics** for short, are methods callable on models (not documents).

Conceptually, Mongoose statics are no different than the static methods we defined on classes in JS and Python - no surprise since Mongoose models **are** classes.

### Add a `getCart` Static on the `Order` Model

Yes, we could write a Mongoose query in the controller, but it's a good practice to encapsulate business logic on the model itself whenever possible.

Let's add the `getCart` static:

```js
// models/order.js

...
// statics are callable on the model, not an instance (document)
orderSchema.statics.getCart = function (userId) {
  // 'this' is bound to the model (don't use an arrow function)
  // return the promise that resolves to a cart (the user's unpaid order)
  return this.findOneAndUpdate(
    // query
    { user: userId, isPaid: false },
    // update - in the case the order (cart) is upserted
    { user: userId },
    // upsert option creates the doc if it doesn't exist!
    { upsert: true, new: true }
  );
};

module.exports = mongoose.model('Order', orderSchema);
```

> Note: **Upserting** in database lingo means to insert (create) a record/document if it doesn't already exist when attempting an update. 

The comments in the above code say it all - other than "Wow!".

The [`findOneAndUpdate`](https://mongoosejs.com/docs/tutorials/findoneandupdate.html) Mongoose method is very flexible.

## 8. Get the User's Cart - Server-Side

There's already a server-side route defined that maps to a `cart` controller action that's stubbed up.

However, we need to uncomment the first line where the `Order` model is required:

```js
// controllers/api/orders.js

const Order = require('../../models/order');
// const Item = require('../../models/item');
```

Now let's put the fresh `Order.getCart` static method to work:

```js
async function cart(req, res) {
  // A cart is the unpaid order for a user
  const cart = await Order.getCart(req.user._id);
  res.json(cart);
}
```

Now that's what I call a skinny controller!

React Developer Tools confirms that we have our `cart` state!

<img src="https://i.imgur.com/W4tqw6E.png">

Look closely and you'll see that the virtual properties serialized nicely!

## 9. Render the `<OrderDetail>` Component

As discussed, the starter code included a `<OrderDetail>` component ready to display any order passed to it (we'll have some event handling to do later though).

This is what displays when the order is empty (has no line items):

<img src="https://i.imgur.com/Ot4D5yH.png">

#### 💪 Practice Exercise - Make `<OrderDetail>` Render the Cart (2 minutes)

- Take 2 minutes to make the `<OrderDetail>` display the `cart` state.

  > Hint: First examine **OrderDetail.jsx** to see what it expects and then give it up in **NewOrderPage.jsx**.

Excellent!  We're ready to start adding items to orders in Part 2 after the lab!

## 10. References

- [Virtual Properties in Mongoose Schemas](https://mongoosejs.com/docs/tutorials/virtuals.html)

- [Static Methods on Mongoose Models](https://mongoosejs.com/docs/guide.html#statics)

- [Instance Methods on Mongoose Documents](https://mongoosejs.com/docs/guide.html#methods)

