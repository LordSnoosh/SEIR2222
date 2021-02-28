<img src="https://i.imgur.com/qsSi07H.png">

# Intro to<br>Flexbox & CSS Grid

## Learning Objectives

| Students Will Be Able To: |
|---|
| Describe the Use Case of Flexbox & CSS Grid |
| Use Flexbox for One-Dimensional Layout |
| Use CSS Grid for Two-Dimensional Layout |

## Roadmap

- Setup
- Intro to Flexbox & CSS Grid
- Why use Flexbox?
- Flexbox Fundamentals
- Your First Flexbox
- Why use CSS Grid?
- CSS Grid Fundamentals
- Your First CSS Grid
- Further Study
- References

## Setup

For this lesson, we'll be using [repl.it](https://repl.it) to learn about Flexbox & CSS Grid:

1. Create a new **HTML/CSS/JS** repl

2. Name the Repl something like _Flexbox & CSS Grid_

3. Finally, a bit of starting CSS inside of `style.css`:

	```css
	* {
	  /* height & width now includes border & padding */
	  box-sizing: border-box;
	}
	
	body {
	  margin: 0;
	  font-family: Helvetica;
	}
	```

## Intro to Flexbox & CSS Grid

As a front-end developer, you will be required to precisely layout the elements on web pages.

Prior to Flexbox & CSS Grid, laying out the parts of a web page from basic navigation headers to complex full-page layouts has not been as straightforward as it could be - Flexbox & Grid, however, are game changers.

The capabilities of Flexbox & CSS Grid complement each other and using both side-by-side and even nesting one within the other is possible.

The difference between Flexbox and CSS Grid is how they are designed to lay out their children:

<img src="https://i.imgur.com/2ie45ct.png">

## Flexbox

### Why Use Flexbox?

Flexbox excels at assisting devs with the following tasks:
	
- Vertically centering content & elements within a container element
	
- Spacing child elements within a container uniformly
	
- Making the height of child elements laid out in columns the same even though they have a different amount of content.

### Flexbox Fundamentals

We use a CSS `display: flex;` declaration to make an element a **flex container**, for example: 

```css
section {
  display: flex;
}
```

The above would make all `<section>` elements **flex containers** and all direct children will automatically become **flex items**.

Let's browse to what has become the [de facto guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) to check out some of its features and properties.

### Your First Flexbox

We're going to make a navigation bar using Flexbox.

Add the following markup for the nav bar inside of the `<body>`:

```html
<nav>
  <div>HOME</div>
  <div>ABOUT</div>
  <div>WIDGETS</div>
  <div>LOG OUT</div>
</nav>
```

Run the Repl to check it out - definitely not what we're looking for - yet!

Use DevTools to verify that the `<nav>` & `<div>` elements are block elements that take up all available width. We're getting an inside look at how repl.it does it's magic by using of an `<iframe>` element.

❓**Which element do we need to make the flex container?**

Now, let's make the `<nav>` a Flexbox:

```css
nav {
  display: flex;
}
```

Run again, and we can make the following observations:

- The `<div>` elements have become **flex items** and no longer behave as block elements - their width has collapsed to that of their content and they are willing to sit side-by-side other elements.

- The **flex items** are laid out horizontally in a **row** - this is the default layout of a **flex container**.

#### 💪 Practice Exercise - CSS (4 mins)

This just in... Our client has informed us that:

- The navigation bar must:
	- Be `50px` in height
	- Have a background color of `#a2cbb6`.
- The menu items in the nav bar need:
	- A font size of `20px`
	- A margin of `10px` on all 4 sides
	- A text color of `#f3dba8`

- Add the CSS to make the client happy!

### Main Axis & Cross Axis

A **flex container** has a `flex-direction` property that defines the direction of its **main axis**.

There are four values:

- `row` (the default)
- `row-reverse`
- `column`
- `column-reverse`

Let's check them out by adding a `flex-direction` to the `<nav>`.

In addition to the concept of a **main axis**, a **flex container** has a **cross axis** which represents the opposite direction of its **main axis**.

For example, if the `flex-direction` is set to `row` (the default), the:

- **main axis** is **horizontal** (row)
- **cross axis** is **vertical** (column)

If the `flex-direction` is set to `column`, they flip:

- **main axis** is **vertical**
- **cross axis** is **horizontal**

The concepts of **main axis** & **cross axis** come into play when it comes to sizing and layout properties, such as:

- `justify-content`: Controls alignment for the **main axis**

- `align-items`: Controls alignment for the **cross axis**

- Check out the cool options/values we can assign to `justify-content` & `align-items` in the Guide to Flexbox we browsed to earlier.

### Back to the `<nav>` Bar

With the following alignment properties set:

```css
nav {
  display: flex;
  flex-direction: row; /* default */
  justify-content: flex-start; /* default */
  height: 50px;
  background-color: #a2cbb6;
}
```

The nav bar's not looking too bad...

<img src="https://i.imgur.com/j8lyhB7.png">

However, we want the `LOG OUT` menu item to be aligned on the right:

<img src="https://i.imgur.com/zRlWaUW.png">
	
We could wrap the other elements with another element and set `justify-content` to `space-between`.

Or, we can use this bit of CSS goodness:

```css
nav > div:last-child {
  margin-left: auto;
}
```
	
### ❓ Review Questions - Flexbox

1. **When an element has a CSS property of `display: flex;`, that element becomes a flex C__________.**

2. **When an element has a CSS property of `display: flex;`, its direct children become flex I_____.**

3. **What value is the default for the `flex-direction` property?**

4. **Is it `justify-content` or `align-items` that controls the alignment along the main axis?**

## CSS Grid

### Why use CSS Grid?

**CSS Grid** is a great option when you have:

1. A page layout like this (or as complex as you'd like):
	<img src="https://i.imgur.com/tkBPUd0.png">
2. Any other "components" that would benefit from a grid-type layout such as a "profile card", in other words, CSS Grid doesn't have to apply to the whole page - it can be useful for laying out smaller "components" as well.

### CSS Grid Fundamentals

Unlike Flexbox, **CSS Grid** lays out its **grid items** in **two-dimensions**.

**CSS Grids** have the following "pieces":

- **Tracks**
- **Cells**
- **Areas**
- **Grid Lines**
- **Gaps**

<img src="https://i.imgur.com/yNTGxhx.png">

As you might expect, there are plenty of CSS Grid-related properties and values.

Here's the [CSS Grid equivalent of that Flexbox guide we used earlier](https://css-tricks.com/snippets/css/complete-guide-grid/).

Let's browse to it and take a peek.

## Your First CSS Grid

To try out CSS Grid, we'll continue to work in the Repl to layout this UI:

<img src="https://i.imgur.com/d1nl2fn.png">

The following CSS turns the `<body>` element into a **grid container**:

```css
body {
  display: grid;
  height: 100vh;
  margin: 0;
  font-family: Helvetica;
}
```

> Just as a reminder, CSS Grid is handy beyond laying out the "page" - it's also awesome for laying out smaller UI components such as the "Profile Card" in the upcoming lab.

Using `height: 100vh;` will make the `<body>` fill the height of the browser window so that the `<footer>` is at the bottom.

> `vh`, and its other viewport unit siblings are awesome!  Be sure to check out the link in the Further Study section when you have a chance.

Now let's add the additional HTML required by the UI:

```html
<body>
  <nav>
    <div>HOME</div>
    <div>ABOUT</div>
    <div>WIDGETS</div>
    <div>LOG OUT</div>
  </nav>
  <aside>SIDE BAR</aside>
  <main>MAIN CONTENT</main>
  <footer>FOOTER</footer>
</body>
```

Now for a touch of styling to change the color of the elements we just added so that we can more easily see them:

```css
aside {
  background-color: #a2b4da;
}
	
main {
  background-color: #f3dba8;
}
	
footer {
  background-color: #a2cbb6;
}
```

One more stylistic touch. What if we want to center the text in those elements both horizontally and vertically?

Centering content is so common, let's create a class that will make any element with that class a Flexbox that centers its content:

```css
.flex-ctr {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

With the class defined - **let's add it to the `<aside>`, `<main>` & `<footer>` elements.**

Using Chrome DevTools to explore the page's elements, we can make the following observations:

- A **CSS Grid** has a single column by default.
- By default, each **grid item** is placed in a column from left-to-right until there are no more columns, then after the columns are filled, a new row is created.

Now let's define the columns and rows necessary to layout our page as desired.  Go back, look at the UI we want to layout and answer these questions:

❓ **How many columns will we need to define to attain our desired layout?**

❓ **How many rows?**

Okay, let's define those column and rows:

```css
body {
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-template-rows: 50px 1fr 30px;
  ...
```

> The `fr` unit is used by CSS Grid to represent a _fraction_ of the available space. So in our layout, the first column will be 1/5th the width of the window.

Running the repl shows that we've made a mess.  But notice how each **grid item** is simply being placed in each cell across the columns from left to right. This is the default behavior.

However, we need both the `<nav>` and the `<footer>` to span two columns each...

### Making Grid Items Span Multiple Columns & Rows

There are a couple of ways to make **grid items** cover rectangular grid **areas**.

One way is by defining `grid-template-areas` on the grid container; then using  the `grid-area` property on the **grid item**.

However, in this lesson, we'll look at another option...

The `grid-column` CSS property determines which **grid lines** a **grid item** starts and ends on.  For example:

```css
nav, footer {
  grid-column: 1 / 3;
}
```

> Note: The lines are numbered starting with 1 (not zero).

We can also use `span x` to specify how many columns we want the grid item to span:

```css
nav, footer {
  grid-column: span 2;
}
```

Unsurprisingly, there's a `grid-row` property as well.

Both `grid-column` & `grid-row` are shorthand for `grid-column-start` & `grid-column-end`, and `grid-row-start` & `grid-row-end`, respectively.

### Grid Gaps

The last thing we'll look at in regards to CSS Grid are grid **gaps** which specify the size of the **grid lines**.

Update the CSS of the `<body>` (grid container) to the following:

```css
body {
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-template-rows: 50px 1fr 30px;
  gap: 5px;  /* specifies width of grid lines */
  ...
```
	
> Note:  Other than their width, it's not possible to style grid gaps - the grid's background simply shows through.

> Note:  The `gap` property sets the width of both row and column gaps, if you want different widths, use the `row-gap` and `column-gap` properties.

### Flexbox & CSS Grid Practice Sites

We've covered the key fundamentals of these two fine additions to CSS.

For a fun way to practice and learn more, check out these awesome apps:

- [FLEXBOX FROGGY](https://flexboxfroggy.com/)
- [GRID GARDEN](https://cssgridgarden.com/)

## Further Study

Check out [this article](https://css-tricks.com/fun-viewport-units/) to learn more about viewport units!

## References

[MDN - Flexbox](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox)

[MDN - CSS Grid Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)