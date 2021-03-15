// // Load express
// const express = require('express');

// // Create our express app
// const app = express();

// // Define a "root" route directly on app
// app.get('/', function(req, res) {
//     res.send('<h1>Hello World!</h1>');
// });

// // Tell the app to listen on port 3000
// app.listen(3000, function() {
//     console.log('Listening on port 3000');
// });


// Require modules
const express = require('express');
const path = require('path');

const todoDb = require('./data/todo-db');
// console.log(todoDb.getAll());

// Create the Express app
const app = express();

// Configure the app (app.set)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Mount middleware (app.use)


// Mount routes
app.get('/', function (req, res) {
    res.redirect('/home');
});

app.get('/home', function(req, res) {
    res.render('home');
});

app.get('/todos', function(req, res) {
    res.render('todos/index', {
        todos: todoDb.getAll()
    });
});

// Tell the app to listen on port 3000
app.listen(3000, function() {
    console.log('Listening on port 3000');
});