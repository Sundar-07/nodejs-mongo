const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
  movie_name: {
    type: String,
    required: true,
  },
  ratings: {
    type: Number,
    min: 0,
    validate(value) {
      if (value < 0) throw new Error("Negative ratings aren't allowed.");
    },
    max: 10,
  },
  cast: {
    type: [String],
  },
  genre: {
    type: String,
    required: true,
  },
  release_date: {
    type: Date,
    min: '1987-09-28',
    max: '2022-07-18',
    default: new Date()
  },
});

const MoviesModel = mongoose.model("movies", movieSchema);

module.exports = MoviesModel;
