const express = require('express');
const Joi = require("joi");
const genreRouter = express.Router();
const DB = require('../db/mongodb');
const db = new DB();


// const genres = [
//     {
//         name: "Action"
//     },
//     {
//         name: "Adventure"
//     },
//     {
//         name: "Comedy"
//     },
//     {
//         name: "Romance"
//     }
// ];

// Implementing the CRUD operations for
// genre of Movies on the Vidly Service


// GET METHOD to READ list of genres
genreRouter.get('/',(request, response)=>{
    const genres = db.getAllGenres();
    console.log((genres));
    response.send();
});

// GET METHOD for reading particular genres
genreRouter.get('/:id', (request, response)=>{
    // find genre by id from genres array
    // let genre = genres.find(g => g.id === parseInt(request.params.id));

    // find genre by id from database
    let genre = db.getGenreByID(request.params.id);
    if(!genre){
        return response.status(400).send("The genre with the given ID doesn't exist");
    }
    return response.send(genre);
});

// POST METHOD to INSET new genre into genres
genreRouter.post('/', (request, response)=>{
    // This method will try to insert new genre object
    // into the list / database

    // Step 1
    // Check if the genre object passed in body is valid
    const validSchema = validateSchema(request.body);
    if(validSchema.error){
        return response.status(400).send(validSchema.error.details[0].message);
    }

    // Step 3

    // Step 2
    // Create genre object
    const genre = {
        id: genres.length+1,
        name: request.body.name
    };
    // Step 3
    // Insert genre object into genre List
    genres.push(genre);
    return response.send(genres);
});


// PUT METHOD to UPDATE genre object in genres
genreRouter.put('/:id', (request, response)=>{
    // Step 1
    // Check if the object with given ID exists
    const genre = genres.find(g => g.id === parseInt(request.params.id));
    if(!genre){
        return response.status(400).send(`The genre object with given ${request.params.id} does not exist`);
    }
    // Step 2
    // Check if the schema object is valid
    // Has all the required parameters
    const validateRequestObject = validateSchema(request.body);
    if(validateRequestObject.error){
        return response.status(400).send(validateRequestObject.error.details[0].message);
    }

    // Step 3
    // Update the genre object
    genre.name = request.body.name;
    return response.send(genres);
});

// DELETE METHOD to DELETE genre object from genres
genreRouter.delete('/:id', (request, response)=>{
    // Step 1
    // Check if the genre object with given ID exists
    const genre = genres.find(g => g.id === parseInt(request.params.id));
    if(!genre){
        return response.status(400).send(`The object with given genre ID ${request.params.id} does not exist`);
    }

    // Step 2
    // Delete the genre object
    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    return response.send(genres);
});

function validateSchema(genre){
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(genre);
}

module.exports = genreRouter;