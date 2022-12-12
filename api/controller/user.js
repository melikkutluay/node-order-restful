const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const jwt_key = require("../../config").JWT_KEY
const mongoose = require("mongoose")

exports.singUp = (req, res, next) => {
    User.find({ email: req.body.email })
      .exec()
      .then(user => {
        if (user.length >= 1) {
          return res.status(409).json({
            message: "Mail exists"
          });
        } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).json({
                error: err
              });
            } else {
              const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash
              });
              if (user.email == "admin@gmail.com") {
                user.role = "Admin"
              }else {
                user.role = "User"
              } 
              user
                .save()
                .then(result => {
                  console.log(result);
                  res.status(201).json({
                    message: "User created",
                    createdUser: {
                        _id: result._id,
                        email: result.email,
                        role: result.role
                      },
                  });
                })
                .catch(err => {
                  console.log(err);
                  res.status(500).json({
                    error: err
                  });
                });
            }
          });
        }
      });
}
exports.login = (req,res, next)=>{
    User.find({email: req.body.email})
    .exec()
    .then(user=>{
        if (user.length < 1) {
            return res.status(404).json({
                message: "Auth failed"
            })
        }
        
        bcrypt.compare(req.body.password,user[0].password, (err, result)=>{
            if (err) {
                return res.status(401).json({
                  message: "Auth failed"
                });
            }
            if (result) {
                const token = jwt.sign({
                    email: user[0].email,
                    userId: user[0]._id,
                    role: user[0].role  
                },
                process.env.JWT_KEY,
                {
                    expiresIn: "1h"
                } 
                );
                return res.status(200).json({
                    message: "Auth successful",
                    token: token
                })
            }
            res.status(401).json({
                message: "Auth failed"
            })
        })
    })
    .catch(err=>{
        res.status(500).json({
            error: err
        })
    })
}
exports.delete = (req, res, next) => {
    User.remove({ _id: req.params.userId })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "User deleted",
          deletedUser: {
            _id: result._id,
            email: result.email
          },
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
}