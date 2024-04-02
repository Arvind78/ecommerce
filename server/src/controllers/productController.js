const { log } = require('console');
const productModel = require('../models/productModel.js');
const configureCloudinary = require('../services/cloudinary/cloudnary.js');
const error = require('../utils/error.js');
const fs = require('fs');

/**
 * Add a new product.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.addProduct = async (req, res, next) => {
  const {
    name,
    price,
    image,
    description,
    category,
    subCategory,
    brand,
    color,
    productSize,
    isAvailable,
    stock,
    rating,
  } = req.body;
  console.log(req.body);
  // Check if all required fields are provided
  if (!name || !price || !category || !subCategory) {
    return next(error(400, 'Please fill all the fields'));
  }

  try {
    // Upload image to cloudinary
    if (req.file) {
      configureCloudinary().uploader.upload(
        req.file.path,
        async (err, result) => {
          if (err) {
            return next(error(500, err.message));
          } else {
            // Create new product with cloudinary image URL
            const product = await productModel.create({
              ...req.body,
              image: result.secure_url,
            });
            // Delete temporary file
            fs.unlinkSync(req.file.path);
            res.status(201).json({
              success: true,
              message: 'Product added successfully',
              product,
            });
          }
        }
      );
    }
  } catch (err) {
    next(err);
  }
};

/**
 *
 * Get all products.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.getProducts = async (req, res, next) => {
  const { page, limit, sort } = req.query;
  const itemsPerPage = parseInt(limit) || 10;
  const pageNumber = page ? parseInt(page) : 1;
  const skip = (pageNumber - 1) * itemsPerPage;
  const sorting = sort === 'desc' ? -1 : 1;

  try {
    const products = await productModel.aggregate([
      {
        $addFields: {
          numericPrice: { $toDouble: '$price' },
        },
      },
      {
        $sort: { numericPrice: sorting },
      },
      {
        $skip: skip,
      },
      {
        $limit: itemsPerPage,
      },
    ]);
    const countProduct = await productModel.countDocuments();
    const totalPages = Math.ceil(countProduct / itemsPerPage);
    if (!products || !countProduct) {
      return next(error(404, 'No products found'));
    } else {
      res.status(200).json({
        success: true,
        products,
        totalPages,
      });
    }
  } catch (err) {
    next(err);
  }
};

/**
 * Get a product by its ID.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.getProductById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await productModel.findById(id);

    if (!product) {
      return next(error(404, 'No product found'));
    } else {
      res.status(200).json({
        success: true,
        product,
      });
    }
  } catch (err) {
    next(err);
  }
};

/**
 * Update a product.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.updateProduct = async (req, res, next) => {
  const { id } = req.params;
  console.log(id, req.body, req.file);
  try {
    if (!req.file) {
      const product = await productModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!product) {
        return next(error(404, 'No product found'));
      } else {
        res.status(200).json({
          success: true,
          product,
          message: 'Product updated successfully',
        });
      }
    } else {
      configureCloudinary().uploader.upload(
        req.file.path,
        async (err, result) => {
          if (err) {
            return next(error(500, 'Error uploading image to cloudinary'));
          }
          const product = await productModel.findByIdAndUpdate(
            id,
            { ...req.body, image: result.secure_url },
            { new: true }
          );
          if (!product) {
            return next(error(404, 'No product found'));
          } else {
            res.status(200).json({
              success: true,
              product,
              message: 'Product updated successfully',
            });
          }
        }
      );
    }
  } catch (err) {
    next(err);
  }
};

/**
 * Delete a product by its ID.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await productModel.findByIdAndDelete(id);

    if (!product) {
      return next(error(404, 'No product found'));
    } else {
      res.status(200).json({
        success: true,
        message: 'Product deleted successfully',
      });
    }
  } catch (err) {
    next(err);
  }
};

/**
 * Get products by search query.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.getProductsBySearch = async (req, res, next) => {
  const { search, page, limit } = req.query;
  const perPageItem = parseInt(limit);
  const pageNumber = page ? parseInt(page) : 1;
  const skip = (pageNumber - 1) * perPageItem;

  try {
    const products = await productModel
      .find({
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { category: { $regex: search, $options: 'i' } },
          { subCategory: { $regex: search, $options: 'i' } },
          { brand: { $regex: search, $options: 'i' } },
          { color: { $regex: search, $options: 'i' } },
          { productSize: { $regex: search, $options: 'i' } },
        ],
      })
      .skip(skip)
      .limit(perPageItem);

    const countProduct = await productModel.countDocuments({
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { subCategory: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } },
        { color: { $regex: search, $options: 'i' } },
        { productSize: { $regex: search, $options: 'i' } },
      ],
    });

    const totalPages = Math.ceil(countProduct / perPageItem);
    if (!products) {
      return next(error(404, 'No products found'));
    } else {
      res.status(200).json({
        success: true,
        products,
        totalPages,
      });
    }
  } catch (err) {
    next(err);
  }
};

/**
 * Get trending products.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.getNewProducts = async (req, res, next) => {
  console.log(req.params);
  try {
    const products = await productModel
      .find({})
      .sort({ createdAt: -1 })
      .limit(10);

    if (!products) {
      return next(error(404, 'No products found'));
    } else {
      res.status(200).json({
        success: true,
        products,
      });
    }
  } catch (err) {
    next(err);
  }
};

/**
 * Get filtered products.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.getFilterProducts = async (req, res, next) => {
  const {
    brand,
    category,
    subCategory,
    price,
    rating,
    color,
    size,
    sort,
    limit,
    page,
  } = req.query;

  try {
    const filter = {};
    if (brand) filter.brand = { $regex: new RegExp(brand, 'i') };
    if (category) filter.category = { $regex: new RegExp(category, 'i') };
    if (subCategory)
      filter.subCategory = { $regex: new RegExp(subCategory, 'i') };
    if (price) filter.price = { $lte: parseFloat(price) }; // Convert price to float
    if (rating) filter.rating = { $gte: parseFloat(rating) }; // Filter products with rating greater than or equal to the specified rating
    if (color) filter.color = { $regex: new RegExp(color, 'i') };
    if (size) filter.productSize = { $regex: new RegExp(size, 'i') };

    const skip = parseInt(page - 1) * parseInt(limit) || 0;
    console.log(filter);
    let products;
    if (sort === 'desc') {
      products = await productModel.aggregate([
        { $addFields: { numericPrice: { $toDouble: '$price' } } }, // Convert price to double
        { $match: filter },
        { $sort: { numericPrice: -1 } },
        { $skip: skip },
        { $limit: parseInt(limit) || 10 },
      ]);
    } else {
      products = await productModel.aggregate([
        { $addFields: { numericPrice: { $toDouble: '$price' } } }, // Convert price to double
        { $match: filter },
        { $sort: { numericPrice: 1 } },
        { $skip: skip },
        { $limit: parseInt(limit) || 10 },
      ]);
    }

    const count = await productModel.countDocuments(filter);
    const totalPages = Math.ceil(count / parseInt(limit));

    // if (!products || products.length === 0) {
    //   return res.status(404).json({ success: false,products ,message: 'No products found' });
    // }

    res.status(200).json({ success: true, products, totalPages });
  } catch (err) {
    next(err);
  }
};

exports.getProductsBySubCategory = async (req, res, next) => {
  console.log(req.query);
  try {
    const page = req.query.page || 1;
    const itemsPerPage = req.query.limit || 5;
    const skip = (page - 1) * itemsPerPage;
    const products = await productModel
      .find({ subCategory: req.query.subCategory })
      .skip(skip)
      .limit(itemsPerPage);

    const totalProduct = await productModel.countDocuments({
      subCategory: req.query.subCategory,
    });

    const totalPages = Math.ceil(totalProduct / itemsPerPage);
    if (!products || !totalProduct) {
      return next(error(404, 'No products found'));
    } else {
      res.status(200).json({
        success: true,
        products,
        totalPages,
      });
    }
  } catch (err) {
    next(err);
  }
};
