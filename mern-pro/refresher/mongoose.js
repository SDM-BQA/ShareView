const mongoose = require("mongoose");

const Product = require("./modals/products");
const products = require("./modals/products");

mongoose
  .connect(
    "mongodb+srv://sdm:QylLr34vHGsSnEJu@cluster0.hr1g3.mongodb.net/products_test?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

const createProduct = async (req, res, next) => {
  const createdProduct = new Product({
    name: req.body.name,
    price: req.body.price,
  });
  const result = await createdProduct.save();
  //   console.log(typeof createdProduct._id);

  res.json(result);
};

const getProducts = async (req, res, next) => {
  const products = await Product.find().exec();
  res.json(products);
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
