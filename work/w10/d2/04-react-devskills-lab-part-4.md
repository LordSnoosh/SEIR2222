<img src="https://i.imgur.com/pg98OTd.png">

# React Dev Skills Lab - Part 4

## Intro

This lab provides an opportunity to practice:

- Using the `value` and `onChange` props to implement controlled inputs.
- Implementing event handlers.
- Updating state by replacing objects instead of mutating them.
- Passing a method from a parent component to a child component via a prop.

##### This lab, combined with Parts 1, 2 & 3 is a Deliverable

## Exercises

1. Open your "react-dev-skills" sandbox that you created back in Part 1.

2. Add state to the existing `<NewSkillForm>` component that will be used to manage the form's state. The state should be initialized as an object with two properties: `name` and `level` - by design, these properties match the names of the properties of the skill objects held in state (App.js). The `name` property should be initialized to an empty string and the `level` property should be initialized to a number of `3`.

3. Add `value` props to each `<option>` tag and assign the **numbers** 1 thru 5 like this:

    ```jsx
    <option value={1}>1</option>
    ```
    > Remember, unlike attributes in HTML which always hold strings, props in React can hold any type of data.

4. Following the steps in the lesson, make the `<input>` and `<select>` controlled inputs that update the form's state you created in step 2.

    > Hint:  As in the lesson, use computed property names so that a single onChange handler can be used for any number of inputs.

5. Make the form's button a submit button and add an `onSubmit` prop to the `<form>`.  Assign an event handler to `onSubmit` and ensure that the form does not trigger a full-page refresh when the button is clicked!

6. Following the steps in the lesson, code the app so that when the [ADD SKILL] button is clicked, the new Dev Skill is added to the `skills` state held in **App.js**. The app should re-render and display the new skill.

    > Hint: App.js needs a function that will update the state and that function will need to be passed to the `<NewSkillForm>` component.

7. For a better UX, after the new skill is added, the form should reset to the same values used to initialized the state.

## This lab combined with Parts 1, 2 & 3 is a Deliverable