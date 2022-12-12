const mongoose = require('mongoose');
const Order = require('../models/orders')
const Product = require('../models/product')
const config = require('../../config')
var amqp = require('amqplib/callback_api');

exports.order_get_all = (req, res, next) => {
    Order.find()
      .select("product quantity _id")
      .exec()
      .then(docs => {
        res.status(200).json({
          count: docs.length,
          orders: docs.map(doc => {
            return {
              _id: doc._id,
              product: doc.product,
              quantity: doc.quantity,
              request: {
                type: "GET",
                url: "http://localhost:3000/orders/" + doc._id
              }
            };
          })
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  }
exports.order_create = async(req, res, next) => {  
  await amqp.connect(`amqp://${config.rabbitmq.username}:${config.rabbitmq.password}@${config.server.host}`, (error0, connection)=> {
    if (error0) {
      throw error0;
    }
    connection.createChannel((error1, channel)=> {
      if (error1) {
        throw error1;
      }
      var queue = 'hello';
      let msg = JSON.stringify(req.body);
      channel.assertQueue(queue, {
        durable: false
      });
      channel.sendToQueue(queue, Buffer.from(msg));
      channel.consume(queue, function(result_msg) {
      let bring_obj_back = JSON.parse(String.fromCharCode.apply(String, result_msg.content));
      Product.findById(req.body.productId)
      .then(product => {
        if (!product) {
          return res.status(404).json({
            message: "Product not found"
          });
        }
        const order = new Order({
          _id: mongoose.Types.ObjectId(),
          quantity: bring_obj_back.quantity,
          product: bring_obj_back.productId
        });
        return order.save();
      })
      .then(result => {
        res.status(201).json({
          message: "Order stored",
          createdOrder: {
            _id: result._id,
            product: result.product,
            quantity: result.quantity
          },
          request: {
            type: "GET",
            url: "http://localhost:3000/orders/" + result._id
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      })
      }, {
        noAck: true
      });
    });

    /*setTimeout(function() {
      connection.close();
      process.exit(0)
    }, 1000);*/
  });
  /*Product.findById(req.body.productId)
  .then(product => {
    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }
    const order = new Order({
      _id: mongoose.Types.ObjectId(),
      quantity: req.body.quantity,
      product: req.body.productId
    });
    return order.save();
  })
  .then(result => {
    res.status(201).json({
      message: "Order stored",
      createdOrder: {
        _id: result._id,
        product: result.product,
        quantity: result.quantity
      },
      request: {
        type: "GET",
        url: "http://localhost:3000/orders/" + result._id
      }
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });*/
}
exports.order_get_Id = (req, res, next) => {
  Order.findById(req.params.orderId)
    .exec()
    .then(order => {
      if (!order) {
        return res.status(404).json({
          message: "Order not found"
        });
      }
      res.status(200).json({
        order: order,
        request: {
          type: "GET",
          url: "http://localhost:3000/orders"
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
}
exports.order_create_from_Id = (req, res, next) => {  
  Order.findById(req.params.orderId)
  .exec()
  .then(order_item => {
    if (!order_item) {
      return res.status(404).json({
        message: "Order not found"
      });
    }
    const order = new Order({
      _id: mongoose.Types.ObjectId(),
      quantity: order_item.quantity,
      product: order_item.product
    });
    return order.save();
  })
  .then(result => {
    res.status(201).json({
      message: "Order stored",
      createdOrder: {
        _id: result._id,
        product: result.product,
        quantity: result.quantity
      },
      request: {
        type: "GET",
        url: "http://localhost:3000/orders/" + result._id
      }
    });
  })
  .catch(err => {
    res.status(500).json({
      error: err
    });
  });
} 
exports.order_delete = (req, res, next) => {
    Order.remove({ _id: req.params.orderId })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "Order deleted",
          request: {
            type: "POST",
            url: "http://localhost:3000/orders",
            body: { productId: "ID", quantity: "Number" }
          }
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
}