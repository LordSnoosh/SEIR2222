<img src="https://i.imgur.com/ijRQ97Z.jpg" width="300">

# Intro to the DOM


## Learning Objectives

| Students Will Be Able To: |
|---|
| Use DevTools to Explore the DOM |
| Select a Single Element in the DOM |
| Select Multiple Elements in the DOM |
| Change the Content of an Element |
| Change the Style of an Element |
| Manipulate the Attributes of an Element |
| Manipulate the Classes of an Element |
| Iterate Over a Collection of Elements |

## Road Map

- What's the DOM?
- Setup
- Using DevTools to Explore the DOM
- Selecting DOM Elements
- Selecting a Single Element by its `id`
- Selecting a Single Element Using a CSS Selector
- Changing the Content of an Element
- Changing the Style of an Element
- Attributes of an Element
- Attributes of an Element - Classes
- Selecting Multiple Elements
- Iterating Over a Collection of Elements

## What's the DOM

The [DOM (Document Object Model)](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction) is the in-memory representation of a browser's web document.

It's a tree-like data structure with the top (root) being the `document` object.

Let's type `document` in DevTool's console and check out some of its properties.

The DOM's application programming interface ([API](https://en.wikipedia.org/wiki/Application_programming_interface)) enables developers to make the UI dynamic by using JavaScript to:

-  Add/remove elements to/from the document
-  Change the content of elements
-  Change the style properties of elements
-  Animate elements
-  Listen for events on elements

## Setup

1. Move into your local class repo (use your `repo` alias created on day 1).
2. Sync the repo with GA's repo:  `git pull upstream master`
3. Move to today's director within the class repo: `cd work/w01/d4`
4. Create a directory named `dom-practice`:  `mkdir dom-practice`
5. Move into the new directory: `cd dom-practice`
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
11. Finally, let's add an `<h1>` inside of the `<body>` as follows:

	```html
	...
	<body>
	  <h1 id="title" class="main-title">DOM Practice</h1>
	  
	</body>
	</html>
	```
	> Note: It's a best practice to use double quotes and kebob-casing in HTML.

## Using DevTools to Explore the DOM

- Use the **open in browser** VS Code extension to open the `index.html`   file in the browser by right-clicking and selecting `Open in default browser` or by using the keyboard shortcut `option-b`.

- After `index.html` is opened in Chrome, use the keyboard shortcut of `option-command-i` to open Chrome's DevTools.

- Click on the **Elements** tab to browse the DOM.

- Let's try out the DevTools by clicking on the `h1` element and using the **Styles** panel to add a CSS property of `color: red;`

	<img src="https://i.imgur.com/RAvgNl0.png">

- Look closely after the closing `</h1>` tag - you see that _`== $0`_?

- That tells us that Chrome has created a variable named `$0` that represents the `<h1>` element in the DOM!

- Click on the **Console** tab and let's explore the properties on the `$0` element/object by typing `dir($0)`.

- Now try typing this in: `$0.style.backgroundColor = 'yellow'`

- Now that's what I call a DOM!

## Selecting DOM Elements

Web devs make web pages dynamic by manipulating the DOM.

For example, in a To Do app, the user types a new todo into an input, clicks a button and the new todo is added to the list.

The above scenario requires the app's JavaScript to:

- When the code loads, attach an event listener to the button element
- When that button is clicked, the event listener will need to:
  - Access the text entered into the `<input>` element
  - Create a new element, e.g. an `<li>`, and set it's content to that text
  - Append the new element to its parent element, i.e., the `<ul>`
  - For a better user experience (UX), "reset" the input by clearing out the current text

Most of the above steps requires that we use JS to select DOM elements!

## Selecting a Single Element by its `id`

The `getElementById` method is the most efficient way to select a DOM element if it has an `id` assigned to it (using the `id` attribute).

```js
const titleEl = document.getElementById('title');
console.log(titleEl);
```

> Note: When using `getElementById`, **don't** preface the name of the id with `#`, e.g., `document.getElementById('#title');` will not work.

If you wish to explore the properties of an element, use `console.dir()` instead of `console.log()`.

Cool, but how do we select elements that don't have an `id`...

## Selecting a Single Element Using a CSS Selector

The `querySelector(selector)` method is the go to method for selecting a single element using the power of CSS3's selectors.

`querySelector()` can be called on the `document` object, as well as elements themselves (handy for selecting an element nested within another).

The **selector** argument is a string that follows the rules of regular CSS3 selectors.

Knowing that the selector provided to `querySelector(selector)` follows the rules of CSS3 selectors, **how could we use it instead of `getElementById()` to select our `<h1>` element by its `id`?**

If the CSS selector provided to `querySelector()` matches multiple elements, it returns the **"first"** matching element, however, it's best to avoid this scenario.

If no matching node is found, `null` is returned.

### 💪 Practice (3 mins)

1. In `index.html`, add a `<p>` tag below the `<h1>` and give it a `class` of `cool`, then...

2. Add some content inside of the `<p>` tag - try typing `lorem [tab]` to emit (using _emmet_) random _lorem ipsum_ text.

3. Use `document.querySelector()` to select the `<p>` element with a class of `cool` and assign it to a variable named `pEl`.

4. Verify that the `<p>` element was selected by logging out `pEl`.

## Changing the Content of an Element

Now that we're able to select an element of our choosing, let's see how we can change the content of that element...

Inspecting the properties of a DOM element in the console reveals a couple of properties that we can use to read and set its content:

- **`innerHTML`** - Used to retrieve/set content as HTML
- **`textContent`** - Used to retrieve/set content as plain text

Let's check out changing the content of the `<p>` element by assigning the string **`Comments for <strong>Today</strong>`** first to `textContent`, then to `innerHTML`.

So, as you saw, if you want to include HTML in the content, use `innerHTML`.

The power of `innerHTML` may not be obvious, but consider the string can be as complex as you want - containing multiple elements with attributes, etc.

However, using `textContent` is more efficient if just setting text.

## Changing the Style of an Element

DOM elements have a `style` property that can be used to set CSS styling!

Check out the CSS properties in the console.

❓ **What naming convention is used for CSS properties in the DOM?**

❓ **What naming convention is used for CSS properties in CSS?**

❓ **Why is it different?**


This is how we can set the `text-align` CSS property of our title `<h1>`:

```js
const titleEl = document.getElementById('title');
titleEl.style.textAlign = 'center';
```

### 💪 **Practice (1 min)**

- Change the `color` of the `<p>` element to a color of your choosing.

## Attributes of an element

You may need to get, set, or check if an element has a certain **attribute**.

Here are a few of the methods that the [Element API](https://developer.mozilla.org/en-US/docs/Web/API/element) (Application Programming Interface) has for working with an element's attributes:

- `getAttribute(name)`
- `setAttribute(name, value)`
- `hasAttribute(name)`

### 💪 Practice - Attributes (5 mins)

1. In `index.html`, add an `<a>` element to `index.html` with content of "Visit Google" but **without an `href` attribute**.

2. Reload the page and verify that the link does not work (in fact, it probably doesn't even look like a link).

3. In the JS, write the line of code that will add an `href` attribute that will make the link navigate to "https://www.google.com".

> Hint: Which of the attribute methods above looks tasty?

## Attributes of an Element - Classes

Technically, you could use those attribute methods above to work with an element's classes.

However, the `classList` property offers a better approach. It's an object with the following methods pertaining to classes:

- `add(className, className, ...)` 
- `remove(className, className, ...)`
- `toggle(className)`
- `contains(className)`
- `replace(oldClass, newClass)`

### ❓ Review Questions

1. **If we want to change the text (no HTML) inside of a `<div>`, what property should we assign to?**

2. **How many DOM elements are returned by the `querySelector` method?**

3. **What DOM element property is used to style a DOM element using JS?**

## Selecting Multiple Elements

Before we checkout selecting multiple elements, let's add the following HTML below the existing `<p>` element.

VS Code includes [Emmet](https://docs.emmet.io/abbreviations/syntax/), which is a great tool for quickly generating markup. Type the following to generate most of the desired markup below:
<br>`ul#comments>li.comment{comment}*3`

```html
<ul id="comments">
  <li class="comment">first comment</li>
  <li class="comment">second comment</li>
  <li class="comment">third comment</li>
</ul>
```

The following methods _can_ be used to select multiple elements:

- `getElementsByTagName(namesString)`
- `getElementsByClassName(namesString)`

The above methods return a **live** [HTMLCollection](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection).

Although it's pretty cool that the returned list is automatically updated to include/exclude DOM elements as the DOM changes, the above methods are not as flexible as the `querySelectorAll` method...

Like `querySelector()`, the `querySelectorAll(selector)` method uses the power of CSS3 selectors to specify which DOM elements we want returned.

Of course, like the name says, it selects **all** DOM elements that match the provided selector.

By itself, `querySelectorAll` actually provides all the DOM selection power a web dev needs!

### 💪 Practice - Selecting Multiple Elements (2 mins)

1. Use `document.querySelectorAll()` to select all of the elements with a class of `comment` and assign them to a variable named `commentEls`.

2. `console.log(commentEls)` to verify it worked. 

## DOM Selection Summary

In summary, use the following to help you decide which method to use to select DOM elements:

- **`getElementById`**: Use when you need to select a single element that has an `id` assigned to it.

- **`querySelector`**: Use when you need to select a single element that **does not** have an `id`.

- **`querySelectorAll`**: Use when you need to select multiple elements.

## Iterating Over a Collection of Elements

`querySelectorAll` returns an array-like object called a [NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList).

There are three approaches we can use to iterate over the elements in a NodeList:

1. A regular **`for`** loop - this works, but it's not as readable or elegant...

2. The **`forEach`** method. A good option when you want to iterate through **all** elements or need to access the **index** of the iteration.

3. A **`for...of`** loop - elegant and allows early exit of the loop with the `break` statement, however, does not have access to an **index** (although you could track indexes manually by initializing a separate variable before the loop and incrementing it within the loop).

Let's type this `for...of` loop in the console to log each element:

```js
for(let commentEl of commentEls) {
	console.log(commentEl);
}
```

### 💪 **Practice - Iterating and Updating Styling (3 mins)**

- Add a `for...of` loop to `main.js` that changes the font size all of the `<li>` comment elements to `30px`.

- Hint: You must use a string like `'30px'` (just the number `30` or the string of `'30'` will not work). 

## ❓ Essential Questions

1. **What method is the most efficient for selecting an element that has an `id`?**

2. **If we want to insert content in an element that includes markup, what property would we assign to?**

3. **If you had to pick only one method to select DOM elements with during your career as a developer, which one should you choose?**

4. **Which property on DOM elements is used to set the CSS styling for that element?**


## References

- [Locating DOM Elements using Selectors](https://developer.mozilla.org/en-US/docs/Web/API/Document_object_model/Locating_DOM_elements_using_selectors)

- [Intro to the DOM on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
