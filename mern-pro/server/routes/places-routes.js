const express = require("express");

const placeControllers = require('../controllers/places-controller')

const router = express.Router();

// place route
router.get("/:pid", placeControllers.getPlaceById);

// user place route
router.get("/user/:uid", placeControllers.getplacesByUserId);

// post 
router.post('/', placeControllers.createPlace)


router.patch('/:pid', placeControllers.updatePlace)

router.delete('/:pid', placeControllers.deletePlace)

module.exports = router;
