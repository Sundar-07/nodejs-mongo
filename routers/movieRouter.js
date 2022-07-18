const express = require("express");
const router = express.Router();
const MoviesModel = require("../models/movieSchema");

//reading movies data

//getting single data
router.get("/:id", async (req, res) => {
  try {
    const getMovies = await MoviesModel.findById(req.params.id);
    res.status(200).send(getMovies);
  } catch (error) {
    res.status(500).send(error);
  }
});

//getting all data
router.get("/", async (req, res) => {
  try {
    const getAllMovies = await MoviesModel.find();
    res.status(200).json(getAllMovies);
  } catch (error) {
    res.status(500).send(error);
  }
});

//create
router.post("/postMovies", async (req, res) => {
  const newMovies = new MoviesModel(req.body);

  try {
    const savedMovies = await newMovies.save();
    savedMovies.validateSync();
    res.status(200).send("Created new Doc");
  } catch (error) {
    res.status(500).send(error);
  }
});
// //update
router.put("/:id", async (req, res) => {
  try {
    const updateMovies = await MoviesModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).send({ msg: "Updated new Doc", doc: updateMovies });
  } catch (error) {
    res.status(500).send(error);
  }
});
// //delete
router.delete("/:id", async (req, res) => {
  try {
    const deleteMovies = await MoviesModel.findByIdAndDelete(req.params.id);
    res.status(200).send({ msg: "Deleted Doc" });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
