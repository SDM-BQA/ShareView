const mongoose = require("mongoose");

const schema = mongoose.schema;

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  image: { type: String, required: true },
  password: { type: String, required: true, minlength: 6 },
  places: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
