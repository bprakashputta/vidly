const config = require('config');
const vidlyDebugger = require('debug')('server:vidly')
const Joi = require('joi');
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('./middleware/logger');
const express = require('express');
const vidly = express();
const {request, response} = require("express");
const {func} = require("joi");

//Import all the routes
const gernes = require('./routes/gernes');
const home = require('./routes/home');

// Template Engines
vidly.set('view engine', 'pug');
vidly.set('views', './views');


// Middlewares
vidly.use(express.json());
vidly.use(express.urlencoded({extended: true}));// parse url parameters to request body
vidly.use(express.static('public'));// Serve static files like html, images, javascript to server
vidly.use(helmet());// Secures the app by applying HTTP headers
vidly.use('/api/gernes', gernes);
vidly.use('/', home);
// vidly.use(logger);


// Environment Dependent Middleware
console.log(`Environment Type: ${vidly.get('env')}`);
if(vidly.get('env') === 'development'){
    vidly.use(morgan('tiny'));// HTTP request logger middleware
    // console.log('Morgan enabled...!');
    vidlyDebugger('Morgan enabled...!');
    // startupDebuggrer()
}

// Environment Conditions
const port = process.env.PORT || 3000;


// Configuration Variables
// console.log(`Environment Name: ${config.get('name')}`);
// console.log(`Application Mail Server: ${config.get('mail.host')}`);
// console.log(`Application Password: ${config.get('mail.password')}`);


vidly.use(function (request, response, next) {
    console.log("Authentication");
    next();
});

// This is Vidly Backend
// Vidly is a movie rental service


function validateSchema(gerne){
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(gerne);
}


// Server is listening on PORT Number : port
vidly.listen(port,()=>{
    console.log(`Server is listening on Port:${port}`);
})
