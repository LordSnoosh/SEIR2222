const Movie = require('../models/movie');

module.exports = {
  create
};

function create(req, res) {
  // Find the movie to embed the review within
  Movie.findById(req.params.id, function(err, movie) {
    // Push the subdoc for the review
    movie.reviews.push(req.body);
    // Always save the top-level document (not subdocs)
    movie.save(function(err) {
      res.redirect(`/movies/${movie._id}`);
    });
  });
}