const express = require("express");

const HttpError = require('../models/http-error')

const router = express.Router();

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "TajMahal",
    description: "7th wonders of the world",
    location: {
      lat: 40.7484474,
      lng: -73.9871516,
    },
    address: "agra, uttarpradesh,india",
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
    address: "agra, uttarpradesh,india",
    creator: "u1",
  },
];

// place route
router.get("/:pid", (req, res, next) => {
    console.log("GET Request in Places");
    const placeId = req.params.pid; //{pid : p1}
    const place = DUMMY_PLACES.find((p) => p.id === placeId);
    //   res.json({ message: "it works" });

    //   two way of sending error
  if (!place) {
    const error = new HttpError('could not find place for the provided id')
    throw error; 
  }
//   return for not write else
  res.json({ place });
});

// user place route
router.get("/user/:uid", (req, res, next) => {
  console.log("GET Request in user place");
  const userId = req.params.uid;
  const place = DUMMY_PLACES.find((p) => p.creator === userId);

//   two way of sending error
  if (!place) {
    const error = new HttpError('could not find place for the provided user id')
    return next(error)
  }
  res.json({ place });
});
module.exports = router;
