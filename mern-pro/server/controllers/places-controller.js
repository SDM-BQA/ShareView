const { v4: uuid } = require("uuid"); // Updated way to import uuid v4

const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");

// const getCoordsForAddress = require("../util/location");

const Place = require("../models/place_modal");
const User = require("../models/user_modal");
const mongoose = require("mongoose");

// let DUMMY_PLACES = [
//   {
//     id: "p1",
//     title: "TajMahal",
//     description: "7th wonders of the world",
//     location: {
//       lat: 40.7484474,
//       lng: -73.9871516,
//     },
//     address: "agra, uttarpradesh, india",
//     creator: "u1",
//   },
//   {
//     id: "p2",
//     title: "Empire",
//     description: "7th wonders of the world",
//     location: {
//       lat: 40.7484474,
//       lng: -73.9871516,
//     },
//     address: "agra, uttarpradesh, india",
//     creator: "u1",
//   },
// ];

const getPlaceById = async (req, res, next) => {
  console.log("GET Request in Places");
  const placeId = req.params.pid; // {pid : p1}

  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a place",
      500
    );
    return next(error);
  }

  if (!place) {
    const error = new HttpError(
      "Could not find place for the provided id",
      404
    );
    return next(error);
  }

  res.json({ place: place.toObject({ getters: true }) });
};

const getplacesByUserId = async (req, res, next) => {
  console.log("GET Request in user place");
  const userId = req.params.uid;
  // const places = DUMMY_PLACES.filter((p) => p.creator === userId);

  let places;
  try {
    places = await Place.find({ creator: userId });
  } catch (err) {
    const error = new HttpError("Something went wrong, please try again", 500);
    return next(error);
  }

  if (!places || places.length === 0) {
    const error = new HttpError(
      "Could not find places for the provided user id"
    );
    return next(error);
  }

  res.json({
    places: places.map((place) => place.toObject({ getters: true })),
  });
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data", 422)
    );
  }

  const { title, description, creator, address } = req.body;

  let coordinates = { lat: 100, lng: 100 }; // Hardcoded coordinates
  const createdPlace = new Place({
    title,
    description,
    address,
    location: coordinates,
    image: "https://www.google.com", // Placeholder image
    creator,
  });

  // Check if the user exists
  let user;
  try {
    user = await User.findById(creator); // Added await
  } catch (err) {
    const error = new HttpError(
      "Creating place failed, please try again.",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Could not find user for provided id.", 404);
    return next(error);
  }

  // Start a session and transaction
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPlace.save({ session: sess }); // Save the place in the transaction
    user.places.push(createdPlace._id); // Push the place ID into the user's places array
    await user.save({ session: sess }); // Save the updated user
    await sess.commitTransaction(); // Commit the transaction
    sess.endSession(); // End the session
  } catch (err) {
    const error = new HttpError(
      "Creating place failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(201).json({ place: createdPlace.toObject({ getters: true }) });
};

// adding place
const updatePlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);

    return next(
      new HttpError("Invalid inputs passed, please check your data", 422)
    );
  }

  const { title, description } = req.body;
  const placeId = req.params.pid;

  // const updatedPlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) };
  // const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);

  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update place",
      500
    );
    return next(error);
  }

  place.title = title;
  place.description = description;

  try {
    await place.save();
  } catch (err) {
    const error = new HttpError("Something went wrong, olease try again", 500);
    return next(error);
  }

  // DUMMY_PLACES[placeIndex] = updatedPlace;

  res.status(200).json({ place: place.toObject({ getters: true }) });
};

// deleting place
const deletePlace = async (req, res, next) => {
  const placeId = req.params.pid;

  let place;
  try {
    // Fetch the place by ID
    place = await Place.findById(placeId).populate("creator");
  } catch (err) {
    console.error("Error fetching place:", err);
    const error = new HttpError(
      "Something went wrong, could not delete place.",
      500
    );
    return next(error);
  }

  if (!place) {
    const error = new HttpError("Could not find a place for this id.", 404);
    return next(error);
  }

  try {
    // Remove the place

    const sess = await mongoose.startSession();
    sess.startTransaction();
    await place.deleteOne({ session: sess }); // Use deleteOne() for Mongoose >=6.0
    place.creator.places.pull(place);
    await place.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    console.error("Error during deletion:", err);
    const error = new HttpError(
      "Something went wrong, could not delete place.",
      500
    );
    return next(error);
  }

  // Send a success response
  res.status(200).json({ message: "Place deleted successfully." });
};

exports.getPlaceById = getPlaceById;
exports.getplacesByUserId = getplacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
