const express = require("express");
const bodyParser = require("body-parser");

const placesRoutes = require("./routes/places-routes");
const HttpError = require('./models/http-error')

const app = express();


app.use(bodyParser.json());

// places Routes
app.use("/api/places", placesRoutes); // => /api/places/...

//
app.use((req,res,next)=>{
    const error = new HttpError('could not find this route', 404)
    throw error
})

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
