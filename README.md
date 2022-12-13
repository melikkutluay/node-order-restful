# node-order-restful

## Tech

node-order-restful uses a number of projects to work properly:

- [RabbitMq] - RabbitMQ is a message broker.
- [MongoDb] - great nosql database
- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework 


## Installation

node-order-restful requires [Node.js](https://nodejs.org/) v17+ to run.

Install the dependencies and devDependencies and start the server.

```sh
cd node-order-restful
npm i
npm run dev
```

## Plugins

node-order-restful is currently extended with the following plugins.
Indicate where to use it in your own application is linked below.

| Plugin | README |
| ------ | ------ |
| amqplib| rabbitmq|
| bcrypt| auth password |
| body-parser | read and write request body |
| dotenv | read env file |
| jsonwebtoken | generate jwt token |
| mongoose | schema-based solution to model |
| swagger-ui-express| restful api documentation|

## requirements
NodeJs
Docker
docker-compose

## Docker

Rabbitmq,MongoDv are very easy to install and deploy in a Docker container.

By default, the Docker will expose port 5672 and 27017

```sh
cd node-order-restful
docker-compose up -d
```

This will pull the rabbitmq, mongodb image then run two containers.


> Note: `username=user and password=user` is defined for rabbitMq.

Verify the deployment by navigating to your server address in
your preferred browser.

```sh
127.0.0.1:15672
```
## Documantation
We have two options for the documantation, the links are in the icons below, you can visit to document sites by click the icons

### Postman: 
[![N|Solid](https://www.svgrepo.com/show/306590/postman.svg)](https://documenter.getpostman.com/view/14336225/2s8YzUwLjA) 
> Link for Postman: `ttps://documenter.getpostman.com/view/14336225/2s8YzUwLjA`
### Swagger_UI:
[![N|Solid](https://www.svgrepo.com/show/374111/swagger.svg)](http://localhost:3000/api-docs/) 
> Link for Swagger-Ui: `http://localhost:3000/api-docs`