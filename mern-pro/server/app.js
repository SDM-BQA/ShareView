const express = require("express");
const bodyParser = require("body-parser");

const placesRoutes = require('./routes/places-routes')

const app = express();

// places Routes
app.use('/api/places',placesRoutes) // => /api/places/...

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
