const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const userCont = require('../controller/user')

router.post("/login", userCont.login) 
router.post("/signup", userCont.singUp);
router.delete("/:userId", userCont.delete);   

module.exports= router;