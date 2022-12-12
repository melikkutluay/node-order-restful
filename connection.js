const mongoose = require("mongoose");
const config = require('./config')
exports.connectDb = ()=> {
    mongoose.Promise = global.Promise;
    mongoose.connect(`mongodb://${config.mongoDb.endPoint}:${config.mongoDb.port}/?${config.mongoDb.conf}`).then(() => {
    console.log('successfully connected to the database');
    }).catch(err => {
        console.log('error connecting to the database: ',err);
        process.exit();
    });
} 