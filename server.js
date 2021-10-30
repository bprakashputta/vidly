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
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/vidly')
    .then(()=>{
        vidlyDebugger('Connected to Vidly Database');
    })
    .catch(err=> vidlyDebugger(err.message));

//Import all the routes
const genres = require('./routes/genre');
const home = require('./routes/home');
const customer = require('./routes/customer');
const movies = require('./routes/movies');
const rental = require('./routes/rental');
// Template Engines
vidly.set('view engine', 'pug');
vidly.set('views', './views');


// Middlewares
vidly.use(express.json());
vidly.use(express.urlencoded({extended: true}));// parse url parameters to request body
vidly.use(express.static('public'));// Serve static files like html, images, javascript to server
vidly.use(helmet());// Secures the app by applying HTTP headers
vidly.use('/api/genres', genres);
vidly.use('/api/customer', customer);
vidly.use('/api/movies', movies);
vidly.use('/api/rental', rental);
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

// Server is listening on PORT Number : port
vidly.listen(port,()=>{
    console.log(`Server is listening on Port:${port}`);
})
