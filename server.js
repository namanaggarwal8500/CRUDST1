
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/productCatalog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());


app.use('/api/products', productRoutes);


app.use('/api/products/:productId/reviews', reviewRoutes); 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
