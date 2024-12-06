const { v4: uuid } = require("uuid"); // Updated way to import uuid v4

const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");

const getCoordsForAddress = require("../util/location");

const Place = require("../models/place_modal");

let DUMMY_PLACES = [
  {
    id: "p1",
    title: "TajMahal",
    description: "7th wonders of the world",
    location: {
      lat: 40.7484474,
      lng: -73.9871516,
    },
    address: "agra, uttarpradesh, india",
    creator: "u1",
  },
  {
    id: "p2",
    title: "Empire",
    description: "7th wonders of the world",
    location: {
      lat: 40.7484474,
      lng: -73.9871516,
    },
    address: "agra, uttarpradesh, india",
    creator: "u1",
  },
];

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
    next(new HttpError("Invalid inputs passed, please check your data", 422));
  }
  const { title, description, creator, address } = req.body;

  let coordinates = {
    lat: 100,
    lng: 100,
  };
  // try {
  // coordinates = await getCoordsForAddress(address);
  // } catch (error) {
  //   return next(error);
  // }

  const createdPlace = new Place({
    title,
    description,
    address,
    location: coordinates,
    image: "https://www.google.com",
    creator,
  });

  try {
    await createdPlace.save();
  } catch (err) {
    const error = new HttpError("creating place failed, please try again", 500);
    return next(error);
  }

  // DUMMY_PLACES.push(createdPlace); // Fixed typo (pushing `createdPlace`)
  res.status(201).json({ place: createdPlace }); // Changed status to 201 for creation
};

// adding place
const updatePlace = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);

    throw new HttpError("Invalid inputs passed, please check your data", 422);
  }

  const { title, description } = req.body;
  const placeId = req.params.pid;

  const updatedPlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) };
  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);
  updatedPlace.title = title;
  updatedPlace.description = description;

  DUMMY_PLACES[placeIndex] = updatedPlace;

  res.status(200).json({ place: updatedPlace });
};

// deleting place
const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;
  if (!DUMMY_PLACES.find((p) => p.id === pid)) {
    throw new HttpError("Could not find a place for that id", 404);
  }
  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);

  res.status(200).json({ message: "Deleted place" });
};

exports.getPlaceById = getPlaceById;
exports.getplacesByUserId = getplacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
