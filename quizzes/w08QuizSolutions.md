# `SEIR` Week 8 Assessment
## For this quiz, please slack your instructors the answers, in numbered order. Do not include the questions. For example:
    1. Swag
    2. Yolo
## Django Routes
1. Which is the correct route using Django urls?
``` python
path('/index', views.index, name='index')
path('index/', views.index, name='index')
```
Solution
```
path('index/', views.index, name='index')
```
2. With Django, how would you create a url path for a detail page for a cat, where you access the id of the cat using cat_id? Assume you are not using class-based views.

Solution
```
path('cats/<int:cat_id>/', views.cats_detail, name='detail')
```
## Django Models and Admin Functionality!
3. After you create a model, what two terminal commands must you input to your terminal to synchronize the databases's schema with the app's models?

Solution
```
python3 manage.py makemigrations
python3 manage.py migrate
```
4. What must you do to allow an admin to interact with a model?

Solution
```
Register the model with the admin! (in admin.py)
```
## Django One to Many Relationships 
5. In a Django app, which side of the one to many relationship will hold the foreign key of the other model?

Solution
```
The many side
```
6. In the models.ForeignKey method, what does ```on_delete=models.CASCADE``` do?

Solution
```
It removes the orphaned children when the parent is deleted
```
## Django Many to Many Relationships
7. What does Django create in the database for you when you implement a many to many relationship?

Solution:
```
A join table
```
8. Assuming a Movie >--< Performer relationship and the following code:
```python
movie.performers.add(<arg>)
```
What two things could you provide in place of arg to create the association?

Solution:
```
The performer object/instance or its id
```

## Django authentication and authorization
9. How would you access the logged in user in your view functions?

Solution:
```
via request.user
```
10. How can you protect view functions to logged in users in Django?

Solution:
```
using the login_required decorator
```