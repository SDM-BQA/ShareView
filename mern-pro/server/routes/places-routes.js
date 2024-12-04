const express = require("express");

const { check } = require("express-validator");

const placeControllers = require("../controllers/places-controller");

const router = express.Router();

// place route
router.get("/:pid", placeControllers.getPlaceById);

// user place route
router.get("/user/:uid", placeControllers.getplacesByUserId);

// post
router.post(
    "/",
    [
        check("title").not().isEmpty(),
        check("description").isLength({ min: 5 }),
        check("address").not().isEmpty(),
    ],
    placeControllers.createPlace
);

router.patch("/:pid", placeControllers.updatePlace);

router.delete("/:pid", placeControllers.deletePlace);

module.exports = router;
