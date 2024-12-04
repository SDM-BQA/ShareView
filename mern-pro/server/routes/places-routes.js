const express = require("express");

const placeControllers = require('../controllers/places-controller')

const router = express.Router();

// place route
router.get("/:pid", placeControllers.getPlaceById);

// user place route
router.get("/user/:uid", placeControllers.getplaceByUserId);

// post 
router.post('/', placeControllers.createPlace)


module.exports = router;
