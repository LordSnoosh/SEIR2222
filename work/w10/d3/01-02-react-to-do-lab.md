<img src="https://i.imgur.com/VunmGEq.jpg">

# React To-Do - Practice Lab

## Intro

You've learned the basics of a React app including:

- How to compose an app's UI using Function Components 
- How to define a component's UI using JSX
- How to pass props from a parent to a child component
- How to style React Elements
- How to encapsulate state within a component using the `useState` hook
- How to update state with the setter function provided by the `useState` hook
- How to use forms and controlled inputs
- How to handle browser events

This lab will provide you the opportunity to practice the above skills by adding the following user stories to the existing React To-Do app:

- AAU, I want to be able to mark to-dos as completed so that I can remove them from the list.
- AAU, I want to see the text of a completed to-do rendered with a line through it.
- AAU, I want to be able to remove a completed to-do from the list.

## Setup

Continue to build upon the "React To-Do" sandbox we've been working with during the lessons in [codesandbox.io](https://codesandbox.io/):

<img src="https://i.imgur.com/BHDBkZM.png">

## Exercises & Hints

### AAU, I want to be able to mark to-dos as completed so that I can remove them from the list

#### Hints:

- Since each to-do needs to track whether or not it's completed, start by refactoring the `todos` state from being an array of simple strings to an array of to-do objects like the following:

  ```jsx
  const [todos, setTodos] = useState([
    {text: "Have Fun", completed: true},
    {text: "Learn React", completed: false},
    {text: "Learn the MERN-Stack", completed: false}
  ]);
  ```

- The above refactor requires a minor change to `<ToDoListItem>` because the `todo` prop it's receiving is now an object instead of a string - `<ToDoListItem>` should now render the `text` property of `todo`.

- Now when adding a new to-do, an object should be added with a `completed` property set to `false` and its `text` property set to the text of the new to-do.  The app should now be working again - a refresh of the sandbox may be required if it gets "stuck".

- The UI should display a button with a ❌ used to delete the to-do if the to-do is completed.  Otherwise, display a button with a ✔️ used to update the to-do as completed: 

  <img src="https://i.imgur.com/eyyt7Xy.png">

  > The styling is up to you. The only change necessary to display the above is to update `justify-content` to `space-between` in **ToDoListItem.css**:

  <img src="https://i.imgur.com/HLy4DMd.png" width="70%">

- Update a to-do's `completed` property to `true` when the  ✔️ is clicked.  We should update the `todos` state from within the `<App>` component - refer to the existing code that adds a to-do.

- You'll need to pass the function responsible for updating the to-do from `<App>` all the way down to `<ToDoListItem>`. Don't forget to destructure the props!

- Because a to-do is now an object, when updating it, both the `todos` array and the to-do object should be replaced, not mutated. The `map` method can be handy here.<br>
  <details><summary>Don't Peek Unless You Have To...</summary>

  ```js
  function completeTodo(todoIdx) {
    const newTodos = todos.map((t, idx) =>
      idx === todoIdx ? { text: t.text, completed: true } : t
    );
    setTodos(newTodos);
  }
  ```

  </details>

### AAU, I want to see the text of a completed to-do rendered with a line through it

#### Hints:

- Use either the `style` prop or dynamically apply a CSS class with a declaration of<br>`text-decoration: line-through`.

- Regardless of the approach you take, you'll want to wrap the to-do's text with a `<span>` React Element and apply the styling to the `<span>`.<br>

  <details><summary>Don't Peek Unless You Have To...</summary>

  ```js
  <span style={{ textDecoration: todo.completed && "line-through" }}>
    {todo.text}
  </span>
  ```

  </details>

  <img src="https://i.imgur.com/iwMBSi4.png">

### AAU, I want to be able to remove a completed to-do from the list

- Very much like marking a to-do as complete, however, the `filter` method is your go to in this case. 

Congrats!

<img src="https://i.imgur.com/hY21Tbu.png">

## Deliverable?

This lab is **not** a deliverable.
