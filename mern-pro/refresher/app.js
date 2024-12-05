const express = require('express');
const bodyParser = require('body-parser');
const monogoPrac = require('./mongo')

const app = express();

app.use(bodyParser.json());

app.post('/products', monogoPrac.createProduct);

app.get('/products', monogoPrac.getProducts);

app.listen(5000,()=>{
    console.log("Listening on port 5000");
    
});