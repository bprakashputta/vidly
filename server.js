const config = require('config');
const vidlyDebugger = require('debug')('server:vidly')
const Joi = require('joi');
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('./logger');
const express = require('express');
const vidly = express();
const {request, response} = require("express");
const {func} = require("joi");

// Template Engines
app.set('view engine', 'pug');
app.set('views', './views');


// Middlewares
vidly.use(express.json());
vidly.use(express.urlencoded({extended: true}));// parse url parameters to request body
vidly.use(express.static('public'));// Serve static files like html, images, javascript to server
vidly.use(helmet());// Secures the app by applying HTTP headers
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

// Implementing the CRUD operations for
// Gerne of Movies on the Vidly Service

const gernes = [
    {
        id: 1,
        name: "Action"
    },
    {
        id: 2,
        name: "Adventure"
    },
    {
        id: 3,
        name: "Comedy"
    },
    {
        id: 4,
        name: "Romance"
    }
];

// HOME Page of VIDLY
vidly.get('/', (request,response)=>{
    return response.send("Welcome to VIDLY!!");
})

// GET METHOD to READ list of gernes
vidly.get('/api/gernes',(request, response)=>{
    response.send(gernes);
});

// GET METHOD for reading particular gernes
vidly.get('/api/gernes/:id', (request, response)=>{
    let gerne = gernes.find(g => g.id === parseInt(request.params.id));
    if(!gerne){
        return response.status(400).send("The Gerne with the given ID doesn't exist");
    }
    return response.send(gerne);
});

// POST METHOD to INSET new gerne into gernes
vidly.post('/api/gernes/', (request, response)=>{
    // This method will try to insert new gerne object
    // into the list / database

    // Step 1
    // Check if the gerne object passed in body is valid
    const validSchema = validateSchema(request.body);
    if(validSchema.error){
        return response.status(400).send(validSchema.error.details[0].message);
    }

    // Step 2
    // Create Gerne object
    const gerne = {
        id: gernes.length+1,
        name: request.body.name
    };
    // Step 3
    // Insert Gerne object into Gerne List
    gernes.push(gerne);
    return response.send(gernes);
});


// PUT METHOD to UPDATE gerne object in gernes
vidly.put('/api/gernes/:id', (request, response)=>{
    // Step 1
    // Check if the object with given ID exists
    const gerne = gernes.find(g => g.id === parseInt(request.params.id));
    if(!gerne){
        return response.status(400).send(`The gerne object with given ${request.params.id} does not exist`);
    }
    // Step 2
    // Check if the schema object is valid
    // Has all the required parameters
    const validateRequestObject = validateSchema(request.body);
    if(validateRequestObject.error){
        return response.status(400).send(validateRequestObject.error.details[0].message);
    }

    // Step 3
    // Update the gerne object
    gerne.name = request.body.name;
    return response.send(gernes);
});

// DELETE METHOD to DELETE gerne object from gernes
vidly.delete('/api/gernes/:id', (request, response)=>{
    // Step 1
    // Check if the gerne object with given ID exists
    const gerne = gernes.find(g => g.id === parseInt(request.params.id));
    if(!gerne){
        return response.status(400).send(`The object with given gerne ID ${request.params.id} does not exist`);
    }

    // Step 2
    // Delete the gerne object
    const index = gernes.indexOf(gerne);
    gernes.splice(index, 1);
    return response.send(gernes);
});

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
