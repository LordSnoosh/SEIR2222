<img src="https://i.imgur.com/VLwvpbl.jpg" width="900">

## Learning Objectives

| Students will be able to: |
|---|
| Add event listeners for events such as `click` |
| Explore the event object |
| Explain event bubbling |
| Use event bubbling to implement event delegation |
| Stop an event from bubbling |

## Road Map

- What are DOM events?
- Setup
- What's an Event Listener?
- Our first Event Listener
- The Event Object
- Adding a New Comment
- Event Bubbling
- Event Delegation
- Removing Event Listeners

## What are DOM Events?

DOM events are the bedrock of interactivity on web pages.

DOM events enable us as developers to implement **event-driven programming**. This programming paradigm is such that much of our code runs in response to events being triggered during run-time (usually due to user interaction).

Lots of events are being generated within the browser, for example, when:

-  A user moves or clicks the mouse
-  A user presses a key
-  When a form is submitted
-  When the page has finished loading or has been resized
-  etc.

Take a gander [here](https://developer.mozilla.org/en-US/docs/Web/Events) at the type and sheer number of events.

## What's an Event Listener?

An **event listener** is a function, more specifically, a **callback function**, that is called when an event fires.

Event listeners may also be referred to as event handlers.

There are three different approaches for registering event listeners:

- In the HTML (inline):<br>`<button id="reset-btn" onclick="reset()">`
- Assigning to DOM elements' properties:<br>`resetBtn.onclick = reset;` 
- Calling `addEventListener()` on a DOM element

Using the HTML approach (`onclick="reset()"`) is typically frowned upon because it requires that the function be in the global scope. In addition, this, like inline styling, kind of breaks the **separation of concerns** design principle.

The DOM element approach (`resetBtn.onclick = reset;`) is better because the function does not have to be in global scope, however...

The `addEventListener` approach is widely considered to be the best practice because it has the flexibility of adding multiple listener functions!

Here is the syntax for attaching an event listener for a given event:

```js
element.addEventListener(<event-name>, <callback>, <use-capture>);
```
- **event-name** is the name of the event (string)
- **callback** is the function we want executed when the event happens.  When called by the JS engine, it will be passed an _event object_ as an argument.
- **use-capture** is a boolean and is optional. It has to do with _event phases_ and is rarely used.  If you want to know more, read the [Event Phases section of this article](https://www.smashingmagazine.com/2013/11/an-introduction-to-dom-events/). 

## Setup

1. Move into your local class repo (use your `repo` alias created on day 1).
3. Move to today's director within the class repo: `cd work/w01/d4`
4. Create a directory named `events-practice`:  `mkdir events-practice`
5. Move into the new directory: `cd events-practice`
6. Create an `index.html` file:  `touch index.html`
7. Open the directory in VS Code: `code .`
8. Open `index.html` in the editor and use `! [tab]` to create the HTML boilerplate.
9. Create a `js` directory and touch a `js/main.js` file
10. Add a `<script>` tag to include `main.js` in the `<head>`:

	```html
	<head>
	  ...
	  <title>DOM Practice</title>
	  <script defer src="js/main.js"></script>
	</head>
	```
	> The `defer` attribute ensures the DOM is ready before the script executes.

A temporary `alert('js loaded)` statement in `main.js` will confirm it's being loaded.

## Our first Event Listener

After setting up the project, add the following HTML:

```html
<h3>Comments</h3>
<ul>
  <li>SEI Rocks!</li>
</ul>
<input>
<button>Add Comment</button>
```

When we click the `[Add Comment]` button, we want to create a new comment using the text entered in the `<input>` and then clear the text from the `<input>`.

We can add a `click` event listener to pretty much any element - not just buttons.  However, buttons are pre-styled to look and act clickable 😃

We're going to use an anonymous callback function in this first example:

```js
const btn = document.querySelector('button');
btn.addEventListener('click', function(evt) {
  // testing!
  console.log(evt);  
});
``` 

If all goes well, clicking the button should log out the **event object**.

Congrats, attaching your first event listener!

### ❓Review Questions

1. **What's the name of the method used to attach event listeners to elements?**

2. **What is that method's _signature_ (a method's name, the number & type of arguments it takes, and what it returns)?**

3. **Name three events that might be triggered in the browser.**

## The Event Object

Examining the **event object** that was provided as an argument to our event listener reveals lots of useful information about the event!

Of special interest are:

- Several `...X` and `...Y` properties that provide where the click occurred.

- The `target` property, which holds a reference to the DOM element that triggered (dispatched) the event.

- JS's `this` keyword within the listener function will be set to the DOM element that `addEventListener` was called on, which as you'll see later, won't always be the same as the element that dispatched the event.

## Adding a New Comment

#### Creating a New `<li>` Element

If we want to add a new comment to the DOM, we're going to need to create a new `<li>` element.

Here's how we can do it using the `document.createElement` method:

```js
btn.addEventListener('click', function(evt) {
  const liEl = document.createElement('li');
  console.log(liEl)
});
```
> Note: At this point, the element is "in memory" only and is not part of the DOM (yet).

Okay, we have a new `<li>` element created and assigned to a variable named `liEl`, but it has no content.

#### Getting/Setting the Text of an `<input>`

We'll need to access the text the user has typed into the `<input>` element in order to set the content of `liEl`.

Since `<input>` elements are **empty elements**, i.e., elements with no content, `textContent` and `innerHTML` properties do not exist.

Instead, we get and set the text within an `<input>` using the `value` property.

> NOTE: The `value` property maps to the `value` attribute in HTML.

#### Setting the Content of the `<li>`

So, now we can set the `textContent` of the new `<li>`:

```js
btn.addEventListener('click', function(evt) {
  const liEl = document.createElement('li');
  const inpEl = document.querySelector('input');
  liEl.textContent = inpEl.value;
});
```

Now the new `<li>` is ready to be added to the DOM!

#### Adding the `<li>` to the DOM

❓**Which element do we we want to add the `<li>` to?**

There are several ways to add DOM elements to the document using JavaScript.

A common way to add new elements to another element is by using the `appendChild` method like this:

```js
  liEl.textContent = inp.value;
  // new code below
  document.querySelector('ul').appendChild(liEl);
});
```
> Note that the new element is appended as the last child.

Test it out - nice!

#### Clearing the Text in the `<input>`

The new comment has been added, but if we want to improve the UX, we have one more task - clear out the `<input>`.

### 💪 Practice (1 min)

- Clear the text in the `<input>` by adding one line of code.

> Hint: What's the property that we used to _get_ the text?

## Event Bubbling

When an event occurs on an element, that event _bubbles_ up through the DOM, all the way up to the `document` object.

<img src="https://i.imgur.com/B7f5PAZ.png" width="900">

All event listeners attached for the same event, such as `click`, will be invoked along the path to the `document` element - unless one of those listeners calls the **event object's** `stopPropagation` method.

Why does JS bubble up (propagate) its events?...

## Event Delegation

#### What is Event Delegation

Imagine a web app, like a game perhaps, with lots of elements that need to respond to a click. It's possible there could be tens, hundreds or more of these elements.

That would be a lot of listeners, wouldn't it - not very efficient at all.

Plus, every time a new element is added, the event listener would also have to be attached 🤢

Event bubbling allows us to implement what's known as **event delegation**.

Event delegation allows us to attach an event listener to a single DOM element that can respond to events triggered by any of its **descendant** DOM elemnts.  Much more efficient!

#### Implementing Event Delegation

Let's attach an event listener (this time we'll use a named function) on the `<ul>` that can respond to clicks on any of its nested `<li>` elements:

```js
// Don't need to access the ul anywhere else, so let's chain the method call
document.querySelector('ul')
  .addEventListener('click', handleClick);

// Naming the function handleXxxxx is a good practice
function handleClick(evt) {
  console.log(evt);
}
```

> Important:  The event object's `target` property will be set to the **actual** element that was clicked!

Not only is event delegation more efficient, by it's very design, it's dynamic - as descendants are added, they too will be listened to!

Without event delegation, you would have to attach a listener every time a new element is added, such as when the comment `<li>` is added. 

### 💪 Practice - Event Delegation (2 mins)

Now that we have a delegated event listener in place, let's:

1. Write the code to change the color (your choice) of the text of a clicked comment.

> Hint: DOM elements have a `style` property that's an object with the CSS properties (named using camel-casing), e.g., `someElement.style.fontSize`.

## Removing Event Listeners

Although not usually necessary, it's possible to remove an event listener, however, only if a named function was used as the callback:

```js
btn.removeEventListener('click', handleClick);
```

For example, the following would remove the `click` event listener (`handleClick`) that was registered on the `btn` element like this:

```js
btn.addEventListener('click', handleClick);
```

## ❓ Essential Questions

1. **What is the argument that JS passes to an event listener when it calls it?**

2. **What is the name of the property on the above argument that represents the DOM element that dispatched the event?**

3. **Let's say you needed to have an event listener respond to a `click` event on the `<td>` elements within a `<table>` - would you have to add event listeners to each `<td>`?  Support your answer.**

## References

- [Event Developer Guide on MDN](https://developer.mozilla.org/en-US/docs/Web/Guide/Events)