const express = require("express");
const bodyParser = require("body-parser");
const url = "mongodb+srv://sdm:QylLr34vHGsSnEJu@cluster0.hr1g3.mongodb.net/mern?retryWrites=true&w=majority&appName=Cluster0"

// import mongoose
const mongoose = require("mongoose");

const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");

const HttpError = require("./models/http-error");

const app = express();
// 
app.use(bodyParser.json());

// places Routes
app.use("/api/places", placesRoutes); // => /api/places/...

// users route
app.use("/api/users", usersRoutes);

//
app.use((req, res, next) => {
  const error = new HttpError("could not find this route", 404);
  throw error;
});

// error handle
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occur" });
});

// database connection

mongoose
    .connect(url)
    .then(()=>{
        app.listen(5000, () => {
          console.log("Listening on port 5000");
        });
    })
    .catch(err=>{
        console.log(err);
    });

