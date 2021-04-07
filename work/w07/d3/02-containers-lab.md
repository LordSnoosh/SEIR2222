<img src="https://i.imgur.com/DPzk4Ok.png">

# Python Containers - Lab

**This lab is a DELIVERABLE**

## Setup and Instructions

- Create a Python-based [repl.it](https://repl.it/repls) and name it "Python Containers Lab".
- Put a commented heading for each exercise in your repl.  For example:

  ```python
  # Exercise 1

  # your solution here


  # Exercise 2

  # your solution here

  # etc.....
  ```

- Complete the exercises below...

## Exercises


#### Exercise 1

- Create a list named `students` containing some student names (strings).
- Print out the second student's name.
- Print out the last student's name.

#### Exercise 2

- Create a tuple named `foods` containing the same number of foods (strings) as there are names in the `students` list.
- Use a `for` loop to print out the string "_food goes here_ is a good food".

#### Exercise 3

- Using a `for` loop, print just the last two food strings from `foods`.

  > Hint:  Use the slice operator to select the last two foods

#### Exercise 4

- Create a dictionary named `home_town` containing the keys of `city`, `state` and `population`.
- Print a string with this format:<br>"I was born in _city_, _state_ - population of _population_"

#### Exercise 5

- Iterate over the _key: value_ pairs in `home_town` and print a string for each item, for example:<br>"city = Arcadia"<br>"state = California"<br>"population = 58000"

#### Exercise 6

- Create an empty list named `cohort`.
- Using a `for` loop to iterate over the `students` list.
  > Hint: Use the `enumerate` function to provide both the index & student
- Within the `for` loop, add a dictionary to the `cohort` list that combines the student's name and the food in the `foods` list at the same index. Each dictionary will have this shape:

	```python
	{
	  'student': 'Tina',
	  'fav_food': 'Cheeseburger'
	}
	```
- Iterate over `cohort` printing out each item.


#### Exercise 7

- Using the list of `students` and list comprehension, assign to a variable named `awesome_students` a new list containing strings similar to this:<br>`["Tina is awesome!", "Fred is awesome!", "Wilma is awesome!"]`
- Iterate over `awesome_students` printing out each string.

#### Exercise 8

- Using the tuple `foods` and list comprehension within a `for` loop, print each food string that contains the letter `a`.

## Solutions

A solution can be found [here](https://repl.it/@jim_clark/Python-Containers-and-Ranges-Lab).

## Deliverable

This lab is a deliverable.

Please submit the link to your Python repl using the "Link to submit Deliverables" in the class repo's README.









