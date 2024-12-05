const MongoClient = require("mongodb").MongoClient;

const url =
  "mongodb+srv://sdm:QylLr34vHGsSnEJu@cluster0.hr1g3.mongodb.net/products_test?retryWrites=true&w=majority&appName=Cluster0";

const createProduct = async (req, res, next) => {
  const newProduct = {
    name: req.body.name,
    price: req.body.price,
  };
  const client = new MongoClient(url);
  let products;
  try {
    await client.connect(); // Connect to the database
    const db = client.db(); // Access the database
    const result = await db.collection("products").insertOne(newProduct); // Await the insert operation
    console.log(result);
    res.json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "We could not store data" });
  } finally {
    await client.close(); // Ensure the client is closed in the `finally` block
  }
};

const getProducts = async (req, res, next) => {
  const client = new MongoClient(url);
  try {
    await client.connect();
    const db = client.db();
    products = await db.collection("products").find().toArray();
    res.json(products);
  } catch (error) {
    return res.json({ message: "Could not retrieve products" });
  } finally {
    await client.close(); // Ensure the client is closed in the `finally` block
  }
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
