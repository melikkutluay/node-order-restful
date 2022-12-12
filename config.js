const dotenv = require('dotenv')
dotenv.config()
module.exports = { 
    mongoDb: {
        endPoint: process.env.MONGODB_ENTPOINT,
        conf: process.env.MONGODB_CONF,
        port: process.env.MONGODB_PORT
    },
    server: {
        port: process.env.SERVERPORT,
        host: process.env.APIHOSTNAME
    },
    JWT_KEY: process.env.JWT_KEY,
    rabbitmq: {
        username: process.env.RABBITMQ_USER,
        password: process.env.RABBITMQ_PASS
    }
} 