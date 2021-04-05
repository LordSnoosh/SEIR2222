// Part 1: Promises Fundamentals
// const p = new Promise(function(resolve, reject) {
//     setTimeout(function() {
//         resolve("Timed Out!");
//     }, 2000);
// });


// p
// .then(function(result) {
//     console.log("#1", result);
//     return 42;
// })
// .then(function(result) {
//     console.log("#2", result);
//     return "Done!";
// })
// .then(function(result) {
//     console.log(result);
// });


// function asyncAdd(a, b, delay) {
//   return new Promise(function (resolve) {
//     setTimeout(function () {
//       resolve(a + b);
//     }, delay);
//   });
// }

// asyncAdd(5, 10, 2000)
// .then(function(sum) {
//     console.log(sum);
//     return asyncAdd(sum, 100, 1000);
// })
// .then(function(newSum) {
//     console.log(newSum);
//     return asyncAdd(newSum, 1000, 2000);
// })
// .then(function(newestSum) {
//     console.log(newestSum);
// });





// Part 2: Seeding our Database
require('./config/database');// connect this script to the database
const Movie = require('./models/movie');
const Performer = require('./models/performer');
const data = require('./data');


// Movie.deleteMany({})
// .then(function(results) {
//     console.log("Deleted Movies: ", results);
//     return Performer.deleteMany({});
// })
// .then(function(results) {
//     console.log("Deleted Performers: ", results);
// })
// .then(function() {
//     process.exit();
// });


const p1 = Movie.deleteMany({});
const p2 = Performer.deleteMany({});


Promise.all([p1, p2])
.then(function(results) {
    console.log(results);
    return Performer.create(data.performers);
})
.then(function(performers) {
    console.log(performers);
    return Movie.create(data.movies);
})
.then(function(movies) {
    console.log(movies);
    return Promise.all([
        Performer.findOne({ name: "Mark Hamill" }),
        Movie.findOne({ title: "Star Wars - A New Hope" }),
    ]);
})
.then(function(results) {
    console.log(results);
    const mark = results[0];
    const starWars = results[1];
    starWars.cast.push(mark);
    return starWars.save();
})
.then(function(results) {
    console.log(results);
    process.exit();
});