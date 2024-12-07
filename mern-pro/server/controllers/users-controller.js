const { v4: uuid } = require("uuid"); // Updated way to import uuid v4

const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");

const User = require("../models/user_modal");

const DUMMY_USERS = [
  {
    id: "u1",
    name: "SDM BQA",
    email: "test@test.com",
    password: "testers",
  },
];

// getting users
const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    const error = new HttpError("Fetching users Failed, please try again", 500);
    return next(error);
  }

  res
    .status(200)
    .json({ users: users.map((user) => user.toObject({ getters: true })) });
};

// signup
const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);

    return next(
      HttpError("Invalid inputs passed, please check your data", 422)
    );
  }

  const { name, email, password } = req.body;

  // Email already existed
  // const hasuser = DUMMY_USERS.find((u) => u.email === email);

  // if (hasuser) {
  //   throw new HttpError("Email already existed", 422);
  // }
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Signing Up Fail, please try again", 500);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError("User exists already, please login instead");
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    image: "https://www.google.com",
    password,
    places: [],
  });

  // DUMMY_USERS.push(createdUser);
  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError("sign up user failed, please try again", 500);
    return next(error);
  }

  res.status(201).json({ users: createdUser.toObject({ getters: true }) });
};

// login
const login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);

    throw new HttpError("Invalid inputs passed, please check your data", 422);
  }
  const { email, password } = req.body;

  // const identifiedUser = DUMMY_USERS.find((u) => u.email === email);

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Login Fail, please try again", 500);
    return next(error);
  }

  try {
    if (!existingUser || existingUser.password !== password) {
      throw new HttpError(
        "Could not identify user, credentials seem to be wrong",
        401
      );
    }
  } catch (err) {
    const error = new HttpError("Login Fail, please try again", 500);
    return next(error);
  }

  res.json({
    message: "Logged in!",
    user: existingUser.toObject({ getters: true }),
  });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
