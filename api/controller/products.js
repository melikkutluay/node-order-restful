const mongoose = require('mongoose');
const Product = require('../models/product')
const queue = require('../middleware/queue')
exports.product_get_all = (req, res, next) => {
    Product.find()
      .select("name price _id")
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          products: docs.map(doc => {
            return {
              name: doc.name,
              price: doc.price,
              _id: doc._id,
              request: {
                type: "GET",
                url: "http://localhost:3000/products/" + doc._id
              }
            };
          })
        };
        res.status(200).json(response);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }
exports.product_create = (req, res, next) => {
    const product = new Product({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      price: req.body.price
    });
    if (req.userData.role == "Admin") {
      product
      .save()
      .then(result => {
        res.status(201).json({
          message: "Created product successfully",
          createdProduct: {
              name: result.name,
              price: result.price,
              _id: result._id,
              request: {
                  type: 'GET',
                  url: "http://localhost:3000/products/" + result._id
              }
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
    } else {
      throw new Error("you are not authorized")
    }  
  }
exports.product_get_Id = (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
      .select('name price _id')
      .exec()
      .then(doc => {
        console.log("From database", doc);
        if (doc) {
          res.status(200).json({
              product: doc,
              request: {
                  type: 'GET',
                  url: 'http://localhost:3000/products'
              }
          });
        } else {
          res
            .status(404)
            .json({ message: "No valid entry found for provided ID" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  }
exports.product_update =(req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};
  
  Product.update({ _id: id }, { $set: req.body })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Product updated",
        request: {
          type: "GET",
          url: "http://localhost:3000/products/" + id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
  };
exports.product_delete = (req, res, next) => {
    const id = req.params.productId;
    if (req.userData.role == "Admin") {
      Product.remove({ _id: id })
      .exec()
      .then(result => {
        res.status(200).json({
            message: 'Product deleted',
            request: {
                type: 'POST',
                url: 'http://localhost:3000/products',
                body: { name: 'String', price: 'Number' }
            }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
    } else {
      throw new Error("you are not authorized")
    }
  }