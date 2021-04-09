# `SEIR` Week 7 Assessment
## For this quiz, please slack your instructors the answers, in numbered order. Do not include the questions. For example:
    1. Swag
    2. Yolo

## Python Control Flow

1. Is an empty list ``[]`` in Python a truthy or falsy value?

```Solution: Falsy! ```

2. What would be returned by the following Python expression?

```python
[] and "I love coding in Python"
```

```Solution: [] ```

3. What would get printed from the following Python code?

```python
nums = list(range(0, 6, 2))
print(nums)
```

```Solution: [0, 2, 4]```

## Python Containers

4. What does list comprehension in Python always return?

`` Solution: a new list ``

5. What is the main difference between tuples and lists in Python?

``Solution: Tuples are immutable, while lists are mutable. Also, we typically provide heterogeneous data types in tuples, while lists get homogeneous data types ``

## Python Functions

6. What would be wrong with the following Python code?

```python
my_function = def my_function():
  pass
```

``Solution: Only lambda functions can be assigned to variables in Python``


7. What would be wrong with defining a function like the following in Python?

```Python
def get_net_worth(cash, *args, debt, assets):
    pass
```

`` Solution: the *args parameter should always be used after all positional parameters ``

## Python Classes

8. Is this allowed when defining attributes for the following dog class?

```python
class Dog():
  def __init__(new_doggo, name, age = 0):
    new_doggo.name = name
    new_doggo.age = age
```

``Solution: Heck yes, self is the conventional name for the parameter that will be used to reference the other properties and methods within that object, but since it is just the first parameter, you can call it whatever you want. ``

9. What method is called by Python whenever a new instance of a class is created?

``Solution: The __init__ method``

10. How does Python know that you created a class method inside of a class instead of an instance method?

`` It sees the @classmethod decorator! ``



