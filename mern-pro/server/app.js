const express = require("express");
const bodyParser = require("body-parser");

const placesRoutes = require("./routes/places-routes");

const app = express();

// places Routes
app.use("/api/places", placesRoutes); // => /api/places/...

// error handle
app.use((error, req, res, next) => {
    if(res.headerSent){
        return next(error)
    }
    res.status(error.code || 500);
    res.json({message: error.message||'An unknown error occur'})
});

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
