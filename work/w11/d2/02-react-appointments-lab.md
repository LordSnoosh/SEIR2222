<img src="https://i.imgur.com/u8uvaan.jpg">

# React Appointment Tracker Lab

## Intro

You will need to create a new React CodeSandbox project named `react-appointments`.

For this lab, you will be creating an appointment management system that will persist your data using localStorage and the useEffect hook!

### Local Storage

See [localStorage docs](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) for more info.

You are only able to store strings in localStorage, but through the power of JSON.stringify() & JSON.parse() we are able to effectivetly store array or objects in localStorage as well.

Example:

```js
const people = [{name: "Chris"}, {name: "Jesse"}, {name: "Stephen"}, {name: "Drew"}]

// Adding to localStorage
localStorage.setItem('people', JSON.stringify(people));

// Getting from localStorage
const peopleFromStorage = JSON.parse(localStorage.getItem('people'));
```

### useEffect

You have seen how localStorage works in the MERN-Stack Infrastructure - Part 6 lesson, but we have not covered the `useEffect` hook yet. While we will have a lecture that will thoroughly cover the `useEffect` hook, you will get a sneak peak today!

One of the `useEffect` hook's many uses is to execute code after a functional component has rendered. This will come in handy when trying to retrieve our list of appointments from localStorage upon page load.

Here is an example of `useEffect` syntax:

```jsx
import { useEffect } from "react";

export default function App() {

  useEffect(function() {
    // Code here runs after App has rendered
    console.log('App has rendered');
  });
  
  return (
    <div className="App">
      <h1>Welcome</h1>
    </div>
  )
}
```

Notice that `useEffect` accepts a callback function as an argument. Any code within the callback function, such as the console.log() above, will execute **after** the App component has rendered on the screen.

You will want to use this to retrieve your list of appointments from localStorage when the page first loads or is refreshed:

```jsx
useEffect(function() {
  // get appointments from local storage
  // if no appointments in local storage, return
  // lastly, setAppointments with appointments from local storage
})
```

<details>
  <summary>useEffect Solution Code (try not to peak!)</summary>

```jsx
import { useState, useEffect } from "react"

export default function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    if (!itemsFromStorage) return;
    setItems(itemsFromStorage)
  })

  return (
    <div className="App">
      <h1>Appointment Tracker</h1>
    </div>
  );
}
```

</details>


## Requirements

  - AAU, when the page first loads, I want to see my list of appointments, or a message saying "You have no appointments yet"
  - AAU, I want to be able to add an appointment to my list
    - Each appointment should have at least three properties - `title`, `date`, and `duration`
  - AAU, I want to be able to refresh the page and still see my list of appointments
    - This is where localStorage comes in handy!
    - You will need to update your array of appointments in localStorage each time a new appointment is added
  - AAU, I want to be able to delete an appointment from my list


## Deliverable

#### This lab is not a deliverable.
