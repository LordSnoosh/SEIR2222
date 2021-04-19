<img src="https://i.imgur.com/pg98OTd.png">

# React Dev Skills Lab - Part 1

## Intro

Now that you've learned a bit about components in React, let's practice defining and rendering a few more.

##### This lab, combined with Parts 2, 3 & 4 is a Deliverable

## Exercises

The goal of the lab is to put in a rep doing everything that you did during the _React Intro & Components_ lesson.

Create a new React sandbox in [codesandbox.io](https://codesandbox.io) named "react-dev-skills".

Code the app so that it renders the following UI:

<img src="https://i.imgur.com/a1YSt4R.png">

Using the following component hierarchy:

<img src="https://i.imgur.com/Z7yRF8b.png">

## Hints

- React Elements are outlined in blue.

- The components are as follows:

  | Component | Renders |
  |---|---|
  | `<App>` | <ul><li>`<h1>`</li><li>`<SkillList>`</li><li>`<hr>`</li><li>`<NewSkill>`</li></ul> |
  | `<SkillList>` | <ul><li>`<ul>`</li><li>`<SkillListItem>` x 3</li></ul> |
  | `<SkillListItem>` | <ul><li>`<li>` with "SkillListItem" as its content</li></ul> |
  | `<NewSkillForm>` | <ul><li>`<form>`</li></ul> |
  | `<form>` in<br>`<NewSkillForm>`  | <ul><li>`<label>` with "Skill" and `<input>` as its content</li><li>`<label>` with "Level" and `<select>` as its content</li><li>`<button>` with "ADD SKILL" as its content</li></ul> |
  | `<select>` in<br>`<form>` above | <ul><li>`<option>` x 5 with content of "1" thru "5"`</li></ul> |

## This lab combined with Parts 2, 3 & 4 is a deliverable.