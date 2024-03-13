const express = require('express');
const {
  addProduct,
  deleteProduct,
  getFilterProducts,
  getProductById,
  getProducts,
  getProductsBySearch,
  updateProduct,
  getNewProducts,
  getProductsBySubCategory,
} = require('../controllers/productController.js');
const { upload } = require('../middleware/fileUploader.js');

const productRouter = express.Router();
productRouter.post('/product', upload.single('image'), addProduct);
productRouter.get('/product', getProducts);
productRouter.get('/product/:id', getProductById);
productRouter.put('/product/:id', upload.single('image'), updateProduct);
productRouter.delete('/product/:id', deleteProduct);
productRouter.get('/products/search', getProductsBySearch);
productRouter.get('/products/new', getNewProducts);
productRouter.get('/products/filters', getFilterProducts);
productRouter.get('/products/subcategory', getProductsBySubCategory);

module.exports = productRouter;
