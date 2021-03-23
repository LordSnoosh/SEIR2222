// Part 1: Promises Fundamentals
const p = new Promise(function(resolve, reject) {
  resolve(42);
});

p.then(function(result) {
  console.log(result);
}).catch(function(err) {
  console.log(err);
})

p.then(function(result) {
  console.log("Step 1: ", result)
  return 45;
}).then(function(result) {
  console.log("Step 2:", result);
  return "Done!"
}).then(function(result) {
  console.log("Step 3: ", result);
})

function asyncAdd(a, b, delay) {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve(a + b);
    }, delay)
  })
}

asyncAdd(5, 10, 2000)
  .then(function(sum) {
    console.log(sum);
    return asyncAdd(sum, 100, 1000);
  }).then(function(sum) {
    console.log(sum);
    return asyncAdd(sum, 1000, 2000);
  }).then(function(sum) {
    console.log(sum);
  })



// Part 2: Seeding our Database
require('./config/database');// connect this script to the database
const Movie = require('./models/movie');
const Performer = require('./models/performer');
const data = require('./data');


Movie.deleteMany({})
  .then(function(results) {
    console.log("Deleted Movies: ", results);
    return Performer.deleteMany({});
  })
  .then(function(results) {
    console.log("Deleted Performers: ", results);
  })
  .then(function() {
    process.exit();
  })

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
})
.then(function() {
  process.exit();
})

Promise.all([p1, p2])
.then(function (results) {
  console.log(results);
  let p1 = Performer.create(data.performers);
  let p2 = Movie.create(data.movies);
  return Promise.all([p1, p2]);
})
.then(function (results) {
  console.log(results);
})
.then(function () {
  process.exit();
});
  
Movie.find({mpaaRating: 'PG-13'})
  .then(function(movies) {
    console.log(movies);

  })
  .then(function() {
    process.exit();
  })

const p1 = Performer.findOne({name: "Mark Hamill"});
const p2 = Movie.findOne({ title: "Star Wars - A New Hope" });

Promise.all([p1, p2])
  .then(function(results) {
    console.log(results);
    const mark = results[0];
    const starWars = results[1];
    starWars.cast.push(mark);
    return starWars.save();
  })
  .then(function() {
    process.exit();
  })