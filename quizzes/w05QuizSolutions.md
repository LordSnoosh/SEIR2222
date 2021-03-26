# `SEIR` Week 5 Assessment
## For this quiz, please slack your instructors the answers, in numbered order. Do not include the questions. For example:
    1. Swag
    2. Yolo

## Embedded Documents

1. Will an embedded subdocument have access to Mongoose model methods like ```findById``` and ```findByIdAndDelete```?

```
No
```

2. What is the correct route (including the HTTP method) to create a subdocument ```comments``` to a ```post```?

```
POST /posts/:id/comments
```

## Referenced Documents

3. What magical property must you add to a Mongoose Schema property to allow use of the `mongoose.populate` method, and what should it correspond to?

```
ref, and it should be set to the name of the model, e.g., `ref: 'User'`, you want to use to replace the ObjectIds with.
```

4. What is the correct RESTful route (HTTP method & Path) to associate a referenced document `toy` to a `puppy` document - when there is no data payload in the request.

```
POST puppies/:puppyId/toys/:toyId
```

## Javascript Promises

5. What are the three possible states that a promise must always be in?

```
pending, fulfilled, or rejected
```

6. What do promises provide an alternative for when working with asynchronous operations?

```
Callback functions
```

7. What two methods do promises provide that allow you to work with the values of fulfilled and rejected promises?

```
.then and .catch
```

## Consuming Third Party APIs

8. Why is it so important that we send requests to third party APIs that require authentication from our back-end and not our front-end?

```
Sending requests from the backend allows us to minimize the risk of exposing access credentials to people who shouldn't see them
```

9. What was the name of the Node module we used to make HTTP requests from the Express backend?

```
node-fetch. Alternatives include the request module (which is deprecated) and axios (which Shaw loves)
```

## Authentication using Oauth

10. When using Passport to implement OAuth, how do the controller functions access the logged in user's document?

```
req.user
```


