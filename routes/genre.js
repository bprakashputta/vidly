const mongoose = require('mongoose');
const express = require('express');
const Joi = require("joi");
const genreRouter = express.Router();
const {Genre, validate} = require('../models/genres');
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const asyncMiddleware = require("../middleware/async");

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
genreRouter.get('/',async (request, response,next)=>{
    // throw new Error("Couldn't get genres");
    try{
    //     throw new Error("Couldn't get genres");
        const genres = await Genre.find().sort('name');
        console.log(genres);
        return response.send(genres);
    }catch (ex){
        // return response.status(500).send("Something failed");
        next(ex);
    }
});

// GET METHOD for reading particular genres
genreRouter.get('/:id', async (request, response)=>{
    // find genre by id from genres array
    // let genre = genres.find(g => g.id === parseInt(request.params.id));

    // find genre by id from database
    let genre = await Genre.findById({_id: request.params.id});
    console.log(request.params.id);
    if(!genre){
        return response.status(400).send("The genre with the given ID doesn't exist");
    }
    return response.send(genre);
});

// POST METHOD to INSET new genre into genres
genreRouter.post('/', auth, async (request, response)=>{
    // This method will try to insert new genre object
    // into the list / database

    // Step 1
    // Check if the genre object passed in body is valid
    const validSchema = validate(request.body);
    if(validSchema.error){
        return response.status(400).send(validSchema.error.details[0].message);
    }
    // Step 2
    // Create genre object
    let genre = await new Genre({ name: request.body.name });
    // Step 3
    // Insert genre object into genre List
    // genres.push(genre);
    // or
    // Insert the object into database.
    genre = await genre.save();
    return response.send(genre);
});


// PUT METHOD to UPDATE genre object in genres
genreRouter.put('/:id', auth, async (request, response)=>{
    // Step 1
    // Check if the schema object is valid
    // Has all the required parameters
    const validateRequestObject = validate(request.body);
    if(validateRequestObject.error){
        return response.status(400).send(validateRequestObject.error.details[0].message);
    }

    // Step 2
    // Check if the object with given ID exists
    const genre = await Genre.findByIdAndUpdate(request.params.id,
        {name: request.body.name},
        {new: true});
    // if(!genre){
    //     return response.status(400).send(`The genre object with given ${request.params.id} does not exist`);
    // }
    //
    // // Step 3
    // // Update the genre object
    // genre.name = request.body.name;
    return response.send(genre);
});

// DELETE METHOD to DELETE genre object from genres
genreRouter.delete('/:id', [auth, admin], async (request, response)=>{
    // Step 1
    // Check if the genre object with given ID exists
    const genre = await Genre.findByIdAndRemove(request.params.id);
    if(!genre){
        return response.status(400).send(`The object with given genre ID ${request.params.id} does not exist`);
    }

    // Step 2
    // Delete the genre object
    // const index = genres.indexOf(genre);
    // genres.splice(index, 1);
    return response.send(genre);
});

module.exports = genreRouter;