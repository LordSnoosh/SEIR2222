<img src="https://i.imgur.com/HL5YY8J.png">

# Django Many-to-Many Relationships

## Learning Objectives

| Students Will Be Able To: |
|---|
| Use Django's `ManyToManyField` to Implement a M:M Relationship |
| Add an Association in a M:M Relationship |
| Remove an Association in a M:M Relationship |

## Road Map

1. Set Up
2. Review the Starter Code
3. Many-to-Many Relationships in RDBMs
4. Many-to-Many Relationship in Django
5. Implement the Cat & Toy Association in Cat Collector
6. Refactoring the `CatCreate` CBV
7. Lab Assignment
8. Practice Exercise
9. Further Study

## 1. Set Up

The starter code for this lesson has had quite a bit of code added to it since you last saw the Cat Collector.

However, none of the additional code has anything that you haven't worked with already.

Because many-to-many relationships require a Model that is independent of other models, a `Toy` Model and all of its CRUD has been implemented.

This way, we can focus on how to implement the actual `Cat >--< Toy` relationship in this lesson.

Please sync with the starter code in the catcollector repo:

1. `cd ~/code/catcollector`
2. `git fetch --all`
3. `git reset --hard origin/master`

After syncing, open the project in VS Code: `code .`

Because a new `Toy` model has been added, there are migration files in the starter code that have not yet been migrated to the database on your computer.

Here's how we can check the status of migrations:

```
python3 manage.py showmigrations
```

As you can see, there's a migration that has yet to be migrated - let's do that now:

```
python3 manage.py migrate
```

Finally, we can start up the server:

```
python3 manage.py runserver
```

## 2. Review the Starter Code

Browse to `localhost:8000` and checkout the CRUD features for Toys.

As you can see, the `Toy` Model is pretty minimal, just `name` and `color` attributes.

After you're done, let's take a look at the `Toy`-related Django modules in `main_app`:

- **models.py**
- **urls.py**
- **views.py**

Go ahead and create a few toys so that you have them to assign to cats later. Here are some toys that 9 out of 10 cats enjoy:

```
Bouncy Mouse / Blue
Cat Charmer / Green
Catnip Banana / Gold
Whacky Mouse Chaser / Purple
```

## 3. Many-to-Many Relationships in Relational Databases

Unlike MongoDB, which can easily implement both one and many-to-many relationships Model to Model, SQL databases need what is known as a **join table** to implement many-to-many relationships.

A row in a join table is used to provides the "association" between the two rows in the related tables.

Each row in the join table contains _foreign keys_ for the other two tables' _primary keys_ as diagrammed here:

<img src="https://i.imgur.com/imTYIBl.png">

As you can see, "associating" a cat and a toy is a matter of adding a row in the join table.  Similarly, to "unassociate" a cat and toy, the corresponding row in the join table is deleted - not a cat row, not a toy row! 

## 4. Many-to-Many Relationship in Django

As usual, the Django framework will handle the heavy lifting when it comes to working with many-to-many relationships between Models.

Forms and templates aside, all we need to do to implement a many-to-many relationship using Django is:

1. Add a `ManyToManyField` on **one** of the Models
2. Create the migration and migrate it to update the database

Using a `ManyToManyField` causes Django to create a "hidden" join table used to implement the M:M association. 

#### Add a `ManyToManyField` on One Side of the Relationship

To create a M:M relationship between two models, we need to add a `ManyToManyField` on **one** of them.

Django will still ensure that we can traverse data from both models to the related model, but we get to pick the name for the relationship attribute on the model we choose to add `ManyToManyField` to.

We more commonly be accessing a cat's toys, than a toy's cats, so we'll add the new attribute to the `Cat` model:

```python
class Cat(models.Model):
  name = models.CharField(max_length=100)
  breed = models.CharField(max_length=100)
  description = models.TextField(max_length=250)
  age = models.IntegerField()
  # Add the M:M relationship
  toys = models.ManyToManyField(Toy)
```

#### Make and Run the Migration

Because we've made a change to a Model that impacts the database's schema, we must make a migration and migrate it to update the database.

First, make the migration:

```
python3 manage.py makemigrations
```

Now, let's migrate the created migration to update the schema:

```
python3 manage.py migrate
```

We're ready to test drive the new relationship!

#### Open the Interactive Shell

We'll use the shell to test drive the `Cat >--< Toy` relationship:

```
python3 manage.py shell
```

Now let's import everything from **models.py**:

```
>>> from main_app.models import *
```

#### The "Related Manager"

Thus far, we have performed CRUD using the `objects` manager on a Model. For example, let's use the manager to query for all cats:

```python
>>> Cat.objects.all()
<QuerySet [<Cat: Biscuit>, <Cat: Morris>, <Cat: Maki>]>
```

However, when a one-to-many or many-to-many relationship exists, Django also creates a [related manager](https://docs.djangoproject.com/en/3.1/ref/models/relations/) used to access the data related to a model instance.

To check this out, let's query for a cat and save it in a variable:

```python
>>> cat = Cat.objects.get(name='Maki')
```

Now, thanks to the `toys = models.ManyToManyField(Toy)` field we added, we can use the `toys` _related manager_ like this:

```python
>>> cat.toys.all()
<QuerySet []>   # Maki has no toys associated with it yet
```

Let's grab the first toy:

```python
>>> first_toy = Toy.objects.first()
>>> first_toy
<Toy: Cat Charmer>
```

Although we didn't add another field on the `Toy` Model, Django still created a related manager that allows a toy to read, add & remove associated cats:

```python
>>> first_toy.cat_set.all()
<QuerySet []>
```

> Note the naming convention Django used for naming the related manager - the related model's name (lower cased) and append `_set`.
 
#### Adding Associated Data

To add an association, use the related manager's `add` method.

Let's associate the `cat` and the `first_toy`:

```python
>>> cat.toys.add(first_toy)
>>> cat.toys.all()
<QuerySet [<Toy: Cat Charmer>]>
```

> Alternatively, `first_toy.cat_set.add(cat)` would have created the same association.
 
Let's get crazy and associate the last cat with both the first and last toy:

```python
>>> Cat.objects.last().toys.add(Toy.objects.first(), Toy.objects.last())
>>> Cat.objects.last().toys.all()
<QuerySet [<Toy: Cat Charmer>, <Toy: Bouncy Mouse>]>
```

Behind the scenes, there's a huge amount of SQL being sent to the database!

#### Removing Associated Data

To remove an association, use the related manager's `remove` method.

Let's remove the association between the `cat` and the `first_toy`, but this time we'll do it using `first_toy`:

```python
>>> first_toy.cat_set.all()
<QuerySet [<Cat: Morris>, <Cat: Maki>]>   # Associated with two cats
>>> cat    # Going to unassociate this cat
<Cat: Morris>
>>> first_toy.cat_set.remove(cat)
>>> first_toy.cat_set.all()
<QuerySet [<Cat: Maki>]>    # No more Morris
```

The `clear()` method is used to remove all associations on an instance.

For example, here's how we can use a `for...in` loop and the `clear()` method to remove all associations between cats and toys:

```python
>>> for c in Cat.objects.all():
...     c.toys.clear()    # Don't forget to tab
... [press enter]
>>>
```

Fun stuff!  Exit the shell by typing `control + D` or `exit()`

## 5. Implement the Cat & Toy Association in Cat Collector

### User Stories

_As a User, when viewing the detail page of a cat, I want to see a list of toys the cat has._

_As a User, when viewing the detail page of a cat, I want to be able to add a toy from a list of toys that the cat doesn't already have._

### Displaying a List of Associated Toys

Displaying a cat's toys is just a matter of updating **templates/cats/detail.html**:

```html
<!-- This is all new markup to be added just above the <script> tag -->
<hr>
<div class="row">
  <div class="col s6">
    <h3>{{ cat.name }}'s Toys</h3>
    {% if cat.toys.count %}
      {% for toy in cat.toys.all %}
        <div class="card">
          <div class="card-content">
            <span class="card-title">
              A <span style="color: {{ toy.color }}">{{ toy.color }}</span> {{ toy.name }}
            </span>
          </div>
        </div>
      {% endfor %}
    {% else %}
      <h5>No Toys :(</h5>
    {% endif %}
  </div>
  <!-- Available toys will come after this line -->
</div>
```

After saving and viewing the detail page for a cat, you'll see something like this:

<img src="https://i.imgur.com/XypPw7A.png">

### Displaying a List of Unassociated Toys

The next step would be to display toys that the cat is not associated with.

Each toy should include an ADD button that will add the toy to the list (implemented in the next step).

To be able to display the list of unassociated toys, we'll need to query for them in the `cats_detail` view function and add them to the context (data) being passed to the template.

The query to find all toys that a cat doesn't have is a bit complicated, but it demonstrates the power of the Django ORM.

In **views.py** update `cats_detail as follows`:

```python
def cats_detail(request, cat_id):
  cat = Cat.objects.get(id=cat_id)
  # Get the toys the cat doesn't have
  toys_cat_doesnt_have = Toy.objects.exclude(id__in = cat.toys.all().values_list('id'))
  feeding_form = FeedingForm()
  return render(request, 'cats/detail.html', {
    'cat': cat, 'feeding_form': feeding_form,
    # Add the toys to be displayed
    'toys': toys_cat_doesnt_have
  })
```

The manager's `exclude` method is like `filter` except that it is used to query for objects that don't meet the criteria.

The Django Query API enables [Field Lookups](https://docs.djangoproject.com/en/3.1/ref/models/querysets/#field-lookups) for every field in the model. `id__in` is one such field lookup that checks if the model's `id` is in a list and that list is being created with this code:

```python
cat.toys.all().values_list('id')
```

Finally, we are passing the toys to the template by adding it to the context dictionary.

Now for more markup to display the toys the cat doesn't have:

```html
  </div>
  <!-- Available toys will come after this line -->
  <div class="col s6">
    <h3>Available Toys</h3>
    {% if toys.count %}
      {% for toy in toys.all %}
        <div class="card">
          <div class="card-content">
            <span class="card-title">
              A <span style="color: {{ toy.color }}">{{ toy.color }}</span> {{ toy.name }}
            </span>
          </div>
          <div class="card-action">
            <form action="" method="post">
              {% csrf_token %}
              <button type="submit" class="btn">Add</button>
            </form>
          </div>
        </div>
      {% endfor %}
    {% else %}
      <h5>{{cat.name}} Already Has All Toys Available</h5>
    {% endif %}
  </div>
```

Yup, pretty much like what we just added previously, except for a couple of changes.

An **ADD** form has been included, but the `action` attribute is currently empty because we'll implement handling the form being submitted in the next section and we haven't identified what the path will be yet.

Here's what the updated UI looks like:

<img src="https://i.imgur.com/Lbhq1Ff.png">

### Making the Association

The app is looking good and all that's left is to handle the form being submitted to associate a toy with the cat.

To do this, the server needs to know the `id` of **both** the cat and the toy being associated.

Let's first add a new routes with a URL pattern that includes both `id`s in **urls.py**:

```python
  path('cats/<int:cat_id>/add_feeding/', views.add_feeding, name='add_feeding'),
  # associate a toy with a cat (M:M)
  path('cats/<int:cat_id>/assoc_toy/<int:toy_id>/', views.assoc_toy, name='assoc_toy'),
```

As you can see, we've created two route parameters:  `cat_id` and `toy_id`.

Now let's make sure the form will post to this route.

Now that we know have defined the route and named it, we will use the `url` template tag to write out the proper URL in the form's `action`:

```html
<div class="card-action">
  <form action="{% url 'assoc_toy' cat.id toy.id %}" method="post">
      {% csrf_token %}
    <button type="submit" class="btn">Add</button>
  </form>
</div>
```

Note how we need to provide both `id`s as space-separated parameters in the order that they were defined in the path (first the cat's id, then the toy's).

All that's left is to code the `views.assoc_toy` view function:

In **views.py**:

```python
def assoc_toy(request, cat_id, toy_id):
  # Note that you can pass a toy's id instead of the whole toy object
  Cat.objects.get(id=cat_id).toys.add(toy_id)
  return redirect('detail', cat_id=cat_id)
```

The above code is similar to that we used when testing out the relationship in the shell.

Congrats on implementing a many-to-many relationship between cats and toys!

## 6. Refactoring the `CatCreate` CBV

If you browse to **Add a Cat**, you'll notice that the form has an input for the new cat's "toys".  To prevent this input from showing, we should refactor the `fields` attribute of the `CatCreate` CBV as follows:

```python
# views.py

class CatCreate(CreateView):
  model = Cat
  # fields = '__all__'
  fields = ['name', 'breed', 'description', 'age']
```

## 7. Lab Assignment

Lab time is to be spent implementing the same feature in your Finch Collector project :)

## 8. Practice Exercise

Implement the following user story:

_AAU, when viewing the detail page for a cat, I want to be able to remove a toy for that cat_

## 9. Further Study

Although Django automatically creates a "hidden" join table to implement a many-to-many relationship, there are times where it would be beneficial to be able to add additional attributes to that join table.

As an example, a `Ticket` Model provides the role of a join table between a `Concert` and a `Customer`:

```
Concert --< Ticket >-- Customer
```

In essence, a _Concert has many Customers through Tickets_

Further, a _Customer has many Concerts through Tickets_

Django includes a `through` kwarg to pull this type of relationship off.

```python
class Concert(models.Model):
    name = models.CharField(max_length=100)
    # other attributes here
    
class Customer(models.Model):
    name = models.CharField(max_length=50)
    # other attributes here
    concerts = models.ManyToManyField(Concert, through='Ticket')
    
class Ticket(models.Model):
	 seat = models.CharField(max_length=20)
	 # other attributes here
    concert = models.ForeignKey(Concert, on_delete=models.CASCADE)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
```

For more information regarding _many-to-many through relationships_, start [here](https://docs.djangoproject.com/en/3.1/topics/db/models/#intermediary-manytomany) in the docs.

## References

[Examples of CRUD with Many-to-Many Relationships](https://docs.djangoproject.com/en/3.1/topics/db/examples/many_to_many/)

