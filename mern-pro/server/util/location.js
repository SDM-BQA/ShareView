const axios = require("axios");
const dotenv = require("dotenv");
const HttpError = require("../models/http-error");

// Configure dotenv
dotenv.config({path:'../.env'});

// Retrieve API key from environment variables
const API_KEY = process.env.API_KEY;

async function getCoordsForAddress(address) {
  try {
    const response = await axios.get(
      `https://us1.locationiq.com/v1/search.php?key=${API_KEY}&q=${encodeURIComponent(
        address
      )}&format=json`
    );

    const data = response.data[0];
    console.log(data);

    if (!data) {
      const error = new HttpError(
        "Could not find location for the specified address.",
        422
      );
      throw error;
    }

    const coorLat = data.lat;
    const coorLon = data.lon;
    const coordinates = {
      lat: coorLat,
      lng: coorLon,
    };

    return coordinates;
  } catch (error) {
    console.error(error);
    throw new HttpError("Failed to fetch coordinates.", 500);
  }
}

module.exports = getCoordsForAddress;
